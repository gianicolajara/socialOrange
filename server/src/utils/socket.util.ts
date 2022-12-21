import { Server } from "socket.io";
import { Server as ServerHttp } from "http";

export const createSocket = (server: number | ServerHttp) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    },
  });
  return io;
};
