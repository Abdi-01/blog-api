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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("from header req", req.header("Authorization"));
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw { rc: 404, status: false, message: "Token not found" };
        }
        const checkToken = (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_KEY || "secret");
        // meneruskan data hasil terjemahan token ke miidleware berikutnya
        res.locals.decript = checkToken;
        next(); // continue to next middleware
    }
    catch (error) {
        next(error);
    }
});
exports.verifyToken = verifyToken;
