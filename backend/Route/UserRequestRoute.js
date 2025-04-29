const express = require("express");
const router = express.Router();
// Insert Model

const UserRequest = require("../Model/UserRequestModel");

// Insert UserRequest Controller
const UserRequestController = require("../Controllers/UserRequestController");

router.get("/", UserRequestController.getAllUserRequests);
router.post("/", UserRequestController.addUserRequest);
router.get("/:id", UserRequestController.getUserRequestById);
router.put("/:id", UserRequestController.updateUserRequest);
router.delete("/:id", UserRequestController.deleteUserRequest);

// Export
module.exports = router;
