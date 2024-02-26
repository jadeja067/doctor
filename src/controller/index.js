import {
  signUpUser,
  logIn,
  verifyCode,
  createProfile,
} from "./lib/user.controller.js";
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
  createProfile,
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient
};
