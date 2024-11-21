import { Model, DataTypes } from 'sequelize';
import sequelize from "../data/db";

class Vote extends Model {

    static createModel(){
        Vote.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            vote: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                }
            },
            ideaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true
                }
            }
        }, {
            sequelize,
            modelName: 'Vote',
            tableName: "Votes",
            schema: "h",
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'ideaId']
                }
            ]
        });
    }
}


export default Vote;