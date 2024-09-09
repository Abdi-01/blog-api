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
exports.createUser = exports.getUniqueUser = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getUniqueUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield prisma_1.default.user.findUnique({
            where: data,
        });
        return check;
    }
    catch (error) {
        throw error;
    }
});
exports.getUniqueUser = getUniqueUser;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.create({ data });
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
