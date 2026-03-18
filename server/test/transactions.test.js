import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

import { app } from "../src/index";
import dotenv from "dotenv";

dotenv.config();
const testToken = "1";

describe("Transactions crud function tests", () => {
  //create transaction test

  it("Creates transaction successfully", async () => {
    const res = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Cigaretes", amount: 10, categoryId: "lifestyle" });

    expect(res.status).toBe(200);

    expect(res.text).toBe("Successfully created a transaction");
  });

  it("Fails if name is missing", async () => {
    const res = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ amount: 10, categoryId: "lifestyle" });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Failed to create transaction, name missing");
  });

  it("Fails if amount is missing", async () => {
    const res = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Cigaretes", categoryId: "lifestyle" });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Failed to create transaction, amount missing");
  });

  it("Fails if categoryId is missing", async () => {
    const res = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Cigaretes", amount: 10 });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Failed to create transaction, categoryId missing");
  });
  it("Fails if category does not exist", async () => {
    const res = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Cigaretes", amount: 10, categoryId: "lifestyle23" });

    expect(res.status).toBe(400);
    expect(res.text).toBe(
      "Failed to create transaction, category does not exist"
    );
  });

  // GET transactions tests

  it("Gets all transactions successfully", async () => {
    const uniqueName = `Get All Transaction ${Date.now()}`;

    await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: uniqueName, amount: 10, categoryId: "lifestyle" });

    const res = await request(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((t) => t.name === uniqueName)).toBe(true);
  });

  it.only("Gets transactions by category successfully", async () => {
    const uniqueName = `Category Transaction ${Date.now()}`;

    await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: uniqueName, amount: 10, categoryId: "lifestyle" });

    const res = await request(app)
      .get("/transactions/category/lifestyle")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((t) => t.name === uniqueName)).toBe(true);
  });

  it("Gets a single transaction by id successfully", async () => {
    const uniqueName = `Single Transaction ${Date.now()}`;

    await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: uniqueName, amount: 10, categoryId: "lifestyle" });

    const allTransactions = await request(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${testToken}`);

    const created = allTransactions.body.find((t) => t.name === uniqueName);

    const res = await request(app)
      .get(`/transactions/${created.id}`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(uniqueName);
  });

  it("Fails to get a transaction if it does not exist", async () => {
    const res = await request(app)
      .get("/transactions/nonexistent-id")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("Transaction does not exist");
  });
});
