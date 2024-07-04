import { Sequelize } from 'sequelize';

const DB_URL: string | undefined = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL not defined in .env file");
}

const sequelize = new Sequelize(DB_URL);

export async function connect(){
  if(!(await sequelize.showAllSchemas({}))){
    console.log("Schema does not exist. Creating schema...");
    await sequelize.createSchema("h", {});
    console.log("Schema created");
  }
  try{
    await import('../model/associations.ts');
    await sequelize.sync()
    .then(() => {
      sequelize.authenticate();
    })
    .then(() => {
      console.log("Connection has been established successfully.");
    })
  } catch(error){
    console.error("Unable to connect to the database:", error);
  }
}

export async function cleanup(){
  await sequelize.drop({cascade: true});
  await sequelize.sync({force: true});
}



export default sequelize;