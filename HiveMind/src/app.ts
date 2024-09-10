import "./setup.ts"
import express from 'express';
import router  from './routes/UserRoutes';
import cors from 'cors';
import { cleanup } from "./data/db";
import { Response } from 'express';

const app = express();
const PORT = process.env.PORT;


app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type,Authorization'
}));

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
    cleanup();
})

app.use(express.json());

app.use("/api/users", router);



router.get("/", (res: Response) => {res.status(200).send('Hello Hivemind')});





