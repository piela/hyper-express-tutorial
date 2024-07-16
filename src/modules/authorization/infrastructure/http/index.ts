import users from "./routes/users";
import roles from "./routes/roles";

export default function registerRoutes(server: any){
    server.use("/users",users);
    server.use("/roles",roles);
}
