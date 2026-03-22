import express from "express";
import passport from "passport";
import { createBudgetController } from "../controllers/budget/createBudgetController";

export const budgetRoute = express.Router();

budgetRoute.post(
  "/categories/:categoryId/budgets",
  passport.authenticate("jwt", { session: false }),
  createBudgetController
);

budgetRoute.delete(
  "/budget/:id",
  passport.authenticate("jwt", { session: false })
);

budgetRoute.patch(
  "/budget/:id",
  passport.authenticate("jwt", { session: false })
);

budgetRoute.get("/budgets", passport.authenticate("jwt", { session: false }));
