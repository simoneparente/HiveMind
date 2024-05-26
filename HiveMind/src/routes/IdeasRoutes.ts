import { Router } from 'express';
import sequelize from '../data/db'
import { getCurrentTimestamp } from '../utils';
import Idea from '../model/Idea';
import { createIdea } from '../model/Idea';

import { DataTypes } from 'sequelize';

const router = Router();

//Idee più controverse
router.get('/ideas/controversial', async (req, res) => {
    const ideas = await sequelize
    .query(`SELECT IUVC.Titolo,
            IUVC.Creatore,
            IUVC.Descrizione, 
            IUVC.DataOra, 
            IUVC.saldovoti  
            FROM h.IdeaUtenteVotiControverse AS IUVC`);
    res.send(ideas);
  });

//Idee più mainstream
router.get('/ideas/mainstream', async (req, res) => {
    const ideas = await sequelize
    .query(`SELECT IUVMS.Titolo,
            IUVMS.Creatore,
            IUVMS.Descrizione, 
            IUVMS.DataOra, 
            IUVMS.saldovoti
            FROM h.IdeaUtenteVotiMainstream AS IUVMS`);
    res.send(ideas);
});

//Idee più unpopular
router.get('/ideas/unpopular', async (req, res) => {
    const ideas = await sequelize
    .query(`SELECT IUVUP.Titolo,
            IUVUP.Creatore,
            IUVUP.Descrizione, 
            IUVUP.DataOra, 
            IUVUP.saldovoti
            FROM h.IdeaUtenteVotiUnpopular AS IUVUP`);
    res.send(ideas);
});

router.get('/allIdeas', async (req, res) => {
    const ideas = await Idea.findAll();
    res.send(ideas);
});

router.post('/ideas/newIdea', async (req, res) => {
    let timestamp = getCurrentTimestamp();
    const { titolo, idUtente, descrizione } = req.body;
    console.log("idUtente: ", idUtente);
    console.log("titolo: ", titolo);
    console.log("descrizione: ", descrizione);
    await createIdea(idUtente, titolo, descrizione, timestamp);
    res.send('Idea inserita');
})

export default router;