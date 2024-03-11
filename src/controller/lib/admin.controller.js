import { Admin, User } from "../../models/index.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const adminLogIn = asyncHandler(async (req, res) => {
  const { sEmail, sPassword } = req.body;
  if (!sEmail || !sPassword)
    throw new ApiError(400, "Email address and password both are required");
  const admin = await Admin.findOne({ sEmail });
  if (!admin) throw new ApiError(400, "Admin does not exist");
  const passwordVerification = await admin.isPasswordCorrect(sPassword);
  if (!passwordVerification) throw new ApiError(400, "invalid password.");
  const accessToken = await admin.generateAccessToken();
  return res.status(200).json(
    new ApiResponse(200, {
      accessToken,
    })
  );
});

const updateAdminDetails = asyncHandler(async (req, res) => {
  if (!req.user?.bIsAdmin)
    throw new ApiError(400, "You don't have required permissions");
  const updatedAdmin = await Admin.findByIdAndUpdate(
    { _id: req.user?._id },
    req.boody,
    { new: true }
  );
  if (!updatedAdmin) throw new ApiError(500, "can't update admin details.");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { _id: updatedAdmin._id },
        "admin is successfully updated."
      )
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
  if (!req.user?.bIsAdmin)
    throw new ApiError(400, "You don't have required permissions");
  const users = await User.find();
  if (!users) throw new ApiError(400, "No data found");
  res.status(200).json(new ApiResponse(200, users));
});

export { adminLogIn, updateAdminDetails, getAllUsers };
