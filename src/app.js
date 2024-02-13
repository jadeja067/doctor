import express from "express";
import cors from "cors";
import useRouter from "./routes/user.routes.js";
// import oasGenerator from 'express-oas-generator'
// import routes from "./utils/swagger.utils.js";

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
// oasGenerator.init(app, {});

// Rotues
app.use("/api/1/users", useRouter);

// exporting App
export default app;
