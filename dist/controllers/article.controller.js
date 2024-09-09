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
exports.ArticleController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ArticleController {
    createArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield prisma_1.default.article.create({
                    data: req.body,
                });
                res.status(201).send({
                    rc: 201,
                    success: true,
                    result: article,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield prisma_1.default.article.findMany();
                res.status(200).send({
                    rc: 200,
                    success: true,
                    result: article,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ArticleController = ArticleController;
