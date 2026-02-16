import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserEmail = async function (email) {
  const result = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, passwordHash: true },
  });
  return result;
};

export const addUserToDb = async function (fullName, email, password) {
  await prisma.user.create({
    data: {
      name: fullName,
      email,
      passwordHash: password,
    },
  });
};
