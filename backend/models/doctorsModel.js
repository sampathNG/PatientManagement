const mongoose = require("mongoose");
const doctorsSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: Number,
    specialization: String,
    experience: Number,
  },
  {
    timestamps: true,
  }
);
const Doctors = mongoose.model("Doctors", doctorsSchema);
module.exports = Doctors;
