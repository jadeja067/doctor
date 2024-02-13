import { Router } from "express";
import { createNewPatient, getAllPatients, getPatient, updatePatient } from "../controller/patient.controller.js";
import verifyJwt from "../middlewares/jwt.verification.middlewares.js"; 

const patientRouter = Router();

patientRouter.get("/", verifyJwt, getAllPatients);
patientRouter.get("/:id", verifyJwt, getPatient);
patientRouter.post("/new", verifyJwt, createNewPatient);
patientRouter.patch("/update/:id", verifyJwt, updatePatient);

export default patientRouter;
