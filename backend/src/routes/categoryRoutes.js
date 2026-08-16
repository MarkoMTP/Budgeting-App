import express from "express";
import { createNewCategory } from "../controllers/category/createCategoryController.js";
import { initPassport } from "../auth/passport.js";
import passport from "passport";
import { deleteCategory } from "../controllers/category/deleteCategoryController.js";
import { editCategoryController } from "../controllers/category/editCategoryController.js";
import { getCategoriesForUserController } from "../controllers/category/getCategoriesForUser.js";

export const categoryRoute = express.Router();

categoryRoute.post(
  "/category",
  passport.authenticate("jwt", { session: false }),
  createNewCategory,
);

categoryRoute.delete(
  "/category/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCategory,
);

categoryRoute.patch(
  "/category/:id",
  passport.authenticate("jwt", { session: false }),
  editCategoryController,
);

categoryRoute.get(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  getCategoriesForUserController,
);
