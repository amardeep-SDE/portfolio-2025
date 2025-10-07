import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const getProjectIcons = (isMern = true) => {
  const icons = {
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    mongo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    express: "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg",
    tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  };

  const stack = [icons.react, icons.tailwind];
  if (isMern) stack.push(icons.node, icons.express, icons.mongo);
  return stack;
};

const ProjectCard = ({ project, reverse }) => {
  const { t } = useTranslation();
  const techIcons = getProjectIcons(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 120 : -120 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`flex flex-col md:flex-row items-center gap-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Project Image */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl group"
      >
        <img
          src={project.image}
          alt={t(project.titleKey)}
          className="w-full h-72 object-cover rounded-2xl"
        />

        {/* Glass Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-500/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </motion.div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          {t(project.titleKey)}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {t(project.descriptionKey)}
        </p>

        <div className="flex justify-center md:justify-start flex-wrap gap-4 mt-3">
          {techIcons.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt="tech"
              className="w-10 h-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
              whileHover={{ scale: 1.2, rotate: 8 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          ))}
        </div>

        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-5 px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:shadow-xl transition"
          >
            {t("projects.viewProject")}
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
