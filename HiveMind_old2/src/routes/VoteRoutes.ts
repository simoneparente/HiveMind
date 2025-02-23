import express  from "express";
import VoteController from "../controller/VoteController";


const voteRouter = new express.Router();

voteRouter.get("/getAll", VoteController.getAll)

voteRouter.post("/new/:ideaID", VoteController.vote);




export default voteRouter;