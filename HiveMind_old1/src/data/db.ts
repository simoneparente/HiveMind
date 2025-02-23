import { Sequelize } from 'sequelize';

const DB_URL: string | undefined = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL non definito all'interno del file.env");
}

const sequelize = new Sequelize(DB_URL);

export async function connectToDatabase() {
  try {
    await import('../model/associations');
    await sequelize.sync(); // add a timeout of 10 seconds
    await sequelize.authenticate();
    console.log('Connessione al database effettuata.');
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS "h";');
    console.log('Schema creato');
    await sequelize.sync({ force: false });
    console.log("Tabelle create");
  } catch (error) {
    console.error('Errore durante la connessione al database:', error);
  }
}

export default sequelize;