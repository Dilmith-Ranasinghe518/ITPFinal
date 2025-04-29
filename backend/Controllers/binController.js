const Bin = require("../Model/binModel");

// Add a new bin
const addBin = async (req, res) => {
  const { name, lat, lng, full } = req.body;
  const newBin = new Bin({ name, lat, lng, full });

  try {
    const savedBin = await newBin.save();
    res.status(201).send({ message: "Bin added successfully!", _id: savedBin._id });
  } catch (err) {
    res.status(500).send({ message: "Error saving bin." });
  }
};

// Get all bins
const getBins = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).send(bins);
  } catch (err) {
    res.status(500).send({ message: "Error fetching bins." });
  }
};

// Delete a bin by ID
const deleteBin = async (req, res) => {
  const { id } = req.params;

  try {
    const bin = await Bin.findByIdAndDelete(id); // Delete bin by ID
    if (!bin) {
      return res.status(404).send({ message: "Bin not found" });
    }
    res.status(200).send({ message: "Bin deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting bin." });
  }
};

const updateBin = async (req, res) => {
  const { id } = req.params;
  const { full } = req.body;  // Get 'full' value from request body

  try {
    // Ensure full is a boolean
    if (typeof full !== "boolean") {
      return res.status(400).send({ message: "Invalid value for 'full'. Must be true or false." });
    }

    // Update 'full' dynamically
    const updatedBin = await Bin.findByIdAndUpdate(
      id,
      { full },  // Now it updates to true or false based on request
      { new: true } // Return the updated bin object
    );

    if (!updatedBin) {
      return res.status(404).send({ message: "Bin not found" });
    }

    res.status(200).send({ message: "Bin updated successfully!", bin: updatedBin });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating bin." });
  }
};



module.exports = { addBin, getBins, deleteBin, updateBin };
