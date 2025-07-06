import React from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import profileData from "../data/profileData";

const Projects = () => {
  const { t } = useTranslation();
  const { projects } = profileData;

  return (
    <section id="projects" className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t("projects.heading")}
        </h2>

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
