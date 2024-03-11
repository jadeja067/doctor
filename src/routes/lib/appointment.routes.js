import { Router } from "express";
import {
  createNewAppointment,
  AddPaymentShedule,
  getAllAppointments,
  getAppointment,
  getPatientAllAppointments,
  deleteAppointment,
} from "../../controller/index.js";
import { verifyJwt } from "../../middlewares/index.js";

const appointmentRouter = Router();

appointmentRouter.post("/add/:id", verifyJwt, createNewAppointment);
appointmentRouter.get("/get/all", verifyJwt, getAllAppointments);
appointmentRouter.get("/get/patient/:id", verifyJwt, getPatientAllAppointments);
appointmentRouter.get("/get/:id", verifyJwt, getAppointment);
appointmentRouter.delete("/delete/:id", verifyJwt, deleteAppointment);
appointmentRouter.post("/add/payment/:id", verifyJwt, AddPaymentShedule);

export default appointmentRouter;
