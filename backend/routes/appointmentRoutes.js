const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
} = require("../controllers/appoinmentController");
const router = require("express").Router();
router.get("/", getAppointments);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.get("/:id", getAppointment);
module.exports = router;
