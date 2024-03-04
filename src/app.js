import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { userRouter, patientRouter } from "./routes/index.js";
import swagger from "../swagger.json" assert { type: "json" };



// App
const app = express();


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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

// Rotues
app.use("/api/v1/users", userRouter);
app.use("/api/v1/patients", patientRouter);

// exporting App
export default app;
