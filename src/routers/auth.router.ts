import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";
import { regisValidation } from "../middleware/validator/regis";

export class AuthRouter {
  private route: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.route = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post(
      "/regis",
      regisValidation,
      this.authController.registerUser
    );
    this.route.post("/login", this.authController.loginUser);
    this.route.get("/keeplogin", verifyToken, this.authController.keepLogin);
  }

  getRouter(): Router {
    return this.route;
  }
}
