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
import { handleCastError, upload, verifyJwt } from "../../middlewares/index.js";

const userRouter = Router();

userRouter.route("/login").post(logIn);

userRouter.route("/signup").post(signUpUser);

userRouter.route("/verifycode").post(verifyJwt, verifyCode);

userRouter.route("/resend").get(verifyJwt, resendCode);

userRouter.route("/delete/:id").delete(verifyJwt,handleCastError, deleteUser);

userRouter.route("/block/:id").post(verifyJwt,handleCastError, blockUser);

userRouter.route("/unblock/:id").post(verifyJwt,handleCastError, unBlockUser);

userRouter
  .route("/createprofile")
  .post(verifyJwt, upload.single("sAvatar"), createProfile);

export default userRouter;
