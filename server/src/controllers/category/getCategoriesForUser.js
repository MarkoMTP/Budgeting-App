import { getCategoriesForUser } from "../../queries/categoryQueries";

export async function getCategoriesForUserController(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(400).send("user doesn't exist");
  }
  try {
    const categories = await getCategoriesForUser(user.id);

    if (categories.length < 1)
      return res.status(400).send("No categories exist");

    return res.status(200).send("Categories returned correctly");
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal error while fetching categories for user" });
  }
}
