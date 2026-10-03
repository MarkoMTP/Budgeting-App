import z from "zod";

export type NewBudget = {
  userId: string;
  categoryId: string;
  amount: number;
  month: number;
  year: number;
};

export type NewBudgetNoAmount = Omit<NewBudget, "amount">;

export const NewBudgetBodySchema = z.object({
  amount: z.number().positive(),
  month: z.number().min(1).max(12).int(),
  year: z.number().int(),
});

export type NewBudgetBody = z.infer<typeof NewBudgetBodySchema>;

export type BudgetParams = {
  categoryId: string;
};

export type DeleteBudgetParams = {
  categoryId: string;
  budgetId: string;
};

export const EditBudgetBodySchema = z.object({
  amount: z.number().nonnegative(),
});

export type EditBudgetBody = z.infer<typeof EditBudgetBodySchema>;

export type BudgetType = {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  month: number;
  year: number;
};
