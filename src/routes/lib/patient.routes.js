import { Router } from "express";
import {
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from "../../controller/index.js";
import { handleCastError, verifyJwt } from "../../middlewares/index.js";

const patientRouter = Router();

patientRouter.post("/add", verifyJwt, createNewPatient);

patientRouter.get("/", verifyJwt, getAllPatients);

patientRouter.get("/:id", verifyJwt,handleCastError, getPatient);

patientRouter.patch("/update/:id", verifyJwt,handleCastError, updatePatient);

patientRouter.delete("/delete/:id", verifyJwt,handleCastError, deletePatient);

export default patientRouter;
