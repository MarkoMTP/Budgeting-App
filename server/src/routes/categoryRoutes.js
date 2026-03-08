import express from "express";
import { createNewCategory } from "../controllers/category/createCategoryController";
import { initPassport } from "../auth/passport";
import passport from "passport";
import { deleteCategory } from "../controllers/category/deleteCategoryController";
import { editCategoryController } from "../controllers/category/editCategoryController";

export const categoryRoute = express.Router();

categoryRoute.post(
  "/category/create",
  passport.authenticate("jwt", { session: false }),
  createNewCategory
);

categoryRoute.delete(
  "/category/:id/delete",
  passport.authenticate("jwt", { session: false }),
  deleteCategory
);

categoryRoute.patch(
  "/category/:id/edit",
  passport.authenticate("jwt", { session: false }),
  editCategoryController
);
