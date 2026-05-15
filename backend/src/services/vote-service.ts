import * as z from "zod";

import { prisma } from "../lib/prisma.js";
import { pollOptionsParamsSchema } from "../schemas/pollOptions-schemas.js";
import { getPollStatus } from "../utils/getPollStatus.js";
import { clients } from "../lib/webSocket-clients.js";

type PollOptionsParams = z.infer<typeof pollOptionsParamsSchema>;

export async function createVoteService(ids: PollOptionsParams) {
  const poll = await prisma.poll.findUnique({
    where: {
      id: ids.pollId,
    },
    include: {
      pollOptions: {
        include: {
          _count: {
            select: {
              votes: true,
            },
          },
        },
      },
    },
  });

  if (!poll) {
    return {
      error: true,
      message: "Não é possivel votar em uma enquete que não está criada.",
    };
  }

  const status = getPollStatus(poll);

  if (status !== "Iniciada." && status !== "Em andamento.") {
    return {
      error: true,
      message:
        "Não é possível votar nesta opção pois a enquete não está em período vigente.",
    };
  }

  const option = await prisma.pollOption.findFirst({
    where: {
      pollId: ids.pollId,
      id: ids.id,
    },
  });

  if (!option) {
    return {
      error: true,
      message: "Essa opção não existe na enquete selecionada.",
    };
  }

  const vote = await prisma.vote.create({
    data: {
      pollOptionId: ids.id,
    },
  });

  const updatedOption = await prisma.pollOption.findUnique({
    where: {
      id: ids.id,
    },
    include: {
      _count: {
        select: {
          votes: true,
        },
      },
    },
  });

  const pollConnections = clients.get(ids.pollId);

  pollConnections?.forEach((connection) => {
    connection.send(
      JSON.stringify({
        pollOptionId: ids.id,
        votes: updatedOption?._count.votes,
      }),
    );
  });

  return vote;
}
