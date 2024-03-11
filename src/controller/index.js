import {
  signUpUser,
  logIn,
  verifyCode,
  createProfile,
  resendCode,
  deleteUser,
  blockUser,
  unBlockUser
} from "./lib/user.controller.js";
import {
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from "./lib/patient.controller.js";
import {
  createNewAppointment,
  AddPaymentShedule,
  getAllAppointments,
  getAppointment,
  getPatientAllAppointments,
  deleteAppointment,
} from "./lib/appointment.controller.js";
import { adminLogIn, updateAdminDetails, getAllUsers } from "./lib/admin.controller.js";
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
  createNewAppointment,
  AddPaymentShedule,
  getAllAppointments,
  getAppointment,
  getPatientAllAppointments,
  deleteAppointment,
  adminLogIn,
  updateAdminDetails,
  deleteUser,
  blockUser,
  unBlockUser,
  getAllUsers
};
