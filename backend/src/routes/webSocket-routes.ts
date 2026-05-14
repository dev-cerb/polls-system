import { FastifyInstance } from "fastify";

export async function webSocketRoutes(app: FastifyInstance) {
  app.get(
    "/polls/:pollId/results",
    { websocket: true },
    (connection, request) => {
      console.log("Cliente conectado");
      setTimeout(() => {
        connection.send(
          JSON.stringify({
            message: "Sim, você está conectado",
          }),
        );
      }, 1000);
    },
  );
}
