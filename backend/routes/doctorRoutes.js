const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctor,
} = require("../controllers/doctorController");
const router = require("express").Router();
router.get("/", getDoctors);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
router.get("/:id", getDoctor);
module.exports = router;
