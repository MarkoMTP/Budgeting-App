import { prisma } from "../prismaClient.js";
import type { NewUser } from "../types/userTypes.js";

export const findUserEmail = async function (email: string) {
  const result = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, passwordHash: true },
  });
  return result;
};

export const addUserToDb = async function (user: NewUser) {
  const result = await prisma.user.create({
    data: {
      ...user,
    },
  });
  return result;
};
