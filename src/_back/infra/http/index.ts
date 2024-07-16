import { Server } from "hyper-express";
import logger from "../../../shared/logger";
import routes from "./routes/index";
import Application from "../../application/Application";
import CommandBus from "../../_back/application/CommandBus";
import dotenv from "dotenv";

dotenv.config();
const commandBus = new CommandBus();
const application = new Application(commandBus);
application.start();
const server = new Server();

server.use((req, res, next) => {
  req.locals.app = application;
  next();
});

server.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

server.use("/users", routes.users);
server.get("/", (req, res) => {
  res.send("Hello, World!");
  logger.info("Response sent for /");
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
