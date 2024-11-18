import express  from "express";
import CommentController from "../controller/CommentController";

const commentRouter = new express.Router();

commentRouter.post("/post/:ideaID", CommentController.postComment);

export default commentRouter;