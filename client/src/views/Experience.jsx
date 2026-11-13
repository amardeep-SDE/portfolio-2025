import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { playLuxuryGlassChime } from "../utils/audioEffects";
import {
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiLayers,
  FiTrendingUp,
  FiAward,
  FiCode,
  FiActivity,
  FiArrowUpRight,
  FiCpu,
  FiClock,
  FiFileText,
  FiGrid,
  FiList,
  FiMessageSquare,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { FaBuilding, FaRocket } from "react-icons/fa";

// Company specific themes, monograms, accents, exact tenures, and quantitative metrics
const companyThemes = [
  {
    id: "suffescom",
    initials: "SS",
    companyName: "Suffescom Solutions Inc",
    gradient: "from-indigo-600 via-purple-600 to-pink-500",
    glowColor: "rgba(99, 102, 241, 0.25)",
    accentText: "text-indigo-600 dark:text-indigo-400",
    tagBg: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60",
    nodeBorder: "border-indigo-500 dark:border-indigo-400",
    nodeGlow: "shadow-[0_0_25px_rgba(99,102,241,0.4)]",
    metricBg: "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-100/90 dark:border-indigo-800/50",
    nodeIcon: <FiBriefcase className="text-indigo-600 dark:text-indigo-400 text-sm" />,
    stepNumber: "01",
    tenureDetail: "Dec 2025 – Present • ~1 Yr • Active Production",
    typeBadge: "Full-Time • On-Site / Hybrid",
    aiPromptRole: "Suffescom Solutions as a MERN Stack Developer",
    metrics: [
      { label: "Core Stack", value: "MERN + Next.js", detail: "Full lifecycle architecture", icon: <FiCode className="text-indigo-500" /> },
      { label: "Architecture", value: "Admin, B2B & B2C", detail: "Role-based workflows", icon: <FiLayers className="text-purple-500" /> },
      { label: "Real-Time", value: "Agora Video & Socket", detail: "WebRTC calling & chat", icon: <FiTrendingUp className="text-pink-500" /> },
    ],
  },
  {
    id: "codeverse",
    initials: "CV",
    companyName: "Codeverse IT Pvt. Ltd.",
    gradient: "from-cyan-500 via-blue-600 to-indigo-600",
    glowColor: "rgba(6, 182, 212, 0.25)",
    accentText: "text-cyan-600 dark:text-cyan-400",
    tagBg: "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-800/60",
    nodeBorder: "border-cyan-500 dark:border-cyan-400",
    nodeGlow: "shadow-[0_0_25px_rgba(6,182,212,0.4)]",
    metricBg: "bg-cyan-50/70 dark:bg-cyan-950/40 border-cyan-100/90 dark:border-cyan-800/50",
    nodeIcon: <FiCode className="text-cyan-600 dark:text-cyan-400 text-sm" />,
    stepNumber: "02",
    tenureDetail: "July 2025 – Nov 2025 • 5 Mos • High-Paced Sprints",
    typeBadge: "Full-Time • Agile Team",
    aiPromptRole: "Codeverse IT as a Junior React Developer",
    metrics: [
      { label: "Domain", value: "React Gaming System", detail: "High-interaction web apps", icon: <FiCode className="text-cyan-500" /> },
      { label: "Focus", value: "State & Smooth UX", detail: "Redux Toolkit pipelines", icon: <FiLayers className="text-blue-500" /> },
      { label: "Process", value: "Agile & Fast Sprints", detail: "Cross-functional delivery", icon: <FiTrendingUp className="text-indigo-500" /> },
    ],
  },
  {
    id: "encanto",
    initials: "ET",
    companyName: "Encanto Technologies LLP",
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
    glowColor: "rgba(16, 185, 129, 0.25)",
    accentText: "text-emerald-600 dark:text-emerald-400",
    tagBg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60",
    nodeBorder: "border-emerald-500 dark:border-emerald-400",
    nodeGlow: "shadow-[0_0_25px_rgba(16,185,129,0.4)]",
    metricBg: "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-100/90 dark:border-emerald-800/50",
    nodeIcon: <FiLayers className="text-emerald-600 dark:text-emerald-400 text-sm" />,
    stepNumber: "03",
    tenureDetail: "April 2023 – June 2025 • 2 Yrs 3 Mos • Enterprise Core",
    typeBadge: "Full-Time • Full-Stack Engineer",
    aiPromptRole: "Encanto Technologies as an Associate Software Developer",
    metrics: [
      { label: "Admin Speed", value: "~30% Efficiency Gain", detail: "Dawa Bazar e-commerce", icon: <FiTrendingUp className="text-emerald-500" /> },
      { label: "Optimization", value: "~20% Query Caching", detail: "Edu Smart LMS platform", icon: <FiActivity className="text-teal-500" /> },
      { label: "Performance", value: "~25-30% Speed Boost", detail: "Accompanied social app", icon: <FiAward className="text-cyan-500" /> },
    ],
  },
];

// Top overview KPI metrics for immediate ATS / recruiter glance
const overviewKPIs = [
  {
    label: "Total Experience",
    value: "3+ Years",
    detail: "Full Stack & Real-Time MERN",
    icon: <FiBriefcase className="text-indigo-500" />,
    border: "hover:border-indigo-500/50",
  },
  {
    label: "Current Status",
    value: "MERN Developer",
    detail: "Suffescom Solutions (Active)",
    icon: <FiActivity className="text-emerald-500" />,
    border: "hover:border-emerald-500/50",
    activePulse: true,
  },
  {
    label: "Shipped Systems",
    value: "8+ Platforms",
    detail: "B2B, B2C, HealthTech & LMS",
    icon: <FiLayers className="text-purple-500" />,
    border: "hover:border-purple-500/50",
  },
  {
    label: "Availability",
    value: "1 Month Notice",
    detail: "Immediate & Verified Candidate",
    icon: <FiTrendingUp className="text-cyan-500" />,
    border: "hover:border-cyan-500/50",
  },
];

// Floating developer tech badges in the background
const floatingTechChips = [
  { label: "<React.js />", top: "12%", left: "4%", delay: 0 },
  { label: "{ Node.js }", top: "28%", right: "3%", delay: 1.5 },
  { label: "MongoDB", top: "48%", left: "2%", delay: 0.8 },
  { label: "Agora SDK", top: "68%", right: "4%", delay: 2.2 },
  { label: "Next.js", top: "82%", left: "5%", delay: 1 },
  { label: "Socket.IO", top: "90%", right: "6%", delay: 2.8 },
];

/**
 * Interactive Spotlight Card with mouse-following radial gradient glow
 */
const InteractiveSpotlightCard = ({
  children,
  className = "",
  glowColor = "rgba(99, 102, 241, 0.2)",
  style = {},
  ...props
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      {/* Mouse Tracking Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [viewMode, setViewMode] = useState("timeline"); // "timeline" | "grid"

  // Open the AI Recruiter Chatbot with audio feedback
  const handleAskAiAboutRole = () => {
    try {
      playLuxuryGlassChime();
    } catch {
      // Audio autoplay gracefully handled
    }
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  };

  // Filter company experiences if a specific company is selected
  const displayedExperience = profileData.experience.filter((item, index) => {
    if (selectedFilter === "all") return true;
    const theme = companyThemes[index];
    return theme && theme.id === selectedFilter;
  });

  return (
    <section
      id="experience"
      className="relative py-20 px-4 sm:px-6 overflow-hidden
                 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#faf5ff]
                 dark:from-[#090d16] dark:via-[#0c1222] dark:to-[#0d091e]
                 text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* Dynamic Ambient Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-28 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 -right-28 w-96 h-96 bg-cyan-500/15 dark:bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"
      />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Matrix Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating Developer Tech Chips in Background */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden select-none">
        {floatingTechChips.map((chip, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              y: [0, -12, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 6 + idx,
              repeat: Infinity,
              ease: "easeInOut",
              delay: chip.delay,
            }}
            style={{
              top: chip.top,
              left: chip.left,
              right: chip.right,
            }}
            className="absolute px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/40 dark:bg-gray-800/30 border border-gray-300/40 dark:border-gray-700/40 text-indigo-600 dark:text-cyan-400 backdrop-blur-xs shadow-2xs"
          >
            {chip.label}
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Heading & Live Badge */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs mb-3 backdrop-blur-md"
          >
            <HiSparkles className="text-amber-500 text-sm animate-pulse" />
            <span>Career Roadmap & Professional Impact</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase tracking-wider font-extrabold border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              Verified 3+ YOE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t("experience.heading", "Work Experience")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto leading-relaxed"
          >
            {t(
              "experience.subheading",
              "Track record of building enterprise full-stack web platforms, real-time communications & high-performance applications"
            )}
          </motion.p>
        </div>

        {/* 🌟 Top Career Snapshot KPI Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-10">
          {overviewKPIs.map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`p-3.5 rounded-2xl bg-white/80 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 backdrop-blur-md shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-3 group ${kpi.border}`}
            >
              <div>
                <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block">
                  {kpi.label}
                </span>
                <div className="flex items-center gap-1.5 my-0.5">
                  <span className="text-base sm:text-lg font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    {kpi.value}
                  </span>
                  {kpi.activePulse && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block line-clamp-1">
                  {kpi.detail}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-900/90 border border-gray-100 dark:border-gray-800 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                {kpi.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Pills & View Mode Switcher Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Company Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Milestones", count: profileData.experience.length },
              { id: "suffescom", label: "Suffescom Solutions", badge: "Current" },
              { id: "codeverse", label: "Codeverse IT" },
              { id: "encanto", label: "Encanto Tech" },
            ].map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedFilter(tab.id);
                    try {
                      playLuxuryGlassChime();
                    } catch {}
                  }}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "text-white shadow-md shadow-indigo-500/25"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white/70 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeExperienceTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`relative z-10 px-1.5 py-0.2 rounded text-[9.5px] uppercase font-black ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                  {tab.count && (
                    <span
                      className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] ${
                        isActive
                          ? "bg-white/20 text-white font-bold"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Timeline vs Grid Matrix */}
          <div className="flex items-center bg-white/80 dark:bg-gray-800/70 p-1 rounded-xl border border-gray-200/80 dark:border-gray-700/80 shadow-2xs">
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === "timeline"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              title="Timeline View"
            >
              <FiList className="text-sm" />
              <span className="hidden sm:inline">Timeline</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === "grid"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              title="Grid Cards View"
            >
              <FiGrid className="text-sm" />
              <span className="hidden sm:inline">Comparison Grid</span>
            </button>
          </div>
        </div>

        {/* =============================================================== */}
        {/* VIEW 1: CHRONOLOGICAL ROADMAP TIMELINE */}
        {/* =============================================================== */}
        {viewMode === "timeline" ? (
          <div className="relative space-y-10">
            {/* Animated Glowing Vertical Beam (Desktop Only) */}
            <div className="hidden md:block absolute top-4 bottom-4 left-6 w-[3px] rounded-full bg-gradient-to-b from-indigo-500 via-cyan-500 to-emerald-500 opacity-40 overflow-hidden">
              <motion.div
                className="w-full h-36 bg-gradient-to-b from-transparent via-white dark:via-cyan-300 to-transparent blur-[1px]"
                animate={{ y: ["-100%", "900%"] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
              />
            </div>

            <AnimatePresence mode="popLayout">
              {displayedExperience.map((item) => {
                const originalIndex = profileData.experience.findIndex(
                  (e) => e.company === item.company
                );
                const theme = companyThemes[originalIndex] || companyThemes[0];
                const isCurrent = originalIndex === 0;
                const bullets = t(`${item.bulletsKey}`, {
                  returnObjects: true,
                  defaultValue: [],
                });

                return (
                  <motion.div
                    key={item.company}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45 }}
                    onMouseEnter={() => setHoveredCard(item.company)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative md:pl-20 group"
                  >
                    {/* Modern Milestone Squircle Badge (Desktop) */}
                    <div
                      className={`hidden md:flex absolute left-6 top-8 -translate-x-1/2 w-12 h-12 rounded-2xl bg-white/95 dark:bg-[#0c1322]/95 border-2 ${
                        theme.nodeBorder
                      } ${
                        theme.nodeGlow
                      } items-center justify-center shadow-lg group-hover:scale-115 transition-all duration-300 z-10 backdrop-blur-md`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        {theme.nodeIcon}
                        <span className="text-[8.5px] font-mono font-bold text-gray-400 dark:text-gray-500 mt-0.5">
                          {theme.stepNumber}
                        </span>
                      </div>
                      {isCurrent && (
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-gray-900" />
                        </span>
                      )}
                    </div>

                    {/* Horizontal Connector Line between Node and Card */}
                    <div
                      className={`hidden md:block absolute left-12 top-[52px] h-[2px] transition-all duration-300 ${
                        hoveredCard === item.company
                          ? "w-8 bg-gradient-to-r " + theme.gradient + " opacity-100"
                          : "w-6 bg-gray-300 dark:bg-gray-700 opacity-50"
                      }`}
                    />

                    {/* Interactive Spotlight Experience Card */}
                    <InteractiveSpotlightCard
                      glowColor={theme.glowColor}
                      className="rounded-3xl p-5 sm:p-6 bg-white/90 dark:bg-[#0e1628]/90 border border-gray-200/90 dark:border-gray-800/90 shadow-md hover:shadow-2xl transition-all duration-300 backdrop-blur-xl group-hover:-translate-y-1"
                      style={{
                        boxShadow:
                          hoveredCard === item.company
                            ? `0 20px 40px -12px ${theme.glowColor}`
                            : `0 8px 24px -12px ${theme.glowColor}`,
                      }}
                    >
                      {/* Top Accent Gradient Border */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient}`}
                      />

                      {/* Top Bar: Company Monogram, Role, Dates, Location */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 border-b border-gray-100 dark:border-gray-800/80">
                        <div className="flex items-start gap-3.5">
                          {/* Vibrant Monogram Badge */}
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.gradient} text-white font-black text-lg flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300`}
                          >
                            {theme.initials}
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                                {t(item.roleKey)}
                              </h3>
                              {isCurrent && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10.5px] font-extrabold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60 shadow-2xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                                  Current Role
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-0.5">
                              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                {t(item.companyKey)}
                              </span>
                              <span className="text-gray-300 dark:text-gray-700">•</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {theme.typeBadge}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Duration & Location Badges */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 font-medium border border-gray-200/60 dark:border-gray-700/60 shadow-2xs">
                            <FiCalendar className="text-indigo-500 text-xs" />
                            <span>{item.duration}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 font-medium border border-gray-200/60 dark:border-gray-700/60 shadow-2xs">
                            <FiMapPin className="text-rose-500 text-xs" />
                            <span>{t(item.locationKey)}</span>
                          </span>
                        </div>
                      </div>

                      {/* 📊 Impact Metrics Grid */}
                      {theme.metrics && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
                          {theme.metrics.map((metric, mIdx) => (
                            <div
                              key={mIdx}
                              className={`p-3 rounded-2xl border flex items-center gap-3 transition-all duration-200 ${theme.metricBg} hover:scale-102`}
                            >
                              <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-gray-800 flex items-center justify-center shrink-0 shadow-2xs text-sm">
                                {metric.icon}
                              </div>
                              <div className="overflow-hidden">
                                <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider block">
                                  {metric.label}
                                </span>
                                <span className="text-xs font-extrabold text-gray-900 dark:text-white truncate block">
                                  {metric.value}
                                </span>
                                <span className="text-[9.5px] text-gray-400 dark:text-gray-500 truncate block">
                                  {metric.detail}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Featured Work / Projects Associated */}
                      {item.projectsAssociated && item.projectsAssociated.length > 0 && (
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1 mr-1">
                            <FiLayers className="text-indigo-500" /> Shipped Systems:
                          </span>
                          {item.projectsAssociated.map((proj, pIdx) => (
                            <ScrollLink
                              key={pIdx}
                              to="projects"
                              smooth={true}
                              duration={500}
                              offset={-80}
                              className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold border ${theme.tagBg} hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 group/chip`}
                            >
                              <span>{proj}</span>
                              <FiArrowUpRight className="text-[10px] opacity-60 group-hover/chip:opacity-100 transition-opacity" />
                            </ScrollLink>
                          ))}
                        </div>
                      )}

                      {/* Detailed Resume Bullets */}
                      <div className="space-y-2 mb-4">
                        {Array.isArray(bullets) && bullets.length > 0 ? (
                          bullets.map((bullet, bIdx) => (
                            <motion.div
                              key={bIdx}
                              whileHover={{ x: 3 }}
                              className="flex items-start gap-2.5 text-xs sm:text-[12.5px] text-gray-700 dark:text-gray-300 leading-relaxed p-1.5 rounded-xl hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors"
                            >
                              <div className="mt-0.5 w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/80 dark:border-indigo-800/60 shadow-2xs">
                                <FiCheckCircle className="text-[10px]" />
                              </div>
                              <span className="font-normal">{bullet}</span>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-xs sm:text-[12.5px] text-gray-700 dark:text-gray-300 leading-relaxed">
                            {t(item.descriptionKey)}
                          </p>
                        )}
                      </div>

                      {/* Skills / Tech Stack Used + Quick Actions */}
                      {item.skills && item.skills.length > 0 && (
                        <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-1.5">
                              Technologies:
                            </span>
                            {item.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[11px] px-2.5 py-0.5 rounded-md font-semibold bg-gray-100 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Quick Jump Action & Ask AI Button */}
                          <div className="flex items-center gap-3 shrink-0">
                            <button
                              onClick={handleAskAiAboutRole}
                              className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/50 transition cursor-pointer hover:scale-105 active:scale-95"
                              title="Ask AI Recruiter chatbot about this position"
                            >
                              <FiMessageSquare className="text-xs" />
                              <span>Ask AI</span>
                            </button>

                            <ScrollLink
                              to="projects"
                              smooth={true}
                              duration={500}
                              offset={-80}
                              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 inline-flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>Explore Projects</span>
                              <FiArrowUpRight className="text-xs" />
                            </ScrollLink>
                          </div>
                        </div>
                      )}
                    </InteractiveSpotlightCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* =============================================================== */
          /* VIEW 2: COMPARISON GRID MATRIX (Side-by-side cards)             */
          /* =============================================================== */
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {displayedExperience.map((item) => {
              const originalIndex = profileData.experience.findIndex(
                (e) => e.company === item.company
              );
              const theme = companyThemes[originalIndex] || companyThemes[0];
              const isCurrent = originalIndex === 0;
              const bullets = t(`${item.bulletsKey}`, {
                returnObjects: true,
                defaultValue: [],
              });

              return (
                <InteractiveSpotlightCard
                  key={item.company}
                  glowColor={theme.glowColor}
                  className="rounded-3xl p-5 bg-white/90 dark:bg-[#0e1628]/90 border border-gray-200/90 dark:border-gray-800/90 shadow-md hover:shadow-2xl transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient}`} />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0`}
                        >
                          {theme.initials}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                            {t(item.roleKey)}
                          </h4>
                          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                            {t(item.companyKey)}
                          </span>
                        </div>
                      </div>

                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 text-[10px] font-extrabold border border-emerald-300/80">
                          Active
                        </span>
                      )}
                    </div>

                    {/* Duration Pill */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 my-3 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-xl">
                      <span className="flex items-center gap-1 font-medium">
                        <FiCalendar className="text-indigo-500" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <FiMapPin className="text-rose-500" />
                        {t(item.locationKey)}
                      </span>
                    </div>

                    {/* Metrics Bar */}
                    {theme.metrics && (
                      <div className="space-y-1.5 my-3">
                        {theme.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className={`p-2 rounded-xl border flex items-center justify-between text-xs ${theme.metricBg}`}
                          >
                            <span className="text-gray-500 dark:text-gray-400 font-medium text-[11px]">
                              {m.label}
                            </span>
                            <span className="font-bold text-gray-900 dark:text-white text-[11px]">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bullet Highlights */}
                    <div className="space-y-2 my-3 text-xs text-gray-700 dark:text-gray-300">
                      {Array.isArray(bullets) && bullets.slice(0, 2).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <FiCheckCircle className="text-indigo-500 text-xs mt-0.5 shrink-0" />
                          <span className="text-[11.5px] leading-snug line-clamp-2">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Tech & CTA */}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.skills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {item.skills.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-gray-400 font-medium">
                          +{item.skills.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleAskAiAboutRole}
                        className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FiMessageSquare className="text-xs" /> Ask AI
                      </button>

                      <ScrollLink
                        to="projects"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Projects</span>
                        <FiArrowUpRight className="text-xs" />
                      </ScrollLink>
                    </div>
                  </div>
                </InteractiveSpotlightCard>
              );
            })}
          </motion.div>
        )}

        {/* Bottom CTA / Verification Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-5 rounded-3xl bg-white/70 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm hover:border-indigo-400/50 transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
              <FiFileText />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Detailed Work Experience & Employment History
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Verified candidate with 3+ years experience • 1 Month Notice Period
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={handleAskAiAboutRole}
              className="px-4 py-2 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/60 hover:bg-purple-100 transition cursor-pointer flex items-center gap-1.5"
            >
              <FiMessageSquare className="text-xs" />
              <span>Ask AI Recruiter</span>
            </button>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              offset={-80}
              className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 hover:bg-indigo-100 transition cursor-pointer"
            >
              View Bio & ATS Summary
            </ScrollLink>
            <a
              href={profileData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Download Official Resume</span>
              <FiArrowUpRight />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
