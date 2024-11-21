import express  from "express";
import IdeaController, { getAllIdeas } from "../controller/IdeaController";

const ideaRouter = new express.Router();

ideaRouter.post("/new", IdeaController.postIdea);

ideaRouter.get("/get", getAllIdeas);
ideaRouter.get("/prova", );
ideaRouter.get("/get/:id", IdeaController.getIdeaById)


export default ideaRouter;