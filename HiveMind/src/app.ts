import http from "http";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
//import { registerUser, getUsers } from "./data/User";
import ideas from "./routes/IdeasRoutes";
import users from "./routes/UserRoutes";

dotenv.config();

const app : Express = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("prova app.get!");
});

app.use(express.json());
app.use("/api", ideas, users);


app.listen(PORT, () => {
  console.log(`Server in ascolto http://localhost:${PORT}`);
});