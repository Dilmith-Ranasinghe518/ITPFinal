import React from 'react';
import { FaLeaf, FaRecycle, FaHandHoldingHeart } from 'react-icons/fa';
import HomeNav from '../Nav/HomeNav';
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-20">
      <HomeNav />

      {/* Header Section */}
      <header className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div> {/* Optional pattern overlay */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">About Clean Cycle</h1>
          <p className="text-xl md:text-2xl font-light text-primary-50">Transforming waste management through innovation and sustainability</p>
        </div>
      </header>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Mission Section */}
        <section className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-800 mb-6 relative inline-block">
            Our Mission
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-secondary-400 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-left md:text-center">
            At Clean Cycle, we're dedicated to revolutionizing waste management through innovative solutions and sustainable practices. Our mission is to create a cleaner, greener future for generations to come.
          </p>
        </section>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            {
              Icon: FaLeaf,
              title: "Sustainable Solutions",
              desc: "We implement eco-friendly waste management practices that minimize environmental impact and promote sustainability.",
              color: "text-green-500 bg-green-50"
            },
            {
              Icon: FaRecycle,
              title: "Innovative Technology",
              desc: "Leveraging cutting-edge technology to optimize waste collection, processing, and recycling operations.",
              color: "text-blue-500 bg-blue-50"
            },
            {
              Icon: FaHandHoldingHeart,
              title: "Community Impact",
              desc: "Creating positive change in communities through education, engagement, and sustainable waste management practices.",
              color: "text-red-500 bg-red-50"
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-1">
              <div className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mb-6 text-3xl`}>
                <feature.Icon />
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary-500 rounded-full opacity-20 blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">Be part of the solution for a cleaner, more sustainable future.</p>
            <button
              className="bg-white text-primary-600 hover:bg-gray-50 font-bold py-2 px-6 w-fit rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
