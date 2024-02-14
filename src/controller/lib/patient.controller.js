import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import { Patient } from "../../models/index.js";

const createNewPatient = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    assessment,
    primaryAddress,
    secondaryAddress,
    gender,
    whatsAppNumber,
    age,
  } = req.body;
  const uId = req.user?._id;
  console.log(uId);
  const check = await Patient.findOne({
    pName: name,
    pWhatsAppNumber: whatsAppNumber,
  });
  if (check) throw new ApiError(400, "User Already Exist.");
  if (
    [
      name,
      type,
      assessment,
      primaryAddress,
      secondaryAddress,
      gender,
      whatsAppNumber,
      age,
      uId,
    ].some((field) => field?.trim === "")
  )
    throw new ApiError(400, "All fields are required.");
  const data = await Patient.create({
    pName: name,
    pType: type,
    pAssessment: assessment,
    pAddress: primaryAddress,
    pAddress2: secondaryAddress,
    pWhatsAppNumber: whatsAppNumber,
    pGender: gender,
    pAge: age,
    uId: uId,
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
  const uId = req.user?._id,
    _id = req.params?.id;
  const patient = await Patient.find({ _id, uId });
  if (!patient) throw new ApiResponse(404, "can't find this patient details.");
  res.status(200).json(new ApiResponse(200, patient));
});

const updatePatient = asyncHandler(async (req, res) => {
  const _id = req.params?.id;
  const {
    name,
    type,
    assessment,
    primaryAddress,
    secondaryAddress,
    gender,
    whatsAppNumber,
    age,
  } = req.body;
  if (
    [
      name,
      type,
      assessment,
      primaryAddress,
      secondaryAddress,
      gender,
      whatsAppNumber,
      age,
    ].some((field) => field?.trim === "")
  )
    throw new ApiError(400, "All fields are required.");
  const updatedPatient = await Patient.findOneAndUpdate(
    { _id },
    {
      pName: name,
      pType: type,
      pAssessment: assessment,
      pAddress: primaryAddress,
      pAddress2: secondaryAddress,
      pWhatsAppNumber: whatsAppNumber,
      pGender: gender,
      pAge: age,
    },
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
