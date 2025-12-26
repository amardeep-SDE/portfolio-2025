import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import profileData from "../data/profileData";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const { t } = useTranslation();
  const { projects } = profileData;

  return (
    <section
      id="projects"
      className="bg-gray-100 dark:bg-gray-900 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-14"
        >
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            {t("projects.heading")}
          </span>
        </motion.h2>

        {/* 🔥 GRID (2 PROJECTS PER ROW) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
