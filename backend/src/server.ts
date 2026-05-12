import Fastify from "fastify";
import { pollRoutes } from "./routes/poll-routes.js";

const app = Fastify();

app.register(pollRoutes);

app
  .listen({ port: 3333 })
  .then(() => {
    console.log("HTTP server running!");
  })
  .catch((e) => {
    console.log(e);
  });
