import { Router } from "express";
import {
  logIn,
  signUpUser,
  verifyCode,
  createProfile,
} from "../../controller/index.js";
import { upload, verifyJwt } from "../../middlewares/index.js";

const userRouter = Router();

userRouter.route("/signin").post(logIn);

userRouter.route("/signup").post(signUpUser);

userRouter.route("/verifycode").post(verifyJwt, verifyCode);

userRouter
  .route("/createprofile")
  .post(verifyJwt, upload.single("sAvatar"), createProfile);

export default userRouter;