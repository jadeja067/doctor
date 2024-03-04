import { Appointment, PaymentShcedule } from "../../models/index.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const createNewAppointment = asyncHandler(async (req, res) => {
  const pId = req.params?.id;
  if (!pId) throw new ApiError(400, "Provide patient id.");
  const newAppointment = await Appointment.create({
    pId,
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

export { createNewAppointment, AddPaymentShedule };
