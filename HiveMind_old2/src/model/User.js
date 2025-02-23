"use strict";
import { Model, DataTypes } from 'sequelize';
import sequelize from "../data/db";

class User extends Model {

  static createModel(){
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [4, 20]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      }
    }, 
    {
      sequelize,
      modelName: 'User',
      tableName: "Users",
      schema: "h"
    });
  }
}



export function getIdbyUsername(username){
  return User.findOne({ where: { username: username }});
}

export function getUsernameById(id){
  const user = User.findOne({where: {id: id}});
  if(user){
    return user.username;
  }
}


export default User;