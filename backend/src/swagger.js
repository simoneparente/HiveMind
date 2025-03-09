//// filepath: d:\Universita\GitHub\HiveMind\backend\src\swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HiveMind API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"], // Percorso ai tuoi endpoint
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
export { swaggerUi };