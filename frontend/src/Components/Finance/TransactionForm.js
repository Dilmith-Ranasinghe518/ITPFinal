import React, { useState } from 'react';
import api from "./api";
//import "./Transaction.css"; // Import the CSS file

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    transaction_type: 'Income',
    amount: '',
    payment_method: 'Cash',
    category: '',
    waste_type: 'Plastic',
    description: '',
  });

  const [error, setError] = useState('');

  // Define categories for each transaction type
  const incomeCategories = [
    'Waste Collection Revenue',
    'Bid Sales',
    'Government Grants & Subsidies',
    'Donations & Sponsorships'
  ];

  const expenseCategories = [
    'Employee Salaries & Wages',
    'Equipment & Machinery Maintenance',
    'Electricity & Water Bills',
    'Rent & Infrastructure Costs',
    'Marketing & Awareness Programs',
    'Coin Generation',
    'Software & IT Maintenance'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      // Only allow numbers (0-9)
      if (!/^\d*$/.test(value)) {
        setError('Only numbers are valid');
        return;
      }
      
      // Check if the number is too long (more than 7 digits)
      if (value.length > 7) {
        setError('Amount cannot exceed 7 digits');
        return;
      }
      
      setError('');
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate amount before submission
    if (!formData.amount || !/^\d+$/.test(formData.amount) || formData.amount.length > 7) {
      setError('Please enter a valid amount (numbers only, max 7 digits)');
      return;
    }

    try {
      await api.post('/', formData);
      alert('Transaction Created!');
      setFormData({
        transaction_type: 'Income',
        amount: '',
        payment_method: 'Cash',
        category: '',
        waste_type: 'Plastic',
        description: '',
      });
      setError('');
    } catch (error) {
      alert('Error creating transaction!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '1000px',
        margin: '2rem auto',
        border: '2px solid #e0f2f1'
      }}>
        <h2 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
          fontWeight: '600',
          position: 'relative',
          paddingBottom: '1rem'
        }}>
          Add New Transaction
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, #4caf50, #2196f3)',
            borderRadius: '2px'
          }}></div>
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '2rem',
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e0f2f1'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.8rem',
                color: '#2c3e50',
                fontWeight: '600',
                fontSize: '1.2rem'
              }}>
                Transaction Type
              </label>
              <select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #e0f2f1',
                  fontSize: '1.1rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    borderColor: '#4caf50',
                    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)'
                  }
                }}
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.8rem',
                color: '#2c3e50',
                fontWeight: '600',
                fontSize: '1.2rem'
              }}>
                Amount
              </label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                maxLength="7"
                pattern="[0-9]*"
                inputMode="numeric"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: error ? '2px solid #f44336' : '2px solid #e0f2f1',
                  fontSize: '1.1rem',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    borderColor: '#4caf50',
                    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)'
                  }
                }}
              />
              {error && (
                <div style={{
                  color: '#f44336',
                  fontSize: '1rem',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  {error}
                </div>
              )}
            </div>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e0f2f1',
            marginTop: '2rem'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '0.8rem',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1.2rem'
            }}>
              Payment Method
            </label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid #e0f2f1',
                fontSize: '1.1rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e0f2f1',
            marginTop: '2rem'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '0.8rem',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1.2rem'
            }}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid #e0f2f1',
                fontSize: '1.1rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <option value="">Select a category</option>
              {formData.transaction_type === 'Income' 
                ? incomeCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))
                : expenseCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))
              }
            </select>
          </div>

          {formData.transaction_type === 'Income' && (
            <div style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e0f2f1',
              marginTop: '2rem'
            }}>
              <label style={{
                display: 'block',
                marginBottom: '0.8rem',
                color: '#2c3e50',
                fontWeight: '600',
                fontSize: '1.2rem'
              }}>
                Waste Type
              </label>
              <select
                name="waste_type"
                value={formData.waste_type}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #e0f2f1',
                  fontSize: '1.1rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="No Waste Type Contribution">No Waste Type Contribution</option>
                <option value="Plastic">Plastic</option>
                <option value="Iron">Iron</option>
                <option value="Paper">Paper</option>
                <option value="Glass">Glass</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e0f2f1',
            marginTop: '2rem'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '0.8rem',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1.2rem'
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid #e0f2f1',
                fontSize: '1.1rem',
                backgroundColor: 'white',
                minHeight: '120px',
                resize: 'vertical',
                transition: 'all 0.3s ease'
              }}
            ></textarea>
          </div>

          <button 
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #4caf50 0%, #2196f3 100%)',
              color: 'white',
              padding: '1.2rem 2.5rem',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '2rem',
              boxShadow: '0 4px 15px rgba(76, 175, 80, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              width: '100%'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.2)';
            }}
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;

