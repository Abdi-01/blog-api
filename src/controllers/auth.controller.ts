import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { compareSync, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { transporter } from "../lib/nodemailer";
import { createUser, getUniqueUser } from "../services/auth";
import { hashPassword } from "../utils/hash";
import { sendEmail } from "../utils/emailSender";

export class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, role } = req.body;

      const checkUser = await getUniqueUser({ email });

      if (checkUser) {
        throw {
          rc: 400,
          success: false,
          message: "User Already Exist",
        };
      }

      //   hash password
      const regisUser = await createUser({
        username,
        email,
        password: await hashPassword(password),
        role,
      });
      // SEND EMAIL
      const subject = "Verify email from registration";
      const data = {
        username,
        otp: "09892",
        link: "https://google.com",
      };
      await sendEmail(email, subject, null, data);
      return res.status(201).send({
        rc: 201,
        success: true,
        result: regisUser,
      });
    } catch (error: Error | any) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      const findUser = await prisma.user.findUnique({
        where: { email },
      });
      console.log(findUser);

      if (findUser) {
        const comparePass = compareSync(password, findUser?.password);
        if (!comparePass) {
          // RESET limit when different day
          if (findUser.updatedAt) {
            const differentDay =
              Date.now() > new Date(findUser?.updatedAt).getTime();
            if (differentDay) {
              await prisma.user.update({
                where: { id: findUser?.id },
                data: {
                  limitWrongPassword: 0,
                },
              });
            }
          }
          if (
            findUser.limitWrongPassword <
            Number(process.env.MAX_FORGOT_PASSWORD)
          ) {
            let countLimit = findUser.limitWrongPassword + 1;
            await prisma.user.update({
              where: { id: findUser?.id },
              data: {
                limitWrongPassword: countLimit,
              },
            });
            throw {
              rc: 400,
              success: false,
              message: `Password is wrong. ${countLimit}/${process.env.MAX_FORGOT_PASSWORD}`,
            };
          } else {
            throw {
              rc: 400,
              success: false,
              message: `Your account is Suspend, contact Admin`,
            };
          }
        }

        // Reset limit count
        if (
          findUser.limitWrongPassword > 0 ||
          findUser.limitWrongPassword < 3
        ) {
          await prisma.user.update({
            where: { id: findUser.id },
            data: {
              limitWrongPassword: 0,
            },
          });
        }

        // generate token
        const token = sign(
          { id: findUser.id, role: findUser.role },
          process.env.TOKEN_KEY || "secret"
        );
        return res.status(200).send({
          username: findUser.username,
          email: findUser.email,
          role: findUser.role,
          token,
        });
      } else {
        throw new Error("Account not exist");
      }
    } catch (error) {
      next(error);
    }
  }

  async keepLogin(req: Request, res: Response) {
    try {
      const findUser = await prisma.user.findUnique({
        where: { id: res.locals.decript.id },
      });
      console.log(findUser);

      if (findUser) {
        // generate token
        const token = sign(
          { id: findUser.id, role: findUser.role },
          process.env.TOKEN_KEY || "secret"
        );
        console.log("KEEP_LOGIN", token);

        return res.status(200).send({
          username: findUser.username,
          email: findUser.email,
          role: findUser.role,
          token,
        });
      } else {
        throw new Error("Account not exist");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
}
