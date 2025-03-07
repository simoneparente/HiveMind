import sequelize from "./data/db.js";
import User from "./models/User.js";
import Idea from "./models/Idea.js";
import Vote from "./models/Vote.js";
import Comment from "./models/Comment.js";
import { createAssociations } from "./models/associations.js";

async function cleanDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.query('CREATE SCHEMA IF NOT EXISTS h;');

        User.createModel();
        Idea.createModel();
        Vote.createModel();
        Comment.createModel();

        createAssociations();

        await sequelize.drop({ schema: 'h' });

        await sequelize.sync({ force: true });

        console.log("Database cleaned successfully");
    } catch (error) {
        console.error("Error cleaning database:", error);
        process.exit(1);
    }
}

await cleanDatabase();