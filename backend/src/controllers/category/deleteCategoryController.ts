import {
  createCategory,
  findCategoryById,
  findCategoryByName,
  deleteCategoryWithId,
} from "../../queries/categoryQueries.js";
import type { Request, Response } from "express";

export async function deleteCategory(
  req: Request<{ id: string }, unknown, unknown>,
  res: Response,
) {
  const { id } = req.params;

  try {
    //check if Category exists
    const categoryExists = await findCategoryById(id);

    if (!categoryExists) {
      return res.status(400).send("Category does not exist");
    }
    await deleteCategoryWithId(id);

    return res
      .status(200)
      .send(`${categoryExists.name} has been successfully deleted`);
  } catch (err: unknown) {
    return res.status(500).json({ error: `${err}` });
  }
}
