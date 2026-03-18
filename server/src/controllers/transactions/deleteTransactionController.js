import {
  deleteTransactionWithId,
  getTranscationById,
} from "../../queries/transactionQueries";

export async function deleteTransactionByIdController(req, res) {
  const { id } = req.params;

  if (!id) return res.status(400).send("Transaction id not provided");

  try {
    const transaction = await getTranscationById(id);

    if (!transaction) return res.status(400).send("Transaction does not exist");

    await deleteTransactionWithId(id);

    const stillExists = await getTranscationById(id);

    if (stillExists)
      return res.status(400).send("Failed to delete transaction");

    return res.status(200).send("Successfully deleted transaction");
  } catch (err) {
    console.error("Error deleting transaction:", err);
    return res.status(500).send("Failed to delete transaction");
  }
}
