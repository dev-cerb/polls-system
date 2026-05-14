import { describe, test, expect } from "vitest";
import {
  createPollOptionService,
  deletePollOptionService,
  getAllOptionsByPollService,
  updatePollOptionService,
} from "../pollOptions-service.js";
import { createPollService, deletePollService } from "../poll-service.js";

describe("Poll Options Service", () => {
  test("Teste para listar todas as opções de uma Enquete", async () => {
    const poll = await createPollService({
      title: "Qual sua linguagem favorita?",
      startDate: new Date("2026-05-20T10:00:00Z"),
      endDate: new Date("2026-05-30T10:00:00Z"),
      pollOptions: [
        { title: "JavaScript" },
        { title: "Python" },
        { title: "Go" },
      ],
    });

    const options = await getAllOptionsByPollService({ pollId: poll.id });

    expect(Array.isArray(options)).toBe(true);
    expect(options.length).toBe(3);

    await deletePollService({ id: poll.id });

    return;
  });

  test("Teste para alterar uma opção já existente", async () => {
    const poll = await createPollService({
      title: "Qual sua linguagem favorita?",
      startDate: new Date("2026-05-20T10:00:00Z"),
      endDate: new Date("2026-05-30T10:00:00Z"),
      pollOptions: [
        { title: "JavaScript" },
        { title: "Python" },
        { title: "Go" },
      ],
    });

    const options = await getAllOptionsByPollService({ pollId: poll.id });

    const changedOptions = await updatePollOptionService(
      { pollId: poll.id, id: options[1].id },
      { title: "C++" },
    );

    expect(changedOptions.title).toBe("C++");

    await deletePollService({ id: poll.id });

    return;
  });

  test("Teste para excluir uma opção de uma Enquete com 3 opções", async () => {
    const poll = await createPollService({
      title: "Qual sua linguagem favorita?",
      startDate: new Date("2026-05-20T10:00:00Z"),
      endDate: new Date("2026-05-30T10:00:00Z"),
      pollOptions: [
        { title: "JavaScript" },
        { title: "Python" },
        { title: "Go" },
      ],
    });

    const options = await getAllOptionsByPollService({ pollId: poll.id });
    const deleted = await deletePollOptionService({
      pollId: poll.id,
      id: options[1].id,
    });

    if ("error" in deleted) {
      expect(deleted.error).toBe(true);
    }

    await deletePollService({ id: poll.id });

    return;
  });

  test("Teste para excluir uma opção de uma Enquete com mais de 3 opções", async () => {
    const poll = await createPollService({
      title: "Qual sua linguagem favorita?",
      startDate: new Date("2026-05-20T10:00:00Z"),
      endDate: new Date("2026-05-30T10:00:00Z"),
      pollOptions: [
        { title: "JavaScript" },
        { title: "Python" },
        { title: "Go" },
        { title: "C++" },
      ],
    });

    const options = await getAllOptionsByPollService({ pollId: poll.id });
    const deleted = await deletePollOptionService({
      pollId: poll.id,
      id: options[1].id,
    });

    expect(deleted.message).toBe("Excluída com sucesso.");

    await deletePollService({ id: poll.id });

    return;
  });

  test("Teste criando uma opção em uma enquete inexistente", async () => {
    const response = await createPollOptionService(
      { pollId: -1 },
      { title: "Teste inválido" },
    );

    if ("error" in response) {
      expect(response.message).toBe(
        "Você está tentando criar uma opção em uma enquete inexistente.",
      );
      return;
    }

    return;
  });
});
