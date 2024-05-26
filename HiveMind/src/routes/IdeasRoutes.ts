import { Router } from 'express';
import sequelize from '../data/db'
import { getCurrentTimestamp } from '../utils';

const router = Router();

//Idee più controverse