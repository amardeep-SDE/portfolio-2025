import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "918964051727";
  const message =
    "Hello! I saw your portfolio and would like to connect with you.";

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      
      {/* Tooltip */}
      <span className="
        absolute right-14 top-1/2 -translate-y-1/2
        bg-black text-white text-xs px-3 py-1 rounded-md
        opacity-0 group-hover:opacity-100
        transition duration-300 whitespace-nowrap
      ">
        Chat on WhatsApp
      </span>

      {/* Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          relative flex items-center justify-center
          w-14 h-14
          rounded-full
          bg-gradient-to-br from-green-400 via-green-500 to-green-600
          text-white shadow-xl

          backdrop-blur-md
          border border-white/20

          transition-all duration-300
          hover:scale-110 hover:shadow-green-400/50

          before:absolute before:inset-0 before:rounded-full
          before:bg-green-400 before:opacity-20
          before:animate-ping

          after:absolute after:inset-0 after:rounded-full
          after:border after:border-green-300 after:opacity-40
        "
      >
        <FaWhatsapp size={26} className="relative z-10" />
      </a>
    </div>
  );
};

export default WhatsAppButton;