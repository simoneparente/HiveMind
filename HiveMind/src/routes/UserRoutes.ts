import { Router } from "express";

import {register, getAllUsers, login} from '../controller/authController.ts'


const router = Router();


router.post('/register', register);

router.post("/login", login);

router.get('/get', getAllUsers);

export default router;