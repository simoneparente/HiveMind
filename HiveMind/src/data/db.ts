import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/postgres')




export async function connectToDatabase() {
  await import('../model/associations');
  await sequelize.sync()
  try {
    sequelize.authenticate();
    console.log('Connessione al database effettuata.');
  } catch (error) {
    console.error('Connessione al database fallita', error);
  }
  await sequelize.query('CREATE SCHEMA IF NOT EXISTS "h";');
  console.log('Schema creato');
  await sequelize.sync({ force: false }).then(() => {
    console.log("Tabelle create");
});
}
export default sequelize;