import { FastifyInstance } from "fastify";
import {
  getAllPollOptionsByPollController,
  updatePollOptionsController,
} from "../controllers/pollOptions-controller.js";

export async function pollOptionsRoutes(app: FastifyInstance) {
  app.get("/polls/:pollId/options", getAllPollOptionsByPollController);
  app.patch("/polls/:pollId/options/:id", updatePollOptionsController);
}
