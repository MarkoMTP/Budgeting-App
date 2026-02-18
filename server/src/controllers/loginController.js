import { signToken, verifyPassword } from "../auth/authUtils.js";
import { findUserEmail } from "../queries/userQueries.js";

export async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send("email is required");
  }
  if (!password) {
    return res.status(400).json({ error: " password is required" });
  }

  try {
    const user = await findUserEmail(email);
    if (!user) {
      return res.status(401).send("User not found with email");
    }

    const isPasswordCorrect = await verifyPassword(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = signToken(user.id);

    return res.status(200).send("User created successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
