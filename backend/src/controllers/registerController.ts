import { addUserToDb, findUserEmail } from "../queries/userQueries.js";
import bcrypt from "bcrypt";
import {
  type NewUser,
  type RegisterNewUser,
  RegisterUserSchema,
} from "../types/userTypes.js";

import type { Request, Response } from "express";
import z from "zod";

export async function registerController(
  req: Request<unknown, unknown, RegisterNewUser>,
  res: Response,
) {
  try {
    const { name, email, password } = RegisterUserSchema.parse(req.body);

    const result = await findUserEmail(email);
    if (result) {
      return res.status(400).send("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: NewUser = {
      fullName: name,
      email: email,
      passwordHash: hashedPassword,
    };

    const createdUser = await addUserToDb(newUser);

    return res
      .status(200)
      .send(`Registration Successfull, added user ${createdUser.name}`);
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: err.issues,
      });
    }

    console.error(err);
    return res.status(500).json({
      error: "unknown error",
    });
  }
}
