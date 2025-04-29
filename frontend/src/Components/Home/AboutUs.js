import React from 'react';
import { FaLeaf, FaRecycle, FaHandHoldingHeart } from 'react-icons/fa';
import './AboutUs.css';
import HomeNav from '../Nav/HomeNav';
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="about-us-container">
       <HomeNav/>
      <header className="about-us-header">
        <h1>About Clean Cycle</h1>
        <p>Transforming waste management through innovation and sustainability</p>
      </header>

      <div className="about-us-container-body">
        <section className="about-us-mission-section">
          <h2>Our Mission</h2>
          <p>
            At Clean Cycle, we're dedicated to revolutionizing waste management through innovative solutions and sustainable practices. Our mission is to create a cleaner, greener future for generations to come.
          </p>
        </section>

        <div className="about-us-features-grid">
          <div className="about-us-feature-card">
            <FaLeaf className="about-us-feature-icon" />
            <h3>Sustainable Solutions</h3>
            <p>
              We implement eco-friendly waste management practices that minimize environmental impact and promote sustainability.
            </p>
          </div>

          <div className="about-us-feature-card">
            <FaRecycle className="about-us-feature-icon" />
            <h3>Innovative Technology</h3>
            <p>
              Leveraging cutting-edge technology to optimize waste collection, processing, and recycling operations.
            </p>
          </div>

          <div className="about-us-feature-card">
            <FaHandHoldingHeart className="about-us-feature-icon" />
            <h3>Community Impact</h3>
            <p>
              Creating positive change in communities through education, engagement, and sustainable waste management practices.
            </p>
          </div>
        </div>

        <section className="about-us-cta-section">
          <h2>Join Our Mission</h2>
          <p>Be part of the solution for a cleaner, more sustainable future.</p>
          <button className="about-us-cta-button"onClick={() => navigate("/register")}>Get Started</button>
        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
