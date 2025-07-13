import React from "react";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";
import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      className="min-h-screen py-16 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight">
          {t("experience.heading")}
        </h2>

        <div className="relative pl-6 border-l-[3px] border-cyan-400/40 space-y-12">
          {profileData.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 sm:p-8 border-l-[6px] border-cyan-500/60 shadow-md hover:shadow-cyan-400/30 transition-transform hover:scale-[1.01]"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[18px] top-4 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border-4 border-white dark:border-gray-900 shadow-md flex items-center justify-center">
                <FaBriefcase size={12} className="text-white" />
              </div>

              {/* Role & Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t(item.roleKey)}
                </h3>
                <p className="text-sm text-cyan-700 dark:text-cyan-300 mt-1">
                  {t(item.companyKey)} • {t(item.locationKey)} • {item.duration}
                </p>
              </div>

              {/* Description */}
              <p className="mt-3 text-[15px] text-gray-700 dark:text-gray-300 leading-[1.7]">
                {t(item.descriptionKey)}
              </p>

              {/* Skills */}
              {item.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-cyan-100 dark:bg-cyan-700/30 text-cyan-800 dark:text-cyan-200 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
