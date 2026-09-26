import {
  editCategory,
  findCategoryById,
  findCategoryByName,
} from "../../queries/categoryQueries.js";
import type { Request, Response } from "express";
import {
  CreateCategoryNameSchema,
  type CreateCategoryName,
} from "../../types/categoryTypes.js";
import z from "zod";

export async function editCategoryController(
  req: Request<{ id: string }, unknown, CreateCategoryName>,
  res: Response,
) {
  try {
    const { id } = req.params;
    const { name } = CreateCategoryNameSchema.parse(req.body);
    // see if category exists
    const categoryCheck = await findCategoryById(id);

    if (!categoryCheck)
      return res
        .status(400)
        .send("Category does not exist, you cannot edit it");

    const checkCatName = await findCategoryByName(name);

    if (checkCatName)
      return res
        .status(400)
        .send("Fails editing category when new name is already in use");

    const newCat = await editCategory(id, name);

    return res
      .status(200)
      .send(`Categories name has been updated to ${newCat.name}`);
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
