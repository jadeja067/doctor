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
 * tags:
 *   name: User
 *   description: API endpoints for user management
 */

/**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     summary: Log in user
 *     description: Endpoint to log in an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sEmail:
 *                 type: string
 *               sPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 -$ref: '../src/models/lib/user.model.js/User'
 *       '400':
 *         description: Invalid input
 */
userRouter.route("/signin").post(logIn);

/**
 * @swagger
 * /api/v1/users/signup: 
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to sign up a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sAvatar:
 *                 type: string
 *                 format: binary
 *               sFirstName:
 *                 type: string
 *               sLastName:
 *                 type: string
 *               sEmail:
 *                 type: string
 *               sMobileNumber:
 *                 type: string
 *               sWhatsAppBussinessNumber:
 *                 type: string
 *               sPassword:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               -$ref: '../src/models/lib/user.model.js/User'
 *          
 *       '400':
 *         description: Bad request
 */
userRouter.route("/signup").post(upload.single("sAvatar"), signUpUser);

/**
 * @swagger
 * /api/v1/users/verifycode:
 *   post:
 *     summary: Verify user code
 *     description: Endpoint to verify user code
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nCode:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: User code verified successfully
 *       '400':
 *         description: Verification failed or code is invalid
 */
userRouter.route("/verifycode").post(verifyCode);

export default userRouter;
