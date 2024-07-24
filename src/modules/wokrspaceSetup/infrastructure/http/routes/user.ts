import { Router } from "hyper-express";
import logger from "../../../../../shared/logger";
import { CreateUserCommand } from "../../../application/commands/Commands";
import ValidationError from "../../../../../shared/Errors/ValidationError";

const userRouter = new Router();



userRouter.post("/", async (req, res) => {
  try {
    const data = await req.json();
    const app = req.locals.app;

 
    await app
      .getCommandBus()
      .execute(
        new CreateUserCommand(
          data.realmName,
          data.username,
          data.firstName,
          data.lastName,
          data.email,
          data.password
        )
      );
    const message = `User created`;
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

export default userRouter;
