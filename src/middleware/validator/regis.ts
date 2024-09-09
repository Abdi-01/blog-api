import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const regisValidation = [
  body("username").notEmpty(),
  body("email").notEmpty().isEmail().withMessage("Email is required"),
  body("password").notEmpty().isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 0,
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errorValidator = validationResult(req);
    if (!errorValidator.isEmpty()) {
      //   jika errorValidator tidak kosong maka akan kirim response 400
      return res.status(400).send({ error: errorValidator });
    }
    next(); // jika errorValidator kosong maka lanjut ke controller register
  },
];
