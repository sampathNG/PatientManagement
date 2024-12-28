const mongoose = require("mongoose");
const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
  {
    timestamps: true,
  }
);
const consultationsSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appoinments",
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors",
    },
    date: {
      type: String,
      required: true,
    },
    symptoms: {
      type: [String],
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    medicines: {
      type: [medicineSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Consultations = mongoose.model("Consultations", consultationsSchema);
module.exports = Consultations;
