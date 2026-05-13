import * as z from "zod";

import { prisma } from "../lib/prisma.js";
import { pollOptionsParamsSchema } from "../schemas/pollOptions-schemas.js";

type PollOptionsParams = z.infer<typeof pollOptionsParamsSchema>;

export async function createVoteService(ids: PollOptionsParams) {
  const option = await prisma.pollOption.findFirst({
    where: {
      pollId: ids.pollId,
      id: ids.id,
    },
  });

  if (!option) {
    return { message: "Você não pode fazer essa transação." };
  }

  const vote = await prisma.vote.create({
    data: {
      pollOptionId: ids.id,
    },
  });

  return vote;
}
