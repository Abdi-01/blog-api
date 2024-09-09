import { Request, Response } from "express";
import prisma from "../prisma";
export class ArticleController {
  async createArticle(req: Request, res: Response) {
    try {
      const article = await prisma.article.create({
        data: req.body,
      });
      res.status(201).send({
        rc: 201,
        success: true,
        result: article,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getArticle(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  // continue to create other middleware
}
