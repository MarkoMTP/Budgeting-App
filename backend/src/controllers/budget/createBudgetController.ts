import z from "zod";
import { createBudget } from "../../queries/budgetQueries.js";
import {
  NewBudgetBodySchema,
  type NewBudgetBody,
  type NewBudget,
  type BudgetParams,
} from "../../types/budgetTypes.js";
import type { Request, Response } from "express";

export async function createBudgetController(
  req: Request<BudgetParams, unknown, NewBudgetBody>,
  res: Response,
) {
  try {
    const { amount, month, year } = NewBudgetBodySchema.parse(req.body);
    const user = req.user;
    const { categoryId } = req.params;

    if (!categoryId) return res.status(400).send("CategoryId is required");
    if (!user) return res.status(400).send("User is not logged in");

    const budget: NewBudget = {
      userId: user.id,
      categoryId,
      amount,
      month,
      year,
    };

    return res.status(200).send("Budget set correctly");
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
      });
    }

    return res.status(500).json({
      error: "unknown error",
    });
  }
}
