import express from "express";
import { createNewCategory } from "../controllers/category/createCategoryController";
import { initPassport } from "../auth/passport";
import passport from "passport";

export const categoryRoute = express.Router();

categoryRoute.post(
  "/category/create",
  passport.authenticate("jwt", { session: false }),
  createNewCategory
);

// categoryRoute.delete("/category/:id/delete");

// categoryRoute.patch("/category/:id/edit");
