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
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-16 h-16
        bg-gradient-to-br from-green-500 to-green-600
        text-white rounded-full shadow-2xl
        hover:from-green-600 hover:to-green-700
        transition-all duration-300

        ring-2 ring-green-300 ring-offset-2

        hover:scale-110 hover:ring-4 hover:ring-green-400
        animate-[pulse_2s_infinite]
      "
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsAppButton;
