const express = require("express");
const router = express.Router();
const Recycle = require("../Model/Recycle");
const Inventory = require("../Model/InventoryModel");

// ✅ GET recycled data
router.get("/", async (req, res) => {
  try {
    const data = await Recycle.find().sort({ transferredAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching recycled items:", error);
    res.status(500).json({ error: "Failed to fetch recycled items." });
  }
});

// ✅ POST: Add recycled data & update inventory
router.post("/", async (req, res) => {
  const { recycledData } = req.body;

  if (!recycledData || !Array.isArray(recycledData)) {
    return res.status(400).json({ error: "Invalid input format." });
  }

  try {
    // Save recycled data
    await Recycle.insertMany(
      recycledData.map(item => ({
        category: item.category,
        quantity: item.quantity,
        transferredAt: new Date(),
      }))
    );

    // Reduce quantities from inventory
    for (const recycledItem of recycledData) {
      let remainingQty = recycledItem.quantity;

      const items = await Inventory.find({ category: recycledItem.category }).sort({ quantity: -1 });

      for (const item of items) {
        if (remainingQty <= 0) break;

        const reduceAmount = Math.min(item.quantity, remainingQty);
        item.quantity -= reduceAmount;
        remainingQty -= reduceAmount;
        await item.save();
      }
    }

    res.status(200).json({ message: "Recycled and inventory updated successfully" });
  } catch (err) {
    console.error("Recycle POST error:", err);
    res.status(500).json({ error: "Failed to recycle and update inventory." });
  }
});

module.exports = router;
