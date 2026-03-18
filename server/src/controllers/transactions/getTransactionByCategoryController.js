import { getTranscationByCategoryId } from "../../queries/transactionQueries";

export async function getTransactionsByCategoryController(req, res) {
  const { categoryId } = req.params;
  const user = req.user;

  if (!categoryId) return res.status(400).send("Missing category Id");

  if (!user) return res.status(400).send("User not logged in");

  try {
    const transactions = await getTranscationByCategoryId(categoryId, user.id);

    if (!transactions) return res.status(400).send("No transactions found");

    return res.status(200).send(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return res.status(500).send("Failed to retrieve transactions");
  }
}
