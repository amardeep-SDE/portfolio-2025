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
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-14 tracking-tight"
        >
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            {t("skills.heading")}
          </span>
        </motion.h2>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {profileData.skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className="group relative rounded-xl
                         bg-white/80 dark:bg-slate-800/70
                         backdrop-blur-md
                         p-3
                         flex justify-center items-center
                         border border-slate-200 dark:border-slate-700
                         shadow-md
                         cursor-pointer
                         overflow-hidden"
            >
              {/* Soft Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                           transition duration-300
                           bg-gradient-to-r from-indigo-500/5 to-purple-500/5"
              />

              {/* Skill Content */}
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