import { afterAll, describe, test, expect } from "vitest";
import { app } from "../../app.js";

describe("Vote Controller", () => {
  afterAll(async () => {
    await app.close();
  });

  test("Testando a rota POST de voto em uma enquete inválida", async () => {
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

    const optionsResponse = await app.inject({
      method: "GET",
      url: `/polls/${body.id}/options`,
    });

    const options = optionsResponse.json();

    const response = await app.inject({
      method: "POST",
      url: `/polls/${body.id}/options/${options[1].id}/vote`,
    });

    const message = response.json();

    expect(response.statusCode).toBe(400);
    expect(message.message).toBe(
      "Não é possível votar nesta opção pois a enquete não está em período vigente.",
    );

    await app.inject({
      method: "DELETE",
      url: `/polls/${body.id}`,
    });

    return;
  });
});
