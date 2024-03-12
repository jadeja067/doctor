import { Router } from "express";
import {
  createNewAppointment,
  addPaymentShedule,
  getAllAppointments,
  getAppointment,
  getPatientAllAppointments,
  deleteAppointment,
  getPayments,
} from "../../controller/index.js";
import { handleCastError, verifyJwt } from "../../middlewares/index.js";

const appointmentRouter = Router();

appointmentRouter.post(
  "/add/:id",
  verifyJwt,
  handleCastError,
  createNewAppointment
);
appointmentRouter.get("/get/all", verifyJwt, getAllAppointments);
appointmentRouter.get(
  "/get/patient/:id",
  verifyJwt,
  handleCastError,
  getPatientAllAppointments
);
appointmentRouter.get("/get/:id", verifyJwt, handleCastError, getAppointment);
appointmentRouter.delete(
  "/delete/:id",
  verifyJwt,
  handleCastError,
  deleteAppointment
);
appointmentRouter.post(
  "/add/payment/:id",
  verifyJwt,
  handleCastError,
  addPaymentShedule
);
appointmentRouter.get("/get/payment/", verifyJwt, handleCastError, getPayments);

export default appointmentRouter;
