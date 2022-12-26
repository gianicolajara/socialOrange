"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSocket = void 0;
const socket_io_1 = require("socket.io");
const createSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:3000",
            allowedHeaders: ["Access-Control-Allow-Origin"],
            credentials: true,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        },
    });
    return io;
};
exports.createSocket = createSocket;
//# sourceMappingURL=socket.util.js.map