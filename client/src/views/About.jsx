import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import profileData from "../data/profileData";
import { Typewriter } from "react-simple-typewriter";
import {
  FaUserTie,
  FaMapMarkerAlt,
  FaEye,
  FaDownload,
  FaTimes,
  FaClock,
  FaBriefcase,
  FaAward,
  FaCheckCircle,
  FaCode,
} from "react-icons/fa";

const About = () => {
  const { t } = useTranslation();
  const [resumeOpen, setResumeOpen] = useState(false);

  const stats = [
    {
      value: "3+",
      label: "Years Experience",
      subtext: "Full Stack & Frontend",
      icon: <FaBriefcase className="text-indigo-500 text-sm" />,
    },
    {
      value: "1",
      unit: "Mo",
      label: "Notice Period",
      subtext: "Available for Hire",
      icon: <FaClock className="text-emerald-500 text-sm" />,
      highlight: true,
    },
    {
      value: "3x",
      label: "NamasteDev",
      subtext: "Verified Certifications",
      icon: <FaAward className="text-amber-500 text-sm" />,
    },
    {
      value: "9+",
      label: "Web Projects",
      subtext: "Production Deployed",
      icon: <FaCheckCircle className="text-sky-500 text-sm" />,
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 
                 overflow-hidden bg-gradient-to-br from-[#f0f4ff] via-[#fafafa] to-[#e6f2ff] 
                 dark:from-[#090d16] dark:via-[#0f172a] dark:to-[#090d16] transition-colors duration-300"
    >
      {/* 🌟 Background Ambient Glows */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-pink-400/20 dark:bg-pink-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">
        {/* Left Side: Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Availability Beacon Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold 
                          bg-emerald-50 text-emerald-700 border border-emerald-300/70 
                          dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700/60 shadow-xs mb-3.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{t("about.noticePeriod", "Notice Period: 1 Month")} • Available Immediately</span>
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            {t("about.name", "Amardeep Dwivedi")}
          </h1>

          {/* Typewriter Role with Gradient */}
          <div className="text-lg sm:text-2xl font-bold flex items-center justify-center lg:justify-start gap-2 mb-3">
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <FaCode className="text-base" />
            </span>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              <Typewriter
                words={[
                  "React Developer",
                  "MERN Stack Developer",
                  "Frontend Specialist",
                  "Full Stack Engineer",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1800}
              />
            </span>
          </div>

          {/* Location & YOE Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-medium border border-gray-200/60 dark:border-gray-700/60 shadow-2xs">
              <FaMapMarkerAlt className="text-red-500 text-xs" />
              {t("about.location", "Chandigarh, India")}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-100 dark:border-indigo-900/40 shadow-2xs">
              <FaBriefcase className="text-indigo-500 text-xs" />
              {t("about.yoe", "3+ Years of Experience")}
            </span>
          </div>

          {/* Professional Summary Description */}
          <p className="text-xs sm:text-sm text-justify leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl mb-6">
            {t("about.description")}
          </p>

          {/* Modern Metrics / Stats Bar with Celebratory Count-Up */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5">
            {stats.map((stat, i) => (
              <AnimatedStatCard key={i} stat={stat} index={i} />
            ))}
          </div>

          {/* Resume Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-6">
            {/* View Resume */}
            <button
              onClick={() => setResumeOpen(true)}
              className="group relative px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white
                         bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                         shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30
                         transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <FaEye className="group-hover:rotate-12 transition-transform duration-300" />
              <span>View Resume</span>
            </button>

            {/* Download Resume */}
            <a
              href={profileData.resume}
              download="Amardeep_Dwivedi_Resume.pdf"
              className="group relative px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white
                         bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500
                         shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30
                         transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <FaDownload className="group-hover:-translate-y-0.5 transition-transform duration-300" />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Profile Photo with Floating Badge */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="flex-1 flex justify-center relative"
        >
          <div className="relative group">
            {/* Ambient Pulsing Glow */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 blur-xl group-hover:opacity-65 transition-all duration-500 animate-pulse" />

            {/* Gradient Outer Border */}
            <div className="relative rounded-full p-1.5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-xl">
              <img
                src={profileData.image}
                alt={t("about.name")}
                className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover rounded-full shadow-2xl border-4 border-white dark:border-gray-900 
                           transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>

            {/* Floating Tech Pill Badge */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full 
                         bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/90 dark:border-gray-700 
                         shadow-lg flex items-center gap-2 whitespace-nowrap z-20"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span className="text-[11px] sm:text-xs font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                React • MERN Stack Specialist
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Resume Modal */}
      {resumeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] relative flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                Amardeep Dwivedi – Resume
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={profileData.resume}
                  download="Amardeep_Dwivedi_Resume.pdf"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 transition"
                >
                  <FaDownload /> Download
                </a>
                <button
                  onClick={() => setResumeOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>
            <iframe
              src={profileData.resume}
              title="Resume Preview"
              className="w-full flex-1"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

const AnimatedStatCard = ({ stat, index }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [celebrated, setCelebrated] = useState(false);
  const cardRef = useRef(null);

  const numericTarget = parseInt(stat.value, 10) || 0;
  const suffix = stat.value.replace(/^[0-9]+/, "");

  useEffect(() => {
    let startTime = null;
    const duration = 1000 + index * 200;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * numericTarget);
            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(numericTarget);
              setCelebrated(true);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [numericTarget, index]);

  return (
    <div
      ref={cardRef}
      className={`relative p-3 rounded-xl border backdrop-blur-md transition-all duration-300 overflow-hidden
        ${
          stat.highlight
            ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300/80 dark:border-emerald-700/50 shadow-xs"
            : "bg-white/80 dark:bg-gray-800/60 border-gray-200/80 dark:border-gray-700/60 shadow-2xs"
        }
        hover:-translate-y-1 hover:shadow-md group`}
    >
      {/* Celebratory Sparkle Ping */}
      {celebrated && (
        <span className="absolute top-1.5 right-1.5 text-xs animate-ping opacity-60 pointer-events-none">
          ✨
        </span>
      )}

      <div className="flex items-center justify-between mb-1">
        <span className="text-xs group-hover:scale-115 transition-transform">{stat.icon}</span>
        <span className="text-base sm:text-lg font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
          {displayValue}
          <span>{suffix}</span>
          {stat.unit && <span className="text-[10px] font-bold text-gray-500 ml-0.5">{stat.unit}</span>}
        </span>
      </div>
      <div className="text-[11px] font-bold text-gray-800 dark:text-gray-200 leading-tight">
        {stat.label}
      </div>
      <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
        {stat.subtext}
      </div>
    </div>
  );
};

export default About;
