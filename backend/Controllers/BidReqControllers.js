const BidReq = require("../Model/Bids"); // Importing the Bid model
const nodemailer = require("nodemailer");

// Get all bid requests
const fetchAllBids = async (req, res, next) => {
    let bids;
    try {
        bids = await BidReq.find();  // Fetching all bids
    } catch (err) {
        console.error("Error fetching bids: ", err);
        return res.status(500).json({ message: "Error fetching bids" });
    }

    if (!bids || bids.length === 0) {
        return res.status(404).json({ message: "No bids found" });
    }

    return res.status(200).json({ bids });
};



// Insert new bid request and send email
const createBid = async (req, res, next) => {
  console.log("📩 Received Bid Data: ", req.body);

  const {
    companyName,
    email,
    phone,
    amount,
    bidDate,
    wtype,
    userRecommendedPrice,
    additionalNote,
  } = req.body;

  if (!companyName || !email || !phone || !amount || !wtype || !userRecommendedPrice) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let bid;
  try {
    // ✅ Save the bid
    bid = new BidReq({
      companyName,
      email,
      phone,
      amount,
      bidDate,
      wtype,
      userRecommendedPrice,
      additionalNote,
      status: "Pending",
    });
    await bid.save();

    // ✅ Set up email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "chasathsarani@gmail.com", // Replace with your Gmail
        pass: process.env.EMAIL_PASS || "fwtf mpfy qiip igie",        // App Password
      },
    });

    // ✅ Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || "chasathsarani@gmail.com",
      to: "kaveeshasathsarani18@gmail.com", // 🔁 Or you could use email variable if sending to company
      subject: "📝 New Bid Request Received",
      html: `
        <h2>📝 New Bid Details</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Bid Date:</strong> ${bidDate ? new Date(bidDate).toLocaleDateString() : "N/A"}</p>
        <p><strong>Waste Type:</strong> ${wtype}</p>
        <p><strong>User Recommended Price:</strong> ${userRecommendedPrice}</p>
        <p><strong>Note:</strong> ${additionalNote || "N/A"}</p>
        <p><em>Status: Pending</em></p>
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

    return res.status(201).json({ message: "Bid created and email sent", bid });
  } catch (err) {
    console.error("❌ Error processing bid:", err);
    return res.status(500).json({ message: "Unable to create bid or send email" });
  }
};



// Get bid request by ID
const retrieveBid = async (req, res, next) => {
    const id = req.params.id;

    let bid;
    try {
        bid = await BidReq.findById(id); 
    } catch (err) {
        console.error("Error fetching bid by ID: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!bid) {
        return res.status(404).json({ message: "Bid not found" });
    }

    return res.status(200).json({ bid });
};

// Update bid request details
const modifyBid = async (req, res, next) => {
    const id = req.params.id;
    const { 
        companyName, email, phone, amount, bidDate, wtype, 
        userRecommendedPrice, additionalNote, status, rejectionReason 
    } = req.body;

    let bid;
    try {
        bid = await BidReq.findByIdAndUpdate(
            id, 
            { companyName, email, phone, amount, bidDate, wtype, 
              userRecommendedPrice, additionalNote, status, rejectionReason }, 
            { new: true }
        );
    } catch (err) {
        console.error("Error updating bid: ", err);
        return res.status(500).json({ message: "Error updating bid" });
    }

    if (!bid) {
        return res.status(404).json({ message: "Unable to update bid" });
    }

    return res.status(200).json({ bid });
};

// Accept Bid
const acceptBid = async (req, res, next) => {
    const id = req.params.id;

    let bid;
    try {
        bid = await BidReq.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true });
    } catch (err) {
        console.error("Error accepting bid: ", err);
        return res.status(500).json({ message: "Error updating bid status" });
    }

    if (!bid) {
        return res.status(404).json({ message: "Bid not found" });
    }

    return res.status(200).json({ message: "Bid accepted successfully", bid });
};

// Reject Bid
const rejectBid = async (req, res, next) => {
    const id = req.params.id;
    const { rejectionReason } = req.body;

    if (!rejectionReason) {
        return res.status(400).json({ message: "Rejection reason is required" });
    }

    let bid;
    try {
        bid = await BidReq.findByIdAndUpdate(
            id, 
            { status: 'Rejected', rejectionReason }, 
            { new: true }
        );
    } catch (err) {
        console.error("Error rejecting bid: ", err);
        return res.status(500).json({ message: "Error updating bid status" });
    }

    if (!bid) {
        return res.status(404).json({ message: "Bid not found" });
    }

    return res.status(200).json({ message: "Bid rejected successfully", bid });
};

// Delete bid request
const removeBid = async (req, res, next) => {
    const id = req.params.id;

    let bid;
    try {
        bid = await BidReq.findByIdAndDelete(id);
    } catch (err) {
        console.error("Error deleting bid: ", err);
        return res.status(500).json({ message: "Error deleting bid" });
    }

    if (!bid) {
        return res.status(404).json({ message: "Unable to delete bid" });
    }

    return res.status(200).json({ message: "Bid deleted successfully" });
};

// Update bid status (generic)
const updateBidStatus = async (req, res, next) => {
    const id = req.params.id;
    const { status, rejectionReason } = req.body;

    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }

    let bid;
    try {
        bid = await BidReq.findByIdAndUpdate(
            id,
            { status, rejectionReason }, // Only update status and rejectionReason
            { new: true }
        );
    } catch (err) {
        console.error("Error updating bid status: ", err);
        return res.status(500).json({ message: "Error updating bid status" });
    }

    if (!bid) {
        return res.status(404).json({ message: "Bid not found" });
    }

    return res.status(200).json({ message: "Bid status updated successfully", bid });
};

exports.updateBidStatus = updateBidStatus;


exports.fetchAllBids = fetchAllBids;
exports.createBid = createBid;
exports.retrieveBid = retrieveBid;
exports.modifyBid = modifyBid;
exports.acceptBid = acceptBid;
exports.rejectBid = rejectBid;
exports.removeBid = removeBid;
