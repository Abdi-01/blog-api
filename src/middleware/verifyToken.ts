import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("from header req", req.header("Authorization"));
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      throw { rc: 404, status: false, message: "Token not found" };
    }
    const checkToken = verify(token, process.env.TOKEN_KEY || "secret");

    // meneruskan data hasil terjemahan token ke miidleware berikutnya
    res.locals.decript = checkToken;
    next(); // continue to next middleware
  } catch (error) {
    next(error);
  }
};
