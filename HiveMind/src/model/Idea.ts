import { Model, DataTypes } from 'sequelize';
import sequelize from '../data/db'

import User from './User';
import Commento from './Commento';
import Voto from './Voto';

class Idea extends Model{};

Idea.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Titolo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Descrizione: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DataOra: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'Idea',
        tableName: "Ideas",
        schema: "h",
    }
);

Idea.belongsTo(User, { foreignKey: 'idUser', as: 'user' });
Idea.hasMany(Commento, { foreignKey: 'idIdea', as: 'commenti' });
Idea.hasMany(Voto, { foreignKey: 'idIdea', as: 'voti' });


export async function createIdea(idUser: number, Titolo: string, Descrizione: string, DataOra: String) {
    return await Idea.create({idUser, Titolo, Descrizione, DataOra});
}
export default Idea;