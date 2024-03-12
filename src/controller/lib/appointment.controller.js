import { Appointment, Patient, PaymentShcedule } from "../../models/index.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const createNewAppointment = asyncHandler(async (req, res) => {
  const pId = req.params?.id;
  const uId = req.user._id;
  if (!pId) throw new ApiError(400, "Provide patient id.");
  const existingPatient = await Patient.findOne({ _id: pId });
  if (!existingPatient) {
    throw new ApiError(400, "Patient does not exist");
  }
  const isExistingAppointment = await Appointment.find({ isComplete: false });
  const today = new Date();
  const thisDay = today.toISOString().split("T")[0];
  const existingDate = isExistingAppointment[
    isExistingAppointment.length - 1
  ]?.createdAt
    .toISOString()
    .split("T")[0];

  if (thisDay === existingDate)
    throw new ApiError(
      400,
      "Cannot create appointment because one already exists for today"
    );
  const newAppointment = await Appointment.create({
    pId,
    uId,
    sToTreat: req.body?.sToTreat,
    dToDate: req.body?.dToDate,
    dFromDate: req.body?.dFromDate,
    dtFromTime: req.body?.dtFromTime,
    dtToTime: req.body?.dtToTime,
    oRepeat: req.body?.oRepeat,
    sNote: req.body?.sNote,
  });
  if (!newAppointment) throw new ApiError(500, "can't create new appointment.");

  res
    .status(201)
    .json(new ApiResponse(201, newAppointment, "appointment is created."));
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const uId = req.user._id;
  const appointment = await Appointment.find({ uId });
  if (!appointment) {
    throw new ApiError(400, "Appointments does not exist");
  }
  res.status(200).json(new ApiResponse(200, appointment));
});

const getPatientAllAppointments = asyncHandler(async (req, res) => {
  const pId = req.params?.id;
  if (!pId) throw new ApiError(400, "Provide patient id.");
  const appointment = await Appointment.find({ pId });
  if (!appointment) {
    throw new ApiError(400, "Appointments does not exist for this patient");
  }
  res.status(200).json(new ApiResponse(200, appointment));
});

const getAppointment = asyncHandler(async (req, res) => {
  const _id = req.params?.id;
  if (!_id) throw new ApiError(400, "Provide appointment id.");
  const appointment = await Appointment.findOne({ _id });
  if (!appointment) {
    throw new ApiError(400, "Appointment does not exist");
  }
  res.status(200).json(new ApiResponse(200, appointment));
});

const addPaymentShedule = asyncHandler(async (req, res) => {
  const apponintmentId = req.params?.id;
  if (!apponintmentId) throw new ApiError(400, "Provide patient id.");
  const appointment = await Appointment.find({ _id: apponintmentId });
  if (!appointment) {
    throw new ApiError(400, "Appointment does not exist");
  }
  const newPaymentSchedule = await PaymentShcedule.create({
    apponintmentId,
    nCharges: req.body?.nCharges,
    sRepayment: req.body?.sRepayment,
  });
  if (!newPaymentSchedule)
    throw new ApiError(500, "can't shcedule payment for this appointment.");
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newPaymentSchedule,
        "Payment is shceduled for this appointment."
      )
    );
});

const getPayments = asyncHandler(async (req, res) => {
  const apponintmentId = req.params?.id;
  if (!apponintmentId) throw new ApiError(400, "Provide patient id.");
  const appointment = await Appointment.findOne({ _id: apponintmentId });
  if (!appointment) throw new ApiError(400, "Appointment does not exist");
  const paymentShcedule = await PaymentShcedule.findOne({ apponintmentId })
  if (!paymentShcedule) throw new ApiError(400, "No payment shcedule is avalible for this appointment")
  return res.status(200).json(new ApiResponse(200, paymentShcedule))
});


const deleteAppointment = asyncHandler(async (req, res) => {
  const _id = req.params?.id;
  if (!_id) throw new ApiError(400, "Provide appointment id.");
  const deletedAppointment = await Appointment.deleteOne({ _id });
  if (!deletedAppointment?.acknowledged) {
    throw new ApiError(400, "Appointment does not exist");
  }
  await PaymentShcedule.deleteMany({ apponintmentId: deletedAppointment._id });
  res
    .status(200)
    .json(new ApiResponse(200, "Appointment is deleted successfully."));
});

export {
  createNewAppointment,
  addPaymentShedule,
  getAllAppointments,
  getAppointment,
  getPatientAllAppointments,
  deleteAppointment,
  getPayments,
};
