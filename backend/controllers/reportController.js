const Reports = require("../models/reportModel");
const Revenues = require("../models/revenueModel");
const Appointments = require("../models/appoinmentsModel");
const Patients = require("../models/patientsModel");
const createReport = async (req, res) => {
  try {
    const revenueTotal = await Revenues.aggregate([
      { $group: { _id: null, total: { $sum: "$revenue" } } },
    ]);
    const appointmentCounts = await Appointments.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const appointmentSummary = appointmentCounts.reduce(
      (acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      },
      { scheduled: 0, cancelled: 0, completed: 0 }
    );
    const totalPatients = await Patients.countDocuments();
    const newReport = await Reports.create({
      revenue: revenueTotal[0]?.total || 0,
      totalAppointments: Object.values(appointmentSummary).reduce(
        (sum, count) => sum + count,
        0
      ),
      scheduled: appointmentSummary.scheduled,
      cancelled: appointmentSummary.cancelled,
      completed: appointmentSummary.completed,
      totalPatients, // Include the total patient count in the report
    });
    res.status(201).json(newReport);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating report: ${error.message}` });
  }
};
const getReports = async (req, res) => {
  try {
    const reports = await Reports.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createReport,
  getReports,
};
