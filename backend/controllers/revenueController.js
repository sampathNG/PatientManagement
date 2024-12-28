const revenue = require("../models/revenueModel");
const getRevenue = async (req, res) => {
  try {
    const revenueData = await revenue.find({});
    res.status(200).json(revenueData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createRevenue = async (req, res) => {
  const newRevenue = new revenue(req.body);
  try {
    await newRevenue.save();
    res.status(201).json(newRevenue);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const updateRevenue = async (req, res) => {
  const { id: _id } = req.params;
  const revenueData = req.body;
  try {
    const updatedRevenue = await revenue.findByIdAndUpdate(
      _id,
      {
        ...revenueData,
        _id,
      },
      {
        new: true,
      }
    );
    res.json(updatedRevenue);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteRevenue = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const deletedRevenue = await revenue.findByIdAndRemove(_id);
    res.json(deletedRevenue);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getRevenueById = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const revenueData = await revenue.findById(_id);
    res.status(200).json(revenueData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
module.exports = {
  getRevenue,
  createRevenue,
  updateRevenue,
  deleteRevenue,
  getRevenueById,
};
