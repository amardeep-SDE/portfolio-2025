import React from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import profileData from "../data/profileData";
import { motion } from "framer-motion";

const Projects = () => {
  const { t } = useTranslation();
  const { projects } = profileData;

  return (
    <section id="projects" className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6 }}
                 viewport={{ once: true }}
                 className="text-3xl sm:text-4xl font-extrabold text-center mb-16 tracking-tight"
               >
                 <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                   {t("projects.heading")}
                 </span>
               </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
