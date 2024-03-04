import mongoose, { Schema } from "mongoose";

const repeatSchema = new Schema({
    sFrequency: {
        type: String,
        require: [true, "Appointment repeat frequency is required."],
        enum: ["Never", "Daily", "Weekly", "Monthly", "Yearly"],
        default: "Never"
    },
    nEvery:{
        type: Number,
        min: [1, "Appointment Every duration shouldn't be less than 1."]
    },
    sRepeatDuration:{
        type: [String]
    }
})

const appointmentSchema = new Schema(
  {
    pId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    uId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sToTreat: {
      type: String,
      trim: true,
      required: [true, "Treatment place is required."],
      enum: ["Home Visit", "Clinic"],
      default: "Home Visit",
    },
    dFromDate: {
      type: Date,
      trim: true,
      required: [true, "Appointment start date is required."],
    },
    dToDate: {
      type: Date,
      trim: true,
      required: [true, "Appointment end date is required."],
    },
    dtFromTime: {
      type: Date,
      trim: true,
      required: [true, "Appointment start time is required."],
    },
    dtToTime: {
      type: Date,
      trim: true,
      required: [true, "Appointment end time is required."],
    },
    oRepeat: repeatSchema,
    sNote: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
