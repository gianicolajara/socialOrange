"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhoto = void 0;
const fs_1 = __importDefault(require("fs"));
const createPhoto = (pathUrl = "", file) => {
    if (pathUrl === "" || !file.data || !file.name)
        throw new Error("Debe ingresar un path valido o un archivo valido");
    fs_1.default.appendFile(pathUrl, file.data, (err) => {
        if (err)
            throw err;
    });
};
exports.createPhoto = createPhoto;
//# sourceMappingURL=files.util.js.map