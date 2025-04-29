import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import api from "./api";
import './TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };
    fetchTransactions();
  }, []);

  const handleUpdate = (transaction) => {
    // Redirect to the update form with the current transaction data
    navigate(`/update/${transaction._id}`, { state: { transaction } });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTransactions(transactions.filter(transaction => transaction._id !== id)); // Remove from state after delete
      alert('Transaction deleted successfully!');
    } catch (error) {
      alert('Error deleting transaction!');
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || 
                       (filterType === 'income' && transaction.transaction_type === 'Income') ||
                       (filterType === 'expense' && transaction.transaction_type === 'Expense');
    return matchesSearch && matchesType;
  });

  return (
    <div className="transactionlist-container">
      <div className="transactionlist-filter-container">
        <h2 className="transactionlist-header">Search & Filter Transactions</h2>
        
        <div className="transactionlist-search-filter">
          <div className="transactionlist-search">
            <label className="transactionlist-label">
              Search by Description
            </label>
            <input
              type="text"
              placeholder="Enter transaction description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="transactionlist-input"
            />
          </div>
          <div className="transactionlist-filter">
            <label className="transactionlist-label">
              Filter by Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="transactionlist-select"
            >
              <option value="all">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
          </div>
        </div>

        <div className="transactionlist-summary">
          <h3 className="transactionlist-summary-text">
            {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transaction' : 'transactions'} found
          </h3>
        </div>
      </div>

      <div className="transactionlist-table-container">
        <h2 className="transactionlist-title">Transaction List</h2>
        <table className="transactionlist-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.transaction_type}</td>
                <td>
                <button 
  onClick={() => handleUpdate(transaction)} 
  className="transactionlist-action-btn edit">
  Edit
</button>

<button 
  onClick={() => handleDelete(transaction._id)} 
  className="transactionlist-action-btn delete">
  Delete
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
