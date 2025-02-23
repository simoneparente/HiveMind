import { Router } from "express";

import {register, getAllUsers, login} from '../controller/authController'


const userRouter = Router();


userRouter.post('/register', register);

userRouter.post("/login", login);

userRouter.get('/get', getAllUsers);

export default userRouter;