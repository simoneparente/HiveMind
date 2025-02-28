"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../data/db.js";

class Comment extends Model {
  static createModel() {
    Comment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [4, 400],
          },
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ideaId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            isDate: true,
          },
        },
      },
      {
        sequelize,
        modelName: "Comment",
        tableName: "Comments",
        schema: "h",
      },
    );
  }
}

export default Comment;
