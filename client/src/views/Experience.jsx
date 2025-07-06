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

        <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
          {profileData.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/60 shadow-[0_4px_20px_rgba(0,255,255,0.1)] hover:shadow-cyan-400/30 transition-transform hover:scale-[1.02]"
            >
              {/* Floating Icon */}
              <div className="absolute -top-7 left-6 bg-gradient-to-r from-cyan-400 to-blue-500 p-[4px] rounded-full shadow-md">
                <div className="bg-white dark:bg-gray-900 p-2 rounded-full text-cyan-600 dark:text-cyan-400">
                  <FaBriefcase size={18} />
                </div>
              </div>

              {/* Title & Info */}
              <div className="mt-6">
                <h3 className="text-[20px] sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {t(item.roleKey)}
                </h3>
                <p className="text-[14px] text-cyan-700 dark:text-cyan-300 mb-2">
                  {t(item.companyKey)} • {t(item.locationKey)} • {item.duration}
                </p>
              </div>

              {/* Description */}
              <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.6]">
                {t(item.descriptionKey)}
              </p>

              {/* Skills */}
              {item.skills && (
                <div className="mt-4 text-sm">
                  <span className="font-semibold text-cyan-500">Skills:</span>{" "}
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-block text-[13px] mx-1 text-gray-800 dark:text-gray-200"
                    >
                      • {skill}
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
