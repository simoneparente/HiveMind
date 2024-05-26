import { Model, DataTypes } from 'sequelize';
import sequelize from '../data/db'

import User from './User';
import Idea from './Idea';

class Commento extends Model{};

Commento.init(
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
        idIdea: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Testo: {
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
        modelName: 'Commento',
        tableName: "Commenti",
        schema: "h",
    }
);

//Commento.belongsTo(User, { foreignKey: 'idUser', as: 'user' });
//Commento.belongsTo(Idea, { foreignKey: 'idIdea', as: 'idea' });

export default Commento;