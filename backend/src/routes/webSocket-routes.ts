import { FastifyInstance } from "fastify";

import { clients } from "../lib/webSocket-clients.js";

export async function webSocketRoutes(app: FastifyInstance) {
  app.get(
    "/polls/:pollId/results",
    { websocket: true },
    (connection, request) => {
      const { pollId } = request.params as {
        pollId: string;
      };

      const numberPollId = Number(pollId);

      if (!clients.has(numberPollId)) {
        clients.set(numberPollId, new Set());
      }

      let pollConnections = clients.get(numberPollId);

      if (!pollConnections) {
        pollConnections = new Set();

        clients.set(numberPollId, pollConnections);
      }

      pollConnections.add(connection);

      connection.send(
        JSON.stringify({
          message: "Conectado ao WebSocket",
        }),
      );

      connection.on("close", () => {
        clients.get(numberPollId)?.delete(connection);

        if (clients.get(numberPollId)?.size === 0) {
          clients.delete(numberPollId);
        }
      });
    },
  );
}
