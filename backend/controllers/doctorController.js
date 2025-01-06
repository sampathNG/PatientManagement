const doctors = require("../models/doctorsModel");
const getDoctors = async (req, res) => {
  try {
    const doctor = await doctors.find();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const createDoctor = async (req, res) => {
  const newDoctor = new doctors(req.body);
  try {
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const updateDoctor = async (req, res) => {
  const { id: _id } = req.params;
  const doctor = req.body;
  try {
    const updatedDoctor = await doctors.findByIdAndUpdate(
      _id,
      {
        ...doctor,
        _id,
      },
      {
        new: true,
      }
    );
    res.json(updatedDoctor);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    await doctors.findByIdAndDelete(id);
    res.json({ message: "Doctor deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctors.findById(id);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctor,
};
