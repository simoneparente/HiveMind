"use strict";
import Idea from "../models/Idea.js";
import Vote from "../models/Vote.js";
import Logger from "../utils/Logger.js";
import AuthController from "./AuthController.js";

class VoteController {

    static async upvote(req, res){
        try {
            let { id } = req.params;
            id = id.split(":")[1];
            Logger.logMessage(`Upvoting idea ${id}`, "DEBUG");
            const userId = await AuthController.getUserIdByToken(req.headers.authorization);

            const idea = await Idea.findOne({ where: { id } });
            if(idea.userId === userId){
                return res.status(400).json({ error: "You can't vote your own idea" });
            }

            const vote = await Vote.findOne({ where: { userId, ideaId: id } });
            if(!vote){
                await Vote.create({ vote: 1, userId, ideaId: id });
                return res.status(201).json({ message: "Upvote registered" });
            }

            if(vote.vote === -1){
                await vote.update({ vote: 1 });
                return res.status(200).json({ message: "Vote updated from downvote to upvote" });
            } else{
                await vote.destroy();
                return res.status(200).json({ message: "Upvote removed" });
            }
        } catch(e){
            Logger.logMessage(`Error upvoting idea: ${e.message}`, "ERROR");
            return res.status(500).json({ error: e.message });
        }
    }

    static async downvote(req, res){
        try {
            let { id } = req.params;
            id = id.split(":")[1];
            Logger.logMessage(`Upvoting idea ${id}`, "DEBUG");
            const userId = await AuthController.getUserIdByToken(req.headers.authorization);

            const idea = await Idea.findOne({ where: { id } });
            if(idea.userId === userId){
                return res.status(400).json({ error: "You can't vote your own idea" });
            }

            const vote = await Vote.findOne({ where: { userId, ideaId: id } });
            if(!vote){
                await Vote.create({ vote: -1, userId, ideaId: id });
                return res.status(201).json({ message: "Downvote registered" });
            }

            if(vote.vote === 1){
                await vote.update({ vote: -1 });
                return res.status(200).json({ message: "Vote updated from upvote to downvote" });
            } else{
                await vote.destroy();
                return res.status(200).json({ message: "Downvote removed" });
            }
        } catch(e){
            Logger.logMessage(`Error downvoting idea: ${e.message}`, "ERROR");
            return res.status(500).json({ error: e.message });
        }
    }
}

export default VoteController;