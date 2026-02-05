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
      email: "existing@test.com",
      passwordHash,
      name: "Existing User",
    },
  });
});

describe("Registration tests", () => {
  it("Register success", async () => {
    const res = await request(app).post("/register").send({
      email: "test@test.com",
      password: "password123",
      fullName: "Test User",
    });

    expect(res.status).toBe(200);
    expect(res.text).toBe("Registration success");
  });

  it("Registration fails, use already exists", async () => {
    const res = await request(app).post("/register").send({
      email: "existing@test.com",
      password: "password123",
      name: "Existing User",
    });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Email already in use");
  });

  test("Registration fails: missing email", async () => {
    const res = await request(app).post("/register").send({
      password: "password123",
      fullName: "Test User",
    });

    expect(res.status).toBe(400);
  });

  test("Registration fails: invalid email", async () => {
    const res = await request(app).post("/register").send({
      email: "not-an-email",
      password: "password123",
      fullName: "Test User",
    });

    expect(res.status).toBe(400);
  });

  test("Registration fails: password too short", async () => {
    const res = await request(app).post("/register").send({
      email: "short@test.com",
      password: "pass12",
      fullName: "Test User",
    });

    expect(res.status).toBe(400);
  });

  test("Registration fails: password must contain a number", async () => {
    const res = await request(app).post("/register").send({
      email: "nonumber@test.com",
      password: "passwordpassword",
      fullName: "Test User",
    });

    expect(res.status).toBe(400);
  });
});
