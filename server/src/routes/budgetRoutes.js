import express from "express";
import passport from "passport";
import { createBudgetController } from "../controllers/budget/createBudgetController";
import { getAllBudgetsController } from "../controllers/budget/getAllBudgetsController";
import { deleteBudgetController } from "../controllers/budget/deleteBudgetController";
import { editBudgetController } from "../controllers/budget/editBudgetController";

export const budgetRoute = express.Router();

budgetRoute.post(
  "/categories/:categoryId/budgets",
  passport.authenticate("jwt", { session: false }),
  createBudgetController
);

budgetRoute.get(
  "/categories/:categoryId/budgets",
  passport.authenticate("jwt", { session: false }),
  getAllBudgetsController
);

budgetRoute.delete(
  "/categories/:categoryId/budgets/:budgetId",
  passport.authenticate("jwt", { session: false }),
  deleteBudgetController
);

budgetRoute.patch(
  "/categories/:categoryId/budgets/:budgetId",
  passport.authenticate("jwt", { session: false }),
  editBudgetController
);
