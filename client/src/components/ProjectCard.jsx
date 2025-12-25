import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const techIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
];

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="
        w-full
        rounded-xl
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-[#121212]
        p-4
        hover:shadow-md transition
      "
    >
      {/* IMAGE (SMALL + CONTROLLED) */}
      <img
        src={project.image}
        alt={t(project.titleKey)}
        className="w-full h-32 object-cover rounded-lg mb-3"
      />

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {t(project.titleKey)}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">
        {t(project.descriptionKey)}
      </p>

      {/* TECH ICONS */}
      <div className="flex gap-2 mt-3">
        {techIcons.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="tech"
            className="w-5 h-5 opacity-80"
          />
        ))}
      </div>

      {/* CTA */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View →
        </a>
      )}
    </motion.div>
  );
};

export default ProjectCard;
