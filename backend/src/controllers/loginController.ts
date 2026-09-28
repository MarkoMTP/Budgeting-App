import z from "zod";
import { signToken, verifyPassword } from "../auth/authUtils.js";
import { findUserEmail } from "../queries/userQueries.js";
import { LoginUserSchema, type LoginNewUser } from "../types/userTypes.js";
import type { Request, Response } from "express";

export async function loginController(
  req: Request<unknown, unknown, LoginNewUser>,
  res: Response,
) {
  try {
    const { email, password } = LoginUserSchema.parse(req.body);

    const user = await findUserEmail(email);
    if (!user) {
      return res.status(401).send("User not found with email");
    }

    const isPasswordCorrect = await verifyPassword(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = await signToken(user.id);

    return res.status(200).send("User logged in successfully");
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: err.issues,
      });
    }

    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
