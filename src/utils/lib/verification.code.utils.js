import otpGenerator from "otp-generator";
import { User } from "../../models/index.js";
import {send} from "../index.js";

const otpExpirationTime = 10 * 60 * 1000;

const generateNewCode = () =>
  otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

const sendCodeViaMail = async (email) => {
    const code = generateNewCode();
    await User.findOneAndUpdate(
      { uEmail: email },
      {
        uCode: {
          code,
          createdAt: Date.now(),
        },
      },
      { new: true }
    );
    send(email, code);
    return code;
};

const removeCode = async (code) => {
  await User.findOneAndUpdate(
    { "uCode.nCode": code },
    { "uCode.nCode": 0, "uCode.nCreatedAt": 0 }
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
