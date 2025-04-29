const express = require("express");
const { addBin, getBins, deleteBin, updateBin } = require("../Controllers/binController");

const router = express.Router();

router.post("/addBin", addBin); // Add new bin
router.get("/getBins", getBins); // Get all bins
router.delete("/deleteBin/:id", deleteBin); // Delete bin by ID
router.put("/updateBin/:id", updateBin); // Update bin by ID

module.exports = router;
