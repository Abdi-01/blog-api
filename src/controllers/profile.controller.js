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
exports.ProfileController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const auth_1 = require("../services/auth");
class ProfileController {
    updateProfileImg(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log("File upload info : ", req.file);
            const findUser = yield (0, auth_1.getUniqueUser)({ id: res.locals.decript.id });
            const update = yield prisma_1.default.user.update({
                where: { id: res.locals.decript.id },
                data: {
                    imgProfile: `profile/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`,
                },
            });
            console.log((0, path_1.join)(__dirname, "../../public", `/${findUser === null || findUser === void 0 ? void 0 : findUser.imgProfile}`));
            fs_1.default.unlinkSync((0, path_1.join)(__dirname, "../../public", `/${findUser === null || findUser === void 0 ? void 0 : findUser.imgProfile}`)); // delete old file
            res.status(200).send({
                rc: 200,
                success: true,
                message: "Update profile success",
            });
        });
    }
}
exports.ProfileController = ProfileController;
