"use strict";

import Idea from "../models/Idea.js";
import User, { getUserbyUsername } from "../models/User.js";
import Vote from "../models/Vote.js";
import Comment from "../models/Comment.js";
import Logger from "../utils/Logger.js";
import UserController from "./UserController.js";
import Sequelize from "sequelize";

class IdeaController {
  static async postIdea(req, res) {
    const { username } = req.body;
    const user = await getUserbyUsername(username);
    if (!(await UserController.userExists(user))) {
      return res.status(404).json({ error: "User not found" });
    }

    Logger.logMessage(
      `Creating idea for user ${user.username} with id ${user.id}`,
      "INFO",
    );
    const idea = Idea.build({
      title: req.body.title,
      description: req.body.description,
      dateTime: new Date(),
      userId: user.dataValues.id,
    });
    try {
      await idea.save();
      Logger.logMessage(`Idea ${idea.title} created by ${username}`, "INFO");
      return res.status(201).json(idea);
    } catch (e) {
      Logger.logMessage(`Error creating idea: ${e.message}`, "ERROR");
      return res.status(500).json({ error: e.message });
    }
  }

  static async getIdeas(res, order, options = {}) {
    try {
      const scoreExpression = options.useAbsoluteScore ?
       'ABS(SUM(CASE WHEN "Votes"."vote" = 1 THEN 1 ELSE 0 END) - SUM(CASE WHEN "Votes"."vote" = -1 THEN 1 ELSE 0 END))'
        : 'SUM(CASE WHEN "Votes"."vote" = 1 THEN 1 ELSE 0 END) - SUM(CASE WHEN "Votes"."vote" = -1 THEN 1 ELSE 0 END)';

      let ideas = await Idea.findAll({
        include: [
          {
            model: Vote,
            attributes: [],
            duplicating: false,
          },
        ],
        attributes: [
          "id",
          "title",
          "description",
          "dateTime",
          [Sequelize.fn("COUNT", Sequelize.col("Votes.ideaId")), "Total"],
          [
            Sequelize.fn(
              "SUM",
              Sequelize.literal(
                'CASE WHEN "Votes"."vote" = 1 THEN 1 ELSE 0 END',
              ),
            ),
            "Upvotes",
          ],
          [
            Sequelize.fn(
              "SUM",
              Sequelize.literal(
                'CASE WHEN "Votes"."vote" = -1 THEN 1 ELSE 0 END',
              ),
            ),
            "Downvotes",
          ],
          [
            Sequelize.literal(scoreExpression),
            "score",
          ],
        ],
        where: {
          dateTime: {
            [Sequelize.Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
          },
        },
        group: ["Idea.id"],
        order: order,
      });

      return res.status(200).json(ideas);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
}


static async getControversialIdeas(req, res) {
    return this.getIdeas(res, [
      [Sequelize.literal('"Total"'), "DESC"],
      [Sequelize.literal("score"), "ASC"],
      ], { useAbsoluteScore: true });
}

static async getMainstreamIdeas(req, res) {
    return this.getIdeas(res, [
        [Sequelize.literal("score"), "DESC"],
        [Sequelize.literal('"Total"'), "DESC"],
    ]);
}

static async getUnpopularIdeas(req, res) {
    return this.getIdeas(res, [
        [Sequelize.literal("score"), "ASC"],
        [Sequelize.literal('"Total"'), "DESC"],
    ]);
}


  static async getIdeaById(req, res) {
    let id = IdeaController.getIdeaId(req.params.id);
    Logger.logMessage(`Searching for idea ${id}`, "INFO");
    let idea = await Idea.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["text", "date"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    if (!idea) {
      Logger.logMessage(`Idea ${id} not found`, "ERROR");
      return res
        .status(404)
        .json({ error: `Error 404: Idea ${id} not found:` });
    }
    idea = idea.get({ plain: true }); // Converted to plain object to add votes
    [idea.upvotes, idea.downvotes] = await IdeaController.getVotes(id);
    Logger.logMessage(
      `Idea ${id} found, ${idea.upvotes} upvotes, ${idea.downvotes} downvotes`,
      "DEBUG",
    );
    return res.status(200).json(idea);
  }

  static getIdeaId(id) {
    if (id.includes(":")) {
      id = id.split(":")[1];
    }
    return id;
  }

  static async getVotes(id) {
    return [
      await Vote.count({ where: { ideaId: id, vote: 1 } }),
      await Vote.count({ where: { ideaId: id, vote: -1 } }),
    ];
  }
}

export default IdeaController;
