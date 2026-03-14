import { prisma } from "../prismaClient";

export const createTransaction = async (name, amount, categoryId, userId) => {
  const result = await prisma.transaction.create({
    data: {
      name,
      amount,
      categoryId,
      userId,
    },
  });
  return result;
};
