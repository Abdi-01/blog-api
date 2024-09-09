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
exports.AuthController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../services/auth");
const hash_1 = require("../utils/hash");
const emailSender_1 = require("../utils/emailSender");
class AuthController {
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, role } = req.body;
                const checkUser = yield (0, auth_1.getUniqueUser)({ email });
                if (checkUser) {
                    throw {
                        rc: 400,
                        success: false,
                        message: "User Already Exist",
                    };
                }
                //   hash password
                const regisUser = yield (0, auth_1.createUser)({
                    username,
                    email,
                    password: yield (0, hash_1.hashPassword)(password),
                    role,
                });
                // SEND EMAIL
                const subject = "Verify email from registration";
                const data = {
                    username,
                    otp: "09892",
                    link: "https://google.com",
                };
                yield (0, emailSender_1.sendEmail)(email, subject, null, data);
                return res.status(201).send({
                    rc: 201,
                    success: true,
                    result: regisUser,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log(req.body);
                const findUser = yield prisma_1.default.user.findUnique({
                    where: { email },
                });
                console.log(findUser);
                if (findUser) {
                    const comparePass = (0, bcrypt_1.compareSync)(password, findUser === null || findUser === void 0 ? void 0 : findUser.password);
                    if (!comparePass) {
                        // RESET limit when different day
                        if (findUser.updatedAt) {
                            const differentDay = Date.now() > new Date(findUser === null || findUser === void 0 ? void 0 : findUser.updatedAt).getTime();
                            if (differentDay) {
                                yield prisma_1.default.user.update({
                                    where: { id: findUser === null || findUser === void 0 ? void 0 : findUser.id },
                                    data: {
                                        limitWrongPassword: 0,
                                    },
                                });
                            }
                        }
                        if (findUser.limitWrongPassword <
                            Number(process.env.MAX_FORGOT_PASSWORD)) {
                            let countLimit = findUser.limitWrongPassword + 1;
                            yield prisma_1.default.user.update({
                                where: { id: findUser === null || findUser === void 0 ? void 0 : findUser.id },
                                data: {
                                    limitWrongPassword: countLimit,
                                },
                            });
                            throw {
                                rc: 400,
                                success: false,
                                message: `Password is wrong. ${countLimit}/${process.env.MAX_FORGOT_PASSWORD}`,
                            };
                        }
                        else {
                            throw {
                                rc: 400,
                                success: false,
                                message: `Your account is Suspend, contact Admin`,
                            };
                        }
                    }
                    // Reset limit count
                    if (findUser.limitWrongPassword > 0 ||
                        findUser.limitWrongPassword < 3) {
                        yield prisma_1.default.user.update({
                            where: { id: findUser.id },
                            data: {
                                limitWrongPassword: 0,
                            },
                        });
                    }
                    // generate token
                    const token = (0, jsonwebtoken_1.sign)({ id: findUser.id, role: findUser.role }, process.env.TOKEN_KEY || "secret");
                    return res.status(200).send({
                        username: findUser.username,
                        email: findUser.email,
                        role: findUser.role,
                        token,
                    });
                }
                else {
                    throw new Error("Account not exist");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    keepLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findUser = yield prisma_1.default.user.findUnique({
                    where: { id: res.locals.decript.id },
                });
                console.log(findUser);
                if (findUser) {
                    // generate token
                    const token = (0, jsonwebtoken_1.sign)({ id: findUser.id, role: findUser.role }, process.env.TOKEN_KEY || "secret");
                    console.log("KEEP_LOGIN", token);
                    return res.status(200).send({
                        username: findUser.username,
                        email: findUser.email,
                        role: findUser.role,
                        token,
                    });
                }
                else {
                    throw new Error("Account not exist");
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
        });
    }
}
exports.AuthController = AuthController;
