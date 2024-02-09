import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is Running on Port : ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(`Sorry Can not connect to database.`));
