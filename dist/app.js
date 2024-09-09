"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// To define express config
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // execute env access
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const article_router_1 = require("./routers/article.router");
const auth_router_1 = require("./routers/auth.router");
const profile_router_1 = require("./routers/profile.router");
const path_1 = require("path");
const PORT = process.env.PORT;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configure();
        this.routes();
        this.handleError();
    }
    configure() {
        this.app.use((0, cors_1.default)()); // for config accessibility
        this.app.use(express_1.default.json()); // for receive req.body
        this.app.use("/assets", express_1.default.static((0, path_1.join)(__dirname, "../public")));
    }
    // To define routes config from routers directory
    routes() {
        const articleRouter = new article_router_1.ArticleRouter();
        const authRouter = new auth_router_1.AuthRouter();
        const profileRouter = new profile_router_1.ProfileRouter();
        this.app.get("/api", (request, response) => {
            return response.status(200).send("PRISMA API");
        });
        this.app.use("/articles", articleRouter.getRouter());
        this.app.use("/auth", authRouter.getRouter());
        this.app.use("/profile", profileRouter.getRouter());
    }
    // Define error handling middleware
    handleError() {
        this.app.use((err, req, res, next) => {
            console.log("Error REQUEST :", err);
            const statusCode = err.rc || 500;
            return res.status(statusCode).send(err);
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.listen(PORT, () => {
                console.log(`PRISMA API RUNNING : http://localhost:${PORT}`);
            });
        });
    }
}
exports.default = App;
