/*const Income = require("../Models/Finance");

// Fetch all incomes
const getAllIncomes = async (req, res, next) => {
    try {
        const incomes = await Income.find();
        
        if (!incomes || incomes.length === 0) {
            return res.status(404).json({ message: "No incomes found" });
        }

        return res.status(200).json({ incomes });
    } catch (err) {
        console.error("Error fetching incomes:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Add income
const addIncomes = async (req, res, next) => {
    const { userId, icon, source, amount, date } = req.body;

    try {
        // ✅ Corrected model usage: `Income`, not `Incomes`
        const income = new Income({ userId, icon, source, amount, date });

        await income.save();

        return res.status(201).json({ message: "Income added successfully", income });
    } catch (err) {
        console.error("Error adding income:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};


//Get by Id

const getById = async (req, res, next) => {
    const id = req.params.id;

    let incomes;
    
    try {
        incomes =  await Income.findById(id);

    }catch (err) {
        console.log(err);
    }
   
        //not available users
        if(!incomes){
            return res.status(404).send({message:"incomes not found"});
        }
        return res.status(200).json({incomes});
    };

//update INCOME details
const updateIncome = async (req, res, next)=> {
    const id = req.params.id;
    const { userId, icon, source, amount, date } = req.body;

    

    try {
        // Find and update the income
        const incomes = await Income.findByIdAndUpdate(
            id,
            { userId, icon, source, amount, date }, // Update fields properly
            { new: true } // Return updated document
        );

        // If income not found, return error
        if (!incomes) {
            return res.status(404).json({ message: "Income not found" });
        }

        return res.status(200).json({ message: "Income updated successfully", incomes });
    } catch (err) {
        console.error("Error updating income:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

//delete incomes
const deleteIncome = async (req, res, next) => {
    const id = req.params.id;

    try {
        const income = await Income.findByIdAndDelete(id); // Use findByIdAndDelete instead

        if (!income) {
            return res.status(404).json({ message: "Income not found, unable to delete" });
        }

        return res.status(200).json({ message: "Income deleted successfully", income });
    } catch (err) {
        console.error("Error deleting income:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};


exports.getAllIncomes = getAllIncomes;
exports.addIncomes = addIncomes;
exports.getById = getById;
exports.updateIncome = updateIncome;
exports.deleteIncome = deleteIncome;
*/





/*

const Finance = require("../Models/Finance");

// Fetch all transactions (Income & Expense)
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Finance.find();

        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found" });
        }

        return res.status(200).json({ transactions });
    } catch (err) {
        console.error("Error fetching transactions:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Add income
const addIncomes = async (req, res, next) => {
    const { userId, icon, source, amount, date } = req.body;

    try {
        // ✅ Corrected model usage: `Income`, not `Incomes`
        const income = new Income({ userId, icon, source, amount, date });

        await income.save();

        return res.status(201).json({ message: "Income added successfully", income });
    } catch (err) {
        console.error("Error adding income:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};


//Get by Id

const getById = async (req, res, next) => {
    const id = req.params.id;

    let incomes;
    
    try {
        incomes =  await Income.findById(id);

    }catch (err) {
        console.log(err);
    }
   
        //not available users
        if(!incomes){
            return res.status(404).send({message:"incomes not found"});
        }
        return res.status(200).json({incomes});
    };

//update INCOME details
const updateIncome = async (req, res, next)=> {
    const id = req.params.id;
    const { userId, icon, source, amount, date } = req.body;

    

    try {
        // Find and update the income
        const incomes = await Income.findByIdAndUpdate(
            id,
            { userId, icon, source, amount, date }, // Update fields properly
            { new: true } // Return updated document
        );

        // If income not found, return error
        if (!incomes) {
            return res.status(404).json({ message: "Income not found" });
        }

        return res.status(200).json({ message: "Income updated successfully", incomes });
    } catch (err) {
        console.error("Error updating income:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

//delete incomes
const deleteIncome = async (req, res, next) => {
    const id = req.params.id;

    try {
        const income = await Income.findByIdAndDelete(id); // Use findByIdAndDelete instead

        if (!income) {
            return res.status(404).json({ message: "Income not found, unable to delete" });
        }

        return res.status(200).json({ message: "Income deleted successfully", income });
    } catch (err) {
        console.error("Error deleting income:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};


exports.getAllTransactions = getAllTransactions;
exports.getTransactionById = getTransactionById;
exports.addIncomes = addIncomes;
exports.updateIncome = updateIncome;
exports.deleteIncome = deleteIncome;

*/


const Finance = require("../Model/Finance");

// Create a new transaction (Income or Expense)
const createTransaction = async (req, res) => {
  try {
    const transaction = new Finance(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Finance.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Finance.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Finance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Finance.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
