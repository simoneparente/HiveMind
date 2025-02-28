"use strict";

import { Router } from "express";
import CommentController from "../controllers/CommentController.js";

const commentRouter = Router();

commentRouter.put("/:id", CommentController.publish);

export default commentRouter;
