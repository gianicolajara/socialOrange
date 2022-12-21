"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_CONFIG = exports.URL_IMAGES_FRONTEND = exports.URL_IMAGES_FOLDER_PUBLIC = exports.BASE_URL = exports.JWT_SECRET = exports.URL_MONGO = exports.URL_PAGE = exports.PORT = void 0;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const uuid_1 = require("uuid");
exports.PORT = process.env.PORT || 5001;
exports.URL_PAGE = "http://localhost:5001";
exports.URL_MONGO = "mongodb://0.0.0.0:27017/socialOrange";
exports.JWT_SECRET = process.env.JWT_SECRET || "";
exports.BASE_URL = __dirname;
exports.URL_IMAGES_FOLDER_PUBLIC = `${exports.BASE_URL}/public/images`;
exports.URL_IMAGES_FRONTEND = `${exports.URL_PAGE}/public/images`;
exports.SESSION_CONFIG = {
    genid: (_) => {
        return (0, uuid_1.v4)();
    },
    secret: "test-secret",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    proxy: true,
    cookie: {
        secure: false,
        domain: "localhost",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
    },
    store: connect_mongo_1.default.create({
        crypto: {
            secret: "squirrel",
        },
        mongoUrl: "mongodb://0.0.0.0:27017/socialOrange",
        autoRemove: "interval",
        autoRemoveInterval: 10,
    }),
};
//# sourceMappingURL=config.js.map