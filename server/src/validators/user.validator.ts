import { cookie, param } from "express-validator";

export const getUserByNameValidator = [
  param("name")
    .exists({ checkFalsy: true })
    .withMessage("Field name is required"),
  cookie("JWT_TOKEN").isJWT().withMessage("token is required"),
];
