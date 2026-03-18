import { getAllTransactions } from "../../queries/transactionQueries.js";

export async function getTransactionsController(req, res) {
  const user = req.user;

  if (!user) {
    return res.status(400).send("User not authenticated");
  }

  try {
    const transactions = await getAllTransactions(user.id);

    return res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return res.status(500).send("Failed to retrieve transactions");
  }
}
