import { Model, DataTypes } from 'sequelize';
import sequelize from '../data/db'

import User from './User';
import Idea from './Idea';

class Voto extends Model{};

Voto.init(
    {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        idIdea: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        Tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Voto',
        tableName: "Voti",
        schema: "h",
    }
);



export default Voto;