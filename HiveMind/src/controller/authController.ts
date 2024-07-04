import 'dotenv';
import {Request, Response} from 'express';
import User from '../model/User';
import { encrypt } from '../utils/encryption';
import AuthValidator from '../utils/AuthValidator';
import Jwt from 'jsonwebtoken';


const SECRET_KEY = process.env.SECRET_KEY;

async function register(req: Request, res: Response){
    try{
        if(!AuthValidator.validateRegister(req)) 
            return res.status(400).send("Bad request");
        const {username, email, password} = req.body;
        if(await AuthValidator.existing("email", email)){
            return res.status(409).send('Email already exists');
        }
        if(await AuthValidator.existing("username", username)){
            return res.status(409).send('Username already exists');
        }
        const hashed = await encrypt(password);
        await User.create({username, email, password: hashed});
        res.status(201).send(`User ${username} with email ${email}'s registration was successful!`);
    } catch(error){
        console.error(`Error registering user: ${error}`);
        res.status(500).send('Internal server error');
    }
    }



async function login(req: Request, res: Response){
    try{
        if(!AuthValidator.validateLogin(req))
             return res.status(400).send("Bad request");
        const {username, password} = req.body;
        const result = await AuthValidator.checkCredentials(username, password);
        if(!result) return res.status(401).send("Invalid credentials");
        const user = await User.findOne({ where: { username: username}});
        if(!user) return res.status(500).send("Internal server error");
        sendLoginResponse(res, user);
    } catch(error){
        console.error(`Error logging in: ${error}`);
        res.status(500).send('Internal server error');
    }
}

function sendLoginResponse(res: Response, user: User){
    const token = generateToken(user);
    res.set({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    res.status(200).send(`User ${user.dataValues.username} logged in successfully!`);
}


function generateToken(user: User){
    const payload = {
        id: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email,
    };
    try{
        const token = Jwt.sign(payload, SECRET_KEY, {expiresIn: '24h'});
        return token;
    } catch (error){
        console.error(`Error generating token: ${error}`);
        return null;
    }
}


async function getAllUsers(req: Request, res: Response){
    let users = await User.findAll();
    res.status(200).send(users);
}




export { register, login, getAllUsers };