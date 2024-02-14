import { Router } from "express";
import {
  createNewPatient,
  getAllPatients,
  getPatient,
  updatePatient,
} from "../../controller/index.js";
import { verifyJwt } from "../../middlewares/index.js";

const patientRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Patient
 *   description: API endpoints for patient management
 */

/**
 * @swagger
 * /api/v1/patients:
 *   get:
 *     summary: Get all patients
 *     description: Retrieve a list of all patients associated with the authenticated user
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNjN2IwM2U5NGNlNDBiN2I4OTQwMTUiLCJzRW1haWwiOiJrYW5pc2hrZ3VwdGEuZGV2bW9ua0BnbWFpbC5jb20iLCJpYXQiOjE3MDc5MDAwMDksImV4cCI6MTcwODc2NDAwOX0.eap6HV_5cpItBQFHaWveRZn_OLhteO08NmyUFx33WLg']
 *     responses:
 *       '200':
 *         description: A list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 -$ref: '../src/models/lib/patient.model.js/Patient'
 *       '401':
 *         description: Unauthorized request
 */
patientRouter.get("/", verifyJwt, getAllPatients);

/**
 * @swagger
 * api/v1/patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     description: Retrieve patient details by ID associated with the authenticated user
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the patient
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Patient details
 *         content:
 *           application/json:
 *             schema:
 *               -$ref: '../src/models/lib/patient.model.js/Patient'
 *       '401':
 *         description: Unauthorized request
 *       '404':
 *         description: Patient not found
 */
patientRouter.get("/:id", verifyJwt, getPatient);

/**
 * @swagger
 * /patients/new:
 *   post:
 *     summary: Create a new patient
 *     description: Create a new patient associated with the authenticated user
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             -$ref: '../src/models/lib/patient.model.js/Patient'
 *     responses:
 *       '201':
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               -$ref: '../src/models/lib/patient.model.js/Patient'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized request
 */
patientRouter.post("/new", verifyJwt, createNewPatient);

/**
 * @swagger
 * /patients/update/{id}:
 *   patch:
 *     summary: Update patient by ID
 *     description: Update patient details by ID associated with the authenticated user
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the patient
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             -$ref: '../src/models/lib/patient.model.js/Patient'
 *     responses:
 *       '200':
 *         description: Patient details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               -$ref: '../src/models/lib/patient.model.js/Patient'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized request
 *       '404':
 *         description: Patient not found
 */
patientRouter.patch("/update/:id", verifyJwt, updatePatient);

export default patientRouter;
