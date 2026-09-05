import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaPaperPlane,
  FaCheckDouble,
  FaTimes,
  FaBriefcase,
  FaRocket,
  FaCoffee,
} from "react-icons/fa";
import profileData from "../data/profileData";

/**
 * WhatsAppButton Component
 * Fixed-position interactive floating WhatsApp widget.
 * Features:
 * - Perfectly positioned above the button (bottom-full mb-3.5 right-0) so it never gets cut off
 * - Direct native links immune to popup blockers
 * - Instant 1-click message chips
 * - Direct "Open in WhatsApp" CTA + custom input field
 * - Live online beacon & unread notification badge
 */
const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [userMsg, setUserMsg] = useState(
    "Hi Amardeep! I saw your portfolio and would like to discuss an opportunity."
  );
  const inputRef = useRef(null);

  const phoneNumber = "918964051727";

  // 5-minute alternating realistic Online/Offline status (5m online -> 5m offline -> 5m online...)
  const computeOnlineStatus = () => {
    const now = Date.now();
    const cycleMinutes = 5;
    const cycleMs = cycleMinutes * 60 * 1000;
    const cycleIndex = Math.floor(now / cycleMs);
    const isOnline = cycleIndex % 2 === 0;

    // Time when the current 5-minute block began (used for realistic "last seen at HH:MM AM/PM")
    const cycleStartDate = new Date(cycleIndex * cycleMs);
    const lastSeenTime = cycleStartDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return { isOnline, lastSeenTime };
  };

  const [onlineStatus, setOnlineStatus] = useState(computeOnlineStatus);

  useEffect(() => {
    // Check every 5 seconds so transitions flip smoothly in real-time
    const timer = setInterval(() => {
      setOnlineStatus(computeOnlineStatus());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleOpenModal = (e) => {
      setIsOpen(true);
      setHasOpenedBefore(true);
      if (e?.detail?.message) {
        setUserMsg(e.detail.message);
      }
    };

    window.addEventListener("open-whatsapp-modal", handleOpenModal);
    return () => window.removeEventListener("open-whatsapp-modal", handleOpenModal);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const quickChips = [
    {
      label: "💼 Hiring Inquiry",
      text: "Hi Amardeep! We are interested in your profile for a React / Full Stack role (Notice Period: 1 Month).",
      icon: <FaBriefcase className="text-xs text-emerald-500" />,
    },
    {
      label: "🚀 Project Discussion",
      text: "Hi Amardeep! I have an upcoming web platform project and would like to discuss your tech expertise.",
      icon: <FaRocket className="text-xs text-cyan-500" />,
    },
    {
      label: "☕ Quick Coffee Chat",
      text: "Hello Amardeep! Loved your portfolio projects and wanted to connect with you!",
      icon: <FaCoffee className="text-xs text-amber-500" />,
    },
  ];

  const handleSend = (text) => {
    const messageToSend = text || userMsg;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      messageToSend.trim()
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setHasOpenedBefore(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 💬 Interactive WhatsApp Chat Popover Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="absolute bottom-full mb-3.5 right-0 w-[310px] sm:w-[350px] max-h-[82vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b141a] font-sans z-50 select-none"
          >
            {/* 1. Header with WhatsApp Brand Colors & Avatar */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#075e54] to-[#128c7e] text-white flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <img
                    src={profileData.image}
                    alt={profileData.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/40 shadow-sm"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#075e54] rounded-full transition-colors duration-300 ${
                      onlineStatus.isOnline ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                  />
                </div>
                <div>
                  <div className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    <span>{profileData.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full border transition-colors duration-300 font-medium ${
                        onlineStatus.isOnline
                          ? "bg-emerald-400/20 border-emerald-400/30 text-emerald-200"
                          : "bg-white/15 border-white/20 text-emerald-100"
                      }`}
                    >
                      {onlineStatus.isOnline ? "Active" : "Away"}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-100/85 flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        onlineStatus.isOnline
                          ? "bg-emerald-300 animate-pulse"
                          : "bg-amber-300/90"
                      }`}
                    />
                    <span>
                      {onlineStatus.isOnline
                        ? "Online now • Replies in ~15m"
                        : `Last seen at ${onlineStatus.lastSeenTime} • Replies in ~15m`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Popover Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 flex items-center justify-center transition cursor-pointer text-white/90"
                title="Close chat"
              >
                <FaTimes size={13} />
              </button>
            </div>

            {/* 2. Scrollable Chat Body Area */}
            <div
              className="p-3.5 space-y-3 bg-[#e5ddd5]/30 dark:bg-[#0b141a] overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-400/50"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(18, 140, 126, 0.05) 0%, transparent 70%)",
              }}
            >
              {/* Timestamp Badge */}
              <div className="text-center">
                <span className="px-2.5 py-0.5 rounded-md bg-white/90 dark:bg-gray-800/90 text-[10px] text-gray-500 dark:text-gray-400 font-medium shadow-xs border border-gray-200/50 dark:border-gray-700/50">
                  Today
                </span>
              </div>

              {/* Incoming Amardeep Message Bubble */}
              <div className="flex items-start gap-1 max-w-[95%]">
                <div className="p-3 rounded-2xl rounded-tl-xs bg-white dark:bg-[#202c33] text-gray-800 dark:text-gray-100 text-xs shadow-md border border-gray-100 dark:border-gray-800 space-y-1.5">
                  <div className="font-semibold text-[11px] text-[#128c7e] dark:text-emerald-400">
                    Amardeep Dwivedi
                  </div>
                  <p className="leading-relaxed">
                    Hi there! 👋 Thanks for checking out my portfolio.
                  </p>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    I&apos;m available for <strong>React &amp; Full Stack MERN</strong> roles
                    (Notice: <strong>1 Month</strong>). How can I help you today?
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-gray-400 pt-0.5">
                    <span>Just now</span>
                    <FaCheckDouble className="text-sky-500 text-[10px]" />
                  </div>
                </div>
              </div>

              {/* Quick Select Message Chips */}
              <div className="pt-1 space-y-1.5">
                <div className="text-[10.5px] font-semibold text-gray-600 dark:text-gray-400 px-1">
                  ⚡ Choose a topic or send custom message:
                </div>
                <div className="flex flex-col gap-1.5">
                  {quickChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setUserMsg(chip.text);
                        handleSend(chip.text);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#1f2c34] hover:bg-emerald-50 dark:hover:bg-[#2a3942] border border-gray-200 dark:border-gray-700 text-[11px] text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-300 shadow-xs transition flex items-center justify-between cursor-pointer text-left group"
                    >
                      <div className="flex items-center gap-1.5">
                        {chip.icon}
                        <span className="font-medium">{chip.label}</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Send ↵
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Primary Open WhatsApp Action */}
              <div className="pt-1">
                <a
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                    userMsg.trim()
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/30 transition cursor-pointer"
                >
                  <FaWhatsapp className="text-base" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* 3. Bottom Message Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(userMsg);
              }}
              className="p-2.5 bg-gray-50 dark:bg-[#202c33] border-t border-gray-200 dark:border-gray-800 flex items-center gap-2 shrink-0 select-auto"
            >
              <input
                ref={inputRef}
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#2a3942] border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 transition cursor-pointer shrink-0"
                title="Send on WhatsApp"
              >
                <FaPaperPlane className="text-xs -translate-x-0.5 translate-y-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 Main Animated WhatsApp Launcher Button */}
      <div className="relative group flex items-center justify-end select-none">
        {/* Hover Pill Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-900/90 dark:bg-gray-800/95 text-white text-xs font-medium shadow-xl backdrop-blur-md border border-gray-700 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none">
          <span
            className={`w-2 h-2 rounded-full inline-block ${
              onlineStatus.isOnline
                ? "bg-emerald-400 animate-ping"
                : "bg-amber-400"
            }`}
          />
          <span>Chat with Amardeep</span>
          <span
            className={`text-[10px] font-semibold ${
              onlineStatus.isOnline
                ? "text-emerald-400"
                : "text-amber-400"
            }`}
          >
            • {onlineStatus.isOnline ? "Online" : "Away (Replies soon)"}
          </span>
        </span>

        {/* Outer Pulsing Ping Wave Radar Rings (active when online) */}
        {onlineStatus.isOnline && (
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
        )}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />

        {/* Unread "1" Notification Beacon Pill */}
        {!hasOpenedBefore && !isOpen && (
          <span className="absolute -top-1 -right-1 z-20 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-gray-900 animate-bounce">
            1
          </span>
        )}

        {/* The Action Button */}
        <motion.button
          type="button"
          onClick={handleToggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={{
            y: [-2, 2, -2],
            transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white flex items-center justify-center shadow-xl shadow-emerald-600/40 border-2 border-white/30 backdrop-blur-md cursor-pointer transition-all duration-300 group-hover:shadow-emerald-500/60"
          title={isOpen ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        >
          {isOpen ? (
            <FaTimes className="text-xl transition-transform duration-300" />
          ) : (
            <FaWhatsapp className="text-3xl drop-shadow-md" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default WhatsAppButton;