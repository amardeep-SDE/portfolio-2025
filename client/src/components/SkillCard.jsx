// Updated SkillCard with smaller card size and responsive small-screen adjustments
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const SkillCard = ({ skill }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="group w-[160px] sm:w-[180px] rounded-[16px] bg-[#3d2d1b] dark:bg-gray-700 p-[4px] overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.04,
        rotate: -1,
        boxShadow: "0px 20px 30px rgba(0,0,0,0.3)",
      }}
      transition={{ type: "spring", stiffness: 100, damping: 10, mass: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Top Section */}
      <div className={`h-[120px] sm:h-[130px] rounded-[12px] ${skill.gradient} relative`}>
        {/* Top skew decoration */}
        <div className="relative h-[22px] w-[100px] bg-[#1b233d] dark:bg-gray-800 skew-x-[-40deg] shadow-[-8px_-8px_0_0_#1b233d] dark:shadow-[-8px_-8px_0_0_#374151] rounded-br-[8px]">
          <div className="absolute top-0 -right-[12px] w-[12px] h-[12px] bg-transparent rounded-tl-[10px] shadow-[-4px_-4px_0_2px_#1b233d] dark:shadow-[-4px_-4px_0_2px_#374151]"></div>
        </div>

        {/* Corner cut */}
        <div className="absolute top-[22px] left-0 w-[12px] h-[12px] bg-transparent rounded-tl-[12px] shadow-[-4px_-4px_0_2px_#1b233d] dark:shadow-[-4px_-4px_0_2px_#374151]"></div>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={skill.icon} alt={skill.name} className="h-10 w-10 object-contain" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-[10px] p-[6px_4px]">
        <span className="block text-[15px] sm:text-[16px] font-bold text-white text-center tracking-[1px]">
          {t(`skills.${skill.name}`, skill.name)}
        </span>

        <div className="flex justify-between mt-[14px]">
          {/* Experience */}
          <div className="flex-1 text-center group px-1">
            <span className="block text-[11px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-semibold transition duration-300">
              {skill.experience}
            </span>
            <span className="text-[8px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-medium transition duration-300">
              {t("skills.experience")}
            </span>
          </div>

          {/* Level */}
          <div className="flex-1 text-center group border-l border-r border-white/10 px-1">
            <span className="block text-[11px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-semibold transition duration-300">
              {skill.level}
            </span>
            <span className="text-[8px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-medium transition duration-300">
              {t("skills.level")}
            </span>
          </div>

          {/* Projects */}
          <div className="flex-1 text-center group px-1">
            <span className="block text-[11px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-semibold transition duration-300">
              {skill.projects}
            </span>
            <span className="text-[8px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-medium transition duration-300">
              {t("skills.projects")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
