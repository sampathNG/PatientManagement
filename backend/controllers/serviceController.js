const services = require("../models/servicesModel");
const getServices = async (req, res) => {
  try {
    const service = await services.find({});
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await services.findById(id);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createService = async (req, res) => {
  try {
    const service = await services.create(req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await services.findByIdAndUpdate(id, req.body);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    const updatedService = await services.findById(id);
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await services.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};
