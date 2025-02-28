"use strict";

import AuthController from "../controllers/AuthController.js";
import Logger from "../utils/Logger.js";

export function requireAuthorization(req, res, next) {
  if (!req.headers.authorization) {
    Logger.logMessage("No authorization header found", "ERROR");
    next({ status: 401, message: "Unauthorized" });
    return;
  }
  const header = req.headers.authorization;
  const token = header.split(" ")[1];
  if (!token) {
    next({ status: 401, message: "Unauthorized" });
    return;
  }
  AuthController.verifyToken(token, (err, decoded) => {
    if (err) {
      next({ status: 401, message: "Unauthorized" });
      return;
    }
    req.username = decoded.username;
    next();
  });
}
