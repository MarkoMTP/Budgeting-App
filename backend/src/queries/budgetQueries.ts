import { prisma } from "../prismaClient.js";
import type { NewBudget, NewBudgetNoAmount } from "../types/budgetTypes.js";

export const createBudget = async (budget: NewBudget) => {
  return prisma.budget.create({
    data: {
      ...budget,
    },
  });
};

export const findSpecificBudget = async (budget: NewBudgetNoAmount) => {
  const result = await prisma.budget.findFirst({
    where: { ...budget },
  });

  return result;
};

export const findBudgetById = async function (id: string) {
  const result = await prisma.budget.findFirst({
    where: { id },
  });

  return result;
};

export const getAllBudgetsOfCategory = async function (categoryId: string) {
  const budgets = await prisma.budget.findMany({
    where: { categoryId },
  });

  return budgets;
};

export const deleteBudget = async function (budgetId: string) {
  await prisma.budget.delete({
    where: { id: budgetId },
  });
};

export const editBudget = async function (id: string, amount: number) {
  const result = await prisma.budget.update({
    where: { id },
    data: {
      amount,
    },
  });

  return result;
};
