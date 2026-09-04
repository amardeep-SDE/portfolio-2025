import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const SkillCard = ({ skill }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -3, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="group relative flex items-center justify-between gap-3 w-full p-2.5 sm:p-3 rounded-xl 
                 bg-white/90 dark:bg-gray-800/85 backdrop-blur-md 
                 border border-gray-200/80 dark:border-gray-700/70 
                 shadow-2xs hover:shadow-lg hover:border-indigo-400/50 dark:hover:border-indigo-500/50 
                 transition-all duration-300 overflow-hidden cursor-default"
    >
      {/* 🌟 Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none" />

      {/* Left: Brand Icon + Info */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 relative z-10">
        {/* Brand Icon in Squircle */}
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${skill.gradient} p-[1.5px] shrink-0 shadow-2xs group-hover:scale-108 group-hover:rotate-6 transition-all duration-300`}
        >
          <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-900 flex items-center justify-center p-1.5">
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-full h-full object-contain filter drop-shadow-2xs"
              loading="lazy"
            />
          </div>
        </div>

        {/* Skill Name & Level */}
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {t(`skills.${skill.name}`, skill.name)}
          </h4>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium block">
            {skill.level}
          </span>
        </div>
      </div>

      {/* Right: Experience Badge */}
      <div className="shrink-0 relative z-10">
        <span className="inline-block text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/60 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
          {skill.experience}
        </span>
      </div>
    </motion.div>
  );
};

export default SkillCard;
