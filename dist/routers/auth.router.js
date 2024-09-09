"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const regis_1 = require("../middleware/validator/regis");
class AuthRouter {
    constructor() {
        this.authController = new auth_controller_1.AuthController();
        this.route = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/regis", regis_1.regisValidation, this.authController.registerUser);
        this.route.post("/login", this.authController.loginUser);
        this.route.get("/keeplogin", verifyToken_1.verifyToken, this.authController.keepLogin);
    }
    getRouter() {
        return this.route;
    }
}
exports.AuthRouter = AuthRouter;
