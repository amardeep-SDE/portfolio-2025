import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaBriefcase,
  FaFilePdf,
  FaWhatsapp,
  FaCheckCircle,
  FaBolt,
  FaMagic,
  FaRegCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaUserTie,
  FaEnvelope,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import {
  QUICK_PROMPTS,
  getAiResponse,
  analyzeJobDescriptionMatch,
} from "../utils/aiKnowledgeBase";
import {
  askGeminiAi,
  isGeminiConfigured,
  analyzeJobDescriptionWithGemini,
} from "../services/geminiService";
import { playLuxuryGlassChime, playCelestialChime } from "../utils/audioEffects";
import profileData from "../data/profileData";
import { openWhatsAppModal } from "../utils/whatsappHelper";

/**
 * Elegant Inline Markdown & Syntax Renderer
 * Converts **bold**, *italics*, `code`, [links](url), bullet points (- or *),
 * and headers (###) into clean, styled HTML elements with ZERO raw markdown asterisks or syntax.
 */
const renderInlineMarkdown = (text, isUser = false) => {
  if (!text) return null;

  // Regex captures:
  // 1. **bold**
  // 2. *italic*
  // 3. `inline code`
  // 4. [label](url)
  const regex = /(\*\*[\s\S]*?\*\*|\*[^*]+?\*|`[^`]+?`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold text: **content**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      const content = part.slice(2, -2);
      return (
        <strong
          key={index}
          className={
            isUser
              ? "font-extrabold text-white"
              : "font-bold text-gray-950 dark:text-white"
          }
        >
          {content}
        </strong>
      );
    }

    // Italic text: *content*
    if (
      part.startsWith("*") &&
      part.endsWith("*") &&
      part.length >= 2 &&
      !part.startsWith("**")
    ) {
      const content = part.slice(1, -1);
      return (
        <em
          key={index}
          className={
            isUser
              ? "italic text-white/90"
              : "italic text-gray-600 dark:text-gray-300"
          }
        >
          {content}
        </em>
      );
    }

    // Inline Code: `content`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      const content = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded text-[10.5px] font-mono bg-black/10 dark:bg-white/10 text-indigo-600 dark:text-cyan-300 border border-black/5 dark:border-white/5"
        >
          {content}
        </code>
      );
    }

    // Markdown Link: [label](url)
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const [, label, url] = match;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 font-semibold text-indigo-600 dark:text-cyan-400 hover:text-indigo-800 dark:hover:text-cyan-200 transition inline-flex items-center gap-1"
          >
            {label}
            <FaExternalLinkAlt className="text-[9px] opacity-70" />
          </a>
        );
      }
    }

    // Strip any stray, unpaired asterisks so none ever leak into UI
    const cleaned = part.replace(/\*\*/g, "");
    return <React.Fragment key={index}>{cleaned}</React.Fragment>;
  });
};

const FormattedMarkdown = ({ text, isUser = false }) => {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <div
      className={`space-y-1 text-xs leading-relaxed ${isUser ? "text-white" : "text-gray-800 dark:text-gray-200"
        }`}
    >
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();

        // Blank line spacer
        if (!trimmed) {
          return <div key={lineIdx} className="h-1" />;
        }

        // Heading 3: ### Heading
        if (trimmed.startsWith("### ")) {
          const headingText = trimmed.replace(/^###\s+/, "");
          return (
            <h4
              key={lineIdx}
              className={`font-bold text-[12.5px] pt-1 pb-0.5 flex items-center gap-1.5 ${isUser ? "text-white" : "text-indigo-600 dark:text-cyan-400"
                }`}
            >
              {renderInlineMarkdown(headingText, isUser)}
            </h4>
          );
        }

        // Heading 2: ## Heading
        if (trimmed.startsWith("## ")) {
          const headingText = trimmed.replace(/^##\s+/, "");
          return (
            <h3
              key={lineIdx}
              className={`font-bold text-[13.5px] pt-1.5 pb-0.5 ${isUser ? "text-white" : "text-indigo-700 dark:text-cyan-300"
                }`}
            >
              {renderInlineMarkdown(headingText, isUser)}
            </h3>
          );
        }

        // Numbered list item: 1. , 2. , etc.
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          const [, num, itemContent] = numMatch;
          return (
            <div key={lineIdx} className="flex items-start gap-2 my-1 pl-0.5">
              <span
                className={`font-bold text-[11px] shrink-0 font-mono mt-0.5 ${isUser ? "text-white/80" : "text-indigo-600 dark:text-cyan-400"
                  }`}
              >
                {num}.
              </span>
              <div className="flex-1 leading-relaxed">
                {renderInlineMarkdown(itemContent, isUser)}
              </div>
            </div>
          );
        }

        // Bullet list item: - or *
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const itemContent = trimmed.replace(/^[-*]\s+/, "");
          return (
            <div key={lineIdx} className="flex items-start gap-2 my-0.5 pl-0.5">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isUser ? "bg-white/80" : "bg-indigo-500 dark:bg-cyan-400 shadow-xs"
                  }`}
              />
              <div className="flex-1 leading-relaxed">
                {renderInlineMarkdown(itemContent, isUser)}
              </div>
            </div>
          );
        }

        // Sub-item or indented continuation (e.g. 3 spaces or tab)
        const isIndented = line.startsWith("   ") || line.startsWith("\t");
        return (
          <p
            key={lineIdx}
            className={`leading-relaxed ${isIndented ? "pl-5 text-gray-600 dark:text-gray-400 text-[11px]" : ""
              }`}
          >
            {renderInlineMarkdown(line, isUser)}
          </p>
        );
      })}
    </div>
  );
};

