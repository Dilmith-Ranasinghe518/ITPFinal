import React from 'react';
import "./UserReqDash.css"; // Import the updated CSS file

function UserReqDash() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: '#333',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}>
        {/* Profile Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: '10px',
          }}>
            <img 
              src="https://randomuser.me/api/portraits/men/1.jpg" 
              alt="Profile" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }} 
            />
          </div>
          <h3 style={{ color: '#fff' }}>Dimmi</h3>
        </div>

        {/* Button Section - Centered vertically */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <button 
            className="quote-btn-unique" 
            onClick={() => window.location.href = '/userdash'}>
            My Bin
          </button>
          <button 
            className="quote-btn-unique" 
            onClick={() => window.location.href = '/userdash'}>
            Alerts
          </button>
          <button 
            className="quote-btn-unique" 
            onClick={() => window.location.href = '/userreqdash'}>
            Pickup Request
          </button>
          <button 
            className="quote-btn-unique" 
            onClick={() => window.location.href = '/logout'}>
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
        <header className="header-unique">
          {/* You can add your header content here */}
        </header>
        <main>
          <section className="hero-unique" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="content-unique" style={{ flex: 1, marginRight: '20px' }}>
              <h1 className="hero-title">Reliable Commercial Waste Services for Your Business</h1>
              <p><strong>Get fast, reliable, and cost-effective commercial trash pickup and waste disposal services</strong> tailored to your business needs, <strong>on time, every time.</strong></p>
              <div className="hero-p">
                <p>Acceptable and unacceptable items vary by location. Please contact your local office for details.</p>
              </div>
              <div className="buttons">
                <a href="/adduserrequest">
                  <button className="quote-btn-unique" onClick={() => alert('Quote requested!')}>Request a Quote</button>
                </a>
                <button className="call-btn-unique" onClick={() => alert('Calling +9470 2297585...')}>📞 +9470 2297585</button>
              </div>
              <div className="help">
                <button className="help-btn-unique" onClick={() => alert('Connecting to a live agent...')}>💬 Need Help? Talk to a Live Agent Now!</button>
              </div>
            </div>
            <div className="image-container-unique" style={{ flex: 1 }}>
              <img 
                src="C:/Users/dilha/OneDrive/Desktop/ITP Project/waste-service..webp" 
                alt="Waste management Services" 
                style={{ width: '100%', borderRadius: '8px' }} 
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default UserReqDash;
