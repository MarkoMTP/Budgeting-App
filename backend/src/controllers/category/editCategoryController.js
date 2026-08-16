import {
  editCategory,
  findCategoryById,
  findCategoryByName,
} from "../../queries/categoryQueries.js";

export async function editCategoryController(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    // see if category exists
    const categoryCheck = await findCategoryById(id);

    if (!categoryCheck)
      return res
        .status(400)
        .send("Category does not exist, you cannot edit it");

    if (!name)
      return res.status(400).send("Missing the new name for the category");

    const checkCatName = await findCategoryByName(name);

    if (checkCatName)
      return res
        .status(400)
        .send("Fails editing category when new name is already in use");

    const newCat = await editCategory(id, name);

    return res
      .status(200)
      .send(`Categories name has been updated to ${newCat.name}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `${err}` });
  }
}
