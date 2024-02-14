import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from 'dotenv'

// dotenv.config({path: './.env'})

const codeSchema = {
  nCode: {
    type: Number,
  },
  nCreatedAt: {
    type: Number,
  },
};

const userSchema = new Schema(
  {
    sAvatar: {
      type: String,
      trim: true,
      required: [true, "Avatar is required."],
    },
    sFirstName: {
      type: String,
      trim: true,
      minlength: [3, "First name length should be greater than 2 character"],
      required: [true, "Frist name is required."],
    },
    sLastName: {
      type: String,
      trim: true,
      minlength: [3, "Last name length should be greater than 2 character"],
      required: [true, "Last name is required."],
    },
    sEmail: {
      type: String,
      trim: true,
      format: "email",
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please fill a valid email address",
      ],
      required: [true, "Email address is required."],
      unique: [true, "User with this Email address already exist."],
    },
    sPassword: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password length must be atleast 8 character"],
      maxlength: [20, "Password length must not be greater than 20 character"],
    },
    sMobileNumber: {
      type: String,
      minlength: [
        13,
        "Mobile number length should be greater than 12 character including + sign",
      ],
      maxlength: [
        16,
        "Mobile number length should be less than 17 character including + sign",
      ],
      required: [true, "Mobile number is required."],
      match: [
        /^\+(?:[0-9] ?){6,14}[0-9]$/,
        "Please fill a valid mobile number with country code",
      ],
    },
    sWhatsAppBussinessNumber: {
      type: String,
      minlength: [
        13,
        "WhatsApp number length should be greater than 12 character including + sign",
      ],
      maxlength: [
        16,
        "WhatsApp number length should be less than 17 character including + sign",
      ],
      required: [true, "Mobile number is required."],
      match: [
        /^\+(?:[0-9] ?){6,14}[0-9]$/,
        "Please fill a valid mobile number with country code",
      ],
      required: [true, "WhatsApp bussiness Number is required."],
    },
    oCode: {
      nCode: {
        type: Number,
        default: 0
      },
      nCreatedAt: {
        type: Number,
        default: 0
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("sPassword")) next();
  this.sPassword = await bcryptjs.hash(this.sPassword, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.sPassword);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      sEmail: this.sEmail,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "10d",
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "10d",
    }
  );
};

export const User = mongoose.model("User", userSchema);
