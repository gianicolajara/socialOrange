"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_routes_1 = __importDefault(require("./routes/notFound.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const handleErrors_1 = require("./middlewares/handleErrors");
const connect_1 = require("./mongo/connect");
const config_1 = require("./config");
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const images_routes_1 = __importDefault(require("./routes/images.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const http_1 = require("http");
const socket_util_1 = require("./utils/socket.util");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = (0, socket_util_1.createSocket)(server);
exports.io = io;
app.set("trust proxy", 1);
//connect db mongoose
(0, connect_1.mongooseConnection)();
//middlewares
app.use("/public", express_1.default.static(__dirname + "/public"));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)(config_1.SESSION_CONFIG));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, express_fileupload_1.default)({
    createParentPath: true,
}));
//routes
app.use("/auth", auth_routes_1.default);
app.use("/post", post_routes_1.default);
app.use("/image", images_routes_1.default);
app.use("/user", user_routes_1.default);
app.use(notFound_routes_1.default);
//handle errors
app.use(handleErrors_1.handleErrors);
io.on("connection", (socket) => {
    console.log("a user connected ", socket.id);
    console.log("number of connections on connect action", io.engine.clientsCount);
    socket.on("disconnect", (reason) => {
        console.log("a user disconnected", reason);
        console.log("number of connections on disconnect action", io.engine.clientsCount);
    });
});
exports.default = server;
//# sourceMappingURL=app.js.map