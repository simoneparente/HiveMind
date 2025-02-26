"use strict";

import Idea from "../models/Idea.js";
import User, { getUserbyUsername } from "../models/User.js";
import Vote from "../models/Vote.js";
import Comment from "../models/Comment.js";
import Logger from "../utils/Logger.js";
import UserController from "./UserController.js";


class IdeaController{
    
    static async postIdea(req, res){
        const { username } = req.body;
        const user = await getUserbyUsername(username);
        if (!await UserController.userExists(user)){
            return res.status(404).json({error: "User not found"});
        }

        Logger.logMessage(`Creating idea for user ${user.username} with id ${user.id}`, "INFO");
        const idea = Idea.build({
            title: req.body.title,
            description: req.body.description,
            dateTime: new Date(), // or use a default value for dateTime
            userId: user.dataValues.id
        });
        try {
            await idea.save();
            Logger.logMessage(`Idea ${idea.title} created by ${username}`, "INFO");
            return res.status(201).json(idea);
        } catch(e) {
            Logger.logMessage(`Error creating idea: ${e.message}`, "ERROR");
            return res.status(500).json({error: e.message});
        }
    }

    
    static async getIdeas(req, res){
        let ideas = await Idea.findAll();
        return res.status(200).json(ideas);
    }

    static async getIdeaById(req, res){
        let id = IdeaController.getIdeaId(req.params.id);
        Logger.logMessage(`Searching for idea ${id}`, "INFO");
        let idea = await Idea.findByPk(id, {
          include: [{
              model: User,
              attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['text', 'date'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
          }]
      });
  
        if (!idea) {
            Logger.logMessage(`Idea ${id} not found`, "ERROR");
            return res.status(404).json({ error: `Error 404: Idea ${id} not found:` });
        }
        idea = idea.get({ plain: true }); // Converto in plain object così da poter aggiungere i voti
        [idea.upvotes , idea.downvotes] = await IdeaController.getVotes(id);
        Logger.logMessage(`Idea ${id} found, ${idea.upvotes} upvotes, ${idea.downvotes} downvotes`, "DEBUG");
        return res.status(200).json(idea);
    }

    static getIdeaId(id){
        if(id.includes(":")){
            id = id.split(":")[1];
          }
          return id;
        }

        static async getVotes(id){
            return [
                await Vote.count({ where: { ideaId: id, vote: 1 } }), 
                await Vote.count({ where: { ideaId: id, vote: -1 } })
            ]
        }

}

export default IdeaController;