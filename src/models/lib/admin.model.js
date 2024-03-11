import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminSchema = new Schema(
  {
    sEmail: {
      type: String,
      trim: true,
      format: "email",
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please fill a valid email address",
      ],
      required: [true, "Email address is required."],
      unique: [true, "Admin with this Email address already exist."],
    },
    sPassword: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password length must be atleast 8 character"],
      maxlength: [20, "Password length must not be greater than 20 character"],
    },
    bIsAdmin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.sPassword);
};

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      sEmail: this.sEmail,
      bIsAdmin: this.bIsAdmin,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );
};

export const Admin = mongoose.model("Admin", adminSchema);
