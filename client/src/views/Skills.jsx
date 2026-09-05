import React, { useState } from "react";
import profileData from "../data/profileData";
import SkillCard from "../components/SkillCard";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCode, FiLayers, FiX } from "react-icons/fi";

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
    { id: "ai_tools", label: "🤖 AI Tools" },
    { id: "languages", label: "🌐 Languages" },
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
                 bg-gradient-to-br from-[#f0fdf4] via-[#f8fafc] to-[#ecfeff]
                 dark:from-[#04130f] dark:via-[#071f19] dark:to-[#041412]
                 transition-colors duration-300"
    >
      {/* Ambient Tech Mint Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 shadow-xs mb-2.5"
          >
            <span className="inline-block animate-pulse text-amber-500">⚡</span>
            <span>Level Up: Production Tech Stack</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-200/80 dark:bg-emerald-800/80 text-[10px] uppercase tracking-wide">
              Active
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

        {/* Search & Category Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quick Search Input */}
          <div className="relative w-full sm:w-72 shrink-0">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. React, Node, AWS)..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <FiX className="text-xs" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 w-full">
            {categories.map((cat) => {
              const count =
                cat.id === "all"
                  ? profileData.skills.length
                  : profileData.skills.filter((s) => s.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer
                    ${activeCategory === cat.id
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 scale-102"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                    }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Skills Grid - High density, zero clutter */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
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

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
            No matching skills found for "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;