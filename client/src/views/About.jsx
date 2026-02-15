import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import profileData from "../data/profileData";
import { Typewriter } from "react-simple-typewriter";
import { FaUserTie, FaMapMarkerAlt, FaEye, FaDownload, FaTimes  } from "react-icons/fa";

const About = () => {
  const { t } = useTranslation();
  const [resumeOpen, setResumeOpen] = useState(false);
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
        <div className="flex flex-wrap gap-8 justify-center md:justify-start mt-10">

  {/* View Resume */}
  <button
    onClick={() => setResumeOpen(true)}
    className="group relative px-8 py-4 rounded-2xl font-semibold text-white
               bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
               shadow-[0_0_25px_rgba(147,51,234,0.5)]
               transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
               transform hover:rotate-y-12 hover:-rotate-x-6 hover:scale-[1.08]
               perspective-[800px] overflow-hidden"
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Rotating Gradient Overlay */}
    <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400
                     animate-[gradientShift_5s_linear_infinite] opacity-40" />

    {/* Reflection Line */}
    <span className="absolute top-0 left-[-100%] w-[120%] h-full bg-white/20
                     transform skew-x-[20deg] group-hover:left-[120%]
                     transition-all duration-[1200ms] ease-in-out" />

    {/* Content */}
    <span className="relative z-10 flex items-center gap-2 text-lg">
      <FaEye className="group-hover:rotate-12 group-hover:text-yellow-200 transition-all duration-500" />
      View Resume
    </span>
  </button>

  {/* Download Resume */}
  <a
    href={profileData.resume}
    download="amardeep_MERN_3YOE.pdf"
    className="group relative px-8 py-4 rounded-2xl font-semibold text-white
               bg-gradient-to-r from-red-500 via-pink-500 to-orange-500
               shadow-[0_0_25px_rgba(244,63,94,0.6)]
               transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
               transform hover:rotate-y-12 hover:rotate-x-6 hover:scale-[1.08]
               perspective-[800px] overflow-hidden"
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Dynamic gradient animation */}
    <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-red-400
                     animate-[gradientShift_5s_linear_infinite] opacity-40" />

    {/* Moving reflection */}
    <span className="absolute top-0 left-[-100%] w-[120%] h-full bg-white/20
                     transform skew-x-[20deg] group-hover:left-[120%]
                     transition-all duration-[1200ms] ease-in-out" />

    {/* Button content */}
    <span className="relative z-10 flex items-center gap-2 text-lg">
      <FaDownload className="group-hover:-rotate-12 group-hover:text-yellow-200 transition-all duration-500" />
      Download Resume
    </span>
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

      {/* Resume Modal */}
      {resumeOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4 overflow-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl md:h-[90vh] h-[80vh] relative">
            <button
              onClick={() => setResumeOpen(false)}
              className="absolute top-3 right-3 text-xl text-gray-600 hover:text-gray-900"
            >
              <FaTimes />
            </button>
            <iframe
              src={profileData.resume}
              title="Resume"
              className="w-full h-full rounded-xl"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
