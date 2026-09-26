import {
  createCategory,
  findCategoryByName,
} from "../../queries/categoryQueries.js";
import type { Request, Response } from "express";
import {
  CreateCategoryNameSchema,
  type CreateCategoryName,
} from "../../types/categoryTypes.js";

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
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ error: `${err}` });
  }
}
