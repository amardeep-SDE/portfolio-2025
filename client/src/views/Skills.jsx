import React from "react";
import profileData from "../data/profileData";
import SkillCard from "../components/SkillCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="py-20 px-6 bg-gradient-to-br from-[#f5f7fa] via-[#e6ecf3] to-[#f4f7fc] 
                 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold text-center 
                     text-gray-900 dark:text-white mb-16 tracking-wide relative inline-block"
        >
          {t("skills.heading")}
          {/* underline highlight */}
          <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full -translate-x-1/2"></span>
        </motion.h2>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15, duration: 0.6 },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 
                     lg:grid-cols-4 xl:grid-cols-5 gap-8"
        >
          {profileData.skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              whileHover={{
                scale: 1.08,
                rotate: 2,
                boxShadow: "0px 12px 30px rgba(99,102,241,0.35)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group relative rounded-2xl 
                         bg-white/80 dark:bg-slate-800/70 backdrop-blur-xl 
                         p-6 flex justify-center items-center 
                         border border-transparent bg-clip-padding
                         hover:border-gradient-to-r hover:from-purple-500 hover:to-blue-500 
                         shadow-lg cursor-pointer overflow-hidden"
            >
              {/* Neon glow ring */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500 to-blue-500 blur-2xl rounded-2xl"></div>

              {/* Inner content */}
              <div className="relative z-10">
                <SkillCard skill={skill} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
