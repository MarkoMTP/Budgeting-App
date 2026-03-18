import { getTranscationById } from "../../queries/transactionQueries";

export async function getTransactionByIdController(req, res) {
  const { id } = req.params;

  try {
    const transaction = await getTranscationById(id);

    if (!transaction) return res.status(400).send("Transaction does not exist");

    res.status(200).send(transaction);
  } catch (err) {
    console.error("Error fetching transaction:", err);
    return res.status(500).send("Failed to retrieve transaction");
  }
}
