import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaTree, FaCity, FaCompass } from "react-icons/fa";

/**
 * ChandigarhHoverCard Component
 * Interactive hover card showcasing Chandigarh ("The City Beautiful") with photo,
 * architectural heritage (Le Corbusier), and modern IT hub highlights.
 */
const ChandigarhHoverCard = ({ children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {/* Trigger Badge */}
      <div className="cursor-pointer">{children}</div>

      {/* Popover Modal Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 top-full mt-2.5 z-50 w-[295px] sm:w-[335px] rounded-2xl overflow-hidden bg-white/95 dark:bg-[#0b1322]/95 backdrop-blur-2xl border border-emerald-500/30 dark:border-emerald-500/40 shadow-2xl shadow-emerald-950/30 font-sans"
            style={{ pointerEvents: "auto" }}
          >
            {/* Header Image of Chandigarh (Open Hand Monument & Capitol Complex) */}
            <div className="relative h-36 w-full overflow-hidden bg-gray-900 group">
              <img
                src="/chandigarh.jpg"
                alt="Chandigarh — The City Beautiful"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />

              {/* Tag Badges */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10.5px] font-semibold text-white border border-white/20 flex items-center gap-1.5 shadow-sm">
                <FaTree className="text-emerald-400 text-xs animate-pulse" />
                <span>The City Beautiful</span>
              </div>

              {/* Bottom Image Headline */}
              <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                <div>
                  <h4 className="text-sm font-black text-white leading-tight drop-shadow-md flex items-center gap-1.5">
                    <span>Chandigarh, India</span>
                    <span className="text-xs">🇮🇳</span>
                  </h4>
                  <p className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
                    <FaCompass className="text-[9px]" />
                    <span>Sector 1 • Open Hand Monument</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Information Body */}
            <div className="p-3.5 space-y-2.5 text-xs text-gray-700 dark:text-gray-300">
              {/* Architecture Highlight Tag */}
              <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                <FaCity className="text-xs text-emerald-500 shrink-0" />
                <span>India&apos;s First Planned Modernist City</span>
              </div>

              {/* Description */}
              <p className="text-[11.5px] leading-relaxed text-gray-600 dark:text-gray-300">
                Designed by world-famous Swiss-French architect <strong>Le Corbusier</strong>. Renowned worldwide for its iconic architecture, urban serenity, Sukhna Lake, and as Northern India&apos;s clean, green IT & startup corridor.
              </p>

              {/* Status and Work Base */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[10.5px]">
                <span className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Base: Tricity IT Corridor
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/80 dark:border-indigo-800/60">
                  Remote & Hybrid Ready
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChandigarhHoverCard;
