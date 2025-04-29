import React from 'react';
import TransactionList from "../Finance/TransactionList";
import BalanceSheet from "../Finance/BalanceSheet";
import { Link, useNavigate } from 'react-router-dom';


const FinanceDash = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="financedash-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 50%, #80cbc4 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div className="financedash-background-pattern" style={{
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

      <div className="financedash-container-inner" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div className="financedash-header" style={{
          textAlign: 'center',
          marginBottom: '3rem',
          padding: '3rem 0',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <h1 className="financedash-title" style={{ 
            color: '#2c3e50',
            fontSize: '2.8rem',
            marginBottom: '0.5rem',
            fontWeight: '800',
            fontFamily: "'Poppins', sans-serif",
            background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '1px',
            textAlign: 'center'
          }}>
            Welcome to Clean Cycle
          </h1>
          <h1 className="financedash-subtitle" style={{
            color: '#2c3e50',
            fontSize: '2.8rem',
            marginBottom: '1.5rem',
            fontWeight: '800',
            fontFamily: "'Poppins', sans-serif",
            background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '1px',
            textAlign: 'center'
          }}>
            Financial System
          </h1>
          <p className="financedash-description" style={{
            color: '#2e7d32',
            fontSize: '1.2rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            Through cleaning <span style={{ color: '#1976d2', fontWeight: '600' }}>Galle</span>, <span style={{ color: '#1976d2', fontWeight: '600' }}>Sri Lanka</span>, let's see how our incomes and expenses shape a greener, more sustainable future!
          </p>
        </div>

        <div className="financedash-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          width: '150%',
          gap: '2rem',
          marginBottom: '3rem'

        }}>
          <div className="financedash-box" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '20px',
            width: '70%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}>
            <h2 className="financedash-box-title" style={{ 
              color: '#2c3e50',
              marginBottom: '1.5rem',
              fontSize: '2rem',
              fontWeight: '600',
              position: 'relative',
              paddingBottom: '0.5rem'
            }}>
              Financial Overview
              <div className="financedash-box-title-underline" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #4caf50, #2196f3)',
                borderRadius: '2px'
              }}></div>
            </h2>
            <BalanceSheet />
          </div>

          <div className="financedash-box" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '20px',
            width: '70%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}>
            <h2 className="financedash-box-title" style={{ 
              color: '#2c3e50',
              marginBottom: '1.5rem',
              fontSize: '2rem',
              fontWeight: '600',
              position: 'relative',
              paddingBottom: '0.5rem'
            }}>
              Recent Transactions
              <div className="financedash-box-title-underline" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #4caf50, #2196f3)',
                borderRadius: '2px'
              }}></div>
            </h2>
            <TransactionList />
          </div>
        </div>

        <div className="financedash-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <Link to="/add-transaction" className="financedash-link" style={{ textDecoration: 'none' }}>
            <div className="financedash-card" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}>
              <h2 className="financedash-card-title" style={{
                color: '#2c3e50',
                fontSize: '1.8rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Add New Transaction
              </h2>
              <p className="financedash-card-description" style={{
                color: '#666',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                Record a new income or expense transaction
              </p>
            </div>
          </Link>

          <Link to="/income-summary" className="financedash-link" style={{ textDecoration: 'none' }}>
            <div className="financedash-card" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}>
              <h2 className="financedash-card-title" style={{
                color: '#2c3e50',
                fontSize: '1.8rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Income Summary
              </h2>
              <p className="financedash-card-description" style={{
                color: '#666',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                View detailed income reports and analytics
              </p>
            </div>
          </Link>

          <Link to="/expense-summary" className="financedash-link" style={{ textDecoration: 'none' }}>
            <div className="financedash-card" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}>
              <h2 className="financedash-card-title" style={{
                color: '#2c3e50',
                fontSize: '1.8rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Expense Summary
              </h2>
              <p className="financedash-card-description" style={{
                color: '#666',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                View detailed expense reports and analytics
              </p>
            </div>
          </Link>
        </div>

        {/* Logout Button Container */}
        <div className="financedash-logout-btn-container" style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
          padding: '2rem 0'
        }}>
          <button
            onClick={handleLogout}
            className="financedash-logout-btn"
            style={{
              padding: '15px 40px',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.3rem',
              fontWeight: '700',
              transition: 'all 0.3s ease-in-out',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              background: 'rgba(255, 68, 68, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#cc0000';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 68, 68, 0.9)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceDash;
