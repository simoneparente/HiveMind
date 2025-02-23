"use strict";
import Idea from "../model/Idea";
import Vote from "../model/Vote";
import Comment from "../model/Comment";
import User, {getIdbyUsername} from "../model/User";
import {Request, Response} from 'express';
import { NOW, where } from "sequelize";


export default class IdeaController{
  /*
  * TODO: CHECK AUTHORIZATION TOKEN WITH GUARD!!!
  */
    static async postIdea(req, res){
      const username = req.body.username;
      const user = await getIdbyUsername(username);
      if (!user) {
        return res.status(404).json({ error: `User not found: ${username}` });
      }

      const idea = Idea.build({
        title: req.body.title,
        description: req.body.description,
        dateTime: new Date(), // or use a default value for dateTime
        userId: user.id
      });


      await idea.save();
      res.status(201).json(idea);
    }


    static async getIdeaById(req, res){
      let id = req.params.id;
      console.log("req.params.id: " + id);
      if(id.includes(":")){
        id = id.split(":")[1];
      }
      let idea = await Idea.findByPk(id, {
        include: [{
            model: User, // Include l'utente associato
            attributes: ['username', 'id'], // Recupera solo il campo username
        },
        {
          model: Comment,
          attributes: ['userId', 'text', 'date']
        }]
    });
    const [upvotes, downvotes] = [
      await Vote.count({where: {ideaId: id, vote: 1}}),
      await Vote.count({where: {ideaId: id, vote: -1}})
    ];

      if (!idea) {
        return res.status(404).json({ error: `Error 404: Idea ${id} not found:` });
      }
      return res.status(200).json({
        idea,
        upvotes,
        downvotes
    });
    }
    

  }

  export async function getAllIdeas(req, res){
    let ideas = await Idea.findAll();
    return res.status(200).json(ideas);
  }

  export async function prova(req, res){
    return res.status(201).send("prova");
  }