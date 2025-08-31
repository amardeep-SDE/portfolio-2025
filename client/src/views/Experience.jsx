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
      className="min-h-screen py-16 px-4 bg-gradient-to-b from-indigo-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-16 tracking-tight"
        >
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            {t("experience.heading")}
          </span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative pl-6 border-l-[3px] border-indigo-400/30 space-y-12">
          {profileData.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 sm:p-8 border-l-[6px] border-indigo-500/60 shadow-lg hover:shadow-indigo-400/40 transition-all duration-300 hover:scale-[1.03]"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[18px] top-4 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-[3px] border-white dark:border-gray-900 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaBriefcase size={13} className="text-white" />
              </div>

              {/* Role & Company */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t(item.roleKey)}
                </h3>
                <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1 font-medium">
                  {t(item.companyKey)} • {t(item.locationKey)} • {item.duration}
                </p>
              </div>

              {/* Description */}
              <p className="mt-3 text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed">
                {t(item.descriptionKey)}
              </p>

              {/* Skills */}
              {item.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-800/30 dark:to-purple-800/30 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-xs font-medium shadow-sm hover:shadow-md transition"
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
