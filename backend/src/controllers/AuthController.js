"use strict";

import Jwt from "jsonwebtoken";
import User from "../models/User.js";
import { AuthValidator } from "../utils/AuthValidator.js";
import { encrypt } from "../utils/hashing.js";
import Logger from "../utils/Logger.js";

const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
  static async register(req, res) {
    if (!AuthValidator.validateRegisterRequest(req)) {
      Logger.logMessage("Username, email or password not provided", "ERROR");
      return res
        .status(400)
        .json({ error: "Username, email and password are required" });
    }
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await encrypt(password);
      Logger.logMessage(`Hashed password: ${hashedPassword}`, "DEBUG");
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      Logger.logMessage(`User ${username} created`, "INFO");
      if (!user) {
        Logger.logMessage(`User ${username} could not be created`, "ERROR");
        return res.status(400).json({ error: "User could not be created" });
      }
      return res
        .status(201)
        .json({ message: `User ${username} created successfully` });
    } catch (error) {
      Logger.logMessage(`Error creating user: ${error}`, "ERROR");
      return res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    if (!AuthValidator.validateLoginRequest(req)) {
      Logger.logMessage("Username and password are required", "ERROR");
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!(await AuthValidator.checkCredentials(username, password))) {
        Logger.logMessage(`Invalid credentials for user ${username}`, "ERROR");
        return res.status(401).json({ error: "Invalid credentials" });
      }
      Logger.logMessage(`User ${username} logged in`, "INFO");
      await AuthController.sendLoginResponse(res, user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async sendLoginResponse(res, user) {
    const token = AuthController.generateToken(user);
    res.set({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    Logger.logMessage(
      `Token for user ${user.dataValues.username} generated`,
      "DEBUG",
    );
    return res.status(200).json({
      message: `User ${user.dataValues.username} logged in successfully!`,
    });
  }

  static generateToken(user) {
    const payload = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      email: user.dataValues.email,
    };
    try {
      const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
      return token;
    } catch (error) {
      Logger.logMessage(`Error generating token: ${error}`, "ERROR");
      return null;
    }
  }

  static verifyToken(token, callback) {
    Jwt.verify(token, SECRET_KEY, callback);
  }

  static async getUserIdByToken(header) {
    let userId = null;
    const token = header.split(" ")[1];
    try {
      const decoded = Jwt.decode(token);
      userId = decoded.id;
    } catch (error) {
      Logger.logMessage(`Error decoding token: ${error}`, "ERROR");
    }
    return userId;
  }
}

export default AuthController;
