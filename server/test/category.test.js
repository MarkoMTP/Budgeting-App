import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

import { app } from "../src/index";
import dotenv from "dotenv";

dotenv.config();

const testToken = "1";

describe("Category crud functions tests", () => {
  // get categories for user

  it("Gets all categories of the logged in user successfully", async () => {
    const res = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Categories returned correctly");
  });

  it("Fails user has no categories ", async () => {
    await prisma.category.deleteMany();

    const res = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.text).toBe("No categories exist");
  });

  // create category tests
  it("Creates a new category successfully", async () => {
    const res = await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Inbox Test" });

    expect(res.status).toBe(200);
    expect(res.text).toBe("Inbox Test");
  });

  it("Creates a category missing a name", async () => {
    const res = await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({});

    expect(res.status).toBe(400);
    expect(res.text).toBe(`{"error":" name is required"}`);
  });

  it("Category already exists - can't create it again", async () => {
    const res = await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Category2" });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Category already exists");
  });

  // delete category tests
  it("Deletes a new category successfully", async () => {
    const res = await request(app)
      .delete("/category/deleteCategory")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Category2 has been successfully deleted");
  });

  it("Category does not exist - can't delete it", async () => {
    const res = await request(app)
      .delete("/category/deleteCategory2")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.text).toBe("Category does not exist");
  });

  //edit category test

  it("Edits category successfully", async () => {
    const res = await request(app)
      .patch("/category/editCategory")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "newUpdatedCategory" });

    expect(res.text).toBe(
      "Categories name has been updated to newUpdatedCategory"
    );
  });

  it("Fails to edit category, missing the name", async () => {
    const res = await request(app)
      .patch("/category/editCategory")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.text).toBe(`Missing the new name for the category`);
  });

  it("Category does not exist - can't edit it", async () => {
    const res = await request(app)
      .patch("/category/deleteCategory2")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.text).toBe("Category does not exist, you cannot edit it");
  });

  it("Edits category successfully", async () => {
    const res = await request(app)
      .patch("/category/2Category")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({ name: "Food" });

    expect(res.status).toBe(400);
    expect(res.text).toBe(
      "Fails editing category when new name is already in use"
    );
  });
});
