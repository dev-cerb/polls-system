import { FastifyRequest, FastifyReply } from "fastify";
import { pollOptionsParamsSchema } from "../schemas/pollOptions-schemas.js";
import { createVoteService } from "../services/vote-service.js";

export async function createVoteController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = pollOptionsParamsSchema.parse(request.params);
  const vote = await createVoteService(params);

  if ("error" in vote) {
    return reply.status(400).send(vote);
  }

  return reply.status(201).send(vote);
}
