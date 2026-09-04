import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaArrowDown } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

/**
 * ExperienceHoverCard Component
 * Interactive hover card for the "3+ Years of Experience" badge,
 * showcasing company milestones, core tech strengths, and quick jump to Experience section.
 */
const ExperienceHoverCard = ({ children, className = "" }) => {
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
            className="absolute left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 top-full mt-2.5 z-50 w-[300px] sm:w-[340px] rounded-2xl overflow-hidden bg-white/95 dark:bg-[#0b1322]/95 backdrop-blur-2xl border border-indigo-500/30 dark:border-indigo-500/40 shadow-2xl shadow-indigo-950/30 font-sans p-4 space-y-3"
            style={{ pointerEvents: "auto" }}
          >
            {/* Header with Icon & Availability Badge */}
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
                  <FaBriefcase className="text-xs" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    3+ Years Experience Summary
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium">Full Stack & Frontend Engineering</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                1 Mo Notice
              </span>
            </div>

            {/* Companies Mini Timeline */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/40">
                <div className="flex items-center justify-between">
                  <strong className="text-indigo-600 dark:text-indigo-400 text-[11.5px] font-bold">
                    Suffescom Solutions Inc
                  </strong>
                  <span className="text-[9.5px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                    Current
                  </span>
                </div>
                <p className="text-[10.5px] text-gray-600 dark:text-gray-300 mt-0.5 leading-snug">
                  React Developer • Agora SDK Video Calling & Enterprise Dashboards
                </p>
              </div>

              <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50">
                <strong className="text-gray-800 dark:text-gray-200 text-[11px] font-bold">
                  Codeverse IT Pvt. Ltd.
                </strong>
                <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                  React Gaming Platforms, UI/UX & Redux State Pipelines
                </p>
              </div>

              <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50">
                <strong className="text-gray-800 dark:text-gray-200 text-[11px] font-bold">
                  Encanto Technologies LLP
                </strong>
                <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                  MERN Stack Optimization & 30% speed enhancements
                </p>
              </div>
            </div>

            {/* Jump to Experience CTA */}
            <ScrollLink
              to="experience"
              smooth
              offset={-80}
              duration={500}
              className="w-full py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 shadow-sm cursor-pointer transition block text-center"
            >
              <span>Explore Full Career Roadmap</span>
              <FaArrowDown className="text-[10px]" />
            </ScrollLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceHoverCard;
