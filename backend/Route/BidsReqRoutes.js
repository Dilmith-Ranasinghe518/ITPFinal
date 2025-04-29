const express = require("express");
const router = express.Router();

// Insert model
const BidReq = require("../Model/Bids"); // Assuming you are using BidReqModel for bid requests

// Insert controller
const BidReqControllers = require("../Controllers/BidReqControllers"); // Changed to match the new controller file name





// Routes for bid requests
router.get("/", BidReqControllers.fetchAllBids);  // Changed to 'fetchAllBids'
router.post("/", BidReqControllers.createBid);   // Changed to 'createBid'
router.get("/:id", BidReqControllers.retrieveBid); // Changed to 'retrieveBid'
router.put("/:id", BidReqControllers.modifyBid);  // Changed to 'modifyBid'
router.delete("/:id", BidReqControllers.removeBid); // Changed to 'removeBid'

router.patch('/:id/accept', BidReqControllers.acceptBid);//when accept
router.patch('/:id/reject', BidReqControllers.rejectBid);//when reject

router.patch('/bids/:id/status', BidReqControllers.updateBidStatus);



// Export the router
module.exports = router;
