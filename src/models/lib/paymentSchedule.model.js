import mongoose, { Schema } from "mongoose";

const PaymentShceduleShema = new Schema({
  nCharges: {
    type: Number,
    require: [true, "Charges is required."],
  },
  nEvery: {
    type: String,
    default: "Daily",
    enum: ["Daily", "Weekly", "Monthly"],
    require: [true, "Charges is required."],
  },
  sRepeatDuration: {
    type: [String],
  },
});


export const PaymentShcedule = mongoose.model("PaymentShcedule", PaymentShceduleShema);
