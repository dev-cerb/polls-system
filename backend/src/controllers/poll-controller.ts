import { FastifyReply, FastifyRequest } from "fastify";
import {
  createPollSchema,
  pollIdSchema,
  updatePollSchema,
  pollStatusSchema,
} from "../schemas/poll-schemas.js";
import {
  createPollService,
  deletePollService,
  getAllPollsService,
  getPollService,
  updatePollService,
} from "../services/poll-service.js";

export async function createPollController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createPollSchema.parse(request.body);
  const poll = await createPollService(body);

  return reply.status(201).send(poll);
}

export async function getAllPollsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const query = pollStatusSchema.parse(request.query);

  const polls = await getAllPollsService(query.status);

  return reply.status(200).send(polls);
}

export async function getPollByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = pollIdSchema.parse(request.params);
  const poll = await getPollService(params);

  if (!poll) {
    return reply.status(404).send({
      message: "Enquete não encontrada.",
    });
  }

  return reply.status(200).send(poll);
}

export async function deletePollController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = pollIdSchema.parse(request.params);
  await deletePollService(params);

  return reply.status(200).send({ message: "Enquete excluída com sucesso." });
}

export async function updatePollController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = pollIdSchema.parse(request.params);
  const body = updatePollSchema.parse(request.body);
  const poll = await updatePollService(params, body);

  return reply.status(200).send(poll);
}
