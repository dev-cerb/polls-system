import { FastifyInstance } from "fastify";
import {
  createPollOptionsController,
  deletePollOptionsController,
  getAllPollOptionsByPollController,
  updatePollOptionsController,
} from "../controllers/pollOptions-controller.js";

export async function pollOptionsRoutes(app: FastifyInstance) {
  app.get("/polls/:pollId/options", getAllPollOptionsByPollController);
  app.post("/polls/:pollId/options", createPollOptionsController);
  app.patch("/polls/:pollId/options/:id", updatePollOptionsController);
  app.delete("/polls/:pollId/options/:id", deletePollOptionsController);
}
