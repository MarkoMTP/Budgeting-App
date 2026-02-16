import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { resetDb } from "./resetDb.js";
import { prisma } from "../src/prismaClient.js";

import { app } from "../src/index";
import dotenv from "dotenv";

dotenv.config();

const testToken = "1";

beforeEach(async () => {
  await resetDb();

  const passwordHash = "12";

  await prisma.user.create({
    data: {
      id: "1",
      email: "existingRegister@test.com",
      passwordHash,
      name: "Existing User",
    },
  });
});

describe("Category crud functions tests", () => {
  it("Creates a new category successfully", async () => {
    const res = await request(app)
      .post("/category/create")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Inbox Test" });

    expect(res.status).toBe(200);
    expect(res.text).toBe("Inbox Test");
  });
});
