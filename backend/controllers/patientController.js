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
  const newPatient = new patient({
    ...otherData,
    dateOfBirth: parsedDate,
  });
  try {
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
const updatePatient = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { dateOfBirth, ...otherData } = req.body;
    const parsedDate = moment(dateOfBirth, "DD/MM/YYYY").toDate();
    const updatedPatient = await patient.findByIdAndUpdate(
      _id,
      {
        ...otherData,
        _id,
        dateOfBirth: parsedDate,
      },
      {
        new: true,
      }
    );
    res.json(updatedPatient);
  } catch (error) {
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
    await patient.findByIdAndRemove(id);
    res.json({
      message: "Patient deleted successfully.",
    });
  } catch (error) {
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
