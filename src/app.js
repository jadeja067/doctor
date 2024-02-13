import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'

// App
const app = express();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Appointment Booking App",
      version: "1.0.0",
      description:
        "A sample API to demonstrate swagger integration with node.js",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions)

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "3mb",
  })
);
app.use(
  express.urlencoded({
    limit: "3mb",
    extended: true,
  })
);
app.use(express.static("public"));

// Include Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rotues
app.use("/api/v1/users", userRouter);

// exporting App
export default app;
