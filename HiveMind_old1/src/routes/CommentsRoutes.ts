import Comment from "../model/Comment";
import { Router } from "express";
import sequelize from "../data/db";
import { createComment } from "../model/User";

const router = Router();

router.get('/comments', async (req, res) => {
    const comments = await Comment.findAll();
    res.send(comments);
});

router.post('/comments/newComment', async (req, res) => {
    const { username, idIdea, testo } = req.body;
    await createComment(username, idIdea, testo);
    res.send('Commento inserito');
});


export default router;