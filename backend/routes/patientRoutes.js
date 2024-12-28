const router = require("express").Router();
const {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatient,
} = require("../controllers/patientController");
router.get("/", getPatients);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);
router.get("/:id", getPatient);
module.exports = router;
