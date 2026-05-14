import * as z from "zod";

import { prisma } from "../lib/prisma.js";
import { pollOptionsParamsSchema } from "../schemas/pollOptions-schemas.js";
import { getPollStatus } from "../utils/getPollStatus.js";

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
      message: "Você não pode fazer essa transação.",
    };
  }

  const vote = await prisma.vote.create({
    data: {
      pollOptionId: ids.id,
    },
  });

  return vote;
}
