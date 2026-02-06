import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export async function hashPassworfd(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function signToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Jwt secret is not set");

  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
}
