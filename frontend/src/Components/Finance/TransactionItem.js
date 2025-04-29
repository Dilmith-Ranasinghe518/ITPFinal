import React from 'react';

const TransactionItem = ({ transaction, onUpdate, onDelete }) => {
  // Define the border color and width based on the transaction type
  const borderColor = transaction.transaction_type === 'Income' ? '#2c6b2f' : '#d32f2f'; // Green for income, red for expense
  const borderWidth = '4px'; // Increase the border width

  // Define text color for "Income" and "Expense"
  const transactionTextColor = transaction.transaction_type === 'Expense' ? '#d32f2f' : '#2c6b2f'; // Red for expense, green for income

  // Common style for bold text inside the transaction box
  const boldTextStyle = {
    fontWeight: 'bold',
  };

  return (
    <li style={{ border: `${borderWidth} solid ${borderColor}` }} className="transaction-item">
      <h3 style={{ color: transactionTextColor, ...boldTextStyle }}>
        {transaction.transaction_type}
      </h3>
      <p style={boldTextStyle}>Amount: Rs{transaction.amount}</p>
      <p style={boldTextStyle}>Payment Method: {transaction.payment_method}</p>
      <p style={boldTextStyle}>Category: {transaction.category}</p>
      {transaction.transaction_type === 'Income' && <p style={boldTextStyle}>Waste Type: {transaction.waste_type}</p>}
      <p style={boldTextStyle}>Description: {transaction.description}</p>

      <div>
        {/* Update and Delete Buttons */}
        <button onClick={() => onUpdate(transaction)} style={{ marginRight: '10px', backgroundColor: '#4caf50', color: 'white' }}>
          Update
        </button>
        <button onClick={() => onDelete(transaction._id)} style={{ backgroundColor: '#d32f2f', color: 'white' }}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;

