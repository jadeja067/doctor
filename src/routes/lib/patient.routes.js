import { Router } from "express";
import {
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient
} from "../../controller/index.js";
import { verifyJwt } from "../../middlewares/index.js";

const patientRouter = Router();

patientRouter.get("/", verifyJwt, getAllPatients);

patientRouter.get("/:id", verifyJwt, getPatient);

patientRouter.post("/new", verifyJwt, createNewPatient);

patientRouter.patch("/update/:id", verifyJwt, updatePatient);

patientRouter.delete("/delete/:id", verifyJwt, deletePatient);

export default patientRouter;
