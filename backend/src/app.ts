import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyApiReference from "@scalar/fastify-api-reference";

import { ZodError } from "zod";

import { pollRoutes } from "./routes/poll-routes.js";

export const app = Fastify();

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
