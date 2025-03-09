"use strict";

import User from "../models/User.js";
import Logger from "../utils/Logger.js";

class UserController {

  static async userExists(user) {
    if (!user) {
      Logger.logMessage(`User ${username} not found`, "ERROR");
      return false;
    }
    return true;
  }

  static async getUserbyUsername(username) {
    return User.findOne({ where: { username: username } });
  }

  
  static async getUsernameById(id) {
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      return user.username;
    }
  }
}

export default UserController;
