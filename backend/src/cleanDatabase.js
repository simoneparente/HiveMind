import sequelize from "./data/db.js";

async function cleanDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log("Database cleaned successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error cleaning database:", error);
        process.exit(1);
    }
}

await cleanDatabase();

