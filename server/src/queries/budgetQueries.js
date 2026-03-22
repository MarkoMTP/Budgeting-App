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

export const findBudgetByAll = async function (
  userId,
  categoryId,
  month,
  year
) {
  const result = await prisma.category.findFirst({
    where: { userId, categoryId, month, year },
  });

  return result;
};
