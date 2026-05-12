import { FastifyInstance } from "fastify";
import {
  createPollController,
  deletePollController,
  getAllPollsController,
  getPollByIdController,
  updatePollController,
} from "../controllers/poll-controller.js";

export async function pollRoutes(app: FastifyInstance) {
  app.post("/polls", createPollController);
  app.get("/polls", getAllPollsController);
  app.get("/polls/:id", getPollByIdController);
  app.delete("/polls/:id", deletePollController);
  app.patch("/polls/:id", updatePollController);
}
