import { Model, DataTypes } from 'sequelize';
import sequelize from "../data/db";

class Idea extends Model {}

Idea.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [4, 50]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [4, 400]
        }
    },
    dateTime: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
    {
    sequelize,
    modelName: 'Idea',
    tableName: "Ideas",
    schema: "h",
    hooks:{
        beforeCreate: (idea: Idea) =>{
            idea.dataValues.dateTime = Date.now;
        }
    }
}
);

export default Idea;