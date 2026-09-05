import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiMapPin,
  FiArrowUp,
  FiCopy,
  FiCheck,
  FiClock,
  FiExternalLink,
  FiFileText,
} from "react-icons/fi";
import { FaInstagram, FaWhatsapp, FaCode, FaRocket, FaFilePdf } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";
import { openWhatsAppModal } from "../utils/whatsappHelper";

const Footer = () => {
  const { t } = useTranslation();
  const { email, phone, social } = profileData.contactInfo;

  const [copiedField, setCopiedField] = useState(null);
  const [localTime, setLocalTime] = useState("");

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickNav = [
    { label: "About Me", to: "about" },
    { label: "Core Skills", to: "skills" },
    { label: "Featured Projects", to: "projects" },
    { label: "Experience", to: "experience" },
    { label: "Namaste Credentials", to: "credentials" },
    { label: "Get in Touch", to: "contact" },
  ];

  const coreArsenal = [
    "React.js (v18/v19)",
    "Agora WebRTC",
    "Redux Toolkit",
    "Tailwind CSS",
    "JavaScript (ES6+)",
    "Node.js & REST",
    "TanStack Query",
    "Performance Tuning",
  ];

  const socialLinks = [
    {
      url: social.linkedin,
      icon: <FiLinkedin className="text-base" />,
      label: "LinkedIn",
      glow: "hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/50 hover:text-[#0A66C2] hover:shadow-[0_0_16px_rgba(10,102,194,0.35)]",
    },
    {
      url: social.github,
      icon: <FiGithub className="text-base" />,
      label: "GitHub",
      glow: "hover:bg-purple-500/15 hover:border-purple-500/50 hover:text-purple-400 hover:shadow-[0_0_16px_rgba(168,85,247,0.35)]",
    },
    {
      onClick: () =>
        openWhatsAppModal(
          "Hi Amardeep! I found your portfolio and wanted to connect with you."
        ),
      icon: <FaWhatsapp className="text-base" />,
      label: "WhatsApp",
      glow: "hover:bg-emerald-500/15 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-[0_0_16px_rgba(16,185,129,0.35)]",
    },
    {
      url: social.instagram,
      icon: <FaInstagram className="text-base" />,
      label: "Instagram",
      glow: "hover:bg-rose-500/15 hover:border-rose-500/50 hover:text-rose-400 hover:shadow-[0_0_16px_rgba(244,63,94,0.35)]",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-[#050814] dark:via-[#090e24] dark:to-[#04060f] pt-14 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-indigo-950/50 text-slate-700 dark:text-slate-300">
      {/* Ambient Radial Studio Lighting Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-500/15 dark:bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-pink-500/10 dark:bg-pink-600/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10 space-y-12">
        {/* 🌟 1. Pre-Footer "Let's Build Together" Glass Card */}
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-white/90 via-indigo-50/60 to-purple-50/60 dark:from-[#0d142d]/80 dark:via-[#131b3d]/70 dark:to-[#171333]/80 border border-indigo-200/70 dark:border-indigo-500/20 shadow-xl dark:shadow-2xl backdrop-blur-xl">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>Open to Opportunities • 1 Month NP</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  scalable &amp; extraordinary.
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Have a product vision, technical challenge, or hiring for a React / MERN Developer role? I&apos;m ready to contribute immediately.
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <ScrollLink
                to="contact"
                smooth
                offset={-90}
                duration={500}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <FaRocket className="text-xs" />
                <span>Send Message</span>
              </ScrollLink>

              <button
                type="button"
                onClick={() =>
                  openWhatsAppModal(
                    "Hi Amardeep! I was viewing your portfolio footer and would like to connect."
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-white dark:bg-[#151c38] text-emerald-600 dark:text-emerald-400 border border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 hover:scale-105 active:scale-95 transition-all shadow-2xs cursor-pointer"
                title="Open interactive WhatsApp chat"
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp</span>
              </button>

              <a
                href={profileData.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-white dark:bg-[#151c38] text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-cyan-300 hover:scale-105 active:scale-95 transition-all shadow-2xs"
              >
                <FaFilePdf className="text-xs text-rose-500" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* 🌟 2. Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & Engineer Bio (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <FaCode className="text-base" />
              </div>
              <div>
                <h4 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                  Amardeep Dwivedi
                </h4>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  MERN Full Stack AI Developer
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              3+ years building high-impact React web platforms, real-time Agora WebRTC architectures, enterprise RBAC systems, and high-performance user interfaces.
            </p>

            {/* Live Clock & Timezone Widget */}
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-[#0c1228]/80 border border-slate-200/80 dark:border-indigo-500/20 shadow-xs space-y-1.5 backdrop-blur-md">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                  <FiMapPin className="text-rose-500 text-xs shrink-0" />
                  <span>Chandigarh, India</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                  IST (UTC+5:30)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                <FiClock className="text-indigo-500 text-xs shrink-0" />
                <span>Local Time:</span>
                <span className="text-indigo-600 dark:text-cyan-300">{localTime || "--:--:--"}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3.5 text-left">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <span>Navigation</span>
            </h5>
            <ul className="space-y-2">
              {quickNav.map((item) => (
                <li key={item.to}>
                  <ScrollLink
                    to={item.to}
                    smooth
                    offset={-90}
                    duration={500}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <span className="text-slate-400 dark:text-slate-600 group-hover:text-indigo-500 transition-transform group-hover:translate-x-0.5">
                      ›
                    </span>
                    <span>{item.label}</span>
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Arsenal Chips (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3.5 text-left">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <span>Core Specialties</span>
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {coreArsenal.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white/80 dark:bg-[#0f1733]/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-indigo-500/20 shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-400/60 hover:text-indigo-600 dark:hover:text-cyan-300 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-0.5">
                  🏆 NamasteDev Certified
                </span>
                Namaste React &amp; Namaste Frontend System Design trained by Akshay Saini.
              </div>
            </div>
          </div>

          {/* Column 4: Interactive Contact & Social Cards (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3.5 text-left">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <span>Direct Connect</span>
            </h5>

            {/* Email Card with 1-Click Copy */}
            <div className="group relative p-2.5 rounded-2xl bg-white/80 dark:bg-[#0c1228]/80 border border-slate-200/80 dark:border-indigo-500/20 hover:border-indigo-400 dark:hover:border-indigo-400/60 transition-all shadow-xs flex items-center justify-between gap-2">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 min-w-0 flex-1"
                title="Send an email"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <FiMail className="text-sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Email</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                    {email}
                  </span>
                </div>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(email, "email")}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-300 flex items-center justify-center transition cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copiedField === "email" ? (
                  <FiCheck className="text-xs text-emerald-500" />
                ) : (
                  <FiCopy className="text-xs" />
                )}
              </button>
            </div>

            {/* Phone Card with 1-Click Copy */}
            <div className="group relative p-2.5 rounded-2xl bg-white/80 dark:bg-[#0c1228]/80 border border-slate-200/80 dark:border-indigo-500/20 hover:border-indigo-400 dark:hover:border-indigo-400/60 transition-all shadow-xs flex items-center justify-between gap-2">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2.5 min-w-0 flex-1"
                title="Call phone"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <FiPhone className="text-sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {phone}
                  </span>
                </div>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(phone, "phone")}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition cursor-pointer shrink-0"
                title="Copy phone to clipboard"
              >
                {copiedField === "phone" ? (
                  <FiCheck className="text-xs text-emerald-500" />
                ) : (
                  <FiCopy className="text-xs" />
                )}
              </button>
            </div>

            {/* Social Connect Matrix */}
            <div className="pt-1">
              <span className="text-[10.5px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
                Social Profiles
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((item, i) =>
                  item.onClick ? (
                    <button
                      key={i}
                      type="button"
                      onClick={item.onClick}
                      title={item.label}
                      className={`
                        w-9 h-9 rounded-xl flex justify-center items-center 
                        bg-white/90 dark:bg-[#0c1228]/90
                        border border-slate-200/80 dark:border-indigo-500/20
                        text-slate-700 dark:text-slate-300
                        transition-all duration-200
                        hover:-translate-y-1 hover:scale-105 shadow-2xs cursor-pointer
                        ${item.glow}
                      `}
                    >
                      {item.icon}
                    </button>
                  ) : (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      title={item.label}
                      className={`
                        w-9 h-9 rounded-xl flex justify-center items-center 
                        bg-white/90 dark:bg-[#0c1228]/90
                        border border-slate-200/80 dark:border-indigo-500/20
                        text-slate-700 dark:text-slate-300
                        transition-all duration-200
                        hover:-translate-y-1 hover:scale-105 shadow-2xs
                        ${item.glow}
                      `}
                    >
                      {item.icon}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 3. Bottom Sub-Footer Divider & Metadata */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            {/* Left Clearance for Fixed Dev Terminal (sm:pl-32 so it never collides) */}
            <div className="sm:pl-32 text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Amardeep Dwivedi
              </span>
              . All rights reserved.
            </div>

            {/* Right: Back to Top Button */}
            <div className="flex items-center gap-3 pr-2 sm:pr-20">
              <span className="text-[11px] text-slate-500 dark:text-slate-500 hidden md:inline">
                Built with React 18, Vite &amp; Tailwind CSS
              </span>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-[#0d142d] hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-indigo-500/30 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-cyan-300 shadow-2xs hover:shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Scroll to top of page"
              >
                <span>Back to top</span>
                <FiArrowUp className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;