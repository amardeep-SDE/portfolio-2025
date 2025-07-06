import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const SkillCard = ({ skill }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="group w-[200px] rounded-[20px] bg-[#1b233d] dark:bg-gray-700 p-[5px] overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.06,
        rotate: -1,
        boxShadow: "0px 20px 30px rgba(0,0,0,0.3)",
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.5,
      }}
      viewport={{ once: true }}
    >
      {/* Top Section */}
      <div className={`h-[150px] rounded-[15px] ${skill.gradient} relative`}>
        {/* Top skew decoration */}
        <div className="relative h-[30px] w-[130px] bg-[#1b233d] dark:bg-gray-800 skew-x-[-40deg] shadow-[-10px_-10px_0_0_#1b233d] dark:shadow-[-10px_-10px_0_0_#374151] rounded-br-[10px]">
          <div className="absolute top-0 -right-[15px] w-[15px] h-[15px] bg-transparent rounded-tl-[10px] shadow-[-5px_-5px_0_2px_#1b233d] dark:shadow-[-5px_-5px_0_2px_#374151]"></div>
        </div>

        {/* Corner cut */}
        <div className="absolute top-[30px] left-0 w-[15px] h-[15px] bg-transparent rounded-tl-[15px] shadow-[-5px_-5px_0_2px_#1b233d] dark:shadow-[-5px_-5px_0_2px_#374151]"></div>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={skill.icon}
            alt={skill.name}
            className="h-12 w-12 object-contain"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-[15px] p-[10px_5px]">
        <span className="block text-[17px] font-bold text-white text-center tracking-[2px]">
          {t(`skills.${skill.name}`, skill.name)}
        </span>

        <div className="flex justify-between mt-[20px]">
          {/* Experience */}
          <div className="flex-1 text-center group px-1">
            <span className="block text-[12px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-semibold transition duration-300">
              {skill.experience}
            </span>
            <span className="text-[9px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-medium transition duration-300">
              {t("skills.experience")}
            </span>
          </div>

          {/* Level */}
          <div className="flex-1 text-center group border-l border-r border-white/10 px-1">
            <span className="block text-[12px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-semibold transition duration-300">
              {skill.level}
            </span>
            <span className="text-[9px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-medium transition duration-300">
              {t("skills.level")}
            </span>
          </div>

          {/* Projects */}
          <div className="flex-1 text-center group px-1">
            <span className="block text-[12px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-semibold transition duration-300">
              {skill.projects}
            </span>
            <span className="text-[9px] text-[rgba(170,222,243,0.721)] dark:text-blue-200 group-hover:text-white group-hover:font-medium transition duration-300">
              {t("skills.projects")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
