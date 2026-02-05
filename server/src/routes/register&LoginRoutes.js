import express from "express";
import passport from "../auth/passport.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//reg validator
import { registerValidator } from "../middleware/registerValidator.js";

//controllers
import { registerController } from "../controllers/registerController.js";

//queries
import { loginController } from "../controllers/loginController.js";

const registerRouter = express.Router();

//routes
registerRouter.get("/", (req, res) => {
  res.send("HomePage");
});

registerRouter.post("/register", registerValidator, registerController);

registerRouter.post("/login", loginController);

export default registerRouter;
