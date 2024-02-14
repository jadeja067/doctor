import otpGenerator from "otp-generator";
import { User } from "../../models/index.js";
import {send} from "../index.js";

const otpExpirationTime = 15 * 1000;

const generateNewCode = () =>
  otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

const sendCodeViaMail = async (sEmail) => {
    const code = generateNewCode();
    await User.findOneAndUpdate(
      { sEmail },
      {
        oCode: {
          nCode: code,
          nCreatedAt: Date.now(),
        },
      },
      { new: true }
    );
    send(sEmail, code);
    return code;
};

const removeCode = async (code) => {
  await User.findOneAndUpdate(
    { "oCode.nCode": code },
    { "oCode.nCode": 0, "oCode.nCreatedAt": 0 }
  )
};

const expireCode = async (data) => {
  if (Date.now() - data.createdAt > otpExpirationTime) {
    await removeCode(data.code);
    return false;
  } else if (data.verified) {
    await removeCode(data.code);
    return false;
  }
  return true
};

export { generateNewCode, sendCodeViaMail, expireCode };
