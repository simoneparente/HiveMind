"use strict";
import { getIdbyUsername } from "../model/User";
import Comment from "../model/Comment";

class CommentController{
/*
  * TODO: CHECK AUTHORIZATION TOKEN WITH GUARD!!!
  */

    static async postComment(req, res){
        let ideaID = req.params.ideaID;
        if(ideaID.includes(":")){
          ideaID = ideaID.split(":")[1];
        }
        const username = req.body.username;
        const user = await getIdbyUsername(username);
        if (!user) {
          return res.status(404).json({ error: `User not found: ${username}` });
        }

        const comment = Comment.build({
          text: req.body.text,
          userID: user.id,
          ideaID: ideaID,
          date: new Date()
        });
        
        try{
          await comment.save(); 
          res.status(201).json(comment)
        } catch(error){
          console.log(error);
          res.status(500).json({error: "Error creating comment"})
        } 
      }
}

export default CommentController;