const Appointments = require("../models/appoinmentsModel");
const Revenue = require("../models/revenueModel");
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.find({});
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching appointments: ${error.message}` });
  }
};
const createAppointment = async (req, res) => {
  try {
    const { ...appointmentData } = req.body;
    const revenueId = req.body.revenueId;
    if (!revenueId) {
      return res.status(400).json({ message: "Revenue ID is required." });
    }
    const newAppointment = new Appointments(appointmentData);
    const appointmentSaved = await newAppointment.save();
    const revenues = await Revenue.findById(revenueId);
    if (!revenues) {
      return res.status(404).json({ message: "Revenue record not found." });
    }
    await Revenue.findByIdAndUpdate(
      revenueId,
      { revenue: revenues.revenue + 100 },
      { new: true }
    );
    res.status(201).json(appointmentSaved);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Error creating appointment: ${error.message}` });
  }
};
const updateAppointment = async (req, res) => {
  try {
    const appointmentUpdated = await Appointments.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appointmentUpdated) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.json(appointmentUpdated);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating appointment: ${error.message}` });
  }
};
const deleteAppointment = async (req, res) => {
  try {
    const appointmentDeleted = await Appointments.findByIdAndDelete(
      req.params.id
    );
    if (!appointmentDeleted) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    const revenues = await Revenue.findById(req.body.revenueId);
    if (!revenues) {
      return res.status(404).json({ message: "Revenue record not found." });
    }
    await Revenue.findByIdAndUpdate(
      req.body.revenueId,
      { revenue: revenues.revenue - 100 },
      { new: true }
    );
    res.json(appointmentDeleted);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting appointment: ${error.message}` });
  }
};
const getAppointment = async (req, res) => {
  try {
    const appointmentFound = await Appointments.findById(req.params.id);
    if (!appointmentFound) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.json(appointmentFound);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching appointment: ${error.message}` });
  }
};
module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
};
