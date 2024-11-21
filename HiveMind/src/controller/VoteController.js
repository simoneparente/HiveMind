"use strict";

import Idea from "../model/Idea";
import User, { getIdbyUsername } from "../model/User";
import Vote from "../model/Vote";


class VoteController{

    static async getAll(req, res){
        const votes = await Vote.findAll();
        res.status(200).json(votes);

    } 

    static async vote(req, res){
    let ideaID = req.params.ideaID;
    if(ideaID.includes(":")){
        ideaID = ideaID.split(":")[1];
    }
    const username = req.body.username;
    const user = await getIdbyUsername(username);
    
    if(!user){
        return res.status(401).json({message: "User not found"});
    }

    const voteInput = req.body.vote;
    if(!["+1", "-1"].includes(voteInput)){
        return res.status(400).json({message: "Invalid vote"});
    }
    
    const idea = await Idea.findByPk(ideaID);
    if(!idea){
        return res.status(404).json({message: "Idea not found"});
    }
    console.log("\n\nVote: " + parseInt(voteInput));
    const existingVote = await Vote.findOne({ where: { userId: user.id, ideaId: idea.id } });
    if(existingVote){
        if(existingVote.vote === parseInt(voteInput)){
            await existingVote.destroy();
            return res.status(200).json({message: "Vote removed successfully"});
        } else {
            existingVote.vote = parseInt(voteInput);
            await existingVote.save();
            return res.status(200).json({message: "Vote updated successfully"});
        }
    } else {
        const vote = Vote.build({
            vote: parseInt(voteInput),
            userId: user.id,
            ideaId: idea.id
        });
        try{
            await vote.save();
            res.status(200).json({message: "Vote saved successfully"});
        } catch(err){
            res.status(500).json({message: "Error saving vote: " + err});
        }
    }
}
}


export default VoteController;