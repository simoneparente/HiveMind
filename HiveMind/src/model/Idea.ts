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

Idea.belongsTo(User, {foreignKey: 'id'});
Idea.hasMany(Commento, {foreignKey: 'id'});
Idea.hasMany(Voto, {foreignKey: 'id'});

export default Idea;