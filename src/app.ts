// To define express config
import dotenv from "dotenv";
dotenv.config(); // execute env access
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { ArticleRouter } from "./routers/article.router";
import { AuthRouter } from "./routers/auth.router";
import { ProfileRouter } from "./routers/profile.router";
import { join } from "path";

const PORT = process.env.PORT || 8080;

class App {
  readonly app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors()); // for config accessibility
    this.app.use(express.json()); // for receive req.body
    this.app.use("/assets", express.static(join(__dirname, "../public")));
  }

  // To define routes config from routers directory
  private routes(): void {
    const articleRouter = new ArticleRouter();
    const authRouter = new AuthRouter();
    const profileRouter = new ProfileRouter();
    this.app.get("/", (request: Request, response: Response) => {
      return response.status(200).send("PRISMA API");
    });

    this.app.use("/articles", articleRouter.getRouter());
    this.app.use("/auth", authRouter.getRouter());
    this.app.use("/profile", profileRouter.getRouter());
  }

  // Define error handling middleware
  private handleError(): void {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.log("Error REQUEST :", err);
        const statusCode = err.rc || 500;
        return res.status(statusCode).send(err);
      }
    );
  }

  public async start(): Promise<void> {
    this.app.listen(PORT, () => {
      console.log(`PRISMA API RUNNING : http://localhost:${PORT}`);
    });
  }
}

export default App;
