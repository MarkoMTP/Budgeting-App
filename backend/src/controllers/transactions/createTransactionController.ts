import { findCategoryById } from "../../queries/categoryQueries.js";
import { createTransaction } from "../../queries/transactionQueries.js";
import type { Request, Response } from "express";
import {
  CreateTranscationBodySchema,
  type CreateTransactionBody,
  type NewTransaction,
} from "../../types/transactionTypes.js";
import z from "zod";

export async function createTransactionController(
  req: Request<unknown, unknown, CreateTransactionBody>,
  res: Response,
) {
  try {
    const { name, amount, categoryId } = CreateTranscationBodySchema.parse(
      req.body,
    );
    const user = req.user;

    const categoryCheck = await findCategoryById(categoryId);

    if (!categoryCheck)
      return res
        .status(400)
        .send("Failed to create transaction, category does not exist");

    if (!user) return res.status(400).send("User is not logged in");

    const amountInCents = Math.round(amount * 100);

    const newTransaction: NewTransaction = {
      name: name,
      amount: amountInCents,
      categoryId: categoryId,
      userId: user.id,
    };

    const createdTransaction = await createTransaction(newTransaction);

    return res.status(200).json(createdTransaction);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
      });
    }

    return res.status(500).json({
      error: "unknown error",
    });
  }
}
