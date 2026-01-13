import React from "react";
import { FaSearch, FaUser, FaRecycle } from "react-icons/fa";

const HomeNav = () => {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer transform hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = '/'}>
            <div className="bg-primary-600 p-2 rounded-lg mr-2 shadow-lg">
              <FaRecycle className="text-white text-2xl" />
            </div>
            <span className="font-bold text-2xl text-primary-600">
              Clean Cycle
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Contact', 'Recycler', 'Schedule', 'Locations'].map((item) => {
              const path = item === 'Home' ? '/mainhome' :
                item === 'About' ? '/aboutus' :
                  item === 'Contact' ? '/contact' :
                    item === 'Recycler' ? '/login' :
                      item === 'Schedule' ? '/login' :
                        item === 'Locations' ? '/location' : '/';
              return (
                <a
                  key={item}
                  href={path}
                  className="text-gray-600 hover:text-primary-600 font-bold transition-colors duration-200 text-sm uppercase tracking-wide !no-underline"
                >
                  {item}
                </a>
              );
            })}
          </div>

          {/* Icons Section */}
          <div className="flex items-center space-x-4">
            <a
              href="/register"
              className="bg-white text-primary-600 border-2 border-primary-600 p-2.5 rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg flex items-center justify-center w-12 h-12"
            >
              <FaUser className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
