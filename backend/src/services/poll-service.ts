import * as z from "zod";

import { prisma } from "../lib/prisma.js";
import {
  createPollSchema,
  pollIdSchema,
  pollStatusSchema,
  updatePollSchema,
} from "../schemas/poll-schemas.js";
import { getPollStatus } from "../utils/getPollStatus.js";

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

export async function getAllPollsService(status?: string) {
  const polls = await prisma.poll.findMany({
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

  const pollsWithStatus = polls.map((poll) => {
    return {
      status: getPollStatus(poll),
      ...poll,
    };
  });

  if (!status) {
    return pollsWithStatus;
  }

  const filteredPolls = pollsWithStatus.filter((poll) => {
    return poll.status === status;
  });

  return filteredPolls;
}

export async function getPollService(data: PollIdSchema) {
  const poll = await prisma.poll.findUnique({
    where: {
      id: data.id,
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
    return { error: true, message: "Esta enquete não existe." };
  }

  const pollWithStatus = {
    status: getPollStatus(poll),
    ...poll,
  };

  return pollWithStatus;
}

export async function deletePollService(data: PollIdSchema) {
  const poll = await prisma.poll.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!poll) {
    return {
      error: true,
      message: "A enquete não existe.",
    };
  }

  await prisma.poll.delete({
    where: {
      id: data.id,
    },
  });

  return { error: false };
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
