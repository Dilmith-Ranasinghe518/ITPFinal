import React from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark-900 text-white py-16 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* About Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
              Clean Cycle
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Revolutionizing waste management for a cleaner, greener future. Join us in making the world a more sustainable place, one cycle at a time.
            </p>
            <div className="flex space-x-4 pt-4">
              {[
                { Icon: FaFacebook, color: 'hover:text-blue-500', href: 'https://facebook.com' },
                { Icon: FaWhatsapp, color: 'hover:text-green-500', href: 'https://whatsapp.com' },
                { Icon: FaInstagram, color: 'hover:text-pink-500', href: 'https://instagram.com' }
              ].map(({ Icon, color, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className={`text-gray-400 ${color} transition-colors duration-300 transform hover:scale-110`}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Locations Section */}
          <div className="flex flex-col space-y-4 bg-dark-800 p-6 rounded-2xl border border-dark-700">
            <h3 className="text-xl font-semibold text-white mb-2">Our Headquarters</h3>
            <div className="flex items-start space-x-3 text-gray-300">
              <FaMapMarkerAlt className="mt-1 text-primary-500" />
              <span>Galle Municipal Council,<br />Galle, Sri Lanka</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
              <FaPhone className="text-primary-500" />
              <a href="tel:0912248008">091-2248008</a>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
              <FaEnvelope className="text-primary-500" />
              <a href="mailto:cleancycleforGalle@gmail.com">cleancycleforGalle@gmail.com</a>
            </div>
          </div>

          {/* About/Quick Links (Optional - adding structure) */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="/" className="text-gray-400 hover:text-secondary-400 transition-colors duration-200 flex items-center">
                    <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Clean Cycle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
