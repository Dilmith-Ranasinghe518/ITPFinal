const express = require("express");
const router = express.Router();

//insert model
const admin = require ("../Model/AdminModel");

//insert user contraller
const AdminControllers = require("../Controllers/AdminControllers");

router.get("/",AdminControllers.getAllUsers);
router.post("/",AdminControllers.addBid);
router.get("/:id",AdminControllers.getbyBidId);
router.put("/:id",AdminControllers.updateBid);
router.delete("/:id",AdminControllers.deleteBid);

//export
module.exports = router;