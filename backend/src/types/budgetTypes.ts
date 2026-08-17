export type NewBudget = {
  userId: string;
  categoryId: string;
  amount: number;
  month: number;
  year: number;
};

export type NewBudgetNoAmount = Omit<NewBudget, "amount">;
