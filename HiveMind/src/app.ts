import "./setup.ts"
import express from 'express';
import router  from './routes/UserRoutes.ts';
import { cleanup } from "./data/db.ts";

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
    cleanup();
})

app.use(express.json());

app.use("/api/users", router);

router.get("/", (res: Response) => {res.send("Hello Hivemind")});





