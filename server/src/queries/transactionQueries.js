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

export const getAllTransactions = async (userId) => {
  const result = await prisma.transaction.findMany({
    where: { userId },
  });

  return result;
};

export const getTranscationByCategoryId = async (categoryId, userId) => {
  const result = await prisma.transaction.findMany({
    where: { categoryId, userId },
  });
  return result;
};
