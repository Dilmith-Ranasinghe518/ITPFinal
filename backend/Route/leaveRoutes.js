const express = require("express");
const router = express.Router();
const leaveController = require("../Controllers/leaveController");

router.post("/leaveapply", leaveController.applyLeave);
router.get("/leaves", leaveController.getLeaves);
router.patch("/leaves/:id", leaveController.updateLeave);
router.delete("/leaves/:id", leaveController.deleteLeave);

module.exports = router;
