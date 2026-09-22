import {
  deleteBudget,
  findBudgetById,
  findSpecificBudget,
} from "../../queries/budgetQueries.js";
import { type DeleteBudgetParams } from "../../types/budgetTypes.js";
import { findCategoryById } from "../../queries/categoryQueries.js";
import type { Request, Response } from "express";

export async function deleteBudgetController(
  req: Request<DeleteBudgetParams, unknown, unknown>,
  res: Response,
) {
  const { categoryId, budgetId } = req.params;

  if (!categoryId) return res.status(400).send("Missing categoryId");
  if (!budgetId) return res.status(400).send("Missing budgetId");

  try {
    const category = await findCategoryById(categoryId);
    if (!category) {
      return res.status(400).send("Category does not exist");
    }

    const budget = await findBudgetById(budgetId);
    if (!budget) {
      return res.status(400).send("Budget does not exist");
    }

    if (budget.categoryId !== categoryId) {
      return res.status(400).send("Budget does not belong to this category");
    }

    await deleteBudget(budgetId);
    return res.status(200).send("Budget deleted successfully");
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: `${err}` });
  }
}
