"use strict";

import { Sequelize } from "sequelize";
import User from "../models/User.js";
import Idea from "../models/Idea.js";
import { createAssociations } from "../models/associations.js";
import Vote from "../models/Vote.js";
import Comment from "../models/Comment.js";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME) {
  throw new Error("One or more required environment variables are not defined");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  schema: "h",
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.query(`CREATE SCHEMA IF NOT EXISTS h;`);

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