const SAMPLE_JDS = [
  {
    id: "react_senior",
    label: "🔥 Senior React / Redux Role",
    tag: "~95% Match",
    color: "emerald",
    text: "Looking for a React Developer with 3+ years of experience. Must have strong skills in React 19, Redux Toolkit, Tailwind CSS, JavaScript ES6+, REST APIs, and client-side performance optimization. Experience in Agile delivery and Git is required.",
  },
  {
    id: "fullstack_webrtc",
    label: "🎥 MERN + WebRTC Video Role",
    tag: "~90% Match",
    color: "cyan",
    text: "Hiring a Full Stack MERN Developer with expertise in React, Node.js, Express, and MongoDB. Must have hands-on experience in real-time technologies like WebSockets or WebRTC / Agora SDK for video streaming, secure JWT authentication, and scalable state management.",
  },
  {
    id: "java_backend",
    label: "⚠️ Java Spring Boot & Python Role",
    tag: "~15% Mismatch",
    color: "amber",
    text: "Looking for a Senior Backend Engineer with 3+ years of experience in Core Java, Spring Boot, Hibernate, Microservices architecture, JDBC, and Python/Django. Deep knowledge of relational databases (PostgreSQL) and JVM internals required.",
  },
];

const AiRecruiterChatbot = ({ isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = controlledSetIsOpen || setInternalIsOpen;

  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'matcher'
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [jdInput, setJdInput] = useState("");
  const [jdResult, setJdResult] = useState(null);
  const [isAnalyzingJd, setIsAnalyzingJd] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", handleOpen);
    return () => window.removeEventListener("open-ai-chat", handleOpen);
  }, [setIsOpen]);

  // Keyboard shortcut: Ctrl+J or Alt+A to toggle AI
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey && e.key.toLowerCase() === "j") || (e.altKey && e.key.toLowerCase() === "a")) {
        e.preventDefault();
        setIsOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setIsOpen]);

  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "ai",
      text: `### 👋 Hi! I'm Amardeep AI.
I'm an **AI Recruiter & Engineering Copilot** built with **Google Gemini AI**.

Ask me anything in **English, Hindi, or Hinglish** — about my 3+ years experience, Agora WebRTC video architecture, notice period, or tech stack!`,
      actions: ["view_resume", "whatsapp"],
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, activeTab]);

  // Handle user sending a question (typed or clicked via quick prompts)
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isTyping) return;

    playLuxuryGlassChime();

    // Append user question
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      // Calls Gemini 1.5 Flash API with fallback to local knowledge engine
      const response = await askGeminiAi(query, messages);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.text,
        actions: response.actions || [],
        source: response.source,
      };
      setMessages((prev) => [...prev, aiMsg]);
      playCelestialChime();
    } catch (err) {
      console.warn("AI copilot error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Job Description Matching with Gemini AI
  const handleAnalyzeJd = async (e) => {
    e.preventDefault();
    if (!jdInput.trim() || isAnalyzingJd) return;
    setIsAnalyzingJd(true);
    playCelestialChime();
    try {
      const result = await analyzeJobDescriptionWithGemini(jdInput);
      setJdResult(result);
      if (result.score >= 70) {
        playLuxuryGlassChime();
      }
    } catch (err) {
      console.warn("JD analysis failed:", err);
    } finally {
      setIsAnalyzingJd(false);
    }
  };

  const handleCopyReport = () => {
    if (!jdResult) return;
    const reportText = `🎯 Candidate Compatibility Report: Amardeep Dwivedi
--------------------------------------------------
Role Fit Score: ${jdResult.score}% (${jdResult.fitLevel || "Evaluated Match"})
Notice Period: 1 Month (Negotiable for urgent joiners)

✅ Verified Production Skills:
${(jdResult.matchedSkills || []).map((s) => `  • ${s}`).join("\n") || "  • React, Redux Toolkit, Node.js"}

${
  jdResult.missingSkills && jdResult.missingSkills.length > 0
    ? `⚠️ Unmatched Requirements in JD:\n${jdResult.missingSkills.map((s) => `  • ${s}`).join("\n")}\n\n`
    : ""
}Executive Summary:
${jdResult.summary}

Direct Contact:
• WhatsApp: https://wa.me/918964051727 (+91 8964051727)
• Email: amardeepdwivedi77@gmail.com
• Portfolio: https://amardeep-dwivedi.github.io/`;

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    playLuxuryGlassChime();
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <>
      {/* 🚀 AI Chatbot Modal Window (Launched from Header / Navbar) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl transition-all">
            {/* Ambient Background Glow Aura */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-0" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className={`bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] w-full transition-all duration-300 relative flex flex-col border border-indigo-500/30 dark:border-indigo-500/40 overflow-hidden font-sans z-10 ${isExpanded
                  ? "max-w-5xl h-[94vh]"
                  : "max-w-2xl md:max-w-3xl h-[720px] max-h-[90vh]"
                }`}
            >
              {/* Top Window Header */}
              <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white flex items-center justify-between border-b border-indigo-500/30 shrink-0 relative overflow-hidden">
                {/* Ambient top light beam */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 ring-2 ring-white/15">
                      <FaRobot className="text-lg animate-pulse" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950" />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5">
                        <span>Amardeep AI</span>
                        <span className="text-[10px] font-bold bg-indigo-500/30 text-cyan-300 px-1.5 py-0.5 rounded-md border border-cyan-400/30">
                          v2.5
                        </span>
                      </h3>
                      <span
                        className={`text-[9.5px] px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 font-semibold ${isGeminiConfigured()
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-xs shadow-emerald-500/20"
                            : "bg-indigo-500/20 text-indigo-300 border-indigo-400/40"
                          }`}
                      >
                        <FaBolt className={`text-[8.5px] ${isGeminiConfigured() ? "text-emerald-400 animate-pulse" : "text-indigo-300"}`} />
                        <span>{isGeminiConfigured() ? "Google Gemini • Live" : "AI Copilot • Ready"}</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-indigo-200/80 font-medium mt-0.5">
                      Engineering Copilot & Technical Recruiter Assistant
                    </p>
                  </div>
                </div>

                {/* Tab Switcher & Control Buttons */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center bg-black/40 backdrop-blur-md p-1 rounded-2xl border border-white/10 text-[11px] sm:text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab("chat")}
                      className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${activeTab === "chat"
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30 font-bold"
                          : "text-indigo-200 hover:text-white"
                        }`}
                    >
                      <span>💬 Chat</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("matcher")}
                      className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${activeTab === "matcher"
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30 font-bold"
                          : "text-indigo-200 hover:text-white"
                        }`}
                    >
                      <FaBolt className="text-amber-400 text-[10px]" />
                      <span>JD Match</span>
                    </button>
                  </div>

                  {/* Expand / Maximize Toggle */}
                  <button
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white hidden sm:flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title={isExpanded ? "Collapse view" : "Expand screen (maximize)"}
                  >
                    {isExpanded ? <FaCompress size={12} /> : <FaExpand size={12} />}
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-rose-500/30 hover:text-rose-300 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title="Close"
                  >
                    <FaTimes size={13} />
                  </button>
                </div>
              </div>

              {/* Mode 1: Chat Window */}
              {activeTab === "chat" && (
                <>
                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-[13px]">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        {msg.sender === "ai" && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-indigo-500/20">
                            <FaRobot className="text-xs" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${msg.sender === "user"
                              ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-tr-xs shadow-md shadow-indigo-500/20"
                              : "bg-slate-50 dark:bg-[#131b2e] text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/80 dark:border-indigo-500/20 shadow-sm"
                            }`}
                        >
                          <FormattedMarkdown
                            text={msg.text}
                            isUser={msg.sender === "user"}
                          />

                          {/* Action CTAs inside message */}
                          {msg.actions && msg.actions.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
                              {msg.actions.includes("view_resume") && (
                                <a
                                  href={profileData.resume}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition hover:scale-105"
                                >
                                  <FaFilePdf /> View Resume
                                </a>
                              )}
                              {msg.actions.includes("whatsapp") && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openWhatsAppModal(
                                      "Hi Amardeep, I spoke with your AI Copilot and would like to connect!"
                                    )
                                  }
                                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition hover:scale-105 cursor-pointer"
                                >
                                  <FaWhatsapp /> WhatsApp Chat
                                </button>
                              )}
                              {msg.actions.includes("email") && (
                                <a
                                  href="mailto:amardeepdwivedi77@gmail.com"
                                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 shadow-xs transition hover:scale-105"
                                >
                                  <FaEnvelope /> Email Amardeep
                                </a>
                              )}
                            </div>
                          )}

                          {/* Gemini Live AI Response Badge */}
                          {msg.source === "gemini" && (
                            <div className="flex items-center gap-1.5 mt-2.5 pt-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border-t border-slate-200/60 dark:border-slate-800/60">
                              <FaBolt className="text-[9px] text-amber-500" />
                              <span>Google Gemini AI • Verified Response</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Typing State Indicator */}
                    {isTyping && (
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50/50 dark:bg-[#131b2e]/60 border border-indigo-100 dark:border-indigo-900/40 w-fit">
                        <div className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-500 dark:text-cyan-400 flex items-center justify-center">
                          <FaRobot className="text-xs animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          Amardeep AI is thinking...
                        </span>
                      </div>
                    )}

                    {/* Compact Badge Quick Questions (Small width & height, zero scrollbar) */}
                    {messages.length === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="pt-1.5 space-y-2"
                      >
                        <div className="flex items-center gap-2 px-1">
                          <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                            <FaMagic className="text-amber-400 text-[10px]" />
                            <span>Quick Questions:</span>
                          </span>
                          <div className="h-px flex-1 bg-slate-200/60 dark:bg-slate-800/80" />
                        </div>

                        <div className="flex flex-wrap gap-1.5 px-0.5">
                          {QUICK_PROMPTS.map((qp) => (
                            <button
                              key={qp.id}
                              onClick={() => handleSendMessage(qp.prompt)}
                              disabled={isTyping}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 dark:bg-[#131b2e] hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-indigo-500/25 hover:border-indigo-400 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-cyan-300 shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                              <span>{qp.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Real-time AI Chat Floating Dock Input Bar */}
                  <div className="p-3 sm:p-4 bg-white dark:bg-[#0b101b] border-t border-slate-200 dark:border-slate-800/80 shrink-0 space-y-2">
                    {/* Follow-up Prompts Pills (Naturally wrapped, NO horizontal scrollbar) */}
                    {messages.length > 1 && (
                      <div className="flex flex-wrap items-center gap-1.5 px-0.5">
                        <span className="text-[10.5px] font-semibold text-slate-400 dark:text-slate-500 shrink-0">
                          Suggested next:
                        </span>
                        {QUICK_PROMPTS.slice(0, 4).map((qp) => (
                          <button
                            key={qp.id}
                            onClick={() => handleSendMessage(qp.prompt)}
                            disabled={isTyping}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-medium bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-cyan-300 transition-all cursor-pointer hover:scale-105 active:scale-95"
                          >
                            <span>{qp.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="relative flex items-center bg-slate-100 dark:bg-[#141c2e] rounded-2xl p-1.5 border border-slate-200 dark:border-slate-700/80 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-inner"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="Ask anything in English or Hindi (e.g. 'notice period', 'Agora WebRTC projects')..."
                        className="flex-1 px-3.5 py-2 text-xs sm:text-[13px] bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!inputVal.trim() || isTyping}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs disabled:opacity-30 hover:opacity-95 active:scale-95 transition cursor-pointer shadow-md shadow-indigo-500/25 shrink-0 flex items-center gap-1.5"
                        title="Send to Amardeep AI"
                      >
                        <span>Send</span>
                        <FaPaperPlane className="text-[10px]" />
                      </button>
                    </form>

                    <div className="flex items-center justify-between text-[10.5px] text-slate-400 dark:text-slate-500 px-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {isGeminiConfigured()
                          ? "Google Gemini AI (Live Active)"
                          : "Local Knowledge Engine Active"}
                      </span>
                      <button
                        onClick={() => setActiveTab("matcher")}
                        className="font-bold text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Switch to JD Matcher</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Mode 2: JD Match Analyzer */}
              {activeTab === "matcher" && (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-[13px]">
                  {/* Hero Banner */}
                  <div className="p-4.5 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-indigo-900/10 dark:from-indigo-950/60 dark:via-purple-950/40 dark:to-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs">
                    <div className="flex items-center gap-2.5 font-bold text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                        <FaMagic />
                      </div>
                      <span>Instant Job Description Compatibility Matcher</span>
                    </div>
                    <p className="text-[11.5px] sm:text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      Paste requirements, skills, or job descriptions below to see how well Amardeep fits your engineering role with verified production proof.
                    </p>
                  </div>

                  {/* 1-Click Sample JDs for Instant Testing */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold px-0.5">
                      <span className="flex items-center gap-1">
                        <FaBolt className="text-amber-500 text-[10px]" />
                        <span>Quick Test with 1-Click Sample JDs:</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SAMPLE_JDS.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setJdInput(s.text);
                            playLuxuryGlassChime();
                          }}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs hover:scale-105 active:scale-95 ${s.color === "emerald"
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                              : s.color === "cyan"
                                ? "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-300/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
                                : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300/60 hover:bg-amber-100 dark:hover:bg-amber-900/50"
                            }`}
                        >
                          <span>{s.label}</span>
                          <span className="text-[9.5px] opacity-80 font-mono">({s.tag})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleAnalyzeJd} className="space-y-3">
                    <textarea
                      rows={5}
                      value={jdInput}
                      onChange={(e) => setJdInput(e.target.value)}
                      placeholder="Paste your JD here (or click a sample above to test immediately)..."
                      className="w-full p-4 rounded-2xl text-xs sm:text-[13px] bg-slate-100 dark:bg-[#141c2e] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none font-sans leading-relaxed shadow-inner"
                    />
                    <button
                      type="submit"
                      disabled={!jdInput.trim() || isAnalyzingJd}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isAnalyzingJd ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Gemini AI Analyzing Match...</span>
                        </>
                      ) : (
                        <>
                          <FaBolt className="text-amber-300" />
                          <span>Analyze JD Compatibility with Gemini AI</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Match Analysis Report */}
                  {jdResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-3xl border space-y-4 shadow-xl ${jdResult.score >= 70
                          ? "bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-slate-900/30 border-emerald-500/40 shadow-emerald-500/10"
                          : jdResult.score >= 40
                            ? "bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-slate-900/30 border-amber-500/40 shadow-amber-500/10"
                            : "bg-gradient-to-br from-rose-500/15 via-red-500/5 to-slate-900/30 border-rose-500/40 shadow-rose-500/10"
                        }`}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Compatibility Evaluation
                          </span>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            Role Fit: {jdResult.fitLevel || (jdResult.score >= 70 ? "High Match" : jdResult.score >= 40 ? "Moderate Match" : "Role Mismatch")}
                          </h4>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-3xl font-black tracking-tight ${jdResult.score >= 70
                                ? "text-emerald-500"
                                : jdResult.score >= 40
                                  ? "text-amber-500"
                                  : "text-rose-500"
                              }`}
                          >
                            {jdResult.score}%
                          </span>
                          <span className="text-xs font-semibold text-slate-400">Score</span>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner p-0.5">
                        <div
                          className={`h-full rounded-full transition-all duration-700 shadow-sm ${jdResult.score >= 70
                              ? "bg-gradient-to-r from-emerald-500 to-cyan-400"
                              : jdResult.score >= 40
                                ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                                : "bg-gradient-to-r from-rose-500 to-red-500"
                            }`}
                          style={{ width: `${Math.max(jdResult.score, 8)}%` }}
                        />
                      </div>

                      {/* Executive Summary */}
                      <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#0c121e]/60 border border-white/20 dark:border-white/5 text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed shadow-2xs">
                        <FormattedMarkdown text={jdResult.summary} />
                      </div>

                      {/* Matched Skills */}
                      {jdResult.matchedSkills && jdResult.matchedSkills.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                            <FaCheckCircle className="text-xs" /> Verified Skill Alignments:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {jdResult.matchedSkills.map((s, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-300/70 shadow-2xs flex items-center gap-1"
                              >
                                <span>✓</span>
                                <span>{s}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Missing Skills */}
                      {jdResult.missingSkills && jdResult.missingSkills.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1.5">
                            <span>⚠️ Unmatched Requirements in JD:</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {jdResult.missingSkills.map((s, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg bg-rose-100/90 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-300/70 shadow-2xs flex items-center gap-1"
                              >
                                <span>✗</span>
                                <span>{s}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer CTAs */}
                      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Notice: <strong className="text-slate-800 dark:text-slate-200">1 Month</strong>
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyReport}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/70 dark:border-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-2xs hover:scale-105"
                            title="Copy structured candidate evaluation to clipboard"
                          >
                            {copiedReport ? (
                              <>
                                <FaCheck className="text-emerald-500 text-xs" />
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied to Clipboard!</span>
                              </>
                            ) : (
                              <>
                                <FaRegCopy className="text-xs" />
                                <span>Copy for Hiring Team</span>
                              </>
                            )}
                          </button>
                        </div>

                        {jdResult.score >= 50 ? (
                          <button
                            type="button"
                            onClick={() =>
                              openWhatsAppModal(
                                "Hi Amardeep, I analyzed our JD on your portfolio and would like to discuss an offer/interview!"
                              )
                            }
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-md shadow-emerald-600/30 hover:scale-105 cursor-pointer"
                          >
                            <FaWhatsapp className="text-base" /> Discuss Offer / Interview
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              openWhatsAppModal(
                                "Hi Amardeep, I checked your portfolio and want to connect for a MERN/React role!"
                              )
                            }
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-md shadow-indigo-600/30 hover:scale-105 cursor-pointer"
                          >
                            <FaWhatsapp className="text-base" /> Explore React Roles
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiRecruiterChatbot;
