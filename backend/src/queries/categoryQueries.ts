import { prisma } from "../prismaClient.js";

export const createCategory = async (name: string, userId: string) => {
  return prisma.category.create({
    data: {
      name,
      userId,
    },
  });
};

export const findCategoryByName = async function (name: string) {
  const result = await prisma.category.findFirst({
    where: { name },
  });

  return result;
};

export const findCategoryById = async function (id: string) {
  const result = await prisma.category.findFirst({
    where: { id },
  });

  return result;
};

export const deleteCategoryWithId = async function (categoryId: string) {
  await prisma.category.delete({
    where: { id: categoryId },
  });
};

export const editCategory = async function (
  categoryId: string,
  newName: string,
) {
  const newCat = await prisma.category.update({
    where: { id: categoryId },
    data: { name: newName },
  });

  return newCat;
};

export const getCategoriesForUser = async function (userId: string) {
  const result = await prisma.category.findMany({
    where: { userId: userId },
  });

  return result;
};
