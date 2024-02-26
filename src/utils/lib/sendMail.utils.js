import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { ApiError, oauth2Client } from "../index.js";

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
    if (error) new ApiError(400, error);
  });
};

export default send;
