const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const getallappointments = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }],
        }
      : {};

    const appointments = await Appointment.find(keyword)
      .populate("doctorId")
      .populate("userId");  
    return res.send({status:true,appointments});
  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
};


const bookappointment = async (req, res) => {
  try {
    const { date, time, doctorId, userId } = req.body; // Destructure from request body

    const appointment = new Appointment({
      date,
      time,
      doctorId,
      userId, // Use the userId directly from the payload
    });

    // Save the appointment
    const result = await appointment.save();
    
    // Optionally, you could also retrieve user info if needed
    const user = await User.findById(userId); // If you need user details

    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Unable to book appointment");
  }
};

const deleteappo = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.appointid);

    if (!deletedAppointment) {
      return res.status(404).send({status:true,message:"Appointment not found"});
    }
    return res.status(200).send("Appointment  deleted");
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send("Unable to complete appointment");
  }
};



const getUpcomingAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id; // Fetch doctorId from request parameters
    const currentDate = new Date().toISOString(); // Get current date in ISO format for consistency

    console.log('Doctor ID:', doctorId);
    console.log('Current Date:', currentDate);

    const upcomingAppointments = await Appointment.find({
      doctorId: doctorId, 
      date: { $gte: currentDate },
    })
    .sort({ date: 1, time: 1 }) 
    .populate('userId', 'name email phone firstname') 
    .select('_id userId doctorId date time status');

   
    if (!upcomingAppointments || upcomingAppointments.length === 0) {
      return res.status(404).json({ message: 'No upcoming appointments found' });
    }
 
    res.json(upcomingAppointments);
  } catch (error) {
    console.error('Error fetching upcoming appointments:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  getallappointments,
  bookappointment,
  deleteappo,
  getUpcomingAppointments
};
