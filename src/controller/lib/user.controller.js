import {
  ApiError,
  ApiResponse,
  asyncHandler,
  uploadToCLoudinary,
  expireCode,
  sendCodeViaMail,
} from "../../utils/index.js";
import { User, Code } from "../../models/index.js";

const signUpUser = asyncHandler(async (req, res) => {
  const { sEmail, sPassword } = req.body;
  if (!sEmail || !sPassword) throw new ApiError(400, "Invalid Input.");
  const user = await User.findOne({ sEmail });
  if (user) throw new ApiError(400, "User already exist.");
  const createNewUser = new User({
    sEmail,
    sPassword,
  });
  let newUser = await createNewUser.save({ validateBeforeSave: false });
  if (!newUser) throw new ApiError(400, "can't create your account.");
  const code = await sendCodeViaMail(sEmail, newUser._id);
  newUser = await User.findById({ _id: newUser._id }).select(
    "-sPassword -__v -updatedAt"
  );
  const accessToken = await newUser.generateAccessToken();
  res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken,
      },
      "Code is sent."
    )
  );
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.user?.bIsAdmin)
    throw new ApiError(400, "You don't have required permissions");
  const _id = req.params.id;
  if (!_id) throw new ApiError(400, "User id is required.");
  const deletedUser = await User.findOneAndDelete({ _id });
  if (!deletedUser) throw new ApiError(500, "Can't delete user.");
  return res
    .status(200)
    .json(new ApiResponse(200, deleteUser, "User is deleted successfully."));
});

const blockUser = asyncHandler(async (req, res) => {
  if (!req.user?.bIsAdmin)
    throw new ApiError(400, "You don't have required permissions");
  const _id = req.params.id;
  if (!_id) throw new ApiError(400, "User id is required.");
  const blockedUser = await User.findByIdAndUpdate(
    { _id },
    { bIsBlocked: true },
    { new: true }
  );
  if (!blockedUser) throw new ApiError(500, "Can't block user.");
  return res
    .status(200)
    .json(new ApiResponse(200, blockedUser, "User is blocked successfully."));
});

const unBlockUser = asyncHandler(async (req, res) => {
  if (!req.user?.bIsAdmin)
    throw new ApiError(400, "You don't have required permissions");
  const _id = req.params.id;
  if (!_id) throw new ApiError(400, "User id is required.");
  const blockedUser = await User.findByIdAndUpdate(
    { _id },
    { bIsBlocked: false },
    { new: true }
  );
  if (!blockedUser) throw new ApiError(500, "Can't unblock user.");
  return res
    .status(200)
    .json(new ApiResponse(200, blockedUser, "User is unblocked successfully."));
});

const resendCode = asyncHandler(async (req, res) => {
  const oldCodes = await Code.find({ uId: req.user._id });
  if (oldCodes) {
    await Code.deleteMany({ uId: req.user._id });
  }
  await sendCodeViaMail(req.user.sEmail, req.user._id);
  res.json(
    new ApiResponse(200, {
      message: "code is sent.",
    })
  );
});

const createProfile = asyncHandler(async (req, res) => {
  const checkVerification = await Code.find({ uId: req.user._id });
  if (checkVerification.length > 0)
    throw new ApiError(400, "verify your code.");
  const { sAvatar, sFirstName, sLastName, sWhatsAppBussinessNumber } = req.body;
  if (
    [sAvatar, sFirstName, sLastName, sWhatsAppBussinessNumber].some(
      (field) => field?.trim === ""
    )
  )
    throw new ApiError(400, "All fields are required.");
  const avatarPath = req.file?.path;

  const avatar = await uploadToCLoudinary(avatarPath);
  if (!avatar) throw new ApiError(400, "Avatar file required.");
  const data = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      sFirstName,
      sLastName,
      sAvatar: avatar.url,
      sWhatsAppBussinessNumber,
    },
    { new: true }
  ).select("-sPassword -updatedAt -__v");
  if (!data) throw new ApiError(500, "couldn't create your account");
  res
    .status(201)
    .json(new ApiResponse(201, data, "Your Account is successfully created."));
});

const logIn = asyncHandler(async (req, res) => {
  const { sEmail, sPassword } = req.body;
  if (!sEmail || !sPassword) throw new ApiError(400, "Invalid Input.");
  const user = await User.findOne({ sEmail });
  if (!user) throw new ApiError(400, "User with this email doesn't exist.");
  if (user?.bIsBlocked) throw new ApiError(400, "this user is blocked");
  const passwordVerification = await user.isPasswordCorrect(sPassword);
  if (!passwordVerification) throw new ApiError(400, "invalid password.");
  if (!user.sFirstName && !user.sLastName) {
    throw new ApiError(400, "Complete the singup first.");
  }
  const accessToken = await user.generateAccessToken();
  res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken,
      }
    )
  );
});

const verifyCode = asyncHandler(async (req, res) => {
  const code = req.body?.nCode;
  const isVerifiedUser = await Code.findOne({ nCode: code });
  if (!isVerifiedUser) throw new ApiError(400, "Invalid Code.");
  const checkingCodeExpiration = await expireCode({
    code,
    createdAt: isVerifiedUser?.nCreatedAt,
    uId: req.user._id,
  });
  if (checkingCodeExpiration) {
    await expireCode({
      code,
      createdAt: isVerifiedUser?.nCreatedAt,
      uId: req.user._id,
      verified: true,
    });
    res.status(200).json(
      new ApiResponse(
        200,
        {
          verified: true,
          sEmail: req.user.sEmail,
        },
        "User successfully verified."
      )
    );
  } else throw new ApiError(400, "verification Failed");
});

export {
  signUpUser,
  logIn,
  verifyCode,
  createProfile,
  resendCode,
  deleteUser,
  blockUser,
  unBlockUser,
};
