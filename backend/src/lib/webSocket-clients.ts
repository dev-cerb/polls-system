import { WebSocket } from "@fastify/websocket";

export const clients = new Map<number, Set<WebSocket>>();
