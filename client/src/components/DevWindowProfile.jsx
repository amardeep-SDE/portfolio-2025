import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaCode,
  FaCopy,
  FaCheck,
  FaTerminal,
  FaFileCode,
  FaAward,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

/**
 * DevWindowProfile Component
 * macOS Code Editor / IDE Window showcase for the About section photo.
 * Features:
 * - macOS Traffic Light Dots
 * - Multi-Tab System (Amardeep.tsx & specs.json)
 * - Line Numbers Gutter
 * - Embedded Photo with Floating Code Annotations
 * - Interactive Syntax-Highlighted JSON View with Copy to Clipboard
 * - 3D Perspective Tilt on Mouse Movement
 * - Modern IDE Status Bar
 */
const DevWindowProfile = ({
  imageSrc,
  name,
  title,
  experienceYears,
  noticePeriod,
  location,
}) => {
  const [activeTab, setActiveTab] = useState("photo"); // 'photo' | 'specs'
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt (max +/- 7 degrees for a sleek desktop feel)
    const newRotX = ((y - centerY) / centerY) * -7;
    const newRotY = ((x - centerX) / centerX) * 7;

    setRotX(newRotX);
    setRotY(newRotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const jsonSpecsData = {
    developer: name,
    title: title,
    experience: `${experienceYears} (Full Stack & Frontend)`,
    currentCompany: "Suffescom Solutions Inc",
    noticePeriod: `${noticePeriod} (Immediate Joiner)`,
    location: location,
    coreStack: [
      "React 19",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "Agora Video SDK",
      "Tailwind CSS",
    ],
    verifiedCredentials: [
      "Namaste React (Akshay Saini)",
      "Namaste Node.js (Akshay Saini)",
      "Frontend System Design",
      "Namaste DSA",
    ],
    status: "Available for Hire 🚀",
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonSpecsData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] mx-auto py-2 select-none">
      {/* 🌟 Ambient Cyber Glow Behind the IDE Window */}
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-500/20 dark:from-indigo-600/30 dark:via-purple-600/25 dark:to-cyan-600/25 opacity-70 blur-xl pointer-events-none" />

      {/* 💻 Main 3D Tilt IDE Window */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        className="relative z-10 rounded-xl overflow-hidden bg-[#0d1117] text-gray-200 border border-gray-700/80 shadow-xl shadow-black/40 font-mono transition-all duration-300"
      >
        {/* Top Header: macOS Titlebar & Tabs */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-gray-800">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 hover:opacity-80 transition cursor-pointer" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 hover:opacity-80 transition cursor-pointer" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 hover:opacity-80 transition cursor-pointer" />
          </div>

          {/* IDE Tabs */}
          <div className="flex items-center gap-1">
            {/* Tab 1: Amardeep.tsx (Photo View) */}
            <button
              onClick={() => setActiveTab("photo")}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                activeTab === "photo"
                  ? "bg-[#0d1117] text-indigo-300 border-t-2 border-indigo-400 font-semibold shadow-xs"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60"
              }`}
            >
              <FaReact
                className={`text-[11px] ${
                  activeTab === "photo" ? "text-cyan-400 animate-spin-slow" : "text-gray-400"
                }`}
              />
              <span>Amardeep.tsx</span>
            </button>

            {/* Tab 2: specs.json */}
            <button
              onClick={() => setActiveTab("specs")}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                activeTab === "specs"
                  ? "bg-[#0d1117] text-amber-300 border-t-2 border-amber-400 font-semibold shadow-xs"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60"
              }`}
            >
              <FaCode
                className={`text-[11px] ${
                  activeTab === "specs" ? "text-amber-400" : "text-gray-400"
                }`}
              />
              <span>specs.json</span>
            </button>
          </div>

          {/* Live System Status Pill */}
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[9.5px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready</span>
          </div>
        </div>

        {/* Editor Body */}
        <AnimatePresence mode="wait">
          {activeTab === "photo" ? (
            /* =================== TAB 1: PHOTO WITH CODE ANNOTATIONS =================== */
            <motion.div
              key="photo-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-2.5 sm:p-3 flex flex-col bg-[#0d1117]"
            >
              {/* Code Comment Header */}
              <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1.5 px-1 font-mono">
                <span className="text-indigo-400/90 truncate">
                  // engineer = new FullStackDeveloper();
                </span>
                <span className="text-gray-600 text-[9px] shrink-0 ml-1">Ln 1, Col 1</span>
              </div>

              {/* Central Portrait Container */}
              <div className="relative rounded-lg overflow-hidden border border-gray-800 bg-gray-950 aspect-[4/4.3] group">
                {/* The Portrait Image */}
                <img
                  src={imageSrc}
                  alt={name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Minimal subtle gradient at the very bottom edge for caption readability */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-gray-950/80 to-transparent pointer-events-none" />

                {/* Dynamic Cursor Glare Sheen */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`,
                    opacity: glarePos.opacity,
                  }}
                />

                {/* 📌 Top-Left Micro Badge: Experience */}
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-gray-950/70 backdrop-blur-xs border border-amber-500/30 flex items-center gap-1 text-[8.5px] text-amber-300 shadow-xs">
                  <FaAward className="text-amber-400 text-[8.5px] shrink-0" />
                  <span className="font-semibold">{experienceYears}</span>
                </div>

                {/* 📌 Top-Right Micro Badge: Current Company */}
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-gray-950/70 backdrop-blur-xs border border-cyan-500/30 flex items-center gap-1 text-[8.5px] text-cyan-300 shadow-xs">
                  <FaBriefcase className="text-cyan-400 text-[8.5px] shrink-0" />
                  <span className="font-semibold">Suffescom</span>
                </div>

                {/* 📌 Bottom Ultra-Slim ID Ribbon */}
                <div className="absolute bottom-1 inset-x-1 px-2 py-0.5 rounded bg-gray-950/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-[9px] shadow-xs">
                  <div className="flex items-center gap-1 truncate">
                    <span className="font-bold text-gray-100">{name}</span>
                    <span className="text-[7.5px] text-gray-500">•</span>
                    <span className="text-[8.5px] text-emerald-400 font-semibold truncate">
                      MERN Stack
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[8px] text-gray-300 font-medium">Notice: {noticePeriod}</span>
                  </div>
                </div>
              </div>

              {/* Tab Switcher Footer Prompt */}
              <div className="mt-2 flex items-center justify-between px-1">
                <span className="text-[10px] text-gray-500">
                  💡 Click <strong className="text-amber-400">specs.json</strong> for full stack
                </span>
                <button
                  onClick={() => setActiveTab("specs")}
                  className="px-2 py-0.5 rounded bg-indigo-600/80 hover:bg-indigo-600 text-white text-[10px] font-medium transition cursor-pointer flex items-center gap-1"
                >
                  <span>JSON Specs</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* =================== TAB 2: SPECS.JSON CODE VIEW =================== */
            <motion.div
              key="specs-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-2.5 sm:p-3 bg-[#0d1117] flex flex-col min-h-[290px]"
            >
              {/* JSON Toolbar */}
              <div className="flex items-center justify-between pb-1.5 border-b border-gray-800 text-[10.5px]">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <FaFileCode className="text-amber-400 text-xs" />
                  <span className="font-semibold text-gray-300">manifest.json</span>
                </div>
                <button
                  onClick={handleCopyJson}
                  className="px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-[10px] transition flex items-center gap-1 cursor-pointer"
                  title="Copy JSON specs"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-emerald-400 text-[9px]" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="text-gray-400 text-[9px]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Snippet with Line Numbers */}
              <div className="mt-2 overflow-y-auto max-h-[220px] text-[10px] leading-relaxed scrollbar-thin scrollbar-thumb-gray-800">
                <pre className="text-gray-300 font-mono">
                  <code>
                    <span className="text-gray-500">01 </span>
                    <span className="text-gray-400">&#123;</span>
                    {"\n"}
                    <span className="text-gray-500">02   </span>
                    <span className="text-sky-400">"name"</span>:{" "}
                    <span className="text-emerald-300">"{name}"</span>,{"\n"}
                    <span className="text-gray-500">03   </span>
                    <span className="text-sky-400">"role"</span>:{" "}
                    <span className="text-emerald-300">"{title}"</span>,{"\n"}
                    <span className="text-gray-500">04   </span>
                    <span className="text-sky-400">"experience"</span>:{" "}
                    <span className="text-emerald-300">"3+ Years"</span>,{"\n"}
                    <span className="text-gray-500">05   </span>
                    <span className="text-sky-400">"company"</span>:{" "}
                    <span className="text-emerald-300">"Suffescom Solutions"</span>,{"\n"}
                    <span className="text-gray-500">06   </span>
                    <span className="text-sky-400">"notice"</span>:{" "}
                    <span className="text-emerald-300">"{noticePeriod}"</span>,{"\n"}
                    <span className="text-gray-500">07   </span>
                    <span className="text-sky-400">"location"</span>:{" "}
                    <span className="text-emerald-300">"{location}"</span>,{"\n"}
                    <span className="text-gray-500">08   </span>
                    <span className="text-sky-400">"coreStack"</span>: [
                    {"\n"}
                    <span className="text-gray-500">09     </span>
                    <span className="text-purple-300">"React 19"</span>,{" "}
                    <span className="text-purple-300">"Redux"</span>,{" "}
                    <span className="text-purple-300">"Node.js"</span>,{"\n"}
                    <span className="text-gray-500">10     </span>
                    <span className="text-purple-300">"Agora SDK"</span>,{" "}
                    <span className="text-purple-300">"MongoDB"</span>
                    {"\n"}
                    <span className="text-gray-500">11   </span>],{"\n"}
                    <span className="text-gray-500">12   </span>
                    <span className="text-sky-400">"certifications"</span>: [
                    {"\n"}
                    <span className="text-gray-500">13     </span>
                    <span className="text-amber-300">"Namaste React"</span>,{" "}
                    <span className="text-amber-300">"Namaste Node"</span>
                    {"\n"}
                    <span className="text-gray-500">14   </span>],{"\n"}
                    <span className="text-gray-500">15   </span>
                    <span className="text-sky-400">"available"</span>:{" "}
                    <span className="text-rose-400 font-bold">true</span>
                    {"\n"}
                    <span className="text-gray-500">16 </span>
                    <span className="text-gray-400">&#125;</span>
                  </code>
                </pre>
              </div>

              {/* Bottom Back to Photo Action */}
              <div className="mt-auto pt-2 border-t border-gray-800 flex items-center justify-between text-[10px]">
                <span className="text-gray-500">JSON Schema ✓</span>
                <button
                  onClick={() => setActiveTab("photo")}
                  className="px-2 py-0.5 rounded bg-indigo-600/80 hover:bg-indigo-600 text-white text-[10px] transition flex items-center gap-1 cursor-pointer"
                >
                  <span>← Photo</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom IDE Status Bar */}
        <div className="px-3 py-1 bg-[#161b22] border-t border-gray-800/80 flex items-center justify-between text-[9px] text-gray-500 select-none">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-gray-400">
              <FaTerminal className="text-[8px] text-indigo-400" />
              <span>UTF-8</span>
            </span>
            <span className="hidden sm:inline">React/TSX</span>
            <span className="hidden sm:inline">Prettier: ✓</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 font-medium">main*</span>
            <span>Ln 14, Col 28</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DevWindowProfile;
