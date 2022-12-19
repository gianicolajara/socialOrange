"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const mongooseConnection = () => {
    mongoose_1.default
        .connect(config_1.URL_MONGO)
        .then(() => {
        console.log("connectado correctamente a mongoose");
    })
        .catch((err) => {
        console.error(err);
    });
    const db = mongoose_1.default.connection;
    db.on("error", (error) => {
        console.error("error en mongoose", error);
    });
};
exports.mongooseConnection = mongooseConnection;
//# sourceMappingURL=connect.js.map