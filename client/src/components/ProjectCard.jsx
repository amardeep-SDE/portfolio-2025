import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiExternalLink, FiBriefcase, FiCheckCircle } from "react-icons/fi";

const ProjectCard = ({ project, index }) => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  // Reliable fallback image if external image fails
  const fallbackImage =
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col h-full w-full rounded-2xl overflow-hidden
                 border border-gray-200/90 dark:border-gray-800
                 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
                 shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Thumbnail Image Header */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
        <img
          src={imgError ? fallbackImage : project.image}
          alt={t(project.titleKey)}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Top Company Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white backdrop-blur-md flex items-center gap-1.5 shadow-md border border-white/20">
          <FiBriefcase className="text-indigo-500 text-xs" />
          <span>{project.company}</span>
        </div>

        {/* Bottom Title on Image */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide drop-shadow-md">
            {t(project.titleKey)}
          </h3>
          {project.subtitle && (
            <p className="text-xs text-indigo-300 font-medium tracking-wide">
              {project.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Card Body - Flex layout with mt-auto on bottom to guarantee same card height and aligned bottom */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Description - Full text without truncation */}
          <p className="text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {t(project.descriptionKey)}
          </p>

          {/* Tech Tags */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap gap-1.5 content-start">
              {project.tags &&
                project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium 
                               bg-indigo-50/80 dark:bg-indigo-950/40 
                               text-indigo-700 dark:text-indigo-300 
                               border border-indigo-100 dark:border-indigo-900/40"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Footer Area - Perfectly aligned at the bottom across all cards */}
        <div className="mt-4 pt-3.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
            <FiCheckCircle className="text-emerald-500 text-xs" />
            Production System
          </span>

          {project.link && project.link !== "#" ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors py-1 px-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
            >
              <span>{t("projects.viewProject", "Live Site")}</span>
              <FiExternalLink className="text-xs" />
            </a>
          ) : (
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
              Enterprise
            </span>
          )}
        </div>
      </div>

      {/* Glow Hover Accent Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500/30 transition-colors pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;