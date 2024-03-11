import otpGenerator from "otp-generator";
import { Code } from "../../models/index.js";
import { send } from "../index.js";

const otpExpirationTime = 10 * 60 * 1000;

const generateNewCode = () =>
  otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

const sendCodeViaMail = async (sEmail, uId) => {
  const code = generateNewCode();
  const alreadyExist = await Code.find({ uId });
  if (!alreadyExist) {
    await Code.deleteMany({ uId });
  }
  await Code.create({
    nCode: code,
    nCreatedAt: Date.now(),
    uId,
  });
  send(sEmail, code);
  return code;
};

const removeCode = async (uId) => await Code.findOneAndDelete({ uId });

const expireCode = async (data) => {
  if (Date.now() - data.createdAt > otpExpirationTime) {
    await removeCode(data.uId);
    return false;
  } else if (data.verified) {
    await removeCode(data.uId);
    return false;
  }
  return true;
};

export { generateNewCode, sendCodeViaMail, expireCode };
