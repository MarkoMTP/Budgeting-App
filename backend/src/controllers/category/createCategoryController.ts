import {
  createCategory,
  findCategoryByName,
} from "../../queries/categoryQueries.js";
import type { Request, Response } from "express";
import {
  CreateCategoryNameSchema,
  type CreateCategoryName,
} from "../../types/categoryTypes.js";
import z from "zod";

export async function createNewCategory(
  req: Request<unknown, unknown, CreateCategoryName>,
  res: Response,
) {
  try {
    const { name } = CreateCategoryNameSchema.parse(req.body);
    const user = req.user;

    if (!user) {
      return res.status(400).send("user doesn't exist");
    }

    const categoryCheck = await findCategoryByName(name);
    if (categoryCheck) return res.status(400).send("Category already exists");

    const createdCategory = await createCategory(name, user.id);
    return res.status(200).send(createdCategory.name);
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
