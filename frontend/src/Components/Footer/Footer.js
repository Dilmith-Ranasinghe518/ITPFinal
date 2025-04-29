import React from 'react';
import './Footer.css';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';  // Import social media icons from react-icons

const Footer = () => {
  return (
    <footer className="cc-footer">
      <div className="cc-footer-content">
        <div className="cc-contact">
          <h3>Connect with</h3>
          <div className="cc-social-icons">
            {/* Facebook Icon */}
            <a href="#" className="cc-social-link" aria-label="Facebook">
              <FaFacebook size={30} color="#3b5998" /> {/* Adjust size and color */}
            </a>
            {/* WhatsApp Icon */}
            <a href="#" className="cc-social-link" aria-label="WhatsApp">
              <FaWhatsapp size={30} color="#25D366" />
            </a>
            {/* Instagram Icon */}
            <a href="#" className="cc-social-link" aria-label="Instagram">
              <FaInstagram size={30} color="#E1306C" />
            </a>
          </div>
        </div>
        <div className="cc-location">
          <h3>Locations</h3>
          <p>Galle Municipal Council, Galle, Sri Lanka</p>
          <p>Phone: 091-2248008</p>
          <p>Email: cleancycleforGalle@gmail.com</p>
        </div>
        <div className="cc-about">
          <h3>About Us</h3>
          <p>Clean Cycle is a smart waste management platform dedicated to creating a cleaner, greener future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
