import { Router } from "hyper-express";
import logger from "../../../../../shared/logger";
import { CreateWorkspaceCommand } from "../../../application/commands/Commands";
import ValidationError from "../../../../../shared/Errors/ValidationError";

const workspaceRouter = new Router();

// workspaceRouter.get("/", async (req, res, next) => {
//   try {
//     logger.info("GET /users");
//     res.json({ message: "List of users" });
//   } catch (err: any) {
//     next(err);
//   }
// });

// workspaceRouter.get("/:id", async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     logger.info(`GET /users/${userId}`);
//     res.json({ message: `User details for user ${userId}` });
//   } catch (err: any) {
//     next(err);
//   }
// });

workspaceRouter.post("/", async (req, res) => {
  try {
    const data = await req.json();
    const app = req.locals.app;
    await app
      .getCommandBus()
      .execute(new CreateWorkspaceCommand(data.domainName));
      const message=`Workspace created`
      logger.info(message);
      res.status(201).json({ message: message });
  } catch (err: any) {
    logger.error(err.message);
    if (err instanceof ValidationError) {
      res.status(400).json({ message: "validation Error" });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

// workspaceRouter.put("/:id", async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const updatedData = await req.json();
//     logger.info(`PUT /users/${userId}`);
//     logger.info(`Updated data: ${JSON.stringify(updatedData)}`);
//     res.json({ message: `User ${userId} updated`, data: updatedData });
//   } catch (err: any) {
//     logger.error(err.message);
//   }
// });

// workspaceRouter.delete("/:id", async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     logger.info(`DELETE /users/${userId}`);
//     res.json({ message: `User ${userId} deleted` });
//   } catch (err: any) {
//     next(err);
//   }
// });

export default workspaceRouter;
