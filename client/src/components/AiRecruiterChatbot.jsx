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
} from "react-icons/fa";
import {
  QUICK_PROMPTS,
  getAiResponse,
  analyzeJobDescriptionMatch,
} from "../utils/aiKnowledgeBase";
import { playLuxuryGlassChime, playCelestialChime } from "../utils/audioEffects";
import profileData from "../data/profileData";

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
      className={`space-y-1 text-xs leading-relaxed ${
        isUser ? "text-white" : "text-gray-800 dark:text-gray-200"
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
              className={`font-bold text-[12.5px] pt-1 pb-0.5 flex items-center gap-1.5 ${
                isUser ? "text-white" : "text-indigo-600 dark:text-cyan-400"
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
              className={`font-bold text-[13.5px] pt-1.5 pb-0.5 ${
                isUser ? "text-white" : "text-indigo-700 dark:text-cyan-300"
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
                className={`font-bold text-[11px] shrink-0 font-mono mt-0.5 ${
                  isUser ? "text-white/80" : "text-indigo-600 dark:text-cyan-400"
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
                className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                  isUser ? "bg-white/80" : "bg-indigo-500 dark:bg-cyan-400 shadow-xs"
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
            className={`leading-relaxed ${
              isIndented ? "pl-5 text-gray-600 dark:text-gray-400 text-[11px]" : ""
            }`}
          >
            {renderInlineMarkdown(line, isUser)}
          </p>
        );
      })}
    </div>
  );
};

