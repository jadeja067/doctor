import express from "express";
import cors from "cors";
import router from './routes/user.routes.js'
// App
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({
    limit: "3mb"
}));
app.use(express.urlencoded({
    limit: "3mb",
    extended: true
}))
app.use(express.static("public"))

// Rotues
app.use('/api/1/users', router)

// exporting App
export default app;
