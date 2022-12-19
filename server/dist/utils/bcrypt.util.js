"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.hash = void 0;
const bcrypt_1 = require("bcrypt");
// funcion que permite encriptar cualquier string
// devolvera un string con el hash
const hash = (str) => {
    const salt = (0, bcrypt_1.genSaltSync)(10);
    const hash = (0, bcrypt_1.hashSync)(str, salt);
    return hash;
};
exports.hash = hash;
// function que permite validar un hash con un string
// devolvera un boolean
const validate = (str, hash) => {
    return (0, bcrypt_1.compareSync)(str, hash);
};
exports.validate = validate;
//# sourceMappingURL=bcrypt.util.js.map