import { editCategory, findCategoryById } from "../../queries/categoryQueries";

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

    const newCat = await editCategory(id, name);

    return res
      .status(200)
      .send(`Categories name has been updated to ${newCat.name}`);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal error while editing a category" });
  }
}
