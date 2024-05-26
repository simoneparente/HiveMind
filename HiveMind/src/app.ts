import http from "http";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import Idea from "./model/Idea";

import User from "./model/User";
import { register } from "./model/User";

import users from "./routes/UserRoutes";
import ideas from "./routes/IdeasRoutes";

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
  });

  app.use(express.json());
  app.use("/api", users, ideas);




app.listen(PORT, () => {
  console.log(`Server in ascolto http://localhost:${PORT}`);
});