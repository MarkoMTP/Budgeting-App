import { getAllBudgetsOfCategory } from "../../queries/budgetQueries.js";
import { findCategoryById } from "../../queries/categoryQueries.js";
import type { Request, Response } from "express";

export async function getAllBudgetsController(
  req: Request<{ categoryId: string }, unknown, unknown>,
  res: Response,
) {
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).json({ message: "categoryId is required" });
  }

  try {
    const category = await findCategoryById(categoryId);
    if (!category) return res.status(400).send("Category does not exist");

    const budgets = await getAllBudgetsOfCategory(categoryId);

    if (budgets.length === 0)
      return res.status(400).send("Category has no budgets");

    return res.status(200).json(budgets);
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: `${err}` });
  }
}
