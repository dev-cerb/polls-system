import { FastifyRequest, FastifyReply } from "fastify";

import {
  pollOptionsByPollSchema,
  pollOptionsParamsSchema,
  updatePollOptionSchema,
} from "../schemas/pollOptions-schemas.js";
import {
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
