import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiExternalLink,
  FiBriefcase,
  FiMaximize2,
  FiArrowUpRight,
} from "react-icons/fi";

const ProjectCard = ({ project, index, onOpenModal }) => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef(null);

  // 3D Perspective Tilt on Mouse Movement
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const fallbackImage =
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt (max +/- 6 degrees for smooth luxury feel)
    const newRotX = ((y - centerY) / centerY) * -6;
    const newRotY = ((x - centerX) / centerX) * 6;

    setRotX(newRotX);
    setRotY(newRotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlarePos((p) => ({ ...p, opacity: 0 }));
  };

  // Compact tag handling: Top 3 tags + remaining counter
  const visibleTags = project.tags ? project.tags.slice(0, 3) : [];
  const remainingCount =
    project.tags && project.tags.length > 3 ? project.tags.length - 3 : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotX, rotateY: rotY }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      style={{ transformStyle: "preserve-3d" }}
      onClick={() => onOpenModal && onOpenModal(project)}
      className="group relative flex flex-col h-full w-full rounded-xl overflow-hidden
                 border border-gray-200/90 dark:border-gray-800/90
                 bg-white/95 dark:bg-[#0c1220]/95 backdrop-blur-xl
                 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-cyan-500/10
                 transition-shadow duration-300 cursor-pointer select-none"
    >
      {/* 🌟 Dynamic Cursor Light Glare */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.22) 0%, transparent 65%)`,
          opacity: glarePos.opacity,
        }}
      />

      {/* 🌟 Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 dark:via-white/10 to-transparent pointer-events-none z-20" />

      {/* 📸 Compact Thumbnail Image Header */}
      <div className="relative h-28 sm:h-30 w-full overflow-hidden bg-gray-950 shrink-0">
        <img
          src={imgError ? fallbackImage : project.image}
          alt={t(project.titleKey)}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/45 to-black/30" />

        {/* Top Company Badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9.5px] font-semibold bg-gray-950/75 text-gray-200 backdrop-blur-md flex items-center gap-1 shadow-xs border border-white/15">
          <FiBriefcase className="text-cyan-400 text-[9px]" />
          <span className="truncate max-w-[150px]">{project.company}</span>
        </div>

        {/* Quick View Expand Icon Pill (Top Right) */}
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-950/70 text-gray-300 backdrop-blur-md flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs border border-white/10">
          <FiMaximize2 className="text-[10px]" />
        </div>

        {/* Project Title Overlaid at Bottom Edge */}
        <div className="absolute bottom-1.5 left-2.5 right-2.5">
          <h3 className="text-sm sm:text-[15px] font-extrabold text-white tracking-tight drop-shadow-md truncate">
            {t(project.titleKey)}
          </h3>
          {project.subtitle && (
            <p className="text-[10px] text-cyan-300/90 font-medium tracking-wide truncate">
              {project.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* 📝 Card Body (Compact & Dense) */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Two-Line Clamped Description */}
          <p
            title={t(project.descriptionKey)}
            className="text-[11px] sm:text-[11.5px] leading-snug text-gray-600 dark:text-gray-300 line-clamp-2"
          >
            {t(project.descriptionKey)}
          </p>

          {/* Compact Single-Row Tech Tags */}
          <div className="flex flex-wrap items-center gap-1 mt-2">
            {visibleTags.map((tag, i) => (
              <span
                key={i}
                className="text-[9px] sm:text-[9.5px] px-1.5 py-0.5 rounded font-medium 
                           bg-indigo-50/90 dark:bg-indigo-950/50 
                           text-indigo-700 dark:text-cyan-300 
                           border border-indigo-200/60 dark:border-indigo-900/40
                           group-hover:border-indigo-300 dark:group-hover:border-cyan-500/40 transition-colors"
              >
                {tag}
              </span>
            ))}
            {remainingCount > 0 && (
              <span
                className="text-[8.5px] sm:text-[9px] px-1 py-0.5 rounded font-semibold 
                           bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400
                           border border-gray-200 dark:border-gray-700"
                title={project.tags.slice(3).join(", ")}
              >
                +{remainingCount}
              </span>
            )}
          </div>
        </div>

        {/* ⚡ Sleek Footer Row */}
        <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
          <span className="text-[9.5px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Production</span>
          </span>

          <div className="flex items-center gap-2">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-0.5 text-[10px] font-bold text-indigo-600 dark:text-cyan-400 hover:underline py-0.5 px-1.5 rounded transition-colors"
                title="Open Live Site"
              >
                <span>Live</span>
                <FiExternalLink className="text-[9px]" />
              </a>
            )}

            <span className="inline-flex items-center gap-0.5 text-[10.5px] font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
              <span>View</span>
              <FiArrowUpRight className="text-[11px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* 🌟 Glowing Neon Border on Hover */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-indigo-500/50 dark:group-hover:border-cyan-400/50 transition-colors pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;