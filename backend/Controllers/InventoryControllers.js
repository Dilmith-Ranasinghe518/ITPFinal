const Inventory = require("../Model/InventoryModel");


//Data Display
const getAllInventorys = async (req, res, next) => {

          let Inventorys;

    try{

        inventory = await Inventory.find();
    }catch (err) {
        console.log(err);
    }

   //not found

   if(!inventory){
    return res.status(404).json({message:"Inventory not found"});
   }

   // Display all inventory
   
   return res.status(200).json({inventory});



};


//Data Insert

const addInventorys = async(req, res, next) => {

    const {name,category,unit,quantity,description} = req.body;


    let inventory;

try{

    inventory = new Inventory({name,category,unit,quantity,description});
    await inventory.save();

}catch (err){
    console.log(err);
}

//not insert inventory

if(!inventory){
    return res.status(404).json({message:"unable to add item"});

}

return res.status(200).json({inventory});



};


//Get by Id

const getById = async (req, res, next)=>{

    const id = req.params.id;

    let inventory;

    try{
        inventory = await Inventory.findById(id);
    }catch (err) {
        console.log(err);
    }

//not available items

if(!inventory){
    return res.status(404).json({message:"Item not found "});

}

return res.status(200).json({inventory});

};

//Update Item details

const updateInventory = async (req, res, next) => {
        const id = req.params.id;
        const {name,category,unit,quantity,description} = req.body;
    
     let inventory;

     try{
         inventory = await Inventory.findByIdAndUpdate(id,
            {name: name, category: category, unit: unit, quantity: quantity, description: description});
            inventory = await inventory.save();
     }catch(err){
        console.log(err);
     }

     if(!inventory){
        return res.status(404).json({message:"Unable to update Item "});
    
    }
    
    return res.status(200).json({inventory});
    



};


//Delete Item

const deleteInventory = async (req, res, next)=> {
    const id = req.params.id;


    let inventory;

    try{
        inventory = await Inventory.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }

    if(!inventory){
        return res.status(404).json({message:"Unable to delete"});
    
    }
    
    return res.status(200).json({inventory});
    

};






exports.getAllInventorys = getAllInventorys;
exports.addInventorys = addInventorys;
exports.getById = getById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;