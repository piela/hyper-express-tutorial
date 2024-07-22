import CommandBus from "./shared/CommandBus";
import QueryBus from "./shared/QueryBus";
import Application from "./Application";
import { Server } from "hyper-express";
import logger from "./shared/logger";
import userRegister from "./modules/authorization/infrastructure/http/index";
import workspaceRegister from "./modules/wokrspaceSetup/infrastructure/http/index";
import dotenv from "dotenv";

dotenv.config();
const application = new Application(new CommandBus(), new QueryBus());
application.start();


const server = new Server();

server.use((req, res, next) => {
  req.locals.app = application;
  next();
});

server.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

userRegister(server);
workspaceRegister(server);

server.get("/", (req, res) => {
  res.send("Hello, World!");
  logger.info("Response sent for /");
});

server.any("/*", (req, resp) => {
  logger.error(`Error 404, route not found: ${req.method} ${req.url}`);
  resp.status(404).send("Error: Route not found.");
});

server.set_error_handler((req, res, error) => {
  logger.error(`Error occurred: ${error.message}`);
  res.status(500).send("Internal Server Error");
});

const port = process.env.SERVER_PORT!;
server
  .listen(port)
  .then(() => logger.info(`Server started on port ${port}`))
  .catch((err) => logger.error(`Failed to start server: ${err.message}`));
