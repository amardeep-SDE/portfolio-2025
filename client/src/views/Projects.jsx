import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import profileData from "../data/profileData";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const { t } = useTranslation();
  const { projects } = profileData;
  const [selectedCompany, setSelectedCompany] = useState("all");

  const companyFilters = [
    { id: "all", label: "All Projects" },
    { id: "Suffescom Solutions Inc", label: "Suffescom Solutions" },
    { id: "Codeverse IT Pvt. Ltd.", label: "Codeverse IT" },
    { id: "Encanto Technologies LLP", label: "Encanto Tech" },
  ];

  const filteredProjects =
    selectedCompany === "all"
      ? projects
      : projects.filter((p) => p.company === selectedCompany);

  return (
    <section
      id="projects"
      className="bg-gray-50/80 dark:bg-gray-900/90 py-20 px-4 sm:px-6 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t("projects.heading", "Featured Projects")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto"
          >
            Enterprise platforms, client web systems, and high-impact full-stack solutions
          </motion.p>
        </div>

        {/* Company Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {companyFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCompany(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer
                ${
                  selectedCompany === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid - items-stretch to enforce equal row card heights */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full flex"
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
