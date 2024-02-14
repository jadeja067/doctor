import { Router } from "express";
import {
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient,
} from "../../controller/index.js";
import { verifyJwt } from "../../middlewares/index.js";

const patientRouter = Router();

patientRouter.get("/", verifyJwt, getAllPatients);
patientRouter.get("/:id", verifyJwt, getPatient);
patientRouter.post("/new", verifyJwt, createNewPatient);
patientRouter.patch("/update/:id", verifyJwt, updatePatient);

export default patientRouter;
