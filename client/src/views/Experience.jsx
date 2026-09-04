import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiLayers,
  FiTrendingUp,
  FiAward,
  FiCode,
} from "react-icons/fi";

const companyThemes = [
  {
    initials: "SS",
    gradient: "from-indigo-600 via-purple-600 to-pink-500",
    glowColor: "rgba(99, 102, 241, 0.15)",
    tagBg: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50",
    nodeBorder: "border-indigo-400 dark:border-indigo-500/50",
    nodeGlow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
    nodeIcon: <FiBriefcase className="text-indigo-600 dark:text-indigo-400 text-sm" />,
    metrics: [
      { label: "Architecture", value: "MERN Stack & Cloud" },
      { label: "Key Modules", value: "Admin, B2B & B2C" },
      { label: "Systems", value: "3 Scalable Platforms" },
    ],
  },
  {
    initials: "CV",
    gradient: "from-cyan-500 via-blue-600 to-indigo-600",
    glowColor: "rgba(6, 182, 212, 0.15)",
    tagBg: "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/50",
    nodeBorder: "border-cyan-400 dark:border-cyan-500/50",
    nodeGlow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    nodeIcon: <FiCode className="text-cyan-600 dark:text-cyan-400 text-sm" />,
    metrics: [
      { label: "Domain", value: "React Gaming Platform" },
      { label: "Focus", value: "UI/UX & Interactions" },
      { label: "Process", value: "Agile & Fast Sprints" },
    ],
  },
  {
    initials: "ET",
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
    glowColor: "rgba(16, 185, 129, 0.15)",
    tagBg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    nodeBorder: "border-emerald-400 dark:border-emerald-500/50",
    nodeGlow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    nodeIcon: <FiLayers className="text-emerald-600 dark:text-emerald-400 text-sm" />,
    metrics: [
      { label: "Efficiency Boost", value: "~30% Faster Admin" },
      { label: "Performance", value: "~20% Query Caching" },
      { label: "App Optimization", value: "~25-30% Speed Gain" },
    ],
  },
];

const Experience = () => {
  const { t } = useTranslation();
  const [isCelebrating, setIsCelebrating] = useState(false);
  const sectionRef = useRef(null);
  const lastTriggerTime = useRef(0);

  const triggerMilestoneCelebration = () => {
    setIsCelebrating(true);
    setTimeout(() => setIsCelebrating(false), 2500);
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const now = Date.now();
            if (now - lastTriggerTime.current > 5000) {
              lastTriggerTime.current = now;
              triggerMilestoneCelebration();
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 overflow-hidden
                 bg-gradient-to-b from-[#fffdf7] via-[#fef8ee] to-[#fff5e6]
                 dark:from-[#130f0a] dark:via-[#1c150c] dark:to-[#0f0b07]
                 text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* Ambient Warm Golden / Bronze Glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 shadow-xs mb-3 backdrop-blur-md"
          >
            <span className="text-sm animate-bounce">🏆</span>
            <span>3+ Years Career Milestones • Unlocked</span>
            <button
              onClick={triggerMilestoneCelebration}
              type="button"
              className="ml-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 active:scale-95 transition-transform cursor-pointer shadow-xs"
            >
              Celebrate 🌟
            </button>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
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
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto"
          >
            {t("experience.subheading", "Professional journey & project highlights")}
          </motion.p>
        </div>

        {/* Experience Timeline */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-5 before:w-[2px] before:rounded-full before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-500 before:to-emerald-500 before:opacity-50 before:hidden md:before:block">
          {/* Animated Golden Career Laser Pulse */}
          <motion.div
            initial={{ top: "0%", opacity: 0 }}
            animate={
              isCelebrating
                ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] }
                : { top: "0%", opacity: 0 }
            }
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="hidden md:block absolute left-5 -translate-x-1/2 w-1.5 h-24 bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_14px_#f59e0b] rounded-full pointer-events-none z-20"
          />

          {profileData.experience.map((item, index) => {
            const theme = companyThemes[index] || companyThemes[0];
            const bullets = t(`${item.bulletsKey}`, {
              returnObjects: true,
              defaultValue: [],
            });

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative md:pl-16 group"
              >
                {/* Modern Milestone Squircle Badge (Desktop) */}
                <div
                  className={`hidden md:flex absolute left-5 top-7 -translate-x-1/2 w-10 h-10 rounded-xl bg-white/95 dark:bg-gray-900/95 border-2 ${theme.nodeBorder} ${theme.nodeGlow} items-center justify-center shadow-md group-hover:scale-115 transition-all duration-300 z-10 backdrop-blur-md`}
                >
                  {/* Golden Achievement Shockwave when celebrating */}
                  {isCelebrating && (
                    <span className="absolute -inset-2.5 rounded-2xl border-2 border-amber-400/80 animate-ping opacity-60 pointer-events-none" />
                  )}
                  {theme.nodeIcon}
                  {index === 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-gray-900" />
                    </span>
                  )}
                </div>

                {/* Experience Card */}
                <div
                  className="relative rounded-2xl p-4 sm:p-4 bg-white/95 dark:bg-gray-900/95 border border-gray-200/90 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-xl overflow-hidden group-hover:-translate-y-0.5"
                  style={{
                    boxShadow: `0 8px 24px -8px ${theme.glowColor}`,
                  }}
                >
                  {/* Card Top Accent Gradient */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient}`}
                  />

                  {/* Top Bar: Company Monogram, Role, Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-start gap-3">
                      {/* Monogram Badge */}
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${theme.gradient} text-white font-black text-base flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-300`}
                      >
                        {theme.initials}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                            {t(item.roleKey)}
                          </h3>
                          {index === 0 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                              Current
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                          {t(item.companyKey)}
                        </p>
                      </div>
                    </div>

                    {/* Duration & Location Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 font-medium border border-gray-200/60 dark:border-gray-700/60">
                        <FiCalendar className="text-indigo-500 text-xs" />
                        {item.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 font-medium border border-gray-200/60 dark:border-gray-700/60">
                        <FiMapPin className="text-red-500 text-xs" />
                        {t(item.locationKey)}
                      </span>
                    </div>
                  </div>

                  {/* Removed Impact Metrics for conciseness */}

                  {/* Associated Projects Tags */}
                  {item.projectsAssociated && item.projectsAssociated.length > 0 && (
                    <div className="mb-3 mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <FiLayers className="text-indigo-500" /> Featured Work:
                      </span>
                      {item.projectsAssociated.map((proj, pIdx) => (
                        <span
                          key={pIdx}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium border ${theme.tagBg}`}
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Detailed Resume Bullets */}
                  <div className="space-y-1.5">
                    {Array.isArray(bullets) && bullets.length > 0 ? (
                      bullets.map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-2 text-[11px] sm:text-[11.5px] text-gray-700 dark:text-gray-300 leading-relaxed"
                        >
                          <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-800/60">
                            <FiCheckCircle className="text-[9px]" />
                          </div>
                          <span>{bullet}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[11px] sm:text-[11.5px] text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t(item.descriptionKey)}
                      </p>
                    )}
                  </div>

                  {/* Skills / Tech Stack Used */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-1.5">
                          Technologies:
                        </span>
                        {item.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] px-2 py-0.5 rounded font-medium bg-gray-100/90 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
