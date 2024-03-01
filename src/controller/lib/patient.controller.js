import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import { Patient } from "../../models/index.js";

const createNewPatient = asyncHandler(async (req, res) => {
  const {
    sName,
    sType,
    sAssessment,
    sAddress,
    sAddress2,
    sWhatsAppNumber,
    sGender,
    nAge,
  } = req.body;
  const uId = req.user?._id;
  const check = await Patient.findOne({
    sName,
    sWhatsAppNumber
  });
  if (check) throw new ApiError(400, "User Already Exist.");
  if (
    [
      sName,
      sType,
      sAssessment,
      sAddress,
      sAddress2,
      sWhatsAppNumber,
      sGender,
      nAge,
      uId,
    ].some((field) => field?.trim === "")
  )
    throw new ApiError(400, "All fields are required.");
  const data = await Patient.create({
    sName,
    sType,
    sAssessment,
    sAddress,
    sAddress2,
    sWhatsAppNumber,
    sGender,
    nAge,
    uId,
  });
  res
    .status(201)
    .json(new ApiResponse(201, data, "Patient is successfully Added."));
});

const getAllPatients = asyncHandler(async (req, res) => {
  const uId = req.user?._id;
  const patients = await Patient.find({ uId });
  if (patients.length <= 0)
    throw new ApiError(200, "No patient for this user.");
  res.status(200).json(new ApiResponse(200, patients));
});

const getPatient = asyncHandler(async (req, res) => {
  const _id = req.params?.id;
  const patient = await Patient.find({ _id });
  if (!patient) throw new ApiResponse(404, "can't find this patient details.");
  res.status(200).json(new ApiResponse(200, patient));
});

const updatePatient = asyncHandler(async (req, res) => {
  const _id = req.params?.id;
  const {
    sName,
    sType,
    sAssessment,
    sAddress,
    sAddress2,
    sWhatsAppNumber,
    sGender,
    nAge,
  } = req.body;
  if (
    [
      sName,
      sType,
      sAssessment,
      sAddress,
      sAddress2,
      sWhatsAppNumber,
      sGender,
      nAge,
    ].some((field) => field?.trim === "")
  )
    throw new ApiError(400, "All fields are required.");
  const updatedPatient = await Patient.findOneAndUpdate(
    { _id },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedPatient) throw new ApiError(400, "Can't update patient details.");
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPatient,
        "Patient details are updated successfully"
      )
    );
});

export { createNewPatient, getAllPatients, getPatient, updatePatient };
