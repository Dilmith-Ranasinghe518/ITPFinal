/*const express = require("express");
const router = express.Router();
//Insert Model
const User = require("../Models/Finance");
//Insert Income controller
const financeController = require("../Controllers/financeController");
router.get("/",financeController.getAllTransactions);
router.post("/", financeController.addIncome);
router.get("/:id", financeController.getTransactionById);
router.put("/:id", financeController.updateIncome);
router.delete("/:id", financeController.deleteIncome);
/*
router.get("/",incomeController.getAllIncomes);
router.post("/",incomeController.addIncomes);
router.get("/:id",incomeController.getById);
router.put("/:id",incomeController.updateIncome);
router.delete("/:id",incomeController.deleteIncome);*/


//export
/*module.exports = router;*/


const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../Controllers/financeController");

const router = express.Router();

// Create a new transaction (Income or Expense)
router.post("/", createTransaction);

// Get all transactions
router.get("/", getAllTransactions);

// Get a single transaction by ID
router.get("/:id", getTransactionById);

// Update a transaction
router.put("/:id", updateTransaction);

// Delete a transaction
router.delete("/:id", deleteTransaction);

module.exports = router;
