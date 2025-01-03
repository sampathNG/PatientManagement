const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema(
  {
    revenue: { type: Number, required: true },
    totalAppointments: { type: Number, required: true },
    scheduled: { type: Number, required: true },
    cancelled: { type: Number, required: true },
    completed: { type: Number, required: true },
    totalPatients: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Report", reportSchema);
