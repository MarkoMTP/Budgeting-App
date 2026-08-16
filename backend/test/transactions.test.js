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
    const res = await request(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe("uniqueName");
    expect(res.body[1].name).toBe("uniqueName2");
  });

  it("Gets transactions by category successfully", async () => {
    const res = await request(app)
      .get("/transactions/category/2Category")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe("uniqueName3");
  });

  it("Gets a single transaction by id successfully", async () => {
    const res = await request(app)
      .get(`/transactions/transactionId1`)
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("uniqueName");
  });

  it("Fails to get a transaction if it does not exist", async () => {
    const res = await request(app)
      .get("/transactions/nonexistent-id")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("Transaction does not exist");
  });

  it("Fails to get a transactions if category does not have them", async () => {
    const res = await request(app)
      .get("/transactions/category/editCategory")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("No transactions found in category");
  });

  it("Fails to get a transactions if user does not have them", async () => {
    await prisma.transaction.deleteMany();

    const res = await request(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("User has no transactions ");
  });

  // DELETE transaction test

  it("Successfully deletes a transaction", async () => {
    const res = await request(app)
      .delete("/transactions/transactionDelete")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.text).toBe("Successfully deleted transaction");
  });

  it.only("Fails to delete a non-existent transaction", async () => {
    const res = await request(app)
      .delete("/transactions/non-existent")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("Transaction does not exist");
  });
});
