/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
     userId:{
        type:String,//data type
        required:true,//validate
     },
     icon:{
        type:String,//data type
        
     },
     source:{
        type:String,//data type
        required:true,//validate
     },
     amount:{
        type:Number,//data type
        required:true,//validate
     },
     date: {
        type: Date, // data type
        default: Date.now, // default value
      },
    },
    { timestamps: true } // Correct placement of timestamps
  );
  
  module.exports = mongoose.model(
    "Finance", //file name
    incomeSchema //function name
);*/
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

// Fetch transaction by ID
const getTransactionById = async (req, res) => {
    const id = req.params.id;

    try {
        const transaction = await Finance.findById(id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(200).json({ transaction });
    } catch (err) {
        console.error("Error fetching transaction:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Add new transaction (Income or Expense)
const addTransaction = async (req, res) => {
    const { transaction_type, amount, date, payment_method, category, waste_type, description } = req.body;

    try {
        const transaction = new Finance({
            transaction_type,
            amount,
            date,
            payment_method,
            category,
            waste_type: transaction_type === "Income" ? waste_type : undefined, // Only for Income
            description
        });

        await transaction.save();
        return res.status(201).json({ message: "Transaction added successfully", transaction });
    } catch (err) {
        console.error("Error adding transaction:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Update transaction by ID
const updateTransaction = async (req, res) => {
    const id = req.params.id;
    const { transaction_type, amount, date, payment_method, category, waste_type, description } = req.body;

    try {
        const transaction = await Finance.findByIdAndUpdate(
            id,
            {
                transaction_type,
                amount,
                date,
                payment_method,
                category,
                waste_type: transaction_type === "Income" ? waste_type : undefined,
                description
            },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(200).json({ message: "Transaction updated successfully", transaction });
    } catch (err) {
        console.error("Error updating transaction:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Delete transaction by ID
const deleteTransaction = async (req, res) => {
    const id = req.params.id;

    try {
        const transaction = await Finance.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found, unable to delete" });
        }

        return res.status(200).json({ message: "Transaction deleted successfully", transaction });
    } catch (err) {
        console.error("Error deleting transaction:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction
};*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    transaction_type: {
      type: String,
      enum: ["Income", "Expense"], // User must select one
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Prevents negative amounts
    },
    payment_method: {
      type: String,
      enum: ["Cash", "Bank Transfer", "Credit Card", "Other"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    waste_type: {
      type: String,
      enum: ["Plastic", "Iron", "Paper", "Glass", "Other"],
      required: function () {
        return this.transaction_type === "Income"; // Required only for income
      },
    },
    description: {
      type: String,
      default: "No description provided", // More user-friendly default
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Finance", transactionSchema);

