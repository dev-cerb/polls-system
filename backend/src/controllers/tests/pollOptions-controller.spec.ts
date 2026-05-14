import { afterAll, describe, test, expect } from "vitest";
import { app } from "../../app.js";

describe("Poll Options Controller", () => {
  afterAll(async () => {
    await app.close();
  });

  test("Teste para verificar GET das opções de uma enquete", async () => {
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
      url: `/polls/${body.id}/options`,
    });

    expect(response.statusCode).toBe(200);

    await app.inject({
      method: "DELETE",
      url: `/polls/${body.id}`,
    });

    return;
  });

  test("Teste para verificar PATCH das opções de uma enquete", async () => {
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
      method: "PATCH",
      url: `/polls/${body.id}/options/${options[1].id}`,
      payload: {
        title: "C++",
      },
    });

    const updatedOption = response.json();

    expect(response.statusCode).toBe(200);
    expect(updatedOption.title).toBe("C++");

    await app.inject({
      method: "DELETE",
      url: `/polls/${body.id}`,
    });

    return;
  });

  test("Teste para verificar criar uma nova opção em uma rota POST", async () => {
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
      method: "POST",
      url: `/polls/${body.id}/options`,
      payload: {
        title: "C++",
      },
    });

    expect(response.statusCode).toBe(201);

    await app.inject({
      method: "DELETE",
      url: `/polls/${body.id}`,
    });

    return;
  });

  test("Teste para verificar DELETE das opção de uma enquete", async () => {
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
          { title: "C++" },
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
      method: "DELETE",
      url: `/polls/${body.id}/options/${options[1].id}`,
    });

    const deletedMessage = response.json();

    expect(response.statusCode).toBe(200);
    expect(deletedMessage.message).toBe("Excluída com sucesso.");

    await app.inject({
      method: "DELETE",
      url: `/polls/${body.id}`,
    });

    return;
  });
});
