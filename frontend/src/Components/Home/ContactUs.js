import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import HomeNav from '../Nav/HomeNav';
import Footer from '../Footer/Footer';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pt-20">
            <HomeNav />

            {/* Header Section */}
            <header className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white py-20 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-lg md:text-xl font-light text-primary-50">We'd love to hear from you. Get in touch with us.</p>
                </div>
            </header>

            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-dark-900 mb-6">Get In Touch</h2>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                Have questions about our waste management services? Need assistance with your account?
                                Our team is here to help you create a cleaner, greener future.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
                                <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                                    <FaMapMarkerAlt size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-dark-800 text-lg">Visit Us</h3>
                                    <p className="text-gray-600 mt-1">Galle Municipal Council,<br />Galle, Sri Lanka</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
                                <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                                    <FaPhone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-dark-800 text-lg">Call Us</h3>
                                    <p className="text-gray-600 mt-1">091-2248008</p>
                                    <p className="text-sm text-gray-500 mt-1">Mon - Fri, 8:00am - 5:00pm</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
                                <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                                    <FaEnvelope size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-dark-800 text-lg">Email Us</h3>
                                    <p className="text-gray-600 mt-1">cleancycleforGalle@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-secondary-100 rounded-full opacity-50 blur-2xl"></div>

                        <h2 className="text-2xl font-bold text-dark-900 mb-6 relative z-10">Send us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 resize-none"
                                    placeholder="Write your message here..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-primary-500/30 transition-all duration-300 flex items-center justify-center transform hover:-translate-y-0.5"
                            >
                                <FaPaperPlane className="mr-2" /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
