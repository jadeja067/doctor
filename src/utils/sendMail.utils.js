import nodemailer from "nodemailer";
import { oauth2Client } from "./google.oauth2.utils.js";
import dotenv from "dotenv";
import ApiError from "./ApiError.utils.js";

dotenv.config({ path: "./.env" });

const accessToken = oauth2Client.getAccessToken();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "quantumgoods.shopping@gmail.com",
    clientId: process.env.NODEMAILER_CLIENT_ID,
    clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
    refreshToken: process.env.NODEMAILER_CLIENT_REFRESH_TOKEN,
    accessToken: accessToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const mailOptions = {
  from: "kuldip.devmonk@gmail.com",
  to: null,
  subject: "OTP from QuntumGoods",
  text: null,
};

const send = (to, text) => {
  mailOptions.to = to;
  mailOptions.text = text;
  
  transporter.sendMail(mailOptions, function (error, info) {
    console.log(error)
    if (error) new ApiError(400, error);
    else console.log("Email is sent.");
  });
};

export default send;
