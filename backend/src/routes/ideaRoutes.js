import { Router } from "express";
import IdeaController from "../controllers/IdeaController.js";

const ideaRouter = Router();

ideaRouter.get("/get", IdeaController.getIdeas);

ideaRouter.get("/get/:id", IdeaController.getIdeaById);

ideaRouter.post("/new", IdeaController.postIdea);


export default ideaRouter;