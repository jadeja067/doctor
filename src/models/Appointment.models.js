import mongoose, { Schema } from "mongoose";

const repeatSchema = new Schema({
    aFrequency: {
        type: String,
        require: [true, "Appointment repeat frequency is required."],
        enum: ["Never", "Daily", "Weekly", "Monthly", "Yearly"],
        default: "Never"
    },
    aEvery:{
        type: Number,
        min: [1, "Appointment Every duration shouldn't be less than 1."]
    },
    aRepeatDuration:{
        type: [String]
    }
})

const appointmentSchema = new Schema(
  {
    pId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    },
    aToTreat: {
      type: String,
      trim: true,
      required: [true, "Treatment place is Required."],
      enum: ["Home Visit", "Clinic"],
      default: "Home Visit",
    },
    aFromDate: {
      type: String,
      trim: true,
      required: [true, "Appointment start date is Required."],
    },
    aToDate: {
      type: String,
      trim: true,
      required: [true, "Appointment end date is Required."],
    },
    aFromTime: {
      type: String,
      trim: true,
      required: [true, "Appointment start time is Required."],
    },
    aToTime: {
      type: String,
      trim: true,
      required: [true, "Appointment end time is Required."],
    },
    aRepeat: repeatSchema,
    aNote:{
        type: String,
        trim: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
