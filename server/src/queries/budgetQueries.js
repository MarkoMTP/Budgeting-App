import { prisma } from "../prismaClient";

export const createBudget = async (userId, categoryId, amount, month, year) => {
  return prisma.budget.create({
    data: {
      userId,
      categoryId,
      amount,
      month,
      year,
    },
  });
};

export const findSpecificBudget = async function (
  userId,
  categoryId,
  month,
  year
) {
  const result = await prisma.budget.findFirst({
    where: { userId, categoryId, month, year },
  });

  return result;
};

export const findBudgetById = async function (id) {
  const result = await prisma.budget.findFirst({
    where: { id },
  });

  return result;
};

export const getAllBudgetsOfCategory = async function (categoryId) {
  const budgets = await prisma.budget.findMany({
    where: { categoryId },
  });

  return budgets;
};

export const deleteBudget = async function (budgetId) {
  await prisma.budget.delete({
    where: { id: budgetId },
  });
};

export const editBudget = async function (id, amount) {
  const result = await prisma.budget.update({
    where: { id },
    data: {
      amount,
    },
  });

  return result;
};
