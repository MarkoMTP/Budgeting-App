import { findCategoryById } from "../../queries/categoryQueries";
import { createTransaction } from "../../queries/transactionQueries";

export async function createTransactionController(req, res) {
  const { name, amount, categoryId } = req.body;
  const user = req.user;
  if (!name) {
    return res.status(400).send("Failed to create transaction, name missing");
  }
  if (!amount) {
    return res.status(400).send("Failed to create transaction, amount missing");
  }

  if (!categoryId) {
    return res
      .status(400)
      .send("Failed to create transaction, categoryId missing");
  }

  try {
    const categoryCheck = await findCategoryById(categoryId);

    if (!categoryCheck)
      return res
        .status(400)
        .send("Failed to create transaction, category does not exist");

    const amountInCents = Math.round(Number(amount) * 100);

    const newCategory = await createTransaction(
      name,
      amountInCents,
      categoryId,
      user.id
    );

    if (newCategory)
      return res.status(200).send("Successfully created a transaction");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
