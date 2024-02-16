import { Router } from "express";
import { logIn, signUpUser, verifyCode } from "../../controller/index.js";
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
 *            type: object
 *            properties:
 *              sEmail:
 *                type: string
 *                example: abcd@gmail.com
 *              sPassword:
 *                type: string
 *                example: 123456789
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: integer
 *                  example: 200
 *                code:
 *                  type: object
 *                  properties:
 *                    nCode:
 *                      type: string
 *                      example: 123456
 *                message:
 *                  type: string
 *                  example: "ok"
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
 *               type: object
 *               properties: 
 *                statusCode:
 *                  type: integer
 *                data:
 *                  type: object
 *                  properties:
 *                    sAvatar:
 *                      type: string 
 *                    sFirstName: 
 *                      type: string
 *                    sLastName: 
 *                      type: string
 *                    sEmail: 
 *                      type: string
 *                    sPassword: 
 *                      type: string
 *                    sMobileNumber: 
 *                      type: string
 *                    sWhatsAppBussinessNumber: 
 *                      type: string
 *                    oCode: 
 *                      type: object
 *                      properties:
 *                        nCode: 
 *                          type: integer
 *                          format: int64
 *                        nCreatedAt: 
 *                          type: integer
 *                          format: int64
 *                    _id: 
 *                      type: string
 *                    createdAt: 
 *                      type: string
 *                    updatedAt: 
 *                      type: string
 *                    __v: 
 *                      type: string
 *                message:
 *                    type: string
 *                success:
 *                    type: string
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
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: integer
 *                  format: int64
 *                data:
 *                  type: object
 *                  properties: 
 *                    User:
 *                      type: object
 *                      properties:
 *                        id: 
 *                          type: string
 *                        sAvatar:
 *                          type: string
 *                        sFirstName: 
 *                          type: string
 *                        sLastName: 
 *                          type: string
 *                        sEmail: 
 *                          type: string
 *                        sMobileNumber: 
 *                          type: string
 *                        sWhatsAppBussinessNumber: 
 *                          type: string
 *                        createdAt: 
 *                          type: string
 *                          format: date-time
 *                        updatedAt: 
 *                          type: string
 *                          format: date-time
 *                    AccessToken: 
 *                      type: string 
 *                message: 
 *                  type: string
 *                success: 
 *                  type: boolean
 *       '400':
 *         description: Verification failed or code is invalid
 *
 *
 *
 *
 *
 *
 *
 *
 */
userRouter.route("/verifycode").post(verifyCode);

export default userRouter;
