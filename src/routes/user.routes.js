import { Router } from "express";
import { logIn, signUpUser, verifyCode } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/signup").post(upload.single("uAvatar"), signUpUser)
router.route("/signin").post(logIn)
router.route("/verifycode").post(verifyCode)

export default router;
