import { getCategoriesForUser } from "../../queries/categoryQueries.js";
import type { Request, Response } from "express";

export async function getCategoriesForUserController(
  req: Request,
  res: Response,
) {
  const user = req.user;
  if (!user) {
    return res.status(400).send("user doesn't exist");
  }
  try {
    const categories = await getCategoriesForUser(user.id);

    if (categories.length < 1)
      return res.status(400).send("No categories exist");

    return res.status(200).json(categories);
  } catch (err: unknown) {
    return res.status(500).json({ error: `${err}` });
  }
}
