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
      className="py-14 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            {t("experience.heading")}
          </span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative pl-5 border-l-2 border-indigo-400/40 space-y-10">
          {profileData.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-lg 
                         p-5 border border-gray-200/60 dark:border-gray-700/50 shadow-sm 
                         hover:shadow-lg transition-all duration-200"
            >
              {/* Dot */}
              <div className="absolute -left-[15px] top-4 w-4 h-4 rounded-full bg-gradient-to-br 
                              from-indigo-500 to-purple-600 border-2 border-white 
                              dark:border-gray-900 shadow" />

              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                {/* Company Left */}
                <h3 className="font-semibold text-[18px] tracking-tight">
                  {t(item.companyKey)}
                </h3>

                {/* Role + Duration Right */}
                <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium">
                  {t(item.roleKey)} • {item.duration}
                </p>
              </div>

              {/* Location */}
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                {t(item.locationKey)}
              </p>

              {/* Description */}
              <p className="mt-2 text-[14px] text-gray-700 dark:text-gray-300 leading-relaxed">
                {t(item.descriptionKey)}
              </p>

              {/* Skills */}
              {item.skills?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 dark:bg-indigo-800/30 text-indigo-800 dark:text-indigo-200 
                                 px-2.5 py-0.5 rounded-full text-xs font-medium"
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
