const {
  createConsultation,
  getConsultations,
  getConsultation,
  updateConsultation,
  deleteConsultation,
} = require("../controllers/consultationController");
const router = require("express").Router();
router.get("/", getConsultations);
router.post("/", createConsultation);
router.put("/:id", updateConsultation);
router.delete("/:id", deleteConsultation);
router.get("/:id", getConsultation);
module.exports = router;
