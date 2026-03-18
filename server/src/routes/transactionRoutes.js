import express from "express";
import passport from "passport";
import { createTransactionController } from "../controllers/transactions/createTransactionController";
import { getTransactionsController } from "../controllers/transactions/getTransactionsController";
import { getTransactionsByCategoryController } from "../controllers/transactions/getTransactionByCategoryController";
import { getTranscationById } from "../queries/transactionQueries";
import { getTransactionByIdController } from "../controllers/transactions/getTransactionByIdController";
import { deleteTransactionByIdController } from "../controllers/transactions/deleteTransactionController";

export const transactionRoute = express.Router();

// CREATE /transactions

transactionRoute.post(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  createTransactionController
);

// GET /transactions

transactionRoute.get(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  getTransactionsController
);

transactionRoute.get(
  "/transactions/category/:categoryId",
  passport.authenticate("jwt", { session: false }),
  getTransactionsByCategoryController
);

transactionRoute.get(
  "/transactions/:id",
  passport.authenticate("jwt", { session: false }),
  getTransactionByIdController
);

// DELETE /transactions/:id

transactionRoute.delete(
  "/transactions/:id",
  passport.authenticate("jwt", { session: false }),
  deleteTransactionByIdController
);
