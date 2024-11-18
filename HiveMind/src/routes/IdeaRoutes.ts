import express  from "express";
import IdeaController from "../controller/ideaController"
import { getAllIdeas } from "../controller/ideaController";

const ideaRouter = new express.Router();

ideaRouter.post("/new", IdeaController.postIdea);

ideaRouter.get("/get", getAllIdeas);
ideaRouter.get("/prova", );
ideaRouter.get("/get/:id", IdeaController.getIdeaById)


export default ideaRouter;