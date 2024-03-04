import { Router } from "express";
import {
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient
} from "../../controller/index.js";
import { verifyJwt } from "../../middlewares/index.js";

const appointmentRouter = Router();


export default appointmentRouter;
