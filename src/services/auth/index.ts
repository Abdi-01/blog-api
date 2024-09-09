import prisma from "../../prisma";
import { IUser } from "./types";

export const getUniqueUser = async (data: any) => {
  try {
    const check = await prisma.user.findUnique({
      where: data,
    });
    return check;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: IUser) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    throw error;
  }
};
