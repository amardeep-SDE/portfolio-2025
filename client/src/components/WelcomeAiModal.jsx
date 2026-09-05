import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaBolt,
  FaCheckCircle,
  FaRocket,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import profileData from "../data/profileData";
import { playCelestialChime } from "../utils/audioEffects";

const WelcomeAiModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Clear any previous blocking flag so it opens smoothly
    try {
      localStorage.removeItem("dontShowWelcomeModal");
      sessionStorage.removeItem("hasSeenWelcomeModal");
    } catch (e) {
      // ignore
    }

    // Graceful delay after page renders for smooth entrance
    const timer = setTimeout(() => {
      setIsOpen(true);
      try {
        playCelestialChime();
      } catch (e) {
        // Audio autoplay policy fallback
      }
    }, 600);

    const handleManualOpen = () => setIsOpen(true);
    window.addEventListener("open-welcome-modal", handleManualOpen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-welcome-modal", handleManualOpen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenAi = () => {
    handleClose();
    // Dispatch custom event to trigger AI Recruiter Chatbot
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-ai-chat"));
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg rounded-3xl bg-white/95 dark:bg-[#0c1224]/95 border border-indigo-500/30 dark:border-indigo-500/40 shadow-2xl shadow-indigo-500/25 p-6 sm:p-8 backdrop-blur-2xl z-10 overflow-hidden"
          >
            {/* Ambient Background Glow Accents */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-white transition cursor-pointer z-10"
              aria-label="Close modal"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 border border-cyan-400/35 text-cyan-700 dark:text-cyan-300 shadow-2xs">
                <HiSparkles className="text-amber-400 animate-pulse text-sm" />
                <span>AI-Powered Developer Portfolio</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </span>
            </div>

            {/* Candidate Intro */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src={profileData.image}
                  alt={profileData.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-md shadow-indigo-500/20"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0c1224] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Welcome! I'm {profileData.name} 👋
                </h3>
                <p className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  MERN Full Stack AI Developer • 3+ YOE
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                  Chandigarh, India • 1 Month Notice Period
                </p>
              </div>
            </div>

            {/* AI Feature Spotlight Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-cyan-500/5 border border-indigo-200/80 dark:border-indigo-500/20 mb-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/20">
                  <FaRobot className="text-base" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <span>Ask Amardeep AI Copilot</span>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300">
                      Gemini 3.6
                    </span>
                  </h4>
                  <p className="text-[11.5px] text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                    This portfolio is powered by <strong>Google Gemini AI</strong>! Ask anything about my verified <strong>3+ years experience</strong>, <strong>Agora WebRTC video streaming</strong>, React 19 &amp; MERN mastery, or <strong>paste a Job Description to get an instant role match</strong>.
                  </p>
                </div>
              </div>

              {/* Quick AI Capabilities */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-medium text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/70 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50">
                  <FaBolt className="text-amber-500 text-xs shrink-0" />
                  <span>Instant JD Match Analyzer</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/70 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50">
                  <FaCheckCircle className="text-emerald-500 text-xs shrink-0" />
                  <span>Verified 9+ Projects Proof</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={handleOpenAi}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-cyan-300/30"
              >
                <FaRobot className="text-sm text-cyan-200 animate-bounce" />
                <span>Chat with AI Copilot 🤖</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800/90 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 cursor-pointer active:scale-98 transition flex items-center justify-center gap-1.5"
              >
                <FaRocket className="text-xs text-indigo-500" />
                <span>Explore Portfolio</span>
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-3.5 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
              <span>Available for Immediate Joining • 1 Mo Notice</span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Interactive Copilot Ready</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeAiModal;
