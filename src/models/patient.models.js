import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
  {
    pName: {
      type: String,
      trim: true,
      required: [true, "Patient name is Required."],
      minlength: 3,
    },
    pType: {
      type: String,
      trim: true,
      required: [true, "Patient type is Required."],
      minlength: [3, "Patient type's length should be greater than 2."],
    },
    pAssessment: {
      type: String,
      trim: true,
      minlength: [3, "Assessment's length should be greater than 2."],
      required: [true, "Patient condition name is Required."],
    },
    pAddress: {
      type: String,
      trim: true,
      minlength: [8, "Address should contain more than 7 character."],
      required: [true, "Patient Address is Required."],
    },
    pAddress2: {
      type: String,
      trim: true,
      minlength: [8, "Second address should contain more than 7 character."],
    },
    pWhatsAppNumber: {
      type: String,
      minlength: [
        13,
        "WhatsApp number length should be greater than 12 character including + sign",
      ],
      maxlength: [
        16,
        "WhatsApp number length should be less than 17 character including + sign",
      ],
      required: [true, "Mobile number is Required."],
      // pattern: "^[0-9]{10}$",
      match: [
        /^\+(?:[0-9] ?){6,14}[0-9]$/,
        "Please fill a valid mobile number with country code",
      ],
      required: [true, "WhatsApp Number is Required."],
    },
    pGender: {
      type: String,
      trim: true,
      enum: ["male", "female", "others"],
      minlength: 3,
      required: [true, "Patient gender is Required."],
    },
    pAge: {
      type: Number,
      max: [110, "Age must be less or equal to 120"],
      required: [true, "Patient age is required."],
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model("Patient", patientSchema);
