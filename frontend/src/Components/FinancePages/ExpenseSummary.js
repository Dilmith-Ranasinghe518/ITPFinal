import React, { useEffect, useState } from 'react';
import api from "../Finance/api";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExpenseSummary = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    expensesByCategory: {},
    expensesByPaymentMethod: {}
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/');
        const expenseTransactions = response.data.filter(t => t.transaction_type === 'Expense');
        setTransactions(expenseTransactions);
        calculateSummary(expenseTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const calculateSummary = (expenseTransactions) => {
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const expensesByCategory = expenseTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

    const expensesByPaymentMethod = expenseTransactions.reduce((acc, t) => {
      acc[t.payment_method] = (acc[t.payment_method] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

    setSummary({
      totalExpenses,
      expensesByCategory,
      expensesByPaymentMethod
    });
  };

  const downloadPDF = async () => {
    const element = document.getElementById('expense-summary-content');
    const canvas = await html2canvas(element);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('expense-summary.pdf');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 50%, #80cbc4 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        opacity: 0.5,
        zIndex: 0
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            color: '#2c3e50',
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Expense Summary Report
          </h1>
          <button
            onClick={downloadPDF}
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Download PDF
          </button>
        </div>

        <div id="expense-summary-content" style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            color: '#2c3e50',
            fontSize: '2rem',
            marginBottom: '1.5rem',
            fontWeight: '600'
          }}>
            Total Expenses: Rs.{summary.totalExpenses.toFixed(2)}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }}>
            <div>
              <h3 style={{
                color: '#2c3e50',
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Expenses by Category
              </h3>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '1rem'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: '2px solid #e0f2f1'
                  }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(summary.expensesByCategory).map(([category, amount]) => (
                    <tr key={category} style={{ borderBottom: '1px solid #e0f2f1' }}>
                      <td style={{ padding: '1rem' }}>{category}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>Rs.{amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 style={{
                color: '#2c3e50',
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Expenses by Payment Method
              </h3>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '1rem'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: '2px solid #e0f2f1'
                  }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Payment Method</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(summary.expensesByPaymentMethod).map(([method, amount]) => (
                    <tr key={method} style={{ borderBottom: '1px solid #e0f2f1' }}>
                      <td style={{ padding: '1rem' }}>{method}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>Rs.{amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            color: '#2c3e50',
            fontSize: '2rem',
            marginBottom: '1.5rem',
            fontWeight: '600'
          }}>
            Detailed Expense Transactions
          </h2>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #e0f2f1'
              }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Payment Method</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} style={{ borderBottom: '1px solid #e0f2f1' }}>
                  <td style={{ padding: '1rem' }}>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem' }}>{transaction.category}</td>
                  <td style={{ padding: '1rem' }}>{transaction.payment_method}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>Rs.{parseFloat(transaction.amount).toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary; 