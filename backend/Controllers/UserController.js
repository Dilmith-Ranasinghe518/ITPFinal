const User = require("../Model/UserModel");

const getAllUsers = async(req, res, next) => {
    let users;
    //Get all users
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    //not found
    if(!users) {
        return res.status(404).json({message: "Users not found"});
    }
    //Display All Users
    return res.status(200).json({users});
};

//data insert
const addUsers = async (req, res, next) => {
    // Update destructuring to include the new fields
    const {name, lastName, email, phone, address, serviceType} = req.body;

    let users;

    try {
        // Create a new user with the updated fields
        users = new User({
            name,
            lastName,
            email,
            phone, 
            address,
            serviceType
        });
        await users.save();
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Error adding user", error: err.message});
    }
    
    // not insert users
    if (!users) {
        return res.status(404).json({message: "Unable to add user"});
    }
    return res.status(201).json({users});
};

//Get By Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Error finding user", error: err.message});
    }

    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({user});
};

//Update User Details
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    // Update destructuring to include the new fields
    const {name, lastName, email, phone, address, serviceType} = req.body;

    let user;

    try {
        user = await User.findByIdAndUpdate(
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
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Error updating user", error: err.message});
    }

    if (!user) {
        return res.status(404).json({message: "Unable to update user details"});
    }
    return res.status(200).json({user}); 
};

//Delete User Details
const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findByIdAndDelete(id);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Error deleting user", error: err.message});
    }
    //validation
    if (!user) {
        return res.status(404).json({message: "Unable to delete user details"});
    }
    return res.status(200).json({message: "User deleted successfully", user}); 
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;