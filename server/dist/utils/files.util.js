"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhoto = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../config");
const createPhoto = (pathUrl = "", file, next) => {
    if (pathUrl === "" || !file.data || !file.name)
        throw new Error("Debe ingresar un path valido o un archivo valido");
    if (!fs_1.default.existsSync(`${config_1.BASE_URL}/public/images`)) {
        fs_1.default.mkdirSync(`${config_1.BASE_URL}/public/images`, { recursive: true });
    }
    fs_1.default.appendFile(pathUrl, file.data, (err) => {
        if (err) {
            console.log("el error es aqui");
            return next(err);
        }
    });
};
exports.createPhoto = createPhoto;
//# sourceMappingURL=files.util.js.map