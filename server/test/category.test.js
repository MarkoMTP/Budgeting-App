import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

import { app } from "../src/index";
import dotenv from "dotenv";

dotenv.config();

const testToken = "1";

describe("Category crud functions tests", () => {
  // create category tests
  it("Creates a new category successfully", async () => {
    const res = await request(app)
      .post("/category/create")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Inbox Test" });

    expect(res.status).toBe(200);
    expect(res.text).toBe("Inbox Test");
  });

  it("Category already exists - can't create it again", async () => {
    const res = await request(app)
      .post("/category/create")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Category2" });

    expect(res.status).toBe(401);
    expect(res.text).toBe("Category already exists");
  });

  // delete category tests
  it("Deletes a new category successfully", async () => {
    const res = await request(app)
      .delete("/category/deleteCategory/delete")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Category2 has been successfully deleted");
  });

  it("Category does not exist - can't delete it", async () => {
    const res = await request(app)
      .delete("/category/deleteCategory2/delete")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.text).toBe("Category does not exist");
  });

  //edit category test

  it("Edits category successfully", async () => {
    const res = await request(app)
      .patch("/category/editCategory/edit")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "newUpdatedCategory" });

    expect(res.text).toBe(
      "Categories name has been updated to newUpdatedCategory"
    );
  });

  it("Category does not exist - can't edit it", async () => {
    const res = await request(app)
      .delete("/category/deleteCategory2/delete")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.text).toBe("Category does not exist");
  });
});
