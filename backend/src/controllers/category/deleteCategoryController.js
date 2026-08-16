import { json } from "express";
import {
  createCategory,
  findCategoryById,
  findCategoryByName,
  deleteCategoryWithId,
} from "../../queries/categoryQueries.js";

export async function deleteCategory(req, res) {
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
  } catch (err) {
    return res.status(500).json({ error: `${err}` });
  }
}
