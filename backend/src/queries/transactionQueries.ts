import { prisma } from "../prismaClient.js";
import { type NewTransaction } from "../types/transactionTypes.js";

export const createTransaction = async (transaction: NewTransaction) => {
  const result = await prisma.transaction.create({
    data: {
      ...transaction,
    },
  });
  return result;
};

export const getAllTransactions = async (userId: string) => {
  const result = await prisma.transaction.findMany({
    where: { userId },
  });

  return result;
};

export const getTranscationByCategoryId = async (
  categoryId: string,
  userId: string,
) => {
  const result = await prisma.transaction.findMany({
    where: { categoryId, userId },
  });
  return result;
};

export const getTranscationById = async (id: string) => {
  const result = await prisma.transaction.findUnique({
    where: { id },
  });
  return result;
};

export const deleteTransactionWithId = async function (id: string) {
  await prisma.transaction.delete({
    where: { id },
  });
};
