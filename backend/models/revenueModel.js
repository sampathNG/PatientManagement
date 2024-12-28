const mongoose = require("mongoose");
const revenueSchema = new mongoose.Schema(
  {
    revenue: {
      type: Number,
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appoinments",
    },
  },
  {
    timestamps: true,
  }
);
const Revenue = mongoose.model("Revenue", revenueSchema);
module.exports = Revenue;
