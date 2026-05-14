import * as z from "zod";

export const pollOptionsByPollSchema = z.object({
  pollId: z.coerce.number(),
});

export const pollOptionsParamsSchema = z.object({
  pollId: z.coerce.number(),
  id: z.coerce.number(),
});

export const updatePollOptionSchema = z.object({
  title: z.string().min(1, "A opção deve ter possuir pelo menos 1 caractere."),
});
