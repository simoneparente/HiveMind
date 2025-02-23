"use strict";

import User from "../models/User.js";


class UserController {

    static async get(req, res){
        try {
            const users = await User.findAll();
            return res.status(200).json({users});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async userExists(user){
        if(!user){
            Logger.logMessage(`User ${username} not found`, "ERROR");
            return false;
        }
        return true;
    }

}

export default UserController;