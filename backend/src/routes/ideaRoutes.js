import { Router } from "express";
import IdeaController from "../controllers/IdeaController.js";

const ideaRouter = Router();

/**
 * @swagger
 * /api/ideas/get:
 *   get:
 *     summary: Retrieve ideas
 *     description: Returns a list of ideas based on the sort criteria.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *         description: The token for user authentication.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [mainstream, unpopular, controversial]
 *         description: The criteria to sort ideas by.
 *     responses:
 *       200:
 *         description: A list of ideas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                   Total:
 *                     type: integer
 *                   Upvotes:
 *                     type: integer
 *                   Downvotes:
 *                     type: integer
 *                   score:
 *                     type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
ideaRouter.get("/get", (req, res) => {
  const { sortBy } = req.query;
  switch (sortBy) {
    case "mainstream":
      return IdeaController.getMainstreamIdeas(req, res);
    case "unpopular":
      return IdeaController.getUnpopularIdeas(req, res);
    default:
      return IdeaController.getControversialIdeas(req, res);
  }
});

/**
 * @swagger
 * /api/ideas/get/{id}:
 *   get:
 *     summary: Retrieve an idea by ID
 *     description: Returns a single idea by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the idea to retrieve.
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *         description: The token for user authentication.
 *     responses:
 *       200:
 *         description: An idea object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dateTime:
 *                   type: string
 *                   format: date-time
 *                 upvotes:
 *                   type: integer
 *                 downvotes:
 *                   type: integer
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       user:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *       404:
 *         description: Idea not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error 404: Idea {id} not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
ideaRouter.get("/get/:id", IdeaController.getIdeaById);

/**
 * @swagger
 * /api/ideas/new:
 *   post:
 *     summary: Create a new idea
 *     description: Creates a new idea.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *         description: The token for user authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Idea created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dateTime:
 *                   type: string
 *                   format: date-time
 *                 userId:
 *                   type: integer
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
ideaRouter.post("/new", IdeaController.postIdea);

export default ideaRouter;
