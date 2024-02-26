import mongoose, { Schema } from "mongoose";
import { asyncHandler } from "../../utils/index.js";

const codeSchema = new Schema({
  nCode: {
    type: Number,
    default: 0,
    require: true,
  },
  nCreatedAt: {
    type: Number,
    default: 0,
    require: true,
  },
  uId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Code = mongoose.model("code", codeSchema);
