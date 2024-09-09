"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRouter = void 0;
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const uploader_1 = require("../middleware/uploader");
const verifyToken_1 = require("../middleware/verifyToken");
class ProfileRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.profileController = new profile_controller_1.ProfileController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.patch("/photo", verifyToken_1.verifyToken, (0, uploader_1.uploader)("/profile", "PROFILE").single("imgProfile"), this.profileController.updateProfileImg);
    }
    getRouter() {
        return this.router;
    }
}
exports.ProfileRouter = ProfileRouter;