const AiRecruiterChatbot = ({ isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = controlledSetIsOpen || setInternalIsOpen;

  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'matcher'
  const [isTyping, setIsTyping] = useState(false);
  const [jdInput, setJdInput] = useState("");
  const [jdResult, setJdResult] = useState(null);

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
I'm an **AI Recruiter Copilot** trained on Amardeep's verified resume, production projects at **Suffescom Solutions**, and **NamasteDev credentials**.

Tap any recruiter question below or switch to **JD Match** to analyze your Job Description!`,
      actions: ["view_resume", "whatsapp"],
    },
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Handle user selecting a prompt question
  const handleSendMessage = (textToSend) => {
    if (!textToSend || isTyping) return;
    const query = textToSend.trim();
    if (!query) return;

    playLuxuryGlassChime();

    // Append user question
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Realistic AI thinking delay
    setTimeout(() => {
      const response = getAiResponse(query);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.text,
        actions: response.actions || [],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  // Handle Job Description Matching
  const handleAnalyzeJd = (e) => {
    e.preventDefault();
    if (!jdInput.trim()) return;
    playCelestialChime();
    const result = analyzeJobDescriptionMatch(jdInput);
    setJdResult(result);
  };

  return (
    <>
      {/* 🚀 AI Chatbot Modal Window (Launched from Header / Navbar) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="bg-white dark:bg-[#0c121e] rounded-3xl shadow-2xl w-full max-w-lg h-[620px] max-h-[86vh] relative flex flex-col border border-indigo-500/30 dark:border-indigo-500/40 overflow-hidden font-sans"
            >
              {/* Top Window Header */}
              <div className="px-4 py-3.5 bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-indigo-950/90 text-white flex items-center justify-between border-b border-indigo-500/20 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-white shadow-md">
                      <FaRobot className="text-base animate-pulse" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-indigo-950 rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold flex items-center gap-1.5 leading-tight">
                      <span>Amardeep AI</span>
                      <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-400/30">
                        v2.5
                      </span>
                    </h3>
                    <p className="text-[10.5px] text-indigo-200 font-medium">
                      AI Recruiter & Engineering Copilot
                    </p>
                  </div>
                </div>

                {/* Tab Switcher & Close */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-black/40 p-0.5 rounded-xl border border-white/10 text-[11px] font-semibold">
                    <button
                      onClick={() => setActiveTab("chat")}
                      className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                        activeTab === "chat"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-indigo-200 hover:text-white"
                      }`}
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => setActiveTab("matcher")}
                      className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                        activeTab === "matcher"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-indigo-200 hover:text-white"
                      }`}
                    >
                      <FaBolt className="text-amber-400 text-[9px]" />
                      <span>JD Match</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
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
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {msg.sender === "ai" && (
                          <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-500 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                            <FaRobot className="text-xs" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-sm ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none"
                              : "bg-gray-100 dark:bg-[#151d2f] text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200/60 dark:border-gray-800/80"
                          }`}
                        >
                          <FormattedMarkdown
                            text={msg.text}
                            isUser={msg.sender === "user"}
                          />

                          {/* Action CTAs inside message */}
                          {msg.actions && msg.actions.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-gray-200/50 dark:border-gray-800/60">
                              {msg.actions.includes("view_resume") && (
                                <a
                                  href={profileData.resume}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10.5px] flex items-center gap-1 transition"
                                >
                                  <FaFilePdf /> View Resume
                                </a>
                              )}
                              {msg.actions.includes("whatsapp") && (
                                <a
                                  href="https://wa.me/918964051727?text=Hi%20Amardeep,%20I%20spoke%20with%20your%20AI%20Copilot%20and%20would%20like%20to%20connect!"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10.5px] flex items-center gap-1 transition"
                                >
                                  <FaWhatsapp /> WhatsApp Chat
                                </a>
                              )}
                              {msg.actions.includes("email") && (
                                <a
                                  href="mailto:amardeepdwivedi77@gmail.com"
                                  className="px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-[10.5px] flex items-center gap-1 transition"
                                >
                                  <FaEnvelope /> Email Amardeep
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Typing State Indicator */}
                    {isTyping && (
                      <div className="flex items-center gap-2 text-gray-500 text-xs pl-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.4s]" />
                        <span className="text-[11px] text-gray-400">
                          Amardeep AI is thinking...
                        </span>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Recruiter Quick Questions Selection Panel */}
                  <div className="p-3 bg-gray-50/95 dark:bg-[#101726]/95 border-t border-gray-200 dark:border-gray-800 shrink-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                        <FaMagic className="text-amber-500 text-xs" />
                        <span>Tap a Question to Ask Copilot:</span>
                      </span>
                      <button
                        onClick={() => setActiveTab("matcher")}
                        className="text-[10.5px] font-bold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FaBolt className="text-[9px]" /> Try JD Matcher
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 max-h-[145px] overflow-y-auto pr-0.5">
                      {QUICK_PROMPTS.map((qp) => (
                        <button
                          key={qp.id}
                          onClick={() => handleSendMessage(qp.prompt)}
                          disabled={isTyping}
                          className="text-left px-2.5 py-2 rounded-xl text-[11px] font-medium bg-white dark:bg-[#151f33] text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-500 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-cyan-300 transition-all cursor-pointer shadow-2xs active:scale-[0.98] disabled:opacity-50 flex items-center justify-between group"
                        >
                          <span className="truncate">{qp.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Mode 2: JD Match Analyzer */}
              {activeTab === "matcher" && (
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60">
                    <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300 text-xs">
                      <FaMagic className="text-amber-500" />
                      <span>Instant Job Description Compatibility Matcher</span>
                    </div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">
                      Paste requirements, skills, or job descriptions below to see how well Amardeep fits your team.
                    </p>
                  </div>

                  <form onSubmit={handleAnalyzeJd} className="space-y-3">
                    <textarea
                      rows={4}
                      value={jdInput}
                      onChange={(e) => setJdInput(e.target.value)}
                      placeholder="Paste your JD here (e.g. 'Looking for a React developer with 3 years experience in Node.js, Redux, WebSockets, REST APIs, and MongoDB...')"
                      className="w-full p-3 rounded-2xl text-xs bg-gray-100 dark:bg-[#161f33] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none font-sans"
                    />
                    <button
                      type="submit"
                      disabled={!jdInput.trim()}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs hover:opacity-95 shadow-md transition cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5"
                    >
                      <FaBolt />
                      <span>Analyze JD Compatibility Score</span>
                    </button>
                  </form>

                  {/* Match Analysis Report */}
                  {jdResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                          Role Compatibility
                        </span>
                        <span className="text-lg font-black bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                          {jdResult.score}% Match 🚀
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${jdResult.score}%` }}
                        />
                      </div>

                      <div className="text-[11.5px] text-gray-700 dark:text-gray-300 leading-relaxed">
                        <FormattedMarkdown text={jdResult.summary} />
                      </div>

                      <div>
                        <div className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                          Direct Skill Alignments:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {jdResult.matchedSkills.map((s, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10.5px] font-semibold border border-emerald-300/60"
                            >
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10.5px] text-gray-500 dark:text-gray-400 font-medium">
                          Notice: <strong>1 Month</strong>
                        </span>
                        <a
                          href="https://wa.me/918964051727?text=Hi%20Amardeep,%20I%20analyzed%20our%20JD%20on%20your%20portfolio%20and%20you%20are%20a%20great%20match!"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition shadow-sm"
                        >
                          <FaWhatsapp /> Discuss Offer / Interview
                        </a>
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
