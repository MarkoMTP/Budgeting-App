import { describe, it, expect } from "vitest";
import request from "supertest";
import dotenv from "dotenv";

import { app } from "../src/index";

dotenv.config();

const testToken = "1";

describe("Budget create API", () => {
  // creating budget
  it("Successfully sets a budget", async () => {
    const res = await request(app)
      .post("/categories/2Category/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ amount: 100, year: 2024, month: 6 });

    expect(res.status).toBe(200);
    expect(res.text).toBe("Budget set correctly");
  });

  it("Returns 400 when amount is missing", async () => {
    const res = await request(app)
      .post("/categories/2Category/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ year: 2024, month: 8 });

    expect(res.status).toBe(400);

    expect(res.text).toBe("Amount is required");
  });

  it("Returns 400 when year is missing", async () => {
    const res = await request(app)
      .post("/categories/2Category/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ amount: 100, month: 9 });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Year is required");
  });

  it("Returns 400 when month is missing", async () => {
    const res = await request(app)
      .post("/categories/2Category/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ amount: 100, year: 2024 });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Month is required");
  });

  it("Returns 400 when request body is empty", async () => {
    const res = await request(app)
      .post("/categories/2Category/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({});

    expect(res.status).toBe(400);
  });

  it("Returns 400 when amount is negative", async () => {
    const res = await request(app)
      .post("/categories/2Category/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ amount: -100, year: 2024, month: 10 });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Amount cannot be negative");
  });

  it("Returns 400 when month is invalid", async () => {
    const res = await request(app)
      .post("/categories/2Category/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ amount: 100, year: 2024, month: 13 });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Month is invalid");
  });

  // get budgets CRUD functions

  it("Successfully gets a budgets of a category", async () => {
    const res = await request(app)
      .get("/categories/lifestyle/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it("Fails invalid or missing categoryId", async () => {
    const res = await request(app)
      .get("/categories/l/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.text).toBe("Category does not exist");
  });

  it("Fails, category has no budgets set", async () => {
    const res = await request(app)
      .get("/categories/2Category/budgets")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.text).toBe("Category has no budgets");
  });
});
