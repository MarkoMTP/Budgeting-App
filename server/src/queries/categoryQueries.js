import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (name, userId) => {
  return prisma.category.create({
    data: {
      name,
      userId,
    },
  });
};

export const findCategoryByName = async function (name) {
  const result = await prisma.category.findFirst({
    where: { name },
  });

  return result;
};
