"use strict";

import { Router } from "express";
import UserController from "../controllers/UserController.js";

const userRouter = Router();

userRouter.get("/get", UserController.get);

export default userRouter;
