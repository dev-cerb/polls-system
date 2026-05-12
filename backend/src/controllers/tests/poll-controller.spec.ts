import { describe, test, expect } from "vitest";
import { app } from "../../app.js";

describe("Poll Controller", () => {
  test("Teste para verificar rota GET da enquete", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/polls",
    });

    expect(response.statusCode).toBe(200);
  });

  test("Teste para verificar rota POST da enquete", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/polls",
      payload: {
        title: "Qual sua linguagem favorita?",
        startDate: new Date("2026-05-20T10:00:00Z"),
        endDate: new Date("2026-05-30T10:00:00Z"),
        pollOptions: [
          { title: "JavaScript" },
          { title: "Python" },
          { title: "Go" },
        ],
      },
    });

    const body = response.json();
    expect(response.statusCode).toBe(201);

    await app.inject({
      method: "DELETE",
      url: `/polls/${body.id}`,
    });
  });

  test("Teste para verificar rota GET/:id da enquete", async () => {
    const responseCreatedPoll = await app.inject({
      method: "POST",
      url: "/polls",
      payload: {
        title: "Qual sua linguagem favorita?",
        startDate: new Date("2026-05-20T10:00:00Z"),
        endDate: new Date("2026-05-30T10:00:00Z"),
        pollOptions: [
          { title: "JavaScript" },
          { title: "Python" },
          { title: "Go" },
        ],
      },
    });

    const body = responseCreatedPoll.json();

    const response = await app.inject({
      method: "GET",
      url: `/polls/${body.id}`,
    });

    expect(response.statusCode).toBe(200);

    await app.inject({
      method: "DELETE",
      url: `/polls/${body.id}`,
    });
  });

  test("Teste para verificar rota DELETE da enquete", async () => {
    const responseCreatedPoll = await app.inject({
      method: "POST",
      url: "/polls",
      payload: {
        title: "Qual sua linguagem favorita?",
        startDate: new Date("2026-05-20T10:00:00Z"),
        endDate: new Date("2026-05-30T10:00:00Z"),
        pollOptions: [
          { title: "JavaScript" },
          { title: "Python" },
          { title: "Go" },
        ],
      },
    });

    const body = responseCreatedPoll.json();

    const response = await app.inject({
      method: "DELETE",
      url: `/polls/${body.id}`,
    });

    expect(response.statusCode).toBe(200);
  });

  test("Teste para verificar a rota PATCH da enquete", async () => {
    const responseCreatedPoll = await app.inject({
      method: "POST",
      url: "/polls",
      payload: {
        title: "Qual sua linguagem favorita?",
        startDate: new Date("2026-05-20T10:00:00Z"),
        endDate: new Date("2026-05-30T10:00:00Z"),
        pollOptions: [
          { title: "JavaScript" },
          { title: "Python" },
          { title: "Go" },
        ],
      },
    });

    const body = responseCreatedPoll.json();

    const response = await app.inject({
      method: "PATCH",
      url: `/polls/${body.id}`,
      payload: {
        title: "Qual sua comida favorita?",
        pollOptions: [
          { title: "Lasanha" },
          { title: "Macarrão" },
          { title: "Churrasco" },
        ],
      },
    });

    expect(response.statusCode).toBe(200);

    await app.inject({
      method: "DELETE",
      url: `/polls/${body.id}`,
    });
  });
});
