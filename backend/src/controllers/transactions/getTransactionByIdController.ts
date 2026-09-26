import { getTranscationById } from "../../queries/transactionQueries.js";
import type { Request, Response } from "express";

export async function getTransactionByIdController(
  req: Request<{ id: string }>,
  res: Response,
) {
  const { id } = req.params;

  try {
    const transaction = await getTranscationById(id);

    if (!transaction) return res.status(404).send("Transaction does not exist");

    res.status(200).json(transaction);
  } catch (err: unknown) {
    console.error("Error fetching transaction:", err);
    return res.status(500).send("Failed to retrieve transaction");
  }
}
