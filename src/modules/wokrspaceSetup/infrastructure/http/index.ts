import workspace from "./routes/workspace";

import { Server } from "hyper-express";

export default function registerRoutes(server: Server){
    server.use("/workspace",workspace);
}
