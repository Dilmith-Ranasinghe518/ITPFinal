const Admin = require("../Model/AdminModel");

const getAllUsers = async (req, res, next) => {

    let admins;

    //get all users
    try{
        admin = await Admin.find();
    }catch(err){
        console.log(err);
    }
    //not found
    if(!admin){
        return res.status(404).json({message:"user not found"});
    }

    //display all users
    return res.status(200).json({admin});

};

//insert
const addBid = async (req,res,next) => {
    const {wtype,amount,price} = req.body;


let admin;

try{
    admin = new Admin({wtype,amount,price});
    await admin.save();
}catch(err){
    console.log(err);
}

//dont insert bid
if(!admin){
    return res.status(404).json({message:"unable to add bid"});
}

return res.status(200).json({admin});
};

//get by bidid

const getbyBidId = async (req, res, next) =>{
      const id = req.params.id;

      let admin;

      try{
        admin = await Admin.findById(id);

      }catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
          }

//dont avilable bid
if(!admin){
    return res.status(404).json({message:"Bid not found"});
}

return res.status(200).json({admin});
};

//update bid details

const updateBid = async(req, res, next) => {

    const id = req.params.id;
    const {wtype,amount,price} = req.body;

    let admin;
 try{
    admin = await Admin.findByIdAndUpdate(id,
        {wtype: wtype, amount: amount, price: price});
 }catch(err){
    console.error(err);
 }

 //dont avilable bid
if(!admin){
    return res.status(404).jsaon({message:"unable to update bid"});
}

return res.status(200).json({admin});
};

//delete user
 const deleteBid = async(req, res, next) =>{
    const id = req.params.id;

    let admin;

    try{
      admin = await Admin.findByIdAndDelete(id)

    }catch (err) {
        console.log(err);
    }

    //dont avilable bid for delete
if(!admin){
    return res.status(404).json({message:"unable to delete bid"});
}

return res.status(200).json({admin});
};





exports.getAllUsers = getAllUsers;
exports.addBid=addBid;
exports.getbyBidId = getbyBidId;
exports.updateBid = updateBid;
exports.deleteBid=deleteBid;