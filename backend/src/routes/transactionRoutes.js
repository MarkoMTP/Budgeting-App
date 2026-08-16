import express from "express";
import passport from "passport";
import { createTransactionController } from "../controllers/transactions/createTransactionController.js";
import { getTransactionsController } from "../controllers/transactions/getTransactionsController.js";
import { getTransactionsByCategoryController } from "../controllers/transactions/getTransactionByCategoryController.js";
import { getTranscationById } from "../queries/transactionQueries.js";
import { getTransactionByIdController } from "../controllers/transactions/getTransactionByIdController.js";
import { deleteTransactionByIdController } from "../controllers/transactions/deleteTransactionController.js";

export const transactionRoute = express.Router();

// CREATE /transactions

transactionRoute.post(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  createTransactionController,
);

// GET /transactions

transactionRoute.get(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  getTransactionsController,
);

transactionRoute.get(
  "/transactions/category/:categoryId",
  passport.authenticate("jwt", { session: false }),
  getTransactionsByCategoryController,
);

transactionRoute.get(
  "/transactions/:id",
  passport.authenticate("jwt", { session: false }),
  getTransactionByIdController,
);

// DELETE /transactions/:id

transactionRoute.delete(
  "/transactions/:id",
  passport.authenticate("jwt", { session: false }),
  deleteTransactionByIdController,
);
