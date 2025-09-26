import z from "zod";

export const WordleSchema = z.object({
  letter: z
    .array(z.string().length(1, { error: "Só palavras com 5 letras" }))
    .length(5, { error: "Só palavras com 5 letras" }),
  word: z.string(),
});

export type WordleInfer = z.infer<typeof WordleSchema>;
