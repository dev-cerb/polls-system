import * as z from "zod";
import { prisma } from "../lib/prisma.js";
import {
  pollOptionsByPollSchema,
  pollOptionsParamsSchema,
  updatePollOptionSchema,
} from "../schemas/pollOptions-schemas.js";
import { id } from "zod/locales";

type PollIdSchema = z.infer<typeof pollOptionsByPollSchema>;
type PollOptionsParams = z.infer<typeof pollOptionsParamsSchema>;
type UpdatePollOptions = z.infer<typeof updatePollOptionSchema>;

export async function getAllOptionsByPollService(data: PollIdSchema) {
  const options = await prisma.pollOption.findMany({
    where: {
      pollId: data.pollId,
    },
    include: {
      _count: {
        select: {
          votes: true,
        },
      },
    },
  });

  return options;
}

export async function updatePollOptionService(
  ids: PollOptionsParams,
  data: UpdatePollOptions,
) {
  const option = await prisma.pollOption.update({
    where: {
      id: ids.id,
    },

    data: data,
  });

  return option;
}

export async function deletePollOptionService(ids: PollOptionsParams) {
  const options = await prisma.pollOption.findMany({
    where: {
      pollId: ids.pollId,
    },
  });

  if (options.length <= 3) {
    return { message: "Uma enquete deve ter no mínimo 3 opções." };
  }

  const hasOption = options.some((e) => {
    e.id == ids.id;
  });

  if (!hasOption) {
    return {
      message: "Você está tentando excluir uma opção que não é desta enquete.",
    };
  }

  await prisma.pollOption.delete({
    where: {
      id: ids.id,
    },
  });

  return { message: "Excluída com sucesso." };
}

export async function createPollOptionService(
  id: PollIdSchema,
  data: UpdatePollOptions,
) {
  const poll = await prisma.poll.findUnique({
    where: {
      id: id.pollId,
    },
  });

  if (!poll) {
    return {
      message: "Você está tentando criar uma opção em uma enquete inexistente.",
    };
  }

  const option = await prisma.pollOption.create({
    data: {
      title: data.title,
      pollId: id.pollId,
    },
  });

  return option;
}
