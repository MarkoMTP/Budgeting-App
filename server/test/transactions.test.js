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
});
