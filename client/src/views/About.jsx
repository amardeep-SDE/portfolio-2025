import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import profileData from "../data/profileData";
import { Typewriter } from "react-simple-typewriter";
import { FaUserTie, FaMapMarkerAlt, FaEye, FaDownload } from "react-icons/fa";

const About = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-16 
                 overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#fdfdfd] to-[#e0f2fe] 
                 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-300"
    >
      {/* 🌟 Animated Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-cyan-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Left Side: Text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          {/* Name */}
          <p className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-3">
            {t("about.name")}
          </p>

          {/* Role with typewriter */}
          <p className="text-xl sm:text-2xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center md:justify-start gap-2 mb-3">
            <FaUserTie className="text-indigo-500 dark:text-indigo-400" />
            <Typewriter
              words={[t("about.role"), t("about.role2"), t("about.role3")]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </p>

          {/* Location */}
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-4">
            <FaMapMarkerAlt className="text-red-500" />
            {t("about.location")}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-justify leading-relaxed tracking-wide text-gray-800 dark:text-gray-300 max-w-3xl mb-6">
            {t("about.description")}
          </p>

          {/* Resume Section */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
            <a
              href={profileData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl 
               bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium 
               shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <FaEye /> View Resume
            </a>

            <a
              href={profileData.resume}
              download="amardeep_resume_2YOE.pdf"
              className="flex items-center gap-2 px-6 py-3 rounded-xl 
               bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium 
               shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <FaDownload /> Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 flex justify-center"
        >
          <div className="relative group">
            {/* Gradient Border Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow opacity-30 group-hover:opacity-50 transition-all"></div>

            <img
              src={profileData.image}
              alt={t("about.name")}
              className="relative w-56 h-56 md:w-72 md:h-72 object-cover rounded-full shadow-2xl border-4 border-white dark:border-gray-800 
                         transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
