import React, { useState } from "react";
import profileData from "../data/profileData";
import SkillCard from "../components/SkillCard";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCode, FiLayers, FiX, FiCheckCircle, FiCpu, FiTrendingUp } from "react-icons/fi";

const Skills = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: t("skills.categories.all", "All Skills") },
    { id: "frontend", label: "💻 Frontend" },
    { id: "backend", label: "⚙️ Backend" },
    { id: "db_cloud", label: "🗄️ DB & Cloud" },
    { id: "tools", label: "🛠️ Tools & APIs" },
    { id: "ai_tools", label: "🤖 AI Integration" },
    { id: "languages", label: "🌐 Languages" },
  ];

  const skillHighlights = [
    { label: "Technologies", value: "36", detail: "100% Production Tested", icon: <FiCode className="text-indigo-500" /> },
    { label: "Core Experience", value: "3+ YOE", detail: "Enterprise Full Stack", icon: <FiTrendingUp className="text-emerald-500" /> },
    { label: "AI Integrations", value: "2 Apps", detail: "Gemini & OpenAI APIs", icon: <FiCpu className="text-purple-500" /> },
    { label: "Shipped Platforms", value: "6 Websites", detail: "Suffescom & Encanto", icon: <FiCheckCircle className="text-cyan-500" /> },
  ];

  // Filter skills by category AND search query
  const filteredSkills = profileData.skills.filter((skill) => {
    const matchesCategory =
      activeCategory === "all" || skill.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="skills"
      className="relative py-20 px-4 sm:px-6 overflow-hidden
                 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#faf5ff]
                 dark:from-[#090d16] dark:via-[#0c1222] dark:to-[#0d091e]
                 transition-colors duration-300"
    >
      {/* Ambient Tech Studio Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Heading */}
        <div className="text-center mb-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 shadow-xs mb-2.5 backdrop-blur-md"
          >
            <span className="inline-block animate-pulse text-amber-500">⚡</span>
            <span>Level Up: Production Tech Stack</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase tracking-wide font-extrabold border border-emerald-500/30">
              Active Production
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
              {t("skills.heading", "Technical Skills")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto"
          >
            {t("skills.subheading", "Core competencies & technologies used in production")}
          </motion.p>
        </div>

        {/* 🌟 Top Stack KPI Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
          {skillHighlights.map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 backdrop-blur-md shadow-2xs flex items-center justify-between gap-3 group hover:border-indigo-400/50 transition-all duration-300"
            >
              <div>
                <span className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 block">
                  {kpi.label}
                </span>
                <span className="text-base sm:text-lg font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {kpi.value}
                </span>
                <span className="text-[9.5px] text-gray-400 dark:text-gray-500 block">
                  {kpi.detail}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {kpi.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 36 skills (e.g. React, Node, AI)..."
              className="w-full pl-8 pr-7 py-2 rounded-xl text-xs bg-white/90 dark:bg-gray-800/90 border border-gray-200/90 dark:border-gray-700/90 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                title="Clear search"
              >
                <FiX className="text-xs" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1 sm:gap-1.5">
            {categories.map((cat) => {
              const count =
                cat.id === "all"
                  ? profileData.skills.length
                  : profileData.skills.filter((s) => s.category === cat.id).length;

              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer
                    ${isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs shadow-indigo-500/30"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/90 border border-gray-200/80 dark:border-gray-700/80"
                    }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${isActive
                      ? "bg-white/20 text-white font-bold"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Filter Indicator */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 px-1 mb-3">
          <span>
            Showing <strong className="text-indigo-600 dark:text-indigo-400">{filteredSkills.length}</strong> of {profileData.skills.length} skills
          </span>
          {(searchQuery || activeCategory !== "all") && (
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Compact Skills Grid - High density, zero clutter, 100% vector icons */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12 px-4 rounded-2xl bg-white/50 dark:bg-gray-800/40 border border-dashed border-gray-200 dark:border-gray-700 mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No matching skills found for <span className="font-semibold text-gray-900 dark:text-white">"{searchQuery}"</span>.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;