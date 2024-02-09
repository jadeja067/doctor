import { Router } from "express";
import {
  logIn,
  signUpUser,
  verifyCode,
} from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const useRouter = Router();

/**
 *  @swagger
 *  /api/signup:
 *  post:
 *    summary: Sign up user
 *    description: A user can create his/her account.
 *    tags: signup
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type:object
 *                properties:
 *                  uFirstName:
 *                         type: string
 *                  uLastName:
 *                         type: string
 *                  uEmail:
 *                         type: string
 *                  uMobileNumber:
 *                         type: string
 *                  uWhatsAppBussinessNumber:
 *                         type: string
 *                  uPassword:
 *                         type: string
 *
 *     responses:
 *          201:
 *              description: A user is created
 *          400:
 *              All fields are required or Avatar file is required
 *          409: User Already Exist
 *
 */
useRouter.route("/signup").post(upload.single("uAvatar"), signUpUser);
/**
 *  @swagger
 *  /api/signup:
 *  post:
 *    summary: Sign up user
 *    description: A user can create his/her account.
 *    tags: signup
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type:object
 *                properties:
 *                  uFirstName:
 *                         type: string
 *                  uLastName:
 *                         type: string
 *                  uEmail:
 *                         type: string
 *                  uMobileNumber:
 *                         type: string
 *                  uWhatsAppBussinessNumber:
 *                         type: string
 *                  uPassword:
 *                         type: string
 *
 *     responses:
 *          201:
 *              description: A user is created
 *          400:
 *              All fields are required or Avatar file is required
 *          409: User Already Exist
 *
 */
useRouter.route("/signin").post(logIn);
/**
 *  @swagger
 *  /api/signup:
 *  post:
 *    summary: Sign up user
 *    description: A user can create his/her account.
 *    tags: signup
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type:object
 *                properties:
 *                  uFirstName:
 *                         type: string
 *                  uLastName:
 *                         type: string
 *                  uEmail:
 *                         type: string
 *                  uMobileNumber:
 *                         type: string
 *                  uWhatsAppBussinessNumber:
 *                         type: string
 *                  uPassword:
 *                         type: string
 *
 *     responses:
 *          201:
 *              description: A user is created
 *          400:
 *              All fields are required or Avatar file is required
 *          409: User Already Exist
 *
 */
useRouter.route("/verifycode").post(verifyCode);

export default useRouter;
