import React, { useState } from "react";
import profileData from "../data/profileData";
import SkillCard from "../components/SkillCard";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const Skills = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: t("skills.categories.all", "All Skills") },
    { id: "languages", label: t("skills.categories.languages", "Languages") },
    { id: "frontend", label: t("skills.categories.frontend", "Frontend") },
    { id: "backend", label: t("skills.categories.backend", "Backend") },
    { id: "db_cloud", label: t("skills.categories.db_cloud", "DB & Clouds") },
    { id: "tools", label: t("skills.categories.tools", "Tools & APIs") },
    { id: "ai_tools", label: "🤖 AI Tools" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? profileData.skills
      : profileData.skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-24 px-4 sm:px-6 overflow-hidden
                 bg-gradient-to-br from-[#f0fdf4] via-[#f8fafc] to-[#ecfeff]
                 dark:from-[#04130f] dark:via-[#071f19] dark:to-[#041412]
                 transition-colors duration-300"
    >
      {/* Ambient Tech Mint Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto"
          >
            {t("skills.subheading", "Core competencies & technologies used in production")}
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? profileData.skills.length
                : profileData.skills.filter((s) => s.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer
                  ${
                    activeCategory === cat.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                  }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="w-full flex justify-center"
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;