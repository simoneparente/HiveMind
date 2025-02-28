"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../data/db.js";

class Vote extends Model {
  static createModel() {
    Vote.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        vote: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
            isIn: [[-1, 1]],
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
      },
      {
        sequelize,
        modelName: "Vote",
        tableName: "Votes",
        schema: "h",
      },
    );
  }
}

export default Vote;
