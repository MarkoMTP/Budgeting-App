import dotenv from "dotenv";

// Load .env.test
dotenv.config({ path: ".env.test" });

// IMPORTANT: Prisma reads DATABASE_URL, not TEST_DATABASE_URL
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
