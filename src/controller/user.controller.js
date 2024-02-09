import asyncHandler from "../utils/asyncHandler.utils.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.utils.js";
import uploadToCLoudinary from "../utils/cloudinary.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import {
  expireCode,
  sendCodeViaMail,
} from "../utils/verification.code.utils.js";

const signUpUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    whatsAppBussinessNumber,
    password,
  } = req.body;
  const check = await User.findOne({ email });
  if (check) throw new ApiError(400, "User Already Exist.");
  if (
    [
      firstName,
      lastName,
      email,
      mobileNumber,
      whatsAppBussinessNumber,
      password,
    ].some((field) => field?.trim === "")
  )
    throw new ApiError(400, "All fields are required.");
  const avatarPath = req.file?.path;
  const avatar = await uploadToCLoudinary(avatarPath);
  if (!avatar) throw new ApiError(400, "Avatar file required.");
  const data = await User.create({
    uFirstName: firstName,
    uLastName: lastName,
    uEmail: email,
    uMobileNumber: mobileNumber,
    uAvatar: avatar.url,
    uWhatsAppBussinessNumber: whatsAppBussinessNumber,
    uPassword: password,
  });
  res
    .status(201)
    .json(new ApiResponse(201, data, "Your Account is successfully created."));
});

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) throw new ApiError(400, "Invalid Input.");
  const user = await User.findOne({ uEmail: email });
  const passwordVerification = await user.isPasswordCorrect(password);
  if (!user && !passwordVerification)
    throw new ApiError(400, "Invalid user details.");
  const code = await sendCodeViaMail(email);
  res.status(200).json(new ApiResponse(200, { code }, "User already exist."));
});

const verifyCode = asyncHandler(async (req, res) => {
  const code = parseInt(req.body.code);
  const isVerifiedUser = await User.findOne({ "uCode.code": code }).select(
    "-uPassword"
  );
  const checkingCodeExpiration = await expireCode({
    code,
    createAt: isVerifiedUser.uCode?.createdAt,
  });
  if (checkingCodeExpiration) {
    await expireCode({
      code,
      createAt: isVerifiedUser.uCode.code,
    });
    const authToken = await isVerifiedUser.generateAccessToken();
    res.status(200).json(
      new ApiResponse(
        200,
        {
          User: isVerifiedUser,
          AccessToken: authToken,
        },
        "User successfully verified."
      )
    );
  } else throw new ApiError(400, "verification Failed");
});

export { signUpUser, logIn, verifyCode };