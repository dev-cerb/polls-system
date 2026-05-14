import { describe, test, expect } from "vitest";
import { createPollService, deletePollService } from "../poll-service.js";
import { getAllOptionsByPollService } from "../pollOptions-service.js";
import { createVoteService } from "../vote-service.js";

describe("Vote Service", () => {
  test("Criando um voto em uma enquete fora do período", async () => {
    const poll = await createPollService({
      title: "Qual framework você quer aprender?",
      startDate: new Date("2030-01-01T10:00:00Z"),
      endDate: new Date("2030-01-10T10:00:00Z"),
      pollOptions: [{ title: "React" }, { title: "Vue" }, { title: "Angular" }],
    });

    const options = await getAllOptionsByPollService({ pollId: poll.id });
    const vote = await createVoteService({
      pollId: poll.id,
      id: options[1].id,
    });

    if ("error" in vote) {
      expect(vote.message).toBe(
        "Não é possível votar nesta opção pois a enquete não está em período vigente.",
      );
      await deletePollService({ id: poll.id });
      return;
    }
  });

  test("Criando um voto em uma enquete válida", async () => {
    const poll = await createPollService({
      title: "Qual banco de dados você prefere?",
      startDate: new Date("2025-01-01T10:00:00Z"),
      endDate: new Date("2030-01-10T10:00:00Z"),
      pollOptions: [
        { title: "PostgreSQL" },
        { title: "MongoDB" },
        { title: "MySQL" },
      ],
    });

    const options = await getAllOptionsByPollService({ pollId: poll.id });
    const vote = await createVoteService({
      pollId: poll.id,
      id: options[1].id,
    });

    if ("id" in vote) {
      expect(vote.id).toBeTypeOf("number");
      await deletePollService({ id: poll.id });
      return;
    }
  });

  test("Votando numa opção que não existe", async () => {
    const poll = await createPollService({
      title: "Qual banco de dados você prefere?",
      startDate: new Date("2020-01-01T10:00:00Z"),
      endDate: new Date("2027-01-10T10:00:00Z"),
      pollOptions: [
        { title: "PostgreSQL" },
        { title: "MongoDB" },
        { title: "MySQL" },
      ],
    });

    const vote = await createVoteService({
      pollId: poll.id,
      id: -1,
    });

    if ("error" in vote) {
      expect(vote.message).toBe("Você não pode fazer essa transação.");
      await deletePollService({ id: poll.id });
      return;
    }
  });
});
