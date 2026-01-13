import React from 'react';
import Footer from '../Footer/Footer';
import WhatsAppChat from "../WhatsAppChat/WhatsAppChat";
import HomeNav from '../Nav/HomeNav';
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CCHome = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear'
  };

  const carouselImages = [
    "p2.jpg", "p1.jpg", "p3.jpg", "p4.jpg", "p6.webp", "p7.avif", "p8.jpg", "p9.jpeg"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-20">
      <HomeNav />

      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Slider {...settings} className="h-full">
          {carouselImages.map((img, index) => (
            <div key={index} className="h-[600px] relative outline-none">
              <div className="absolute inset-0 bg-black/40 z-10"></div> {/* Overlay */}
              <img
                src={img}
                alt={`Waste Management ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
            Welcome to <span className="text-primary-400">Clean Cycle</span>!
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-8 drop-shadow-md">
            Smart Waste Management
          </h2>
          <p className="max-w-2xl text-lg md:text-xl text-gray-100 mb-10 leading-relaxed drop-shadow-sm">
            At Clean Cycle, we revolutionize waste management with efficient, eco-friendly, and
            tech-driven solutions. Our platform connects citizens, waste collectors, and recycling
            facilities to ensure seamless waste disposal.
          </p>
          <button
            className="group inline-flex items-center w-fit bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-primary-500/50"
            onClick={() => navigate("/aboutus")}
          >
            Read More
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Features/Highlights Section (Optional addition for better homepage) */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark-900 mb-4">Why Choose Us?</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Eco-Friendly", desc: "Sustainable solutions for a greener planet." },
            { title: "Efficient", desc: "Optimized collection routes and schedules." },
            { title: "Tech-Driven", desc: "Smart platform connecting all stakeholders." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 mx-auto text-primary-600 text-2xl font-bold">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <WhatsAppChat />
      <Footer />
    </div>
  );
};

export default CCHome;
