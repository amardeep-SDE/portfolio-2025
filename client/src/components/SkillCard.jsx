import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiRedux,
  SiReactquery,
  SiTailwindcss,
  SiReacthookform,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiSocketdotio,
  SiJsonwebtokens,
  SiAgora,
  SiMongodb,
  SiMongoose,
  SiFirebase,
  SiCloudinary,
  SiMysql,
  SiAmazonwebservices,
  SiGithub,
  SiPostman,
  SiAxios,
  SiVite,
  SiVercel,
  SiGooglegemini,
  SiOpenai,
  SiGithubcopilot,
  SiAnthropic,
  SiGoogle,
} from "react-icons/si";
import { FaJava, FaCreditCard } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { RiNextjsFill } from "react-icons/ri";
import { FiCode } from "react-icons/fi";

// Comprehensive native SVG brand icon dictionary with exact brand colors & theme awareness
const SKILL_ICONS = {
  "JavaScript": { Icon: SiJavascript, color: "#F7DF1E" },
  "TypeScript": { Icon: SiTypescript, color: "#3178C6" },
  "Core Java": { Icon: FaJava, color: "#EA2D2E" },
  "HTML5": { Icon: SiHtml5, color: "#E34F26" },
  "CSS3": { Icon: SiCss3, color: "#1572B6" },
  "React.js": { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: RiNextjsFill, color: "currentColor", className: "text-slate-900 dark:text-white" },
  "Redux Toolkit": { Icon: SiRedux, color: "#764ABC" },
  "TanStack Query": { Icon: SiReactquery, color: "#FF4154" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "React Hook Form": { Icon: SiReacthookform, color: "#EC5990" },
  "Material UI": { Icon: SiMui, color: "#007FFF" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { Icon: SiExpress, color: "currentColor", className: "text-slate-800 dark:text-slate-100" },
  "REST APIs": { Icon: TbApi, color: "#009688" },
  "GraphQL": { Icon: SiGraphql, color: "#E10098" },
  "Socket.IO": { Icon: SiSocketdotio, color: "currentColor", className: "text-slate-900 dark:text-white" },
  "JWT Auth": { Icon: SiJsonwebtokens, color: "#D63AFF" },
  "Agora SDK": { Icon: SiAgora, color: "#099DFD" },
  "MongoDB": { Icon: SiMongodb, color: "#47A248" },
  "Mongoose": { Icon: SiMongoose, color: "#880000", className: "text-red-600 dark:text-red-400" },
  "Firebase": { Icon: SiFirebase, color: "#FFCA28" },
  "Cloudinary": { Icon: SiCloudinary, color: "#3448C5" },
  "MySQL": { Icon: SiMysql, color: "#4479A1" },
  "AWS": { Icon: SiAmazonwebservices, color: "#FF9900" },
  "Git & GitHub": { Icon: SiGithub, color: "currentColor", className: "text-slate-900 dark:text-white" },
  "Payment Gateway": { Icon: FaCreditCard, color: "#10B981" },
  "Postman": { Icon: SiPostman, color: "#FF6C37" },
  "Axios": { Icon: SiAxios, color: "#5A29E4" },
  "Vite": { Icon: SiVite, color: "#646CFF" },
  "Vercel / Render": { Icon: SiVercel, color: "currentColor", className: "text-slate-900 dark:text-white" },
  "Gemini AI Integration": { Icon: SiGooglegemini, color: "#8E75FF" },
  "ChatGPT / OpenAI APIs": { Icon: SiOpenai, color: "#10A37F" },
  "GitHub Copilot": { Icon: SiGithubcopilot, color: "#8B5CF6" },
  "Claude AI": { Icon: SiAnthropic, color: "#D97757" },
  "Antigravity AI": { Icon: SiGoogle, color: "#4285F4" },
};

const SkillCard = ({ skill }) => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  const iconConfig = SKILL_ICONS[skill.name];
  const isAdvanced = skill.level === "Advanced";

  const renderIcon = () => {
    if (iconConfig) {
      const { Icon, color, className } = iconConfig;
      return (
        <Icon
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${className || ""}`}
          style={{ color: color !== "currentColor" ? color : undefined }}
        />
      );
    }

    if (!imgError && skill.icon) {
      return (
        <img
          src={skill.icon}
          alt={skill.name}
          onError={() => setImgError(true)}
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter drop-shadow-2xs"
          loading="lazy"
        />
      );
    }

    return <FiCode className="w-5 h-5 text-indigo-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.018 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative flex items-center justify-between gap-2 sm:gap-3 w-full p-2.5 sm:p-3 rounded-2xl 
                 bg-white/90 dark:bg-gray-800/80 backdrop-blur-md 
                 border border-gray-200/80 dark:border-gray-700/60 
                 shadow-2xs hover:shadow-xl hover:border-indigo-400/60 dark:hover:border-indigo-500/60 
                 transition-all duration-300 overflow-hidden cursor-default"
    >
      {/* 🌟 Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent pointer-events-none" />

      {/* Left: Brand Icon + Info */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 relative z-10">
        {/* Brand Icon in Squircle */}
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${skill.gradient || "bg-gradient-to-br from-indigo-500 to-purple-500"} p-[1.5px] shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
        >
          <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-900 flex items-center justify-center p-1.5">
            {renderIcon()}
          </div>
        </div>

        {/* Skill Name & Level Indicator */}
        <div className="min-w-0">
          <h4 className="text-xs sm:text-[13.5px] font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {t(`skills.${skill.name}`, skill.name)}
          </h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAdvanced ? "bg-emerald-500 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span
              className={`text-[9.5px] sm:text-[10px] font-semibold tracking-wide ${
                isAdvanced
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }`}
            >
              {skill.level}
            </span>
            {skill.projects && (
              <>
                <span className="text-[9px] text-gray-300 dark:text-gray-600">•</span>
                <span className="text-[9px] text-gray-400 dark:text-gray-500 font-mono hidden sm:inline">
                  {skill.projects === "All" ? "All apps" : `${skill.projects} apps`}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right: Experience Badge */}
      <div className="shrink-0 relative z-10">
        <span className="inline-block text-[10px] sm:text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/60 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-2xs">
          {skill.experience}
        </span>
      </div>
    </motion.div>
  );
};

export default SkillCard;
