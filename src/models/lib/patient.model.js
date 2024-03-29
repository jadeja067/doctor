import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
  {
    sName: {
      type: String,
      trim: true,
      required: [true, "Patient name is required."],
      minlength: 3,
    },
    sType: {
      type: String,
      trim: true,
      required: [true, "Patient type is required."],
      minlength: [3, "Patient type's length should be greater than 2."],
    },
    sAssessment: {
      type: String,
      trim: true,
      minlength: [3, "Assessment's length should be greater than 2."],
      required: [true, "Patient condition name is required."],
    },
    sAddress: {
      type: String,
      trim: true,
      minlength: [8, "Address should contain more than 7 character."],
      required: [true, "Patient Address is required."],
    },
    sAddress2: {
      type: String,
      trim: true,
      minlength: [8, "Second address should contain more than 7 character."],
    },
    sWhatsAppNumber: {
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
      // pattern: "^[0-9]{10}$",
      match: [
        /^\+(?:[0-9] ?){6,14}[0-9]$/,
        "Please fill a valid mobile number with country code",
      ],
      required: [true, "WhatsApp Number is required."],
    },
    sGender: {
      type: String,
      trim: true,
      enum: ["male", "female", "others"],
      minlength: 3,
      required: [true, "Patient gender is required."],
    },
    nAge: {
      type: Number,
      min: [0, "Age must be positive number"],
      max: [110, "Age must be less or equal to 120"],
      required: [true, "Patient age is required."],
    },
    uId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."]
    }
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model("Patient", patientSchema);
