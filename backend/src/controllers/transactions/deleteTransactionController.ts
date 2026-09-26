import {
  deleteTransactionWithId,
  getTranscationById,
} from "../../queries/transactionQueries.js";
import type { Request, Response } from "express";

export async function deleteTransactionByIdController(
  req: Request<{ id: string }, unknown, unknown>,
  res: Response,
) {
  const { id } = req.params;

  try {
    const transaction = await getTranscationById(id);

    if (!transaction) return res.status(400).send("Transaction does not exist");

    await deleteTransactionWithId(id);

    return res.status(200).send("Successfully deleted transaction");
  } catch (err: unknown) {
    console.error("Error deleting transaction:", err);
    return res.status(500).send("Failed to delete transaction");
  }
}
