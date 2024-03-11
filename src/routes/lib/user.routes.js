import { Router } from "express";
import {
  logIn,
  signUpUser,
  verifyCode,
  createProfile,
  resendCode,
  deleteUser,
  blockUser,
  unBlockUser,
} from "../../controller/index.js";
import { upload, verifyJwt } from "../../middlewares/index.js";

const userRouter = Router();

userRouter.route("/login").post(logIn);

userRouter.route("/signup").post(signUpUser);

userRouter.route("/verifycode").post(verifyJwt, verifyCode);

userRouter.route("/resend").get(verifyJwt, resendCode);

userRouter.route("/delete/:id").delete(verifyJwt, deleteUser);

userRouter.route("/block/:id").post(verifyJwt, blockUser);

userRouter.route("/unblock/:id").post(verifyJwt, unBlockUser);

userRouter
  .route("/createprofile")
  .post(verifyJwt, upload.single("sAvatar"), createProfile);

export default userRouter;
