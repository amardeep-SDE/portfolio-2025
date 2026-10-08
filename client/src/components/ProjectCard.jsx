import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiExternalLink,
  FiBriefcase,
  FiMaximize2,
  FiArrowUpRight,
} from "react-icons/fi";

// Semantic color-coding for tech tags for enhanced readability
const getTagColorClass = (tag) => {
  const t = tag.toLowerCase();
  if (t.includes("react") || t.includes("redux") || t.includes("next")) {
    return "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-800/60";
  }
  if (t.includes("node") || t.includes("express")) {
    return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60";
  }
  if (t.includes("mongo") || t.includes("db") || t.includes("sql")) {
    return "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200/80 dark:border-teal-800/60";
  }
  if (t.includes("agora") || t.includes("socket") || t.includes("webrtc")) {
    return "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60";
  }
  if (t.includes("tailwind") || t.includes("css")) {
    return "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-800/60";
  }
  return "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
};

// Compact company label formatter
const formatCompanyName = (company) => {
  if (!company) return "";
  if (company.includes("Suffescom")) return "Suffescom";
  if (company.includes("Codeverse")) return "Codeverse IT";
  if (company.includes("Encanto")) return "Encanto Tech";
  return company;
};

const ProjectCard = ({ project, index = 0, onOpenModal }) => {
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

    // Subtle 3D tilt (max +/- 5.5 degrees)
    const newRotX = ((y - centerY) / centerY) * -5.5;
    const newRotY = ((x - centerX) / centerX) * 5.5;

    setRotX(newRotX);
    setRotY(newRotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
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
      className="group relative flex flex-col h-full w-full rounded-2xl overflow-hidden
                 border border-gray-200/90 dark:border-gray-800/90
                 bg-white/95 dark:bg-[#0c1220]/95 backdrop-blur-xl
                 shadow-xs hover:shadow-2xl hover:shadow-indigo-500/15 dark:hover:shadow-cyan-500/15
                 transition-all duration-300 cursor-pointer select-none"
    >
      {/* 🌟 Spotlight Border Illumination (follows cursor) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(260px circle at ${glarePos.x}% ${glarePos.y}%, rgba(99, 102, 241, 0.25), transparent 70%)`,
        }}
      />

      {/* 🌟 Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none z-20" />

      {/* 📸 Compact Thumbnail Image Header */}
      <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-gray-950 shrink-0">
        <img
          src={imgError ? fallbackImage : project.image}
          alt={t(project.titleKey)}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/45 to-black/30" />

        {/* Top-Left Company Badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9.5px] font-semibold bg-gray-950/80 text-gray-200 backdrop-blur-md flex items-center gap-1 shadow-xs border border-white/15">
          <FiBriefcase className="text-cyan-400 text-[9px]" />
          <span className="truncate max-w-[130px]">
            {formatCompanyName(project.company)}
          </span>
        </div>

        {/* Top-Right Project Index Badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-black/60 text-cyan-300 backdrop-blur-md border border-white/15 flex items-center gap-1 shadow-xs">
          <span>#{String(index + 1).padStart(2, "0")}</span>
        </div>

        {/* Quick View Expand Icon Pill (Center Right on Hover) */}
        <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-gray-950/75 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 group-hover:bg-indigo-600 transition-all duration-300 shadow-md border border-white/15">
          <FiMaximize2 className="text-[11px]" />
        </div>

        {/* Project Title Overlaid at Bottom Edge */}
        <div className="absolute bottom-1.5 left-2.5 right-11">
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

          {/* Color-Coded Tech Tags */}
          <div className="flex flex-wrap items-center gap-1 mt-2">
            {visibleTags.map((tag, i) => (
              <span
                key={i}
                className={`text-[9px] sm:text-[9.5px] px-1.5 py-0.5 rounded font-medium border transition-transform duration-200 hover:scale-105 ${getTagColorClass(
                  tag
                )}`}
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
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9.5px] sm:text-[10px] text-gray-500 dark:text-gray-400 font-medium">
              Production
            </span>
          </div>

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
              <span>Specs</span>
              <FiArrowUpRight className="text-[11px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* 🌟 Glowing Neon Border on Hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-indigo-500/50 dark:group-hover:border-cyan-400/50 transition-colors pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;