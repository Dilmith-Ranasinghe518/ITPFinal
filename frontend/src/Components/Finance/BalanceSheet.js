import React, { useEffect, useState } from 'react';
import api from "../Finance/api";

const BalanceSheet = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    incomes: [],
    expenses: [],
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/');
        setTransactions(response.data);
        calculateSummary(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const splitAmount = (amount) => {
    const [rupees, cents] = amount.toFixed(2).split('.');
    return { rupees: parseInt(rupees), cents: cents.padStart(2, '0') };
  };

  const calculateSummary = (transactions) => {
    const incomes = [];
    const expenses = [];
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount);
      const { rupees, cents } = splitAmount(amount);

      if (transaction.transaction_type === 'Income') {
        incomes.push({
          reason: `${transaction.category} - ${transaction.waste_type}`,
          amount: amount,
          rupees,
          cents
        });
        totalIncome += amount;
      } else {
        expenses.push({
          reason: transaction.category,
          amount: amount,
          rupees,
          cents
        });
        totalExpenses += amount;
      }
    });

    setSummary({
      incomes,
      expenses,
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses
    });
  };



  return (
    <div className="balance-sheet">
      <h2 className="balance-sheet__title">Balance Sheet</h2>
      <table className="balance-sheet__table">
        <thead>
          <tr>
            <th>Assets</th>
            <th colSpan="2">Amount</th>
            <th colSpan="2">Total Income</th>
            <th>Liabilities</th>
            <th colSpan="2">Amount</th>
            <th colSpan="2">Total Expenses</th>
          </tr>
          <tr>
            <th></th>
            <th>Rupees</th>
            <th>Cents</th>
            <th>Rupees</th>
            <th>Cents</th>
            <th></th>
            <th>Rupees</th>
            <th>Cents</th>
            <th>Rupees</th>
            <th>Cents</th>
          </tr>
        </thead>
        <tbody>
          {/* Income Section */}
          {summary.incomes.map((income, index) => (
            <tr key={`income-${index}`} className="balance-sheet__income-row">
              <td>{income.reason}</td>
              <td className="balance-sheet__rupees-cell">{income.rupees}</td>
              <td className="balance-sheet__cents-cell">{income.cents}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
          <tr className="balance-sheet__total-row">
            <td><strong>Total Income</strong></td>
            <td className="balance-sheet__rupees-cell">{splitAmount(summary.totalIncome).rupees}</td>
            <td className="balance-sheet__cents-cell">{splitAmount(summary.totalIncome).cents}</td>
            <td className="balance-sheet__rupees-cell">{splitAmount(summary.totalIncome).rupees}</td>
            <td className="balance-sheet__cents-cell">{splitAmount(summary.totalIncome).cents}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          {/* Expenses Section */}
          {summary.expenses.map((expense, index) => (
            <tr key={`expense-${index}`} className="balance-sheet__expense-row">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="balance-sheet__liability-cell">{expense.reason}</td>
              <td className="balance-sheet__rupees-cell">{expense.rupees}</td>
              <td className="balance-sheet__cents-cell">{expense.cents}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
          <tr className="balance-sheet__total-row">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="balance-sheet__liability-cell"><strong>Total Expenses</strong></td>
            <td className="balance-sheet__rupees-cell">{splitAmount(summary.totalExpenses).rupees}</td>
            <td className="balance-sheet__cents-cell">{splitAmount(summary.totalExpenses).cents}</td>
            <td className="balance-sheet__rupees-cell">{splitAmount(summary.totalExpenses).rupees}</td>
            <td className="balance-sheet__cents-cell">{splitAmount(summary.totalExpenses).cents}</td>
          </tr>

          {/* Net Balance */}
          <tr className="balance-sheet__balance-row">
            <td colSpan="5"></td>
            <td><strong>Net Balance</strong></td>
            <td className="balance-sheet__rupees-cell">{splitAmount(summary.netBalance).rupees}</td>
            <td className="balance-sheet__cents-cell">{splitAmount(summary.netBalance).cents}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <style jsx>{`
  .balance-sheet {
    padding: 20px;
    max-width: 100%; /* or a custom max width */
    margin-left: 0; /* Aligns the balance sheet container to the left */
  }

  .balance-sheet__table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    margin-left: 0; /* Aligns the table to the left */
    margin-right: 0; /* Removes any right margin */
  }

  .balance-sheet__table th,
  .balance-sheet__table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    vertical-align: middle;
  }

  .balance-sheet__table th {
    background-color: #f5f5f5;
    font-weight: bold;
    text-align: center;
  }

  .balance-sheet__amount-cell {
    display: flex;
    justify-content: flex-end;
    padding: 0 8px;
    text-align: right;
    min-width: 100px;
    border-right: 1px solid #ddd;
  }

  .balance-sheet__rupees {
    text-align: right;
    margin-right: 4px;
    font-weight: 500;
  }

  .balance-sheet__cents {
    text-align: right;
    color: #666;
    min-width: 30px;
  }

  .balance-sheet__total-row {
    background-color: #f0f0f0;
    font-weight: bold;
  }

  .balance-sheet__total-row td {
    border-top: 2px solid #333;
  }

  .balance-sheet__total-row td:first-child,
  .balance-sheet__total-row td:nth-child(5) {
    text-align: left;
  }

  .balance-sheet__balance-row {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  .balance-sheet__balance-row td {
    border-top: 2px solid #333;
  }

  .balance-sheet__balance-row .balance-sheet__amount-cell {
    text-align: right;
    border-right: 1px solid #ddd;
  }

  .balance-sheet__liability-cell {
    text-align: left;
    font-weight: 500;
    padding-left: 8px;
    border-right: 1px solid #ddd;
  }

  .balance-sheet__expense-row td {
    border-right: 1px solid #ddd;
  }

  .balance-sheet__expense-row .balance-sheet__amount-cell {
    text-align: right;
    border-right: 1px solid #ddd;
  }

  .balance-sheet__title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  .balance-sheet__rupees-cell {
    text-align: right;
    padding: 8px;
    font-weight: 500;
    border-right: 1px solid #ddd;
  }

  .balance-sheet__cents-cell {
    text-align: right;
    padding: 8px;
    color: #666;
    border-right: 1px solid #ddd;
  }
`}</style>


    </div>
  );
};

export default BalanceSheet;
