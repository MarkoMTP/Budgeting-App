import { createBudget } from "../../queries/budgetQueries";

export async function createBudgetController(req, res) {
  const { amount, month, year } = req.body;
  const user = req.user;
  const { categoryId } = req.params;

  if (!amount) return res.status(400).send("Amount is required");
  if (!month) return res.status(400).send("Month is required");
  if (!year) return res.status(400).send("Year is required");
  if (!categoryId) return res.status(400).send("CategoryId is required");
  if (!user) return res.status(400).send("User is not logged in");
  if (amount < 0) return res.status(400).send("Amount cannot be negative");
  if (month > 12 || month < 1) return res.status(400).send("Month is invalid");

  try {
    console.log(categoryId);
    const createdBudget = await createBudget(
      user.id,
      categoryId,
      amount,
      month,
      year
    );

    if (!createdBudget) return res.status(400).send("Failed to create budget");

    return res.status(200).send("Budget set correctly");
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal error while creating a new budget" });
  }
}
