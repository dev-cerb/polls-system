import * as z from "zod";
import { prisma } from "../lib/prisma.js";
import {
  pollOptionsByPollSchema,
  pollOptionsParamsSchema,
  updatePollOptionSchema,
} from "../schemas/pollOptions-schemas.js";

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
