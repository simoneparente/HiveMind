import { Sequelize } from 'sequelize';
import User from '../model/User.js';
import Idea from '../model/Idea.js';
import Comment from '../model/Comment.ts';
import Vote from '../model/Vote.ts';
import { createAssociations } from '../model/associations.ts';



const DB_URL: string | undefined = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL not defined in .env file");
}

const sequelize = new Sequelize(DB_URL, {
  logging: console.log,
});

export async function connect() {
  try {
    // Autenticazione e sincronizzazione del database
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    //Creazione Models
    User.createModel();
    Idea.createModel();
    Comment.createModel();
    Vote.createModel();
    //Creazione associazioni
    createAssociations();
    await sequelize.sync({alter: true});
    console.log("Database synchronized successfully.");

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function cleanup() {
  try {
    await sequelize.drop({ cascade: true });
    await sequelize.sync({ force: true });
    console.log("Database dropped and re-synchronized.");
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}

export default sequelize;
