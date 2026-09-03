import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const SkillCard = ({ skill }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="group w-full max-w-[200px] rounded-2xl bg-gradient-to-b from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 p-3 border border-gray-200/80 dark:border-gray-700/60 shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      viewport={{ once: true }}
    >
      {/* Top Banner / Icon Container */}
      <div
        className={`h-24 sm:h-28 rounded-xl ${skill.gradient} relative overflow-hidden flex items-center justify-center shadow-inner group-hover:scale-[1.02] transition-transform duration-300`}
      >
        {/* Subtle overlay shine */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[1px]" />
        
        {/* Decorative corner accent */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/25 text-[10px] font-semibold text-white/95 uppercase tracking-wider backdrop-blur-sm">
          {skill.level}
        </div>

        {/* Tech Icon */}
        <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/90 dark:bg-gray-900/90 p-2.5 shadow-lg flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-full h-full object-contain filter drop-shadow-sm"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-3 text-center">
        <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white tracking-wide truncate">
          {t(`skills.${skill.name}`, skill.name)}
        </h4>

        {/* Meta Stats: Experience & Projects */}
        <div className="grid grid-cols-2 gap-1 mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-700/60 text-[11px]">
          <div className="text-center px-1">
            <span className="block font-bold text-indigo-600 dark:text-indigo-400">
              {skill.experience}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t("skills.experience", "Exp")}
            </span>
          </div>

          <div className="text-center px-1 border-l border-gray-200 dark:border-gray-700">
            <span className="block font-bold text-purple-600 dark:text-purple-400">
              {skill.projects}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t("skills.projects", "Projects")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
