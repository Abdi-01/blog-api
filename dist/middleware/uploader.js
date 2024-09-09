"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path"); // untuk merge file path location
const uploader = (dirName, filePrefix) => {
    const defaultDir = (0, path_1.join)(__dirname, "../../public"); // define directory utama
    const configStore = multer_1.default.diskStorage({
        destination: (req, file, callback) => {
            const fileDestination = dirName ? defaultDir + dirName : defaultDir;
            console.log("Destination :", fileDestination);
            callback(null, fileDestination);
        },
        filename: (req, file, callback) => {
            const existName = file.originalname.split(".");
            console.log("Original filename :", existName);
            const extention = existName[existName.length - 1];
            console.log("extention name :", extention);
            if (filePrefix) {
                const newName = filePrefix + Date.now() + "." + extention;
                callback(null, newName);
            }
            else {
                callback(null, file.originalname);
            }
        },
    });
    return (0, multer_1.default)({ storage: configStore });
};
exports.uploader = uploader;
