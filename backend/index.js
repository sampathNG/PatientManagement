require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  try {
    res.send("Hello World!");
  } catch (error) {
    console.log(error.message);
    throw new AppError(error.message, 500);
  }
});
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/revenues", require("./routes/revenueRoutes"));
app.use("/api/consultations", require("./routes/consultationRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
