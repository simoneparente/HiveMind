"use strict";

import { Sequelize } from "sequelize";
import User from "../models/User.js";
import Idea from "../models/Idea.js";
import { createAssociations } from "../models/associations.js";
import Vote from "../models/Vote.js";
import Comment from "../models/Comment.js";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL not defined in .env file");
}

const sequelize = new Sequelize(DB_URL);

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    User.createModel();
    Idea.createModel();
    Vote.createModel();
    Comment.createModel();
    createAssociations();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
