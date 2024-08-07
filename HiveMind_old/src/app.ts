import "./setup"
import express, { Express } from "express";

import users from "./routes/UserRoutes";
import ideas from "./routes/IdeasRoutes";
import comments from "./routes/CommentsRoutes";

import { connectToDatabase } from "./data/db";


const app : Express = express();
const PORT = 3000;
connectToDatabase().then(() =>{
  console.log("Connesso al database");
}).catch((e) => {
  console.log(e);
});

app.get("/", async (req, res) => {
    res.send("Welcome to HiveMind");
});

app.use(express.json());
app.use("/api", users, ideas, comments);




app.listen(PORT, () => {
  console.log(`Server in ascolto http://localhost:${PORT}`);
});