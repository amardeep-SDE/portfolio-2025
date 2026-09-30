import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRocket,
  FaCode,
  FaRobot,
  FaUserTie,
  FaBriefcase,
  FaAward,
  FaPaperPlane,
} from "react-icons/fa";
import { playLuxuryGlassChime } from "../utils/audioEffects";

// 🔁 Language Toggle Helper
const toggleLanguage = (i18n) => {
  const newLang = i18n.language === "en" ? "hi" : "en";
  i18n.changeLanguage(newLang);
};

const navItems = [
  { id: "about", icon: FaUserTie, labelKey: "about" },
  { id: "skills", icon: FaCode, labelKey: "skills" },
  { id: "projects", icon: FaRocket, labelKey: "projects" },
  { id: "experience", icon: FaBriefcase, labelKey: "experience" },
  { id: "credentials", icon: FaAward, labelKey: "credentials" },
  { id: "contact", icon: FaPaperPlane, labelKey: "contact" },
];

const navSections = navItems.map((item) => item.id);

/**
 * Navbar Component
 * Ultra-sleek floating glass capsule navigation bar.
 * Features:
 * - Floating Island (Apple / Linear dynamic capsule style)
 * - Top laser scroll progress indicator
 * - <AD /> Developer Logo with live availability beacon
 * - Active pill indicator for navigation links with glowing neon aura
 * - Smooth gliding magnetic hover indicator
 * - "Hire Me 🚀" glowing gradient CTA button
 * - Clean Theme & Language controls
 * - Smooth animated mobile drawer
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { t, i18n } = useTranslation();

  // Track page scroll progress & elevation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      setIsScrolled(window.scrollY > 40);

      // Auto detect active section based on scroll offset
      const offsets = navSections.map((sec) => {
        const el = document.getElementById(sec);
        if (!el) return { sec, top: 99999 };
        const rect = el.getBoundingClientRect();
        return { sec, top: Math.abs(rect.top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0] && offsets[0].top < 400) {
        setActiveSection(offsets[0].sec);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ⚡ Top Laser Scroll Progress Bar (0% -> 100%) */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(99,102,241,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 🛸 Floating Glass Capsule Header */}
      <header className="fixed top-0 inset-x-0 z-50 px-2 sm:px-4 lg:px-6 pt-2 sm:pt-3 pointer-events-none">
        <div
          className={`max-w-7xl mx-auto w-full rounded-2xl sm:rounded-full pointer-events-auto transition-all duration-300
            ${isScrolled
              ? "bg-white/85 dark:bg-[#0b101b]/90 backdrop-blur-xl border border-indigo-500/20 dark:border-indigo-500/30 shadow-xl shadow-black/5 dark:shadow-black/50 py-1.5 sm:py-2 px-3 sm:px-5"
              : "bg-white/70 dark:bg-[#0d1322]/70 backdrop-blur-lg border border-white/40 dark:border-white/10 shadow-md py-2 sm:py-2.5 px-3 sm:px-5"
            } flex items-center justify-between gap-2 lg:gap-3`}
        >
          {/* 1. Brand Logo with <AD /> Monogram & Availability Beacon */}
          <ScrollLink
            to="about"
            smooth
            offset={-90}
            duration={500}
            className="cursor-pointer flex items-center gap-2 group shrink-0"
          >
            {/* Tech Monogram Icon */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <FaCode className="text-sm" />
            </div>

            {/* Name + Live Availability Beacon */}
            <div className="flex flex-col text-left shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Amardeep
                </span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 border border-indigo-400/30 text-indigo-700 dark:text-cyan-300 hidden 2xl:inline shadow-2xs">
                  MERN • AI Integration
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 leading-none hidden 2xl:inline">
                Open to Work • 1 Month NP
              </span>
            </div>
          </ScrollLink>

          {/* 2. Desktop Navigation Capsule Links */}
          <nav
            onMouseLeave={() => setHoveredSection(null)}
            className="hidden md:flex items-center gap-1 lg:gap-1.5 xl:gap-2 bg-white/75 dark:bg-[#070b14]/80 backdrop-blur-2xl p-1 sm:p-1.5 rounded-full border border-slate-200/80 dark:border-white/[0.09] shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] relative shrink min-w-0"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  smooth
                  offset={-90}
                  duration={500}
                  onMouseEnter={() => setHoveredSection(item.id)}
                  onClick={() => {
                    setActiveSection(item.id);
                    playLuxuryGlassChime();
                  }}
                  className={`group relative px-2.5 lg:px-3 xl:px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-1.5 select-none shrink-0
                    ${
                      isActive
                        ? "text-white font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  {/* Active Sliding Capsule Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-cyan-500 shadow-md shadow-indigo-500/30 dark:shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-white/20 dark:border-cyan-300/30 -z-10 overflow-hidden"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    >
                      {/* Specular top rim shine */}
                      <span className="absolute inset-x-2 top-0.5 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
                    </motion.div>
                  )}

                  {/* Magnetic Floating Hover Capsule */}
                  {hoveredSection === item.id && !isActive && (
                    <motion.div
                      layoutId="hoverNavPill"
                      className="absolute inset-0 rounded-full bg-slate-200/70 dark:bg-white/[0.08] backdrop-blur-sm -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}

                  {/* Micro Icon */}
                  <Icon
                    className={`text-[11px] transition-transform duration-200 ${
                      isActive
                        ? "text-white scale-110"
                        : "text-slate-400 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-cyan-300 group-hover:scale-110"
                    }`}
                  />

                  {/* Label */}
                  <span className="tracking-tight whitespace-nowrap">{t(`nav.${item.labelKey}`)}</span>

                  {/* Luminous Active Beacon */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 dark:bg-cyan-300 shadow-[0_0_6px_#38bdf8] animate-pulse ml-0.5 shrink-0" />
                  )}
                </ScrollLink>
              );
            })}
          </nav>

          {/* 3. Right Control Actions: Theme, Lang & "Hire Me" CTA */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5 shrink-0">
            {/* Theme Sun/Moon Toggle */}
            <ThemeToggle />

            {/* Language Switcher Pill */}
            <button
              onClick={() => toggleLanguage(i18n)}
              className="px-2 py-1 rounded-full text-[11px] font-bold
                         bg-gray-200/80 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200
                         hover:bg-indigo-100 dark:hover:bg-gray-700 transition cursor-pointer border border-gray-300/60 dark:border-gray-700 shrink-0"
              title="Change language"
            >
              {i18n.language === "en" ? "🇮🇳 HI" : "🇺🇸 EN"}
            </button>

            {/* "Ask AI 🤖" Glowing Gradient Button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
              className="group relative px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-bold text-white
                         bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600
                         hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95 
                         transition-all duration-300 cursor-pointer flex items-center gap-1.5 overflow-hidden shrink-0"
              title="Ask Amardeep AI (Recruiter Copilot)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping inline-block" />
              <FaRobot className="text-[11px] text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span>Ask AI</span>
            </button>

            {/* "Hire Me 🚀" Glowing Gradient CTA */}
            <ScrollLink
              to="contact"
              smooth
              offset={-90}
              duration={600}
              className="group relative px-3 lg:px-3.5 py-1.5 rounded-full text-xs font-bold text-white
                         bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
                         hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 
                         transition-all duration-300 cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <FaRocket className="text-[11px] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              <span className="whitespace-nowrap">Hire Me</span>
            </ScrollLink>
          </div>

          {/* 4. Mobile Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
            >
              <FaRobot className="text-[10px]" />
              <span>AI</span>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 transition cursor-pointer"
            >
              <AiOutlineMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* 📱 Mobile Fullscreen Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-[70] bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-2xl p-6 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <FaCode className="text-xs" />
                </div>
                <span className="font-bold text-base text-gray-900 dark:text-white">
                  Amardeep Dwivedi
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white cursor-pointer"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex flex-col space-y-2.5 my-auto py-6">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ScrollLink
                      to={item.id}
                      smooth
                      offset={-80}
                      duration={600}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMenuOpen(false);
                        playLuxuryGlassChime();
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold transition cursor-pointer
                        ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-600/30 border border-white/20"
                            : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                        }`}
                    >
                      <Icon className={`text-base ${isActive ? "text-cyan-300" : "text-gray-400"}`} />
                      <span>{t(`nav.${item.labelKey}`)}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] animate-pulse ml-auto" />
                      )}
                    </ScrollLink>
                  </motion.div>
                );
              })}
            </div>

            {/* Drawer Footer Controls */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-ai-chat"));
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <FaRobot className="text-sm text-cyan-200" />
                <span>Ask Amardeep AI (Recruiter Copilot)</span>
              </button>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleLanguage(i18n)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 cursor-pointer"
                >
                  {i18n.language === "en" ? "🇮🇳 हिंदी में देखें" : "🇺🇸 Switch to EN"}
                </button>

                <ScrollLink
                  to="contact"
                  smooth
                  offset={-80}
                  duration={600}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-500 shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <FaRocket /> Hire Me
                </ScrollLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
