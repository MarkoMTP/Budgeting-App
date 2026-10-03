import {
  editBudget,
  findBudgetById,
  findSpecificBudget,
} from "../../queries/budgetQueries.js";
import type { Request, Response } from "express";
import { findCategoryById } from "../../queries/categoryQueries.js";
import {
  EditBudgetBodySchema,
  type EditBudgetBody,
} from "../../types/budgetTypes.js";
import z from "zod";

export async function editBudgetController(
  req: Request<
    { categoryId: string; budgetId: string },
    unknown,
    EditBudgetBody
  >,
  res: Response,
) {
  try {
    const { categoryId, budgetId } = req.params;
    const { amount } = EditBudgetBodySchema.parse(req.body);

    if (!categoryId) return res.status(400).send("Missing categoryId");
    if (!budgetId) return res.status(400).send("Missing budgetId");
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

    await editBudget(budgetId, amount);
    return res.status(200).send("Budget updated successfully");
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
      });
    }
    console.error(error);

    return res.status(500).json({
      error: "unknown error",
    });
  }
}
