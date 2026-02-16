import dotenv from "dotenv";
import { vi } from "vitest";

// Load .env.test
dotenv.config({ path: ".env.test" });

// IMPORTANT: Prisma reads DATABASE_URL, not TEST_DATABASE_URL
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;

vi.mock("passport", () => {
  const passportMock = {
    initialize: () => (req, res, next) => next(),

    authenticate: () => (req, res, next) => {
      req.user = { id: "1", name: "test@example.com" };
      next();
    },
  };

  return {
    default: passportMock,
    ...passportMock,
  };
});
