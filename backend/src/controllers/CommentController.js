"use strict";

import AuthController from "./AuthController.js";
import Comment from "../models/Comment.js";

class CommentController {
  static async publish(req, res) {
    try {
      const { id } = req.params;
      const userId = await AuthController.getUserIdByToken(
        req.headers.authorization,
      );
      const { text } = req.body;
      const comment = await Comment.create({
        text,
        userId,
        ideaId: id,
        date: new Date(),
      });
      if (!comment) {
        return res.status(400).json({ error: "Comment could not be created" });
      }
      return res.status(201).json({ message: "Comment created successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default CommentController;
