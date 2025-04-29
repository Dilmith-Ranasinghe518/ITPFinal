const UserRequest = require("../Model/UserRequestModel");

const getAllUserRequests = async (req, res, next) => {
    let userRequests;
    // Get all user requests
    try {
        userRequests = await UserRequest.find();
    } catch (err) {
        console.log(err);
    }

    // not found
    if (!userRequests) {
        return res.status(404).json({ message: "User requests not found" });
    }
    // Display All User Requests
    return res.status(200).json({ userRequests });
};

// Data insert
const addUserRequest = async (req, res, next) => {
    // Update destructuring to include the new fields
    const { name, lastName, email, phone, address, serviceType } = req.body;

    let userRequest;

    try {
        // Create a new user request with the updated fields
        userRequest = new UserRequest({
            name,
            lastName,
            email,
            phone,
            address,
            serviceType
        });
        await userRequest.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error adding user request", error: err.message });
    }

    // not insert user requests
    if (!userRequest) {
        return res.status(404).json({ message: "Unable to add user request" });
    }
    return res.status(201).json({ userRequest });
};

// Get By Id
const getUserRequestById = async (req, res, next) => {
    const id = req.params.id;

    let userRequest;

    try {
        userRequest = await UserRequest.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error finding user request", error: err.message });
    }

    if (!userRequest) {
        return res.status(404).json({ message: "User request not found" });
    }
    return res.status(200).json({ userRequest });
};

// Update UserRequest Details
const updateUserRequest = async (req, res, next) => {
    const id = req.params.id;
    // Update destructuring to include the new fields
    const { name, lastName, email, phone, address, serviceType } = req.body;

    let userRequest;

    try {
        userRequest = await UserRequest.findByIdAndUpdate(
            id,
            {
                name,
                lastName,
                email,
                phone,
                address,
                serviceType
            },
            { new: true } // Return the updated document
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating user request", error: err.message });
    }

    if (!userRequest) {
        return res.status(404).json({ message: "Unable to update user request details" });
    }
    return res.status(200).json({ userRequest });
};

// Delete UserRequest Details
const deleteUserRequest = async (req, res, next) => {
    const id = req.params.id;

    let userRequest;

    try {
        userRequest = await UserRequest.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting user request", error: err.message });
    }

    // validation
    if (!userRequest) {
        return res.status(404).json({ message: "Unable to delete user request details" });
    }
    return res.status(200).json({ message: "User request deleted successfully", userRequest });
};

exports.getAllUserRequests = getAllUserRequests;
exports.addUserRequest = addUserRequest;
exports.getUserRequestById = getUserRequestById;
exports.updateUserRequest = updateUserRequest;
exports.deleteUserRequest = deleteUserRequest;
