const {
  getRevenue,
  createRevenue,
  updateRevenue,
  deleteRevenue,
  getRevenueById,
} = require("../controllers/revenueController");
const router = require("express").Router();
router.get("/", getRevenue);
router.post("/", createRevenue);
router.put("/:id", updateRevenue);
router.delete("/:id", deleteRevenue);
router.get("/:id", getRevenueById);
module.exports = router;
