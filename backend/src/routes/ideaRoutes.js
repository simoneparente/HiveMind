import { Router } from "express";
import IdeaController from "../controllers/IdeaController.js";

const ideaRouter = Router();

ideaRouter.get("/get", (req, res) => {
  const { sortBy } = req.query;
  switch (sortBy) {
    case "mainstream":
      return IdeaController.getMainstreamIdeas(req, res);
    case "unpopular":
      return IdeaController.getUnpopularIdeas(req, res);
    default:
      return IdeaController.getControversialIdeas(req, res);
  }
});

ideaRouter.get("/get/:id", IdeaController.getIdeaById);

ideaRouter.post("/new", IdeaController.postIdea);

export default ideaRouter;
