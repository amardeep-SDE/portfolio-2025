import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileData from "../data/profileData";
import {
  FiTerminal,
  FiX,
  FiMinus,
  FiMaximize2,
  FiMinimize2,
  FiCornerDownLeft,
  FiZap,
} from "react-icons/fi";

const WELCOME_BANNER = `================================================================
   AMARDEEP DWIVEDI // Full Stack & React Developer
   Interactive Portfolio Terminal [v2.0]
   Status: Available for Hire (Notice Period: 1 Month)
================================================================`;

const QUICK_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "certifications",
  "hire",
  "contact",
  "clear",
];

const DevTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState([
    { type: "banner", content: WELCOME_BANNER },
    {
      type: "system",
      content:
        "💡 Tip: Try typing 'skills', 'projects', 'hire' or 'contact'. Use ↑/↓ for command history.",
    },
  ]);

  const inputRef = useRef(null);
  const logsEndRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Scroll to bottom on new logs
  useEffect(() => {
    if (isOpen) {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isOpen]);

  // Global keyboard shortcut: Ctrl+K or ` to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key.toLowerCase() === "k") || e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (cmdStr) => {
    const raw = (cmdStr !== undefined && cmdStr !== null ? String(cmdStr) : "").trim();
    // If empty command submitted (e.g. user clicks Run directly without typing), default to 'help'
    const trimmed = raw || "help";

    // Add to history only if explicitly typed
    if (raw) {
      setCommandHistory((prev) => [...prev, raw]);
    }
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmed.toLowerCase().split(" ");

    // New log entry for the command entered
    const newLogs = [
      ...logs,
      { type: "command", content: `visitor@amardeep:~$ ${trimmed}` },
    ];

    switch (cmd) {
      case "help":
        newLogs.push({
          type: "output",
          content: [
            "AVAILABLE COMMANDS:",
            "  about          - View Amardeep's bio & background",
            "  skills         - List full production tech stack",
            "  projects       - View 7+ featured web platforms",
            "  experience     - Explore 3+ years company roadmap",
            "  certifications - View verified NamasteDev credentials",
            "  hire           - Availability, Notice Period & Roles",
            "  contact        - Direct phone, email & location",
            "  theme          - Toggle website light / dark theme",
            "  party          - Throw a mini celebratory party 🎈",
            "  clear          - Clear terminal history",
            "  exit           - Close this terminal window",
          ].join("\n"),
        });
        break;

      case "about":
      case "bio":
        newLogs.push({
          type: "output",
          content: [
            `NAME:       ${profileData.name}`,
            `ROLE:       ${profileData.title}`,
            `EXPERIENCE: ${profileData.experienceYears}`,
            `LOCATION:   ${profileData.location}`,
            `NOTICE:     ${profileData.noticePeriod}`,
            "",
            "SUMMARY:",
            "Full Stack & Frontend specialist with 3+ years building high-impact enterprise",
            "web platforms, real-time Agora video calling, RBAC admin systems, and high-FPS React UIs.",
          ].join("\n"),
        });
        break;

      case "skills":
      case "tech":
        const frontend = profileData.skills
          .filter((s) => s.category === "frontend")
          .map((s) => s.name)
          .join(", ");
        const backend = profileData.skills
          .filter((s) => s.category === "backend")
          .map((s) => s.name)
          .join(", ");
        const dbCloud = profileData.skills
          .filter((s) => s.category === "db_cloud")
          .map((s) => s.name)
          .join(", ");
        const tools = profileData.skills
          .filter((s) => s.category === "tools" || s.category === "ai_tools")
          .map((s) => s.name)
          .join(", ");

        newLogs.push({
          type: "output",
          content: [
            "🛠️ PRODUCTION TECH STACK:",
            `• FRONTEND:  ${frontend}`,
            `• BACKEND:   ${backend}`,
            `• DB/CLOUD:  ${dbCloud}`,
            `• TOOLING:   ${tools}`,
          ].join("\n"),
        });
        break;

      case "projects":
        const projList = profileData.projects
          .map(
            (p, idx) =>
              `[${idx + 1}] ${p.company}: ${p.tags.join(" | ")}`
          )
          .join("\n");
        newLogs.push({
          type: "output",
          content: `🚀 FEATURED WEB PLATFORMS (7 Systems):\n${projList}\n\nType 'hire' to discuss these projects or 'contact' to connect.`,
        });
        break;

      case "experience":
        newLogs.push({
          type: "output",
          content: [
            "💼 WORK EXPERIENCE ROADMAP (3+ Years):",
            "1. Suffescom Solutions Inc  | React Developer (Current)",
            "   • Built Notary Platform (Agora SDK), PayTrack-360 & Gov Survey Platform",
            "2. Codeverse IT Pvt. Ltd.   | React Developer",
            "   • React Gaming Management Platform, Redux Toolkit & UI Optimization",
            "3. Encanto Technologies LLP | React Developer",
            "   • Dawa Bazar B2B E-Commerce & Pharmacy Administration Portal",
          ].join("\n"),
        });
        break;

      case "certifications":
        newLogs.push({
          type: "output",
          content: [
            "🎓 VERIFIED CREDENTIALS (NamasteDev.com):",
            "1. Namaste React                    • Akshay Saini [VERIFIED]",
            "2. Namaste Node.js                  • Akshay Saini [VERIFIED]",
            "3. Namaste Frontend System Design   • Akshay Saini [VERIFIED]",
            "4. Namaste DSA                      • Akshay Saini [VERIFIED]",
          ].join("\n"),
        });
        break;

      case "hire":
        newLogs.push({
          type: "output",
          content: [
            "🤝 RECRUITMENT & HIRING DETAILS:",
            `• Notice Period:    ${profileData.noticePeriod} (Available Immediately)`,
            "• Preferred Roles:  React Developer / Full Stack MERN Developer / Frontend Engineer",
            "• Work Mode:        Remote / Hybrid / On-site",
            "• Contact Direct:   amardeepdwivedi77@gmail.com | +91 8964051727",
          ].join("\n"),
        });
        break;

      case "contact":
        newLogs.push({
          type: "output",
          content: [
            "📬 GET IN TOUCH WITH AMARDEEP:",
            "• Email:      amardeepdwivedi77@gmail.com",
            "• Phone:      +91 8964051727",
            "• Location:   Chandigarh, India",
            "• WhatsApp:   Click green button in bottom-right corner",
          ].join("\n"),
        });
        break;

      case "theme":
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
          newLogs.push({ type: "success", content: "☀️ Switched to Light Theme" });
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
          newLogs.push({ type: "success", content: "🌙 Switched to Dark Theme" });
        }
        break;

      case "party":
      case "celebrate":
        newLogs.push({
          type: "success",
          content: "🎉 Woohoo! Celebrating Amardeep's engineering achievements! ✨🎈",
        });
        break;

      case "sudo":
        newLogs.push({
          type: "error",
          content:
            "sudo: Permission denied. You are a guest visitor, not in the sudoers file. 😄",
        });
        break;

      case "clear":
      case "cls":
        setLogs([]);
        setInputVal("");
        setTimeout(() => inputRef.current?.focus(), 50);
        return;

      case "exit":
      case "quit":
        setIsOpen(false);
        return;

      default:
        newLogs.push({
          type: "error",
          content: `command not found: '${trimmed}'. Type 'help' to see all valid commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  return (
    <>
      {/* 🚀 Floating Bottom-Left Terminal Launcher Pill */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gray-900/90 hover:bg-gray-950 text-white border border-gray-700/80 hover:border-indigo-500 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <FiTerminal className="text-base text-indigo-400 group-hover:text-indigo-300" />
          <span className="text-xs font-mono font-bold tracking-wide">
            Dev Terminal
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
            Ctrl+K
          </span>
        </motion.button>
      </div>

      {/* 💻 Terminal Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className={`w-full bg-[#0d1117] text-gray-200 rounded-2xl shadow-2xl border border-gray-700/80 flex flex-col overflow-hidden font-mono transition-all duration-300
                ${isMaximized
                  ? "max-w-[95vw] h-[90vh]"
                  : "max-w-2xl h-[520px] max-h-[85vh]"
                }`}
            >
              {/* macOS Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-gray-800 select-none shrink-0">
                {/* Traffic Light Dots */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close"
                    className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition cursor-pointer flex items-center justify-center group"
                  >
                    <FiX className="text-[8px] text-black opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Minimize"
                    className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition cursor-pointer flex items-center justify-center group"
                  >
                    <FiMinus className="text-[8px] text-black opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={() => setIsMaximized((prev) => !prev)}
                    title="Maximize"
                    className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition cursor-pointer flex items-center justify-center group"
                  >
                    {isMaximized ? (
                      <FiMinimize2 className="text-[8px] text-black opacity-0 group-hover:opacity-100" />
                    ) : (
                      <FiMaximize2 className="text-[8px] text-black opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                </div>

                {/* Window Title */}
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <FiTerminal className="text-indigo-400 text-sm" />
                  <span>amardeep@portfolio: ~ (zsh)</span>
                </div>

                {/* Shortcut hint */}
                <span className="text-[10px] text-gray-500 hidden sm:inline">
                  ESC / Ctrl+K to close
                </span>
              </div>

              {/* Quick Command Pills for 1-Click Execution */}
              <div className="px-4 py-2 bg-[#0d1117] border-b border-gray-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
                <span className="text-[11px] text-gray-500 font-semibold shrink-0">
                  Quick:
                </span>
                {QUICK_COMMANDS.map((qCmd) => (
                  <button
                    key={qCmd}
                    onClick={() => handleCommand(qCmd)}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-gray-800/90 hover:bg-indigo-900/60 hover:text-indigo-300 text-gray-300 border border-gray-700 hover:border-indigo-500/50 transition-colors shrink-0 cursor-pointer"
                  >
                    {qCmd}
                  </button>
                ))}
              </div>

              {/* Terminal Logs & Output Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs leading-relaxed scrollbar-thin scrollbar-thumb-gray-800">
                {logs.map((log, index) => {
                  if (log.type === "banner") {
                    return (
                      <div
                        key={index}
                        className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11.5px] text-indigo-200 font-mono select-none space-y-1"
                      >
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>AMARDEEP DWIVEDI // Full Stack &amp; React Developer</span>
                        </div>
                        <div className="text-gray-300 text-[11px]">
                          Interactive Portfolio Terminal [v2.0] • Notice Period: 1 Month (Immediate)
                        </div>
                        <div className="text-indigo-300/80 text-[10.5px] pt-0.5">
                          💡 Type any command below or click the quick pills above, then hit <span className="text-indigo-200 font-semibold underline">Run ↵</span>.
                        </div>
                      </div>
                    );
                  }
                  if (log.type === "command") {
                    return (
                      <div
                        key={index}
                        className="text-emerald-400 font-bold pt-1.5"
                      >
                        {log.content}
                      </div>
                    );
                  }
                  if (log.type === "system") {
                    return (
                      <div key={index} className="text-amber-300/90 italic">
                        {log.content}
                      </div>
                    );
                  }
                  if (log.type === "success") {
                    return (
                      <div key={index} className="text-emerald-300 font-semibold">
                        {log.content}
                      </div>
                    );
                  }
                  if (log.type === "error") {
                    return (
                      <div key={index} className="text-rose-400">
                        {log.content}
                      </div>
                    );
                  }
                  return (
                    <pre
                      key={index}
                      className="text-gray-300 whitespace-pre-wrap font-mono text-[11.5px]"
                    >
                      {log.content}
                    </pre>
                  );
                })}
                <div ref={logsEndRef} />
              </div>

              {/* Command Input Prompt Footer Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(inputVal);
                }}
                className="p-3 bg-[#161b22] border-t border-gray-800 flex items-center gap-2 shrink-0"
              >
                <span className="text-emerald-400 font-bold text-xs select-none shrink-0">
                  visitor@amardeep:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command (e.g. help, skills, hire, party)..."
                  className="flex-1 bg-transparent text-gray-100 text-xs font-mono focus:outline-none placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/30 transition-all select-none"
                  title="Run command (or runs help if empty)"
                >
                  <span>Run</span>
                  <FiCornerDownLeft className="text-xs" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DevTerminal;
