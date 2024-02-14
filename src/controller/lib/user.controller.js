import {
  ApiError,
  ApiResponse,
  asyncHandler,
  uploadToCLoudinary,
  expireCode,
  sendCodeViaMail,
} from "../../utils/index.js";
import { User } from "../../models/index.js";

const signUpUser = asyncHandler(async (req, res) => {
  const {
    sFirstName,
    sLastName,
    sEmail,
    sMobileNumber,
    sAvatar,
    sWhatsAppBussinessNumber,
    sPassword,
  } = req.body;
  const check = await User.findOne({ sEmail });
  if (check) throw new ApiError(400, "User Already Exist.");
  if (
    [
      sFirstName,
      sLastName,
      sEmail,
      sMobileNumber,
      sAvatar,
      sWhatsAppBussinessNumber,
      sPassword,
    ].some((field) => field?.trim === "")
  )
    throw new ApiError(400, "All fields are required.");
  const avatarPath = req.file?.path;
  const avatar = await uploadToCLoudinary(avatarPath);
  if (!avatar) throw new ApiError(400, "Avatar file required.");
  const data = await User.create({
    sFirstName,
    sLastName,
    sEmail,
    sMobileNumber,
    sAvatar: avatar.url,
    sWhatsAppBussinessNumber,
    sPassword,
  });
  if(!data) throw new ApiError(500, "couldn't create your account")
  res
    .status(201)
    .json(new ApiResponse(201, data, "Your Account is successfully created."));
});

const logIn = asyncHandler(async (req, res) => {
  const { sEmail, sPassword } = req.body;
  if (!sEmail && !sPassword) throw new ApiError(400, "Invalid Input.");
  const user = await User.findOne({ sEmail: sEmail });
  const passwordVerification = await user.isPasswordCorrect(sPassword);
  if (!user && !passwordVerification)
    throw new ApiError(400, "Invalid user details.");
  const code = await sendCodeViaMail(sEmail);
  res.status(200).json(new ApiResponse(200, { code }, "User already exist."));
});

const verifyCode = asyncHandler(async (req, res) => {
  const code = parseInt(req.body?.nCode);
  const isVerifiedUser = await User.findOne({ "oCode.nCode": code }).select(
    "-sPassword"
  );
    const checkingCodeExpiration = await expireCode({
    code,
    createdAt: isVerifiedUser?.oCode?.nCreatedAt,
  });
  if (checkingCodeExpiration) {
    await expireCode({
      code,
      createdAt: isVerifiedUser?.oCode?.nCreatedAt,
      verified: true,
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
