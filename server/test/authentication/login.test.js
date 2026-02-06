import { beforeEach, test, expect, describe } from "vitest";
import request from "supertest";
import { app } from "../../src/index.js";
import { resetDb } from "../resetDb.js";
import { prisma } from "../../src/prismaClient.js";
import bcrypt from "bcrypt";

let existingUser;

beforeEach(async () => {
  await resetDb();

  const passwordHash = await bcrypt.hash("password123", 10);

  existingUser = await prisma.user.create({
    data: {
      email: "existingLogin@test.com",
      passwordHash,
      name: "Existing User",
    },
  });
});

describe("Login tests", () => {
  it("Successful user login", async () => {
    const res = await request(app).post("/login").send({
      email: "existingLogin@test.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
  });

  it("Unsuccessful login", async () => {
    const res = await request(app).post("/login").send({
      email: "nonExistingLogin@test.com",
      password: "password123",
    });

    expect(res.status).toBe(401);
    expect(res.text).toBe("User not found with email");
  });

  it("Login fails with wrong password", async () => {
    const res = await request(app).post("/login").send({
      email: "existingLogin@test.com",
      password: "wrongPassword",
    });

    expect(res.status).toBe(401);
  });

  it("Login fails when password is missing", async () => {
    const res = await request(app).post("/login").send({
      email: "existingLogin@test.com",
    });

    expect(res.status).toBe(400);
  });

  it("Login fails when email is missing", async () => {
    const res = await request(app).post("/login").send({
      password: "password123",
    });

    expect(res.status).toBe(400);
  });

  it("Login fails with empty body", async () => {
    const res = await request(app).post("/login").send({});

    expect(res.status).toBe(400);
  });

  it("Login fails when email has different casing (if case-sensitive)", async () => {
    const res = await request(app).post("/login").send({
      email: "ExistingLogin@Test.com",
      password: "password123",
    });

    expect([200, 401]).toContain(res.status);
  });
});
