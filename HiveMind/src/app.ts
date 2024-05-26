import http from "http";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import Idea from "./model/Idea";

import User from "./model/User";
import { createUser } from "./model/User";
import users from "./routes/UserRoutes";

import sequelize, { connectToDatabase } from "./data/db";


import pg from 'pg';

dotenv.config();

const app : Express = express();
const PORT = 3000;
connectToDatabase().then(() =>{
  console.log("Connesso al database");
  });

  app.get("/", async (req, res) => {
    res.send("prova app.get!");
    try {
      await createUser("pippo", "pluto", "paperino");
      const allUsers = await User.findAll();
      console.log('All users:', JSON.stringify(allUsers, null, 2));
    } catch (error) {
      console.error('Error:', error);
    }
  });

  app.use(express.json());
  app.use("/api", users);




app.listen(PORT, () => {
  console.log(`Server in ascolto http://localhost:${PORT}`);
});