import React from "react";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";
import { motion } from "framer-motion";

/**
 * MERN logos
 * Express logo wrapped with white bg to stay visible in dark mode
 */
const mernLogos = [
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    src: "https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg", // ✅ dark-mode safe
    bg: true,
  },
  {
    name: "MongoDB",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
];

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-16"
        >
          {t("experience.heading")}
        </motion.h2>

        {/* Experience Blocks */}
        <div className="space-y-10">
          {profileData.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`
                grid md:grid-cols-[220px_1fr] gap-6
                rounded-2xl p-6
                ${
                  index % 2 === 0
                    ? "bg-white dark:bg-[#121212]"
                    : "bg-gray-100 dark:bg-[#181818]"
                }
              `}
            >
              {/* LEFT: ROLE + DATE + MERN */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {t(item.roleKey)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.duration}
                  </p>
                </div>

                {/* MERN STACK */}
                <div className="flex items-center gap-2">
                  {mernLogos.map((logo, i) => (
                    <div
                      key={i}
                      className={`
                        w-7 h-7 flex items-center justify-center rounded
                        ${logo.bg ? "bg-white p-1" : ""}
                      `}
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="w-5 h-5"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: DETAILS */}
              <div>
                <h3 className="text-lg font-semibold">
                  {t(item.companyKey)}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t(item.locationKey)}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl">
                  {t(item.descriptionKey)}
                </p>

                {/* Skills */}
                {item.skills?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
