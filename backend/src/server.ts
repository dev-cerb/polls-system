import Fastify from "fastify";

const app = Fastify();

app.get("/", async (request, reply) => {
  return { ok: true };
});

app
  .listen({ port: 3333 })
  .then(() => {
    console.log("HTTP server running!");
  })
  .catch((e) => {
    console.log(e);
  });
