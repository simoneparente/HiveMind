import { Router } from 'express';
import sql from '../data/db'
import { getCurrentTimestamp } from '../utils';
const router = Router();



//Idee più controverse
router.get('/ideas/controversial', async (req, res) => {
    const ideas = await sql`SELECT IUVC.Titolo, IUVC.Creatore, IUVC.Descrizione, IUVC.DataOra, IUVC.saldovoti  
                            FROM h.IdeaUtenteVotiControverse AS IUVC`;
    res.send(ideas);
  });

//Idee più mainstream
router.get('/ideas/mainstream', async (req, res) => {
    const ideas = await sql`SELECT IUVMS.Titolo, IUVMS.Creatore, IUVMS.Descrizione, IUVMS.DataOra, IUVMS.saldovoti
                            FROM h.IdeaUtenteVotiMainstream AS IUVMS`;
    res.send(ideas);
});

//Idee più unpopular
router.get('/ideas/unpopular', async (req, res) => {
    const ideas = await sql`SELECT IUVUP.Titolo, IUVUP.Creatore, IUVUP.Descrizione, IUVUP.DataOra, IUVUP.saldovoti
                            FROM h.IdeaUtenteVotiUnpopular AS IUVUP`;
    res.send(ideas);
});

router.post('/ideas/newIdea', async (req, res) => {
    let timestamp = getCurrentTimestamp();
    const { titolo, creatore, descrizione } = req.body;
    await sql`INSERT INTO h.ins_Idea(Username, Titolo, Descrizione, DataOra) 
              VALUES (${creatore},${titolo}, ${descrizione}, ${timestamp})`;
    res.send('Idea inserita');
});


export default router;