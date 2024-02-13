import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import dotenv from "dotenv";
import { User } from "../models/user.models.js";

dotenv.config({ path: "./.env" });

const verifyJwt = asyncHandler(async (req, res, next) => {
  const Token = req.header("Authorization")?.replace("Bearer ", "");
  if (!Token) throw new ApiError(401, "Unauthorized request.");
  const decodedToken = jwt.verify(Token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decodedToken?._id).select(
    "-uPassword -createdAt -updatedAt -uCode"
  );
  if (!user) throw new ApiError(401, "Invalid AccessToken.");
  req.user = user;
  next();
});

export default verifyJwt;
