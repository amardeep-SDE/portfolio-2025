import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const techIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
];

const ProjectCard = ({ project, index }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="
        group
        relative
        rounded-2xl
        overflow-hidden
        border border-gray-200 dark:border-gray-800
        bg-white/80 dark:bg-[#111]/80
        backdrop-blur-lg
        shadow-sm
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={t(project.titleKey)}
          className="
            w-full h-52 object-cover
            transition duration-500
            group-hover:scale-110
          "
        />

        {/* Gradient Overlay */}
        <div className="
          absolute inset-0
          bg-gradient-to-t
          from-black/60 via-black/10 to-transparent
          opacity-0 group-hover:opacity-100
          transition duration-300
        " />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t(project.titleKey)}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed line-clamp-3">
          {t(project.descriptionKey)}
        </p>

        {/* Tech Icons */}
        <div className="flex items-center gap-3 mt-5">
          {techIcons.map((src, i) => (
            <div
              key={i}
              className="
                w-9 h-9 flex items-center justify-center
                rounded-lg
                bg-gray-100 dark:bg-gray-800
                transition
                group-hover:scale-110
              "
            >
              <img src={src} alt="tech" className="w-5 h-5" />
            </div>
          ))}
        </div>

        {/* CTA */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center justify-center
              mt-6
              text-sm font-medium
              px-5 py-2.5
              rounded-lg
              bg-gradient-to-r
              from-indigo-600 to-purple-600
              text-white
              hover:opacity-90
              transition
            "
          >
            {t("projects.viewProject")} →
          </a>
        )}
      </div>

      {/* Glow Border Effect */}
      <div className="
        absolute inset-0 rounded-2xl
        border border-transparent
        group-hover:border-indigo-500/40
        transition
      " />
    </motion.div>
  );
};

export default ProjectCard;