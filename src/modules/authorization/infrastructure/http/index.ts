import users from "./routes/users";
import roles from "./routes/roles";
import { Server } from "hyper-express";

export default function registerRoutes(server: Server){
    server.use("/users",users);
    server.use("/roles",roles);
}
