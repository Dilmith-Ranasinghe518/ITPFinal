import React, { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppChat = () => {
    const [isOpen, setIsOpen] = useState(true); // Start open to show the button
    const phoneNumber = "94717170333"; // Replace with actual number
    const message = "Hello! I'm interested in Clean Cycle services.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
            {/* Tooltip / Message Bubble */}
            <div className={`mb-4 bg-white p-4 rounded-lg shadow-xl max-w-xs transform transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className="relative">
                    <p className="text-gray-800 font-medium text-sm">Need help? Chat with us!</p>
                    <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45"></div>
                </div>
            </div>

            {/* Main Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 animate-bounce-subtle"
                onMouseEnter={() => setIsOpen(true)}
            >
                <FaWhatsapp className="text-4xl" />

                {/* Pulse Effect Rings */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping"></span>
            </a>

            <style jsx>{`
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite;
                }
            `}</style>
        </div>
    );
};

export default WhatsAppChat;
