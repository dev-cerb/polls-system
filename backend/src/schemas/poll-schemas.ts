import * as z from "zod";

export const pollBaseSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  pollOptions: z
    .array(
      z.object({ title: z.string().min(1, "A opção não pode ser vazia.") }),
    )
    .min(3, "A enquete deve ter pelo menos 3 opções."),
});

export const createPollSchema = pollBaseSchema
  .refine((data) => data.startDate > new Date(), {
    message: "A data de início não pode estar no passado.",
    path: ["startDate"],
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "A data de término deve ser maior que a data de início.",
    path: ["endDate"],
  });

export const pollIdSchema = z.object({
  id: z.coerce.number(),
});

export const pollStatusSchema = z.object({
  status: z.enum([
    "Não iniciada.",
    "Iniciada.",
    "Em andamento.",
    "Finalizada.",
  ]),
});

export const updatePollSchema = pollBaseSchema
  .omit({
    pollOptions: true,
  })
  .partial();
