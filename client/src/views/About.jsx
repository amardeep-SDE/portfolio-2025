import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import profileData from "../data/profileData";
import { Typewriter } from "react-simple-typewriter";
import { FaUserTie, FaMapMarkerAlt } from "react-icons/fa"; // 👈 Icons

const About = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-300"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 ">
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

          {/* Role with icon and typewriter */}
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

          {/* Location with icon */}
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-4">
            <FaMapMarkerAlt className="text-red-500" />
            {t("about.location")}
          </p>

          {/* Description */}
         <p className="text-base sm:text-lg text-justify leading-relaxed tracking-wide text-gray-800 dark:text-gray-300 max-w-3xl">
  {t("about.description")}
</p>

        </motion.div>

        {/* Right Side: Image */}
      <motion.div
  initial={{ x: 50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  whileHover={{ scale: 1.05, rotate: 1 }} // 👈 hover animation
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="flex-1 flex justify-center"
>
  <div className="relative group">
    <img
      src={profileData.image}
      alt={t("about.name")}
      className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full shadow-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
    />
    <div className="absolute -inset-1 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[-1]"></div>
  </div>
</motion.div>

      </div>
    </section>
  );
};

export default About;
