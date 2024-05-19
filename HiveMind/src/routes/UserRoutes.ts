import { Router } from 'express';
import sql from '../data/db'
const router = Router();



router.get('/users', async (req, res) => {
  const users = await sql`SELECT * FROM h.Utente`;
  res.send(users);
});

//Registrazione di un utente, inviare richiesta contenente JSON nel body
router.post('/register', async (req, res) => {
  const { email, username, password,  } = req.body;
  let checkUsername = await sql`SELECT * FROM h.Utente WHERE username = ${username}`;
  let checkEmail = await sql`SELECT * FROM h.Utente WHERE email = ${email}`;
  if(checkUsername.count==0){
    if(checkEmail.count==0){
    await sql`INSERT INTO h.Utente (email, username, password) VALUES (${email},${username}, ${password})`;
    res.send('Utente inserito');
    } else{
      res.send('Email già esistente');
    }
  } else{
    res.send('Username già in uso');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await sql`SELECT * FROM h.Utente WHERE username = ${username} AND password = ${password}`;
  if (user.count == 0) {
    res.send('Utente non trovato');
  } else {
    res.send('Utente trovato');
  }
});


export default router;