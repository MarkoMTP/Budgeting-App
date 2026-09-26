import z from "zod";

export type NewTransaction = {
  name: string;
  amount: number;
  categoryId: string;
  userId: string;
};

export const CreateTranscationBodySchema = z.object({
  name: z.string(),
  amount: z.number().nonnegative(),
  categoryId: z.string(),
});

export type CreateTransactionBody = z.infer<typeof CreateTranscationBodySchema>;
