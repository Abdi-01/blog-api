"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../prisma/generated/client");
const prisma = new client_1.PrismaClient({ log: ["query", "info", "warn", "error"] });
exports.default = prisma;
