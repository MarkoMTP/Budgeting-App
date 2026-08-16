import { body } from "express-validator";

export const registerValidator = [
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number."),
];
