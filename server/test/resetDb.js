import { prisma } from "../src/prismaClient.js";

export async function resetDb() {
  // Use TRUNCATE for speed + FK safety (Postgres)
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "Transaction",
      "Budget",
      "RecurringRule",
      "Category",
      "User"
    RESTART IDENTITY CASCADE;
  `);
}
