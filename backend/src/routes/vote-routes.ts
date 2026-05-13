import { FastifyInstance } from "fastify";
import { createVoteController } from "../controllers/vote-controller.js";

export async function voteRoutes(app: FastifyInstance) {
  app.post("/polls/:pollId/options/:id/vote", createVoteController);
}
