import { signUpUser, logIn, verifyCode } from "./lib/user.controller.js";
import {
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient,
} from "./lib/patient.controller.js";

export {
  signUpUser,
  logIn,
  verifyCode,
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient
};
