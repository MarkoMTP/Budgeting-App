import { prisma } from "../src/prismaClient.js";

export async function resetDb() {
  await prisma.transaction.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.recurringRule.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
}
