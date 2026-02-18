import { prisma } from "../prismaClient";

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

export const deleteCategoryWithId = async function (categoryId) {
  await prisma.category.delete({
    where: { id: categoryId },
  });
};
