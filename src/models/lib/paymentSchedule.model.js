import mongoose, { Schema } from "mongoose";

const PaymentShceduleShema = new Schema({
  nCharges: {
    type: Number,
    require: [true, "Charges is required."],
  },
  sRepayment: {
    type: String,
    default: "Daily",
    enum: ["Daily", "Weekly", "Monthly", "daily", "weekly", "monthly"],
    require: [true, "Charges is required."],
  },
  apponintmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    require: [true, "Appointment id is required."],
  },
});

export const PaymentShcedule = mongoose.model(
  "PaymentShcedule",
  PaymentShceduleShema
);
