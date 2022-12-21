import server from "./app";
import { PORT } from "./config";

server.listen(PORT, () => {
  console.log("server listening port 5001");
});
