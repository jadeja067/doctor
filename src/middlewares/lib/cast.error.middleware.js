import { asyncHandler } from "../../utils/index.js";
import ApiError from "../../utils/lib/ApiError.utils.js";
import { isValidObjectId } from "mongoose";
const handleCastError = asyncHandler(async (req, res, next) => {
  const id = req.params?.id;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Provide valid id");
  } else {
    next();
  }
});

export default handleCastError;
