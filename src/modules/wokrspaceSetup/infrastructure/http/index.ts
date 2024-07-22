import workspace from "./routes/workspace";
import user from "./routes/user";

import { Server } from "hyper-express";

export default function registerRoutes(server: Server){
    server.use("/workspace",workspace);
    server.use("/user",user);
}
