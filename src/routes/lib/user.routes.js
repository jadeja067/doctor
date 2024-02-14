import { Router } from "express";
import {
  logIn,
  signUpUser,
  verifyCode,
} from "../../controller/index.js";
import { upload } from "../../middlewares/index.js";

const userRouter = Router();

/**
 * @swagger
 * '/api/v1/users/signin2':
 *   get:
 *     summary: Get a list of samples
 *     description: Retrieve a list of sample items.
 *     responses:
 *        200:
 *          description: A list of samples.
 */
userRouter.route("/signin").post(logIn);
/**
 * @swaggers
 * '/api/v1/users/signup':
 *   get:
 *     summary: Get a list of samples
 *     description: Retrieve a list of sample items.
 *     responses:
 *        200:
 *          description: A list of samples.
 */
userRouter.route("/signup").post(upload.single("sAvatar"), signUpUser);
/**
 * @swaggers
 * '/api/v1/users/signup':
 *   get:
 *     summary: Get a list of samples
 *     description: Retrieve a list of sample items.
 *     responses:
 *        200:
 *          description: A list of samples.
 */
userRouter.route("/verifycode").post(verifyCode);

export default userRouter;
