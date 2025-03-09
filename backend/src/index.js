"use strict";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connect } from "./data/db.js";
import { requireAuthorization } from "./middleware/authorization.js";
import authRouter from "./routes/authRoutes.js";
import ideaRouter from "./routes/ideaRoutes.js";
import voteRouter from "./routes/voteRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type, Authorization",
    exposedHeaders: ["Authorization"],
  }),
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connect();
});

app.use(express.json());

app.use("/api/auth", authRouter);

app.use(requireAuthorization);

app.use("/api/ideas", ideaRouter);

app.use("/api/votes", voteRouter);

app.use("/api/comments", commentRouter);
