import http from "http";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app : Express = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server in ascolto http://localhost:${PORT}`);
});