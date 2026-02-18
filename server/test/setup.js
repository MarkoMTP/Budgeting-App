import dotenv from "dotenv";
import { beforeAll, beforeEach, afterAll, vi } from "vitest";
import bcrypt from "bcrypt";
import { execSync } from "child_process";

// 1) Set test env FIRST (before importing Prisma from src/prismaClient.js)
process.env.NODE_ENV = "test";
dotenv.config({ path: ".env.test" });

let prisma;
let resetDb;

beforeAll(async () => {
  // 2) Import Prisma AFTER env is loaded so it points to the TEST DB
  ({ prisma } = await import("../src/prismaClient.js"));
  ({ resetDb } = await import("./resetDb.js"));

  // 3) Ensure each Vitest worker has its own schema
  const workerId = process.env.VITEST_POOL_ID || "1";
  const schemaName = `test_${workerId}`;

  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

  // 4) Apply migrations to THIS worker's schema.
  // Prisma CLI will read DATABASE_URL from env; prismaClient.js sets it to ...?schema=test_<workerId>
  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
    env: { ...process.env },
  });
});

beforeEach(async () => {
  await resetDb();

  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      {
        id: "1Login",
        email: "existingLogin@test.com",
        passwordHash,
        name: "Existing User2",
      },
      {
        id: "1register",
        email: "existingRegister@test.com",
        passwordHash,
        name: "Existing User",
      },
      {
        id: "1Category",
        email: "existingCategory@test.com",
        passwordHash,
        name: "Existing User",
      },
    ],
  });

  await prisma.category.create({
    data: {
      id: "2Category",
      name: "Food",
      userId: "1Category",
    },
  });
});

afterAll(async () => {
  if (prisma) await prisma.$disconnect();
});

vi.mock("passport", () => {
  const passportMock = {
    initialize: () => (req, res, next) => next(),
    authenticate: () => (req, res, next) => {
      req.user = { id: "1Category", email: "existingCategory@test.com" };
      next();
    },
  };

  return { default: passportMock, ...passportMock };
});
