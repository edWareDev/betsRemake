import { Router } from "express";
import { usersRouter } from "./API/users.router.js";
import { dataRouter } from "./API/data.router.js";

export const apiRouter = Router();

apiRouter.use('/users', usersRouter)
apiRouter.use('/data', dataRouter)