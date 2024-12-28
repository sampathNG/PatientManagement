const mongoose = require("mongoose");
const appointmentsSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    // consultationId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Consultations",
    //   required: function () {
    //     return this.status === "completed";
    //   },
    // },
  },
  {
    timestamps: true,
  }
);
const Appointments = mongoose.model("Appointments", appointmentsSchema);
module.exports = Appointments;
