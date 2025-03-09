import { Router } from "express";
import VoteController from "../controllers/VoteController.js";

const voteRouter = Router();

/**
 * @swagger
 * /api/votes/upvote/{id}:
 *   put:
 *     summary: Upvote an idea
 *     description: Registers an upvote for a specific idea.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the idea to upvote.
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *         description: The token for user authentication.
 *     responses:
 *       201:
 *         description: Vote registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote registered"
 *       200:
 *         description: Vote removed or updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote removed"
 *                 updatedMessage:
 *                   type: string
 *                   example: "Vote updated"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You can't vote your own idea"
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
voteRouter.put("/upvote/:id", VoteController.upvote);

/**
 * @swagger
 * /api/votes/downvote/{id}:
 *   put:
 *     summary: Downvote an idea
 *     description: Registers a downvote for a specific idea.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the idea to downvote.
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *         description: The token for user authentication.
 *     responses:
 *       201:
 *         description: Vote registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote registered"
 *       200:
 *         description: Vote removed or updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote removed"
 *                 updatedMessage:
 *                   type: string
 *                   example: "Vote updated"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You can't vote your own idea"
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
voteRouter.put("/downvote/:id", VoteController.downvote);

export default voteRouter;
