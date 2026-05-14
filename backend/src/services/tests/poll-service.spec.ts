import { describe, test, expect } from "vitest";
import {
  createPollService,
  deletePollService,
  getAllPollsService,
  getPollService,
  updatePollService,
} from "../poll-service.js";

describe("Poll Service", () => {
  test("Teste para criar enquete", async () => {
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
    expect(poll.id).toBeTypeOf("number");

    await deletePollService({ id: poll.id });

    return;
  });

  test("Teste para verificar enquetes existentes", async () => {
    const pollCreated = await createPollService({
      title: "Qual sua comida favorita?",
      startDate: new Date("2026-05-20T10:00:00Z"),
      endDate: new Date("2026-05-30T10:00:00Z"),
      pollOptions: [
        { title: "Strogonoff" },
        { title: "Lasanha" },
        { title: "Churrasco" },
      ],
    });

    const polls = await getAllPollsService();

    expect(Array.isArray(polls)).toBe(true);

    await deletePollService({ id: pollCreated.id });

    return;
  });

  test("Teste para verificar enquete especifica", async () => {
    const pollCreated = await createPollService({
      title: "Qual sua comida favorita?",
      startDate: new Date("2026-05-20T10:00:00Z"),
      endDate: new Date("2026-05-30T10:00:00Z"),
      pollOptions: [
        { title: "Strogonoff" },
        { title: "Lasanha" },
        { title: "Churrasco" },
      ],
    });

    const poll = await getPollService({
      id: pollCreated.id,
    });

    if ("error" in poll) {
      expect(poll.error).toBe(true);
      return;
    }

    expect(poll).toBeDefined();

    await deletePollService({ id: poll.id });

    return;
  });

  test("Teste para alterar parcialmente uma enquete", async () => {
    const pollCreated = await createPollService({
      title: "Qual sua comida favorita?",
      startDate: new Date("2026-05-20T10:00:00Z"),
      endDate: new Date("2026-05-30T10:00:00Z"),
      pollOptions: [
        { title: "Strogonoff" },
        { title: "Lasanha" },
        { title: "Churrasco" },
      ],
    });

    const poll = await updatePollService(
      {
        id: pollCreated.id,
      },
      {
        title: "Qual teste específico?",
      },
    );

    expect(poll.title).toBe("Qual teste específico?");

    await deletePollService({ id: poll.id });

    return;
  });

  test("Teste para deletar uma enquete", async () => {
    const pollCreated = await createPollService({
      title: "Qual sua comida favorita?",
      startDate: new Date("2026-05-20T10:00:00Z"),
      endDate: new Date("2026-05-30T10:00:00Z"),
      pollOptions: [
        { title: "Strogonoff" },
        { title: "Lasanha" },
        { title: "Churrasco" },
      ],
    });

    await deletePollService({ id: pollCreated.id });

    const poll = await getPollService({
      id: pollCreated.id,
    });

    if ("error" in poll) {
      expect(poll.error).toBe(true);
      return;
    }

    expect(poll).toBeNull();

    return;
  });
});
