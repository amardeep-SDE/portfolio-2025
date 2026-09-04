import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiExternalLink, FiBriefcase, FiCheckCircle, FiMaximize2 } from "react-icons/fi";

const ProjectCard = ({ project, index, onOpenModal }) => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
        delay: (index % 3) * 0.08,
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      onClick={() => onOpenModal && onOpenModal(project)}
      className="group relative flex flex-col h-full w-full rounded-2xl overflow-hidden
                 border border-gray-200/90 dark:border-gray-800
                 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
                 shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {/* 🌟 Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none z-20" />

      {/* Compact Thumbnail Image Header */}
      <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
        <img
          src={imgError ? fallbackImage : project.image}
          alt={t(project.titleKey)}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Top Company Badge */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white backdrop-blur-md flex items-center gap-1.5 shadow-xs border border-white/20">
          <FiBriefcase className="text-indigo-500 text-[10px]" />
          <span>{project.company}</span>
        </div>

        {/* Quick View Expand Icon Pill (Top Right) */}
        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-indigo-600">
          <FiMaximize2 className="text-xs" />
        </div>

        {/* Bottom Title on Image */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-md">
            {t(project.titleKey)}
          </h3>
          {project.subtitle && (
            <p className="text-[11px] text-indigo-300 font-medium tracking-wide">
              {project.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Description */}
          <p className="text-[11.5px] sm:text-xs leading-relaxed text-gray-700 dark:text-gray-300">
            {t(project.descriptionKey)}
          </p>

          {/* Tech Tags */}
          <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap gap-1 content-start">
              {project.tags &&
                project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded font-medium 
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

        {/* Footer Area */}
        <div className="mt-3.5 pt-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
            <FiCheckCircle className="text-emerald-500 text-[10px]" />
            Production
          </span>

          <div className="flex items-center gap-1.5">
            {project.link && project.link !== "#" ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors py-0.5 px-2 rounded-md bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
              >
                <span>{t("projects.viewProject", "Live Site")}</span>
                <FiExternalLink className="text-[10px]" />
              </a>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                Enterprise
              </span>
            )}
            <span className="text-[10px] text-indigo-500 font-semibold group-hover:translate-x-0.5 transition-transform">
              Open →
            </span>
          </div>
        </div>
      </div>

      {/* Glow Hover Accent Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500/40 transition-colors pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;