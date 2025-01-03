const mongoose = require("mongoose");
const moment = require("moment");
const patient = require("../models/patientsModel");
const getPatients = async (req, res) => {
  try {
    const patients = await patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
const createPatient = async (req, res) => {
  const { dateOfBirth, ...otherData } = req.body;
  const parsedDate = moment(dateOfBirth, "DD/MM/YYYY").toDate();
  // const newPatient = new patient({
  //   ...otherData,
  //   dateOfBirth: parsedDate,
  // });
  const newPatient = new patient(req.body);
  try {
    await newPatient.save();
    console.log(newPatient);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
const updatePatient = async (req, res) => {
  try {
    console.log(req.body);
    const { id: _id } = req.params;
    const { dateOfBirth, ...otherData } = req.body;
    console.log(dateOfBirth);
    // const parsedDate = moment(dateOfBirth, "YYYYDD/MM/").toDate();
    // const parsedDates = new Date(dateOfBirth);
    // const parsedDate = parsedDates.toLocaleTimeString();
    // console.log(parsedDate);
    const updatedPatient = await patient.findByIdAndUpdate(
      _id,
      // {
      //   ...otherData,
      //   _id,
      //   dateOfBirth: parsedDate,
      // },
      req.body,
      {
        new: true,
      }
    );
    // console.log(updatedPatient);
    res.json(updatedPatient);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No patient with id: ${id}`);
    await patient.findByIdAndDelete(id);
    res.json({
      message: "Patient deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};
const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patientt = await patient.findById(id);
    res.status(200).json(patientt);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
module.exports = {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatient,
};
