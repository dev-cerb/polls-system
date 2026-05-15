import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyApiReference from "@scalar/fastify-api-reference";
import websocket from "@fastify/websocket";
import fastifyCors from "@fastify/cors";

import { ZodError } from "zod";

import { pollRoutes } from "./routes/poll-routes.js";
import { pollOptionsRoutes } from "./routes/pollOptions-routes.js";
import { voteRoutes } from "./routes/vote-routes.js";
import { webSocketRoutes } from "./routes/webSocket-routes.js";

export const app = Fastify();

app.register(websocket);

app.register(fastifyCors, {
  origin: "*",
});

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "System Polls API",
      version: "1.0.0",
    },
  },
});

await app.register(fastifyApiReference, {
  routePrefix: "/docs",
});

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Erro de validação.", issues: error.format() });
  }

  console.log(error);

  return reply.status(500).send({
    message: "Erro no servidor",
  });
});

app.register(pollRoutes);
app.register(pollOptionsRoutes);
app.register(voteRoutes);
app.register(webSocketRoutes);
