import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

import { app } from "../src/index";
import dotenv from "dotenv";

dotenv.config();

const testToken = "1";

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

  it("Deletes a new category successfully", async () => {
    const res = await request(app)
      .post("/category/id/delete")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Category with id was deleted successfully");
  });
});
