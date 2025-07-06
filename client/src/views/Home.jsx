import React from "react";
import { useTranslation } from "react-i18next";
import Typewriter from "react-typewriter-effect";
import { motion } from "framer-motion";
import profileData from "../data/profileData";

const Home = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">

<div >
      <div className="grid grid-cols-2  px-6 text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {t("hero.greeting")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl sm:text-2xl font-medium text-indigo-600 dark:text-indigo-400 mb-4"
        >
          <Typewriter
            text={t("hero.role")}
            typeSpeed={80}
            startDelay={500}
            cursorColor="#4F46E5"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {profileData.about[lang]}
        </motion.p>
      </div>
      <div className="grid grid-cols-2  px-6">
 <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {t("hero.greeting")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl sm:text-2xl font-medium text-indigo-600 dark:text-indigo-400 mb-4"
        >
          <Typewriter
            text={t("hero.role")}
            typeSpeed={80}
            startDelay={500}
            cursorColor="#4F46E5"
          />
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Home;
