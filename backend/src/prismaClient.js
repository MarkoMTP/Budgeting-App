import { PrismaClient } from "@prisma/client";

// Decide the connection string BEFORE PrismaClient() is created.
const isTest = process.env.NODE_ENV === "test";

// Choose base URL depending on environment.
const baseEnvUrl = isTest
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;

if (!baseEnvUrl) {
  throw new Error(
    `Missing database url. NODE_ENV=${
      process.env.NODE_ENV
    } DATABASE_URL=${!!process.env.DATABASE_URL} TEST_DATABASE_URL=${!!process
      .env.TEST_DATABASE_URL}`
  );
}

// For parallel Vitest workers, use a per-worker schema.
if (isTest) {
  const workerId = process.env.VITEST_POOL_ID || "1";
  const baseUrl = baseEnvUrl.split("?")[0]; // strip any existing query params
  process.env.DATABASE_URL = `${baseUrl}?schema=test_${workerId}`;
} else {
  process.env.DATABASE_URL = baseEnvUrl;
}

// Prevent multiple Prisma instances in dev/test (module reloads, watch mode)
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: isTest ? [] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
