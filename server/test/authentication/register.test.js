import { beforeEach, test, expect, describe, it } from "vitest";
import request from "supertest";
import { app } from "../../src/index.js";

describe("Registration tests", () => {
  it("Register success", async () => {
    const res = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send({
        email: "test@test.com",
        password: "password123",
        name: "Test User2",
      });

    expect(res.status).toBe(200);
    expect(res.text).toBe("Registration success");
  });

  it("Registration fails, user already exists", async () => {
    const res = await request(app).post("/register").send({
      email: "existingRegister@test.com",
      password: "password123",
      name: "Existing User",
    });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Email already in use");
  });

  test("Registration fails: missing email", async () => {
    const res = await request(app).post("/register").send({
      password: "password123",
      name: "Test User",
    });

    expect(res.status).toBe(400);
  });

  test("Registration fails: invalid email", async () => {
    const res = await request(app).post("/register").send({
      email: "not-an-email",
      password: "password123",
      name: "Test User",
    });

    expect(res.status).toBe(400);
  });

  test("Registration fails: password too short", async () => {
    const res = await request(app).post("/register").send({
      email: "short@test.com",
      password: "pass12",
      name: "Test User",
    });

    expect(res.status).toBe(400);
  });

  test("Registration fails: password must contain a number", async () => {
    const res = await request(app).post("/register").send({
      email: "nonumber@test.com",
      password: "passwordpassword",
      name: "Test User",
    });

    expect(res.status).toBe(400);
  });
});
