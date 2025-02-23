import { Router } from "express";
import VoteController from "../controllers/VoteController.js";

const voteRouter = Router();

voteRouter.put("/upvote/:id", VoteController.upvote);

voteRouter.put("/downvote/:id", VoteController.downvote);

export default voteRouter;