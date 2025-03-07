  "use strict";
  import Idea from "../models/Idea.js";
  import Vote from "../models/Vote.js";
  import Logger from "../utils/Logger.js";
  import AuthController from "./AuthController.js";

  class VoteController {
    
    static async upvote(req, res) {
      VoteController.vote(req, res, 1);
    }
    
    static async downvote(req, res) {
      VoteController.vote(req, res, -1);
    }


    static async vote(req, res, vote){
      try{
        let { id } = req.params;
      id = id.split(":")[1];
      Logger.logMessage(`Voting idea ${id}`, "DEBUG");
      const userId = await AuthController.getUserIdByToken(
        req.headers.authorization
      );
      const idea = await Idea.findOne({where: {id}});
      if (idea.userId === userId){
        return res.status(400).json({error: "You can't vote your own idea"});
      }
      const voteAlreadyExists = await Vote.findOne({where: {userId, ideaId: id}});
      if(!voteAlreadyExists){
        await Vote.create({vote: vote, userId, ideaId: id});
        return res.status(201).json({message: "Vote registered"});
      }
      if (voteAlreadyExists.vote === vote){
        await voteAlreadyExists.destroy();
        return res.status(200).json({message: "Vote removed"});
      }
      await voteAlreadyExists.update({vote});
      return res.status(200).json({message: "Vote updated"});
      } catch (e){
        Logger.logMessage(`Error voting idea: ${e.message}`, "ERROR");
        return res.status(500).json({error: e.message});
    }
  }
  }

  export default VoteController;
