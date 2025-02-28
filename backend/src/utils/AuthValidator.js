import { compare } from "./hashing.js";
import Logger from "./Logger.js";
import User from "../models/User.js";

/**
 * Class representing an AuthValidator.
 */
export class AuthValidator {
  /**
   * Validate the registration request.
   * @param {Object} req - The request object.
   * @param {Object} req.body
   * @param {string} req.body.username
   * @param {string} req.body.email
   * @param {string} req.body.password
   * @returns {boolean} - Returns false if any field is missing.
   */
  static validateRegisterRequest(req) {
    const { username, email, password } = req.body;
    return username && email && password;
  }

  /**
   * Validate the login request.
   * @param {Object} req - The request object.
   * @param {Object} req.body - The body of the request.
   * @param {string} req.body.username
   * @param {string} req.body.password
   * @returns {boolean} - Returns false if any field is missing.
   */
  static validateLoginRequest(req) {
    const { username, password } = req.body;
    return username && password;
  }

  /**
   * Check the credentials of the user.
   * @param {string} username - The username.
   * @param {string} password - The password.
   * @returns {Promise<boolean>} - Returns true if the credentials are valid, otherwise false.
   */
  static async checkCredentials(username, password) {
    let user = await User.findOne({ where: { username } });
    Logger.logMessage(
      `User found in checkCredentials: ${user.dataValues.username}`,
      "DEBUG",
    );
    if (user === null) return false;
    return compare(password, user.dataValues.password);
  }
}
