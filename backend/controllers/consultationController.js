const consultation = require("../models/consultationsModel");
const createConsultation = async (req, res) => {
  try {
    const newConsultation = new consultation(req.body);
    const consultationSaved = await newConsultation.save();
    res.status(201).json(consultationSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const getConsultations = async (req, res) => {
  try {
    const consultations = await consultation.find();
    return res.json(consultations);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const getConsultation = async (req, res) => {
  const consultationFound = await consultation.findById(req.params.id);
  if (!consultationFound) return res.status(204).json();
  return res.json(consultationFound);
};
const updateConsultation = async (req, res) => {
  const consultationUpdated = await consultation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!consultationUpdated) return res.status(204).json();
  res.json(consultationUpdated);
};
const deleteConsultation = async (req, res) => {
  const consultationDeleted = await consultation.findByIdAndDelete(
    req.params.id
  );
  if (!consultationDeleted) return res.status(204).json();
  res.json(consultationDeleted);
};
module.exports = {
  createConsultation,
  getConsultations,
  getConsultation,
  updateConsultation,
  deleteConsultation,
};
