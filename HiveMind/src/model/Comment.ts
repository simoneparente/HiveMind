import { Model, DataTypes } from 'sequelize';
import sequelize from "../data/db";

class Comment extends Model {}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 200]
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    }
    }, {
    sequelize,
    modelName: 'Comment',
    tableName: "Comments",
    schema: "h",
    hooks: {
        beforeCreate: (comment: Comment) => {
            comment.dataValues.date = Date.now();
            }
        }
    }
);

export default Comment;