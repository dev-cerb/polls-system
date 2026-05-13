import { FastifyRequest, FastifyReply } from "fastify";

import {
  pollOptionsByPollSchema,
  pollOptionsParamsSchema,
  updatePollOptionSchema,
} from "../schemas/pollOptions-schemas.js";
import {
  createPollOptionService,
  deletePollOptionService,
  getAllOptionsByPollService,
  updatePollOptionService,
} from "../services/pollOptions-service.js";

export async function getAllPollOptionsByPollController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = pollOptionsByPollSchema.parse(request.params);
  const options = await getAllOptionsByPollService(params);

  return reply.status(200).send(options);
}

export async function updatePollOptionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = pollOptionsParamsSchema.parse(request.params);
  const body = updatePollOptionSchema.parse(request.body);
  const option = await updatePollOptionService(params, body);

  return reply.status(200).send(option);
}

export async function deletePollOptionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = pollOptionsParamsSchema.parse(request.params);
  const message = await deletePollOptionService(params);

  return reply.status(200).send(message);
}

export async function createPollOptionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = pollOptionsByPollSchema.parse(request.params);
  const body = updatePollOptionSchema.parse(request.body);
  const option = await createPollOptionService(params, body);

  return reply.status(201).send(option);
}
