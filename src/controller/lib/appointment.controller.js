import { Appointment, PaymentShcedule } from "../../models/index.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const createNewAppointment = asyncHandler(async (req, res) => {
  const pId = req.params?.id;
  if (!pId) throw new ApiError(400, "Provide patient id.");
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
    .status(200)
    .json(new ApiResponse(200, newAppointment, "appointment is created."));
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const uId = req.body?._id
  const appointment = await Appointment.find({ uId })
  res.status(200).json(new ApiResponse(200, appointment))
})

const getPatientAllAppointments = asyncHandler(async (req, res) => {
  const pId = req.params?.id
  if (!_id) throw new ApiError(400, "Provide patient id.");
  const appointment = await Appointment.find({ pId });
  res.status(200).json(new ApiResponse(200, appointment));
})

const getAppointment = asyncHandler(async (req, res) => {
  const _id = req.params?.id;
  if(!_id) throw new ApiError(400, "Provide appointment id.")
  const appointment = await Appointment.findOne({ _id });
  res.status(200).json(new ApiResponse(200, appointment));
});

const AddPaymentShedule = asyncHandler(async (req, res) => {
    const apponintmentId = req.params?.id;
    if (!apponintmentId) throw new ApiError(400, "Provide patient id.");
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
        new ApiResponse(200, newPaymentSchedule, "Payment is shceduled for this appointment.")
      );
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const _id = req.params?.id;
  if (!_id) throw new ApiError(400, "Provide appointment id.");
  const deletedAppointment = await Appointment.deleteOne({ _id });
  res.status(200).json(new ApiResponse(200, deletedAppointment));
})

export {
  createNewAppointment,
  AddPaymentShedule,
  getAllAppointments,
  getAppointment,
  getPatientAllAppointments,
  deleteAppointment,
};
