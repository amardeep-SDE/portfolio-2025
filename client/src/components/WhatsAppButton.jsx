import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "918964051727";
  const message = "Hello! I saw your portfolio and would like to connect with you.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-5 right-5 
        bg-green-500 text-white p-4 rounded-full shadow-lg 
        hover:bg-green-600 
        transition-all duration-300 z-50
        animate-pulse hover:scale-110
      "
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
