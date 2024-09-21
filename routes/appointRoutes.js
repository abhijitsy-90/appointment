const express = require("express");
const auth = require("../middleware/auth");
const appointmentController = require("../controllers/appointmentController");

const appointRouter = express.Router();

appointRouter.get(
  "/getallappointments",
  appointmentController.getallappointments
);

appointRouter.post(
  "/bookappointment",
  appointmentController.bookappointment
);

appointRouter.delete("/deleteappointment/:appointid",appointmentController.deleteappo);

appointRouter.get("/getAllUpcommingAppoi/:id",appointmentController.getUpcomingAppointments)
module.exports = appointRouter;
