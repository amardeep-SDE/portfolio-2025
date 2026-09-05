import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import profileData from "../data/profileData";
import { Typewriter } from "react-simple-typewriter";
import DevWindowProfile from "../components/DevWindowProfile";
import CelebrationConfetti from "../components/CelebrationConfetti";
import ChandigarhHoverCard from "../components/ChandigarhHoverCard";
import ExperienceHoverCard from "../components/ExperienceHoverCard";
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
  FaRobot,
  FaCheck,
  FaFilePdf,
  FaExternalLinkAlt,
  FaBolt,
  FaCopy,
  FaWhatsapp,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import {
  playCelestialChime,
  playLuxuryGlassChime,
  playLevelUpSound,
} from "../utils/audioEffects";
import { openWhatsAppModal } from "../utils/whatsappHelper";

const About = () => {
  const { t } = useTranslation();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeTab, setResumeTab] = useState("pdf"); // 'pdf' | 'summary'
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [downloadState, setDownloadState] = useState("idle"); // 'idle' | 'downloading' | 'downloaded'
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [soundTheme, setSoundTheme] = useState("celestial"); // 'celestial' | 'apple' | 'arcade' | 'mute'

  const soundPresets = [
    { id: "celestial", label: "Celestial Harp ✨", fn: playCelestialChime },
    { id: "apple", label: "Glass Bell 🔔", fn: playLuxuryGlassChime },
    { id: "arcade", label: "Level-Up 🎮", fn: playLevelUpSound },
    { id: "mute", label: "Muted 🔇", fn: null },
  ];

  // 🎵 Play active celebratory sound preset
  const playActiveSound = () => {
    const preset = soundPresets.find((p) => p.id === soundTheme);
    if (preset && preset.fn) {
      preset.fn();
    }
  };

  // Cycle sound preset & trigger preview
  const cycleSoundTheme = () => {
    const currentIndex = soundPresets.findIndex((p) => p.id === soundTheme);
    const nextIndex = (currentIndex + 1) % soundPresets.length;
    const nextPreset = soundPresets[nextIndex];
    setSoundTheme(nextPreset.id);
    if (nextPreset.fn) {
      nextPreset.fn();
    }
  };

  // View Resume action
  const handleViewResume = () => {
    playActiveSound();
    setConfettiTrigger((p) => p + 1);
    setResumeOpen(true);
  };

  // Download Resume with live animated progress & toast
  const handleDownloadResume = (e) => {
    if (e) e.preventDefault();
    playActiveSound();
    setConfettiTrigger((p) => p + 1);
    setDownloadState("downloading");
    setDownloadProgress(15);

    const progInterval = setInterval(() => {
      setDownloadProgress((p) => {
        if (p >= 88) {
          clearInterval(progInterval);
          return 92;
        }
        return p + 25;
      });
    }, 110);

    setTimeout(() => {
      clearInterval(progInterval);
      setDownloadProgress(100);

      const link = document.createElement("a");
      link.href = profileData.resume;
      link.download = "Amardeep_Dwivedi_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadState("downloaded");
      setToastMessage({
        title: "Resume Downloaded! 🎉",
        desc: "Amardeep_Dwivedi_Resume.pdf has been saved to your downloads.",
      });

      setTimeout(() => {
        setDownloadState("idle");
        setDownloadProgress(0);
      }, 2600);
    }, 620);
  };

  // Copy resume URL
  const handleCopyResumeLink = () => {
    const fullUrl = window.location.origin + profileData.resume;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

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
      value: "9+",
      label: "Web Projects",
      subtext: "Production Deployed",
      icon: <FaCheckCircle className="text-sky-500 text-sm" />,
    },
    {
      value: "Live",
      customValue: "Live",
      label: "AI Copilot",
      subtext: "Gemini & LLM Apps",
      icon: <FaRobot className="text-cyan-500 text-sm" />,
      aiCard: true,
      onClick: () => window.dispatchEvent(new CustomEvent("open-ai-chat")),
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 
                 overflow-hidden bg-gradient-to-br from-[#f0f4ff] via-[#fafafa] to-[#e6f2ff] 
                 dark:from-[#090d16] dark:via-[#0f172a] dark:to-[#090d16] transition-colors duration-300"
    >
      {/* 🎉 Celebratory Confetti Cannon */}
      <CelebrationConfetti trigger={confettiTrigger} />
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
                  "MERN Full Stack AI Developer",
                  "React Developer",
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

          {/* Location, YOE & AI Badges with Interactive Hover Previews */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5 text-xs sm:text-sm">
            <ChandigarhHoverCard>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-medium border border-gray-200/60 dark:border-gray-700/60 shadow-2xs hover:border-emerald-500/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 transition-all duration-300 group">
                <FaMapMarkerAlt className="text-red-500 text-xs group-hover:scale-125 transition-transform" />
                <span>{t("about.location", "Chandigarh, India")}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100/80 dark:bg-emerald-900/60 px-1 rounded ml-0.5">
                  The City Beautiful 🌲
                </span>
              </span>
            </ChandigarhHoverCard>

            <ExperienceHoverCard>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-100 dark:border-indigo-900/40 shadow-2xs hover:border-indigo-500/60 hover:bg-indigo-100/60 dark:hover:bg-indigo-900/40 transition-all duration-300 group">
                <FaBriefcase className="text-indigo-500 text-xs group-hover:scale-125 transition-transform" />
                <span>{t("about.yoe", "3+ Years of Experience")}</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-100/80 dark:bg-indigo-900/60 px-1 rounded ml-0.5">
                  Summary
                </span>
              </span>
            </ExperienceHoverCard>

            {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 text-cyan-800 dark:text-cyan-300 font-semibold border border-cyan-300/80 dark:border-cyan-700/50 shadow-2xs transition-all duration-300 group">
              <FaRobot className="text-cyan-600 dark:text-cyan-400 text-xs animate-pulse" />
              <span>Gemini &amp; LLM Apps</span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-300 font-bold bg-cyan-100/80 dark:bg-cyan-900/60 px-1 rounded ml-0.5">
                AI Copilot Live
              </span>
            </span> */}
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
            {/* View Resume with Confetti & Chime */}
            <button
              onClick={handleViewResume}
              className="group relative px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white
                         bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                         shadow-md shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40
                         transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer 
                         flex items-center gap-2 overflow-hidden"
            >
              {/* Sleek sheen sweep on hover */}
              <span className="absolute inset-0 w-1/3 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out pointer-events-none" />

              <FaEye className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">View Resume</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-bold ml-0.5 relative z-10">
                PDF
              </span>
            </button>

            {/* Download Resume with Live State Animation, Sound & Confetti */}
            <button
              onClick={handleDownloadResume}
              className={`group relative px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white
                         shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer 
                         flex items-center gap-2 overflow-hidden ${downloadState === "downloaded"
                  ? "bg-emerald-600 shadow-emerald-500/30"
                  : downloadState === "downloading"
                    ? "bg-indigo-600 shadow-indigo-500/30"
                    : "bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500 shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40"
                }`}
            >
              {/* Sleek sheen sweep on hover */}
              <span className="absolute inset-0 w-1/3 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out pointer-events-none" />

              {/* Live filling progress bar */}
              {downloadState === "downloading" && (
                <span
                  className="absolute left-0 bottom-0 top-0 bg-white/25 transition-all duration-150 pointer-events-none"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}

              {downloadState === "downloading" ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" />
                  <span className="relative z-10 font-bold">Saving... {downloadProgress}%</span>
                </>
              ) : downloadState === "downloaded" ? (
                <>
                  <FaCheck className="text-white text-xs animate-bounce relative z-10" />
                  <span className="relative z-10 font-bold">Downloaded! 🎉</span>
                </>
              ) : (
                <>
                  <FaDownload className="group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">Download Resume</span>
                </>
              )}
            </button>

            {/* Interactive Audio Theme Switcher & Preview Pill */}
            <button
              type="button"
              onClick={cycleSoundTheme}
              className="px-3 py-2 rounded-xl text-xs font-semibold 
                         bg-white/80 dark:bg-[#151c2c]/80 hover:bg-white dark:hover:bg-[#1e273d]
                         text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-gray-700/80
                         shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="Click to switch celebration sound style & test live"
            >
              {soundTheme === "mute" ? (
                <FaVolumeMute className="text-gray-400 text-xs" />
              ) : (
                <FaVolumeUp className="text-indigo-500 text-xs animate-pulse" />
              )}
              <span className="text-[11px] text-gray-400 font-medium">Sound:</span>
              <span className="text-[11px] font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                {soundPresets.find((p) => p.id === soundTheme)?.label}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Right Side: Developer IDE / macOS Window Dock Photo Showcase */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65 }}
          className="flex-1 flex justify-center items-center relative w-full"
        >
          <DevWindowProfile
            imageSrc={profileData.image}
            name={t("about.name", profileData.name)}
            title={profileData.title}
            experienceYears={profileData.experienceYears}
            noticePeriod={profileData.noticePeriod}
            location={profileData.location}
          />
        </motion.div>
      </div>

      {/* 🚀 Ultra-Sleek Holographic Resume Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-[#0e1420] rounded-3xl shadow-2xl w-full max-w-4xl h-[88vh] max-h-[750px] relative flex flex-col border border-gray-200 dark:border-gray-800 overflow-hidden font-sans"
            >
              {/* Modal Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-gray-50/90 dark:bg-[#151c2c] border-b border-gray-200 dark:border-gray-800/80 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <FaFilePdf className="text-base" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight">
                      Amardeep Dwivedi — Official Resume
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Verified Candidate • Notice: 1 Month</span>
                    </div>
                  </div>
                </div>

                {/* View Mode Tabs (PDF vs ATS Summary) */}
                <div className="flex items-center bg-gray-200/80 dark:bg-gray-800/90 p-1 rounded-xl border border-gray-300/60 dark:border-gray-700 text-xs font-semibold">
                  <button
                    onClick={() => setResumeTab("pdf")}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${resumeTab === "pdf"
                      ? "bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-xs"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                  >
                    <FaFilePdf className="text-xs" />
                    <span>PDF View</span>
                  </button>
                  <button
                    onClick={() => setResumeTab("summary")}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${resumeTab === "summary"
                      ? "bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-xs"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                  >
                    <FaBolt className="text-xs text-amber-500" />
                    <span>Executive ATS Summary</span>
                  </button>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={profileData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                    title="Open in new tab"
                  >
                    <FaExternalLinkAlt size={13} />
                  </a>
                  <a
                    href={profileData.resume}
                    download="Amardeep_Dwivedi_Resume.pdf"
                    onClick={() => setConfettiTrigger((p) => p + 1)}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-sm flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <FaDownload /> Download
                  </a>
                  <button
                    onClick={() => setResumeOpen(false)}
                    className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
                    title="Close"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-hidden relative">
                {resumeTab === "pdf" ? (
                  <iframe
                    src={profileData.resume}
                    title="Resume PDF Preview"
                    className="w-full h-full bg-gray-100 dark:bg-gray-950"
                    style={{ border: "none" }}
                  />
                ) : (
                  /* Executive ATS Summary Card */
                  <div className="p-6 overflow-y-auto h-full space-y-6 text-gray-800 dark:text-gray-200">
                    {/* Top Snapshot */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Experience</div>
                        <div className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">3+ Years</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Frontend & Full Stack MERN</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Availability</div>
                        <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">1 Month Notice</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Available for Immediate Hire</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Current Employer</div>
                        <div className="text-lg font-extrabold text-purple-600 dark:text-purple-400">Suffescom Solutions</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">React Developer</div>
                      </div>
                    </div>

                    {/* Key Technical Highlights */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                        <FaCode className="text-indigo-600 dark:text-indigo-400" />
                        <span>Core Engineering Strengths</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800">
                          <strong className="text-indigo-600 dark:text-cyan-400">Real-Time WebRTC & Video:</strong>
                          <p className="mt-1 text-gray-600 dark:text-gray-300">
                            Engineered production video calling platforms using Agora Web SDK, Socket.IO, and live session management.
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800">
                          <strong className="text-indigo-600 dark:text-cyan-400">High-Performance React & Redux:</strong>
                          <p className="mt-1 text-gray-600 dark:text-gray-300">
                            React 19, Redux Toolkit, code-splitting, lazy loading, debouncing, and sub-second render pipelines.
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800">
                          <strong className="text-indigo-600 dark:text-cyan-400">Scalable Backend & DBs:</strong>
                          <p className="mt-1 text-gray-600 dark:text-gray-300">
                            Node.js, Express.js, MongoDB aggregation pipelines, indexed queries, RESTful API architecture.
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800">
                          <strong className="text-indigo-600 dark:text-cyan-400">Verified NamasteDev Credentials:</strong>
                          <p className="mt-1 text-gray-600 dark:text-gray-300">
                            4x Verified by Akshay Saini in Namaste React, Node.js, Frontend System Design, and DSA.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Core Tech Stack & Tools
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "React 19",
                          "Redux Toolkit",
                          "Agora WebRTC",
                          "Node.js",
                          "Express.js",
                          "MongoDB",
                          "JavaScript (ES6+)",
                          "Tailwind CSS",
                          "Socket.IO",
                          "REST APIs",
                          "NamasteDev 4x",
                          "Vite / Webpack",
                        ].map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/40"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Recruiter Actions */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                      <div>
                        <div className="font-bold text-sm">Want to interview or discuss an offer?</div>
                        <div className="text-xs text-indigo-100">Reach out directly or copy resume link</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={handleCopyResumeLink}
                          className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                        >
                          {copiedLink ? (
                            <>
                              <FaCheck className="text-emerald-300" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <FaCopy />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openWhatsAppModal(
                              "Hi Amardeep, I reviewed your resume and portfolio. Let's connect!"
                            )
                          }
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                          title="Open WhatsApp chat panel"
                        >
                          <FaWhatsapp className="text-sm" />
                          <span>WhatsApp</span>
                        </button>
                        <a
                          href="mailto:amardeepdwivedi77@gmail.com"
                          className="px-3.5 py-1.5 rounded-xl bg-white text-indigo-600 font-bold text-xs hover:bg-gray-100 transition shadow-sm whitespace-nowrap cursor-pointer"
                        >
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔔 Floating Celebratory Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[120] max-w-sm p-4 rounded-2xl bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/15 flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
              <FaCheckCircle className="text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-900 dark:text-white">
                {toastMessage.title}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                {toastMessage.desc}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => {
                    setToastMessage(null);
                    handleViewResume();
                  }}
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Preview PDF →
                </button>
                <button
                  onClick={() => setToastMessage(null)}
                  className="text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-1 cursor-pointer"
            >
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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
      onClick={stat.onClick}
      className={`relative p-3 rounded-xl border backdrop-blur-md transition-all duration-300 overflow-hidden
        ${stat.highlight
          ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300/80 dark:border-emerald-700/50 shadow-xs"
          : stat.aiCard
            ? "bg-cyan-50/80 dark:bg-cyan-950/30 border-cyan-300/80 dark:border-cyan-700/50 shadow-xs cursor-pointer hover:border-cyan-400"
            : "bg-white/80 dark:bg-gray-800/60 border-gray-200/80 dark:border-gray-700/60 shadow-2xs"
        }
        hover:-translate-y-1 hover:shadow-md group`}
      title={stat.aiCard ? "Click to open Amardeep AI Copilot" : undefined}
    >
      {/* Celebratory Sparkle Ping */}
      {(celebrated || stat.aiCard) && (
        <span className="absolute top-1.5 right-1.5 text-xs animate-ping opacity-60 pointer-events-none">
          ✨
        </span>
      )}

      <div className="flex items-center justify-between mb-1">
        <span className="text-xs group-hover:scale-115 transition-transform">{stat.icon}</span>
        <span className="text-base sm:text-lg font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
          {stat.customValue ? (
            <span className="flex items-center gap-1">
              <span>{stat.customValue}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </span>
          ) : (
            <>
              {displayValue}
              <span>{suffix}</span>
              {stat.unit && <span className="text-[10px] font-bold text-gray-500 ml-0.5">{stat.unit}</span>}
            </>
          )}
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
