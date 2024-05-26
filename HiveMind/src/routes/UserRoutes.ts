import { Router } from "express";
import sequelize from "../data/db";
import User, { register } from "../model/User";
const router = Router();

router.post("/register", async (req, res) => {
    try{
        const { username, email, password } = req.body;
        let checkUsername = await User.findOne({ where: { username } });
        let checkEmail = await User.findOne({ where: { email } });
        if (!checkUsername) {
            if (!checkEmail) {
                await register(username, email, password);
                res.send("Utente inserito");
            } else {
                res.send("Email già esistente");
            }
        } else {
            res.send("Username già in uso");
        }
    } catch (e) {
        console.log(e);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username, password } });
        if (!user) {
            res.send("Utente non trovato");
        } else {
            res.send("Login effettuato");
        }
    } catch (e) {
        console.log(e);
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (e) {
        console.log(e);
    }
});

export default router;