import { Router } from "hyper-express";
import logger from "../../../logger";
import { CreateUserCommand } from "../../../application/Commands";
const userRouter = new Router();

userRouter.get("/", async (req, res, next) => {
  try {
    logger.info("GET /users");
    res.json({ message: "List of users" });
  } catch (err: any) {
    next(err);
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    logger.info(`GET /users/${userId}`);
    res.json({ message: `User details for user ${userId}` });
  } catch (err: any) {
    next(err);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    
    const data = await req.json();
    logger.info("POST /users");
    logger.info(`User data: ${JSON.stringify(data)}`);
    
    const app = req.locals.app;
    await app
      .getCommandBus()
      .execute(new CreateUserCommand(data.name, data.email));
    res.status(201).json({ message: "User created", data: data });


  } catch (err: any) {
    logger.error(err.message);
    res.status(400).json({ message: "validation Error" });
  }
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedData = await req.json();
    logger.info(`PUT /users/${userId}`);
    logger.info(`Updated data: ${JSON.stringify(updatedData)}`);
    res.json({ message: `User ${userId} updated`, data: updatedData });
  } catch (err: any) {
    logger.error(err.message);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    logger.info(`DELETE /users/${userId}`);
    res.json({ message: `User ${userId} deleted` });
  } catch (err: any) {
    next(err);
  }
});

export default userRouter;
