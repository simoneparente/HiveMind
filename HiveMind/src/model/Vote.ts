import { Model, DataTypes } from 'sequelize';
import sequelize from "../data/db";

class Vote extends Model {}

Vote.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Vote: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
    }
}, {
    sequelize,
    modelName: 'Vote',
    tableName: "Votes",
    schema: "h",
});

export default Vote;