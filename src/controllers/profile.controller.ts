import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import fs from "fs";
import { join } from "path";
import { getUniqueUser } from "../services/auth";
export class ProfileController {
  async updateProfileImg(req: Request, res: Response, next: NextFunction) {
    console.log("File upload info : ", req.file);
    const findUser = await getUniqueUser({ id: res.locals.decript.id });

    const update = await prisma.user.update({
      where: { id: res.locals.decript.id },
      data: {
        imgProfile: `profile/${req.file?.filename}`,
      },
    });
    console.log(join(__dirname, "../../public", `/${findUser?.imgProfile}`));
    fs.unlinkSync(join(__dirname, "../../public", `/${findUser?.imgProfile}`)); // delete old file
    res.status(200).send({
      rc: 200,
      success: true,
      message: "Update profile success",
    });
  }
}
