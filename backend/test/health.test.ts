import request from "supertest";
import { app } from "../src/index.js";
import { describe, expect, it } from "vitest";

describe("GET /health returns ok", () => {
  it("health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
