import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";

export class ArticleRouter {
  private route: Router;
  private articleController: ArticleController;

  constructor() {
    this.route = Router();
    this.articleController = new ArticleController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.get("/", this.articleController.getArticle);
    this.route.post("/", this.articleController.createArticle);
  }

  getRouter(): Router {
    return this.route;
  }
}
