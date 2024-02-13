import { Router } from "express";
import {
  logIn,
  signUpUser,
  verifyCode,
} from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

/**
 * @swagger
 * /api/sample:
 *   post:
 *     summary: Get a list of samples
 *     description: Retrieve a list of sample items.
 *     responses:
 *        200:
 *          description: A list of samples.
 */
userRouter.post("/signin", logIn);
// userRouter.route("/signup").post(upload.single("uAvatar"), signUpUser);
// userRouter.route("/verifycode").post(verifyCode);

export default userRouter;
