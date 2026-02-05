import { addUserToDb, findUserEmail } from "../query";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export async function registerController(req, res) {
  const { fullName, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await findUserEmail(email);
    if (result) {
      return res.status(400).send("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await addUserToDb(fullName, email, hashedPassword);

    return res.status(200).send("Registration success");
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
}
