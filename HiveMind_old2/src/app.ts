import "./setup.ts"
import express from 'express';
import userRouter  from './routes/UserRoutes';
import cors from 'cors';
import { cleanup, connect } from "./data/db";
import ideaRouter from "./routes/IdeaRoutes.ts";
import commentRouter from "./routes/CommentRoutes.ts";
import voteRouter from "./routes/VoteRoutes.ts";

const app = express();
const PORT = process.env.PORT;


app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type,Authorization'
}));

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
    //cleanup();
    connect();
})

app.use(express.json());

app.use("/api/users", userRouter);

app.use("/api/ideas", ideaRouter)

app.use("/api/comments", commentRouter);
app.use("/api/votes", voteRouter);






