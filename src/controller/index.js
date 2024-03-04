import {
  signUpUser,
  logIn,
  verifyCode,
  createProfile,
  resendCode
} from "./lib/user.controller.js";
import {
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient
} from "./lib/patient.controller.js";

export {
  signUpUser,
  logIn,
  verifyCode,
  createProfile,
  resendCode,
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
};
