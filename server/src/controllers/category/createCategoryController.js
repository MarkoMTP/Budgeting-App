import { json } from "express";
import {
  createCategory,
  findCategoryByName,
} from "../../queries/categoryQueries";

export async function createNewCategory(req, res) {
  const { name } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(400).send("user doesn't exist");
  }
  if (!name) {
    return res.status(400).json({ error: " name is required" });
  }

  try {
    const categoryCheck = await findCategoryByName(name);
    if (categoryCheck) return res.status(401).send("Category already exists");

    const createdCategory = await createCategory(name, user.id);
    return res.status(200).send(createdCategory.name);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal error while creating a new category" });
  }
}
