import * as z from "zod";

import { prisma } from "../lib/prisma.js";
import {
  createPollSchema,
  pollIdSchema,
  updatePollSchema,
} from "../schemas/poll-schemas.js";

type CreatePollSchema = z.infer<typeof createPollSchema>;
type PollIdSchema = z.infer<typeof pollIdSchema>;
type UpdatePollSchema = z.infer<typeof updatePollSchema>;

export async function createPollService(data: CreatePollSchema) {
  const poll = await prisma.poll.create({
    data: {
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,

      pollOptions: {
        create: data.pollOptions,
      },
    },
  });

  return poll;
}

export async function getAllPollsService() {
  const polls = await prisma.poll.findMany({
    include: {
      pollOptions: true,
    },
  });

  return polls;
}

export async function getPollService(data: PollIdSchema) {
  const poll = await prisma.poll.findUnique({
    where: {
      id: data.id,
    },
    include: {
      pollOptions: true,
    },
  });

  return poll;
}

export async function deletePollService(data: PollIdSchema) {
  await prisma.poll.delete({
    where: {
      id: data.id,
    },
  });
}

export async function updatePollService(
  id: PollIdSchema,
  data: UpdatePollSchema,
) {
  const poll = await prisma.poll.update({
    where: {
      id: id.id,
    },

    data: data,
  });

  return poll;
}
