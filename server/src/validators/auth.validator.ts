import { body, cookie } from "express-validator";

export const registerValidator = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 25 })
    .withMessage(
      "Username must be at least 3 characters long and at least 25 characters long"
    ),
  body("firstName")
    .isString()
    .withMessage("Firstname must be a string")
    .isLength({ min: 3, max: 25 })
    .withMessage(
      "Firstname must be at least 3 characters long and at least 25 characters long"
    ),
  body("lastName")
    .isString()
    .withMessage("Lastname must be a string")
    .isLength({ min: 3, max: 25 })
    .withMessage(
      "lastName must be at least 3 characters long and at least 25 characters long"
    ),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "password needs 8 characters minimum, 1 lower character, 1 number, 1 uppercase and 1 symbol"
    ),
];

export const loginValidator = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 25 })
    .withMessage(
      "Username must be at least 3 characters long and at least 25 characters long"
    ),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "password needs 8 characters minimum, 1 lower character, 1 number, 1 uppercase and 1 symbol"
    ),
];

export const validateLoginValidators = [
  cookie("JWT_TOKEN").isJWT().withMessage("jwt is required"),
  cookie("connect.sid")
    .isString()
    .isLength({ min: 3 })
    .withMessage("session id is required"),
];

export const validateLogoutValidators = [...validateLoginValidators];
