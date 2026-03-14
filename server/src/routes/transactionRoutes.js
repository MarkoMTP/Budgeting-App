import express from "express";
import passport from "passport";
import { createTransactionController } from "../controllers/transactions/createTransactionController";

export const transactionRoute = express.Router();

transactionRoute.post(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  createTransactionController
);

// POST /transactions
// GET /transactions
// PATCH /transactions/:id
// DELETE /transactions/:id
