# HiveMind

**HiveMind** is a social network that allows users to share ideas, vote on them and comment, all within an environment built with a modern technology stack: **Node.JS, Express.JS, Angular, Tailwind CSS, PostgreSQL**.

This repository contains the entire project divided into two main folders:

- **backend**: contains the Node/Express server with CRUD for ideas, users, JWT authentication, comments, and votes.
- **frontend**: contains the Angular Single Page Application.

## Table of Contents

- [Main Features](#main-features)
- [Technologies](#technologies)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Installation and Startup Instructions](#installation-and-startup-instructions)
  - [Running with Docker](#running-with-docker)
  - [Manual Execution (without Docker)](#manual-execution-without-docker)
- [Main Backend Routes](#main-backend-routes)
- [Main Frontend Features](#main-frontend-features)
- [Notes and Contacts](#notes-and-contacts)

## Main Features

- Registration and login with JWT tokens.
- Ability to post formatted ideas using markdown.
- Ability to leave votes on ideas.
- Ability to leave comments on ideas.
- Rankings of ideas (most popular, most controversial, etc.).
- Action logging to file, with customizable detail levels.
- Responsive frontend interface developed with Angular and Tailwind CSS.

## Technologies

### Backend

- **Node.js** and **Express.js**
- **PostgreSQL** as the relational database.
- **Sequelize** as the ORM for PostgreSQL.
- **bcrypt** for password hashing.
- **jsonwebtoken** for JWT authentication.
- **dotenv / dotenvx** for environment variable management.
- **cors** for cross-origin requests.
- **swagger-ui-express** and **swagger-jsdoc** for API documentation (configurable in `/api-docs`).

### Frontend

- **Angular** as the SPA framework.
- **Tailwind CSS** for styling.
- **ngx-markdown** for rendering Markdown.
- **rxjs** for reactive programming.
- **jwt-decode** for decoding tokens on the frontend.
- **ngx-toastr** for toast notifications.

## Requirements

- **Node.js**
- **npm** as package manager.
- **Angular CLI** (optional, but recommended if running the frontend manually).
- A local installation of **PostgreSQL** (if not using Docker) or **Docker** installed (if using container mode).

## Project Structure

The main structure is as follows:

```
backend/
│
├── src/
│   ├── controllers/
│   │   ├── AuthController.js
│   │   ├── IdeaController.js
│   │   ├── VoteController.js
│   │   ├── CommentController.js
│   │   └── UserController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Idea.js
│   │   ├── Comment.js
│   │   ├── Vote.js
│   │   └── associations.js
│   ├── utils/
│   │   ├── Logger.js
│   │   ├── AuthValidator.js
│   │   └── hashing.js
│   ├── data/
│   │   └── db.js (connection to PostgreSQL)
│   └── routes/
│       ├── authRoutes.js
│       ├── ideaRoutes.js
│       ├── voteRoutes.js
│       └── commentRoutes.js
├── index.js (main Express entry point)
├── cleanDatabase.js (script to clean the database)
├── docker-compose.yml (configuration for the Postgres service and the backend)
└── package.json
```

```
frontend/
│
├── src/
│   └── app/
│       ├── landing-page/
│       ├── login/
│       ├── register/
│       ├── home/
│       ├── navbar/
│       └── footer/
└── package.json
```

```
HiveMind.pdf (compiled PDF document)
```

## Environment Setup

In the backend, the following environment variables are used (managed via **dotenv/dotenvx**):

- `PORT`: Port on which the Express app listens (e.g., 3000).
- `DB_HOST`: Host of the PostgreSQL DB (e.g., localhost or the service name in Docker).
- `DB_USER`: Database user (e.g., postgres).
- `DB_PASSWORD`: Database password.
- `DB_NAME`: Name of the database.
- `DB_PORT`: Port of the database (e.g., 5432).
- `SECRET_KEY`: Secret key for signing JWT tokens.

> You can place these variables in a `.env` file inside the “backend” folder, or set them directly in your environment.

## Installation and Startup Instructions

### Running with Docker

1. Make sure **Docker** is installed and running.
2. In the root folder, run the following command to start the backend and the PostgreSQL database:
   ```bash
   docker-compose up --build
   ```

This will start the backend on port **3000**, thePostgreSQL database on port **5432** and
the frontend on port **4200**.

### Manual Execution (without Docker)

1. Ensure that PostgreSQL is running locally (or on another configured host).
2. Properly configure the `.env` file (see [Environment Setup](#environment-setup)) or export the environment variables.
3. Start the backend:
   ```bash
   npm install
   npm start
   ```
   By default, this will start Express on port **3000**.
4. In another terminal, start the frontend:
   ```bash
   cd frontend
   npm install
   ng start
   ```
5. Open your browser and navigate to [http://localhost:4200](http://localhost:4200) to view the user interface.

## Main Backend Routes

### Authentication (AuthController)

- **POST** `/api/auth/register` – Registers a new user.
- **POST** `/api/auth/login` – Logs in and provides a JWT.

### Ideas (IdeaController)

- **GET** `/api/ideas/get` – Retrieves ideas (filterable by popularity, controversy, etc.).
- **GET** `/api/ideas/get/:id` – Retrieves the details of a single idea (including comments and vote counts).
- **POST** `/api/ideas/new` – Creates a new idea (authentication required).

### Votes (VoteController)

- **PUT** `/api/votes/upvote/:id` – Upvotes an idea.
- **PUT** `/api/votes/downvote/:id` – Downvotes an idea.

### Comments (CommentController)

- **PUT** `/api/comments/:id` – Adds a comment to an idea.

> **Note:** To access protected routes, you must send the header `Authorization: Bearer <token>`.

## Main Frontend Features

- **Landing Page** with a brief description of the application, "Register Now" and "Login" buttons.
- **Authentication forms** (page `/register`) and login form (page `/login`).
- **Protected Home Page** (page `/home`) to view the stream of ideas and filter them (Mainstream, Controversial, Unpopular).
- **Idea Detail Page** that displays comments, votes, and offers buttons to vote and comment.
- **Sidebar Navbar** with links to the main pages and a logout button.
- **Responsive layout** built with Tailwind CSS.

## Notes and Contacts

- The project was developed as part of a university Web Technologies course and includes basic logic for managing votes, comments, and authentication.
- To clean the database (in a development environment), run the `cleanDatabase.js` script in the backend (for example, using the command: `npm run clean` if specified in `package.json`).
- API documentation is configured using **Swagger** at `/api-docs`.
- For questions or issues, please contact the author at [parentesimone.01@gmail.com](mailto:parentesimone.01@gmail.com).

---

Have fun with **HiveMind**!
