import React from 'react';
import './CCHome.css';
import Footer from '../Footer/Footer';
import HomeNav from '../Nav/HomeNav';
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CCHome = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true, // Enable dots navigation
    infinite: true, // Infinite loop of images
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Auto play the slider
    autoplaySpeed: 3000, // Time between auto transitions
  };

  return (
    <div className="home-container">
      <HomeNav/>

      {/* Image Slider */}
      <section className="hero">  
        <Slider {...settings}>
        <div>
            <img src="p2.jpg" alt="Waste Management 2" />
          </div>


          <div>
            <img src="p1.jpg" alt="Waste Management 1" />
          </div>
          
          <div>
            <img src="p3.jpg" alt="Waste Management 3" />
          </div>
          <div>
            <img src="p4.jpg" alt="Waste Management 4" />
          </div>
          <div>
            <img src="p6.webp" alt="Waste Management 5" />
          </div>
          <div>
            <img src="p7.avif" alt="Waste Management 6" />
          </div>
          <div>
            <img src="p8.jpg" alt="Waste Management 7" />
          </div>
          <div>
            <img src="p9.jpeg" alt="Waste Management 8" />
          </div>
        </Slider>

        <h1>Welcome to Clean Cycle!</h1>
        <h2>Smart Waste Management</h2>
        <p>
          At Clean Cycle, we revolutionize waste management with efficient, eco-friendly, and
          tech-driven solutions. Our platform connects citizens, waste collectors, and recycling
          facilities to ensure seamless waste disposal, optimized collection routes, and increased
          recycling efforts.
        </p>
        <button className="read-more"onClick={() => navigate("/aboutus")}>Read more</button>
      </section>

      <Footer/>
    </div>
  );
};

export default CCHome;
