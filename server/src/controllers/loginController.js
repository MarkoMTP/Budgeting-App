import { signToken, verifyPassword } from "../auth/authUtils.js";
import { findUserEmail } from "../db/userQueries.js";

export async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    const user = await findUserEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await verifyPassword(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user.id);

    return res.status(200).json({
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
