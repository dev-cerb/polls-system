import { FastifyRequest, FastifyReply } from "fastify";
import { pollOptionsParamsSchema } from "../schemas/pollOptions-schemas.js";
import { createVoteService } from "../services/vote-service.js";

export async function createVoteController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = pollOptionsParamsSchema.parse(request.params);
  const vote = await createVoteService(params);

  reply.status(201).send(vote);
}
