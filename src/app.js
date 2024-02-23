import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { userRouter, patientRouter } from "./routes/index.js";

// App
const app = express();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Appointment Booking App",
      version: "1.0.0",
      description:
        "This is the Appointment Booking App that is used by doctor to manage their appointments. A user can signup/login to the app and then manage their appointments. They can add new patients and update the patient details. They can create new appointments as well for a patient. ",
    },
    severs: {
      url: "http://localhost:4000",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  apis: ["./src/routes/lib/*.js", "./src/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotues
app.use("/api/v1/users", userRouter);
app.use("/api/v1/patients", patientRouter);

// exporting App
export default app;
