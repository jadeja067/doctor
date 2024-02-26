import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../models/index.js";
import { ApiError, asyncHandler } from "../../utils/index.js";

dotenv.config({ path: "./.env" });

const verifyJwt = asyncHandler(async (req, res, next) => {
  const Token = req.header("Authorization")?.replace("Bearer ", "");
  if (!Token) throw new ApiError(401, "Unauthorized request.");
  const decodedToken = jwt.verify(Token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decodedToken?._id).select(
    "-sPassword -createdAt -updatedAt"
  );
  if (!user) throw new ApiError(401, "Invalid AccessToken.");
  req.user = user;
  next();
});

export default verifyJwt;
