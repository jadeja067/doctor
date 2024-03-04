import { Router } from "express";
import {
  createNewAppointment,
  AddPaymentShedule
} from "../../controller/index.js";
import { verifyJwt } from "../../middlewares/index.js";

const appointmentRouter = Router();

appointmentRouter.post("/add/:id", verifyJwt, createNewAppointment)
appointmentRouter.post("/add/payment/:id", verifyJwt, AddPaymentShedule);


export default appointmentRouter;
