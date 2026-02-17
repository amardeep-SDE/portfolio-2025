import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

// 🔁 Language Toggle
const toggleLanguage = (i18n) => {
  const newLang = i18n.language === "en" ? "hi" : "en";
  i18n.changeLanguage(newLang);
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const { t, i18n } = useTranslation();

  // 🔥 Scroll Effect (Header style only)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClasses = (section) =>
    `relative cursor-pointer pb-1 transition-all font-semibold
     ${
       activeSection === section
         ? "text-indigo-600 dark:text-indigo-400"
         : "text-gray-700 dark:text-gray-200"
     }
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
     after:bg-indigo-600 dark:after:bg-indigo-400 after:transition-all after:duration-300
     hover:after:w-full`;

  return (
    <>
      {/* 🔒 FIXED HEADER */}
      <section
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${
            isScrolled
              ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm"
              : "bg-gradient-to-b from-blue-100 via-purple-100 to-purple-200 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900"
          }`}
      >
        <header
          className={`flex items-center justify-between px-6 sm:px-10 max-w-7xl mx-auto w-full
            ${isScrolled ? "py-3" : "py-5"} transition-all`}
        >
          {/* Logo */}
          <ScrollLink
            to="about"
            smooth
            offset={-80}
            duration={500}
            className="cursor-pointer"
          >
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              {t("nav.name")}
            </span>
          </ScrollLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-lg">
            {["about", "skills", "projects", "experience", "contact"].map(
              (section) => (
                <ScrollLink
                  key={section}
                  to={section}
                  smooth
                  offset={-80}
                  duration={600}
                  className={navLinkClasses(section)}
                  onClick={() => setActiveSection(section)}
                >
                  {t(`nav.${section}`)}
                </ScrollLink>
              )
            )}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => toggleLanguage(i18n)}
              className="px-4 py-1.5 rounded-full text-sm font-medium
                         bg-indigo-500 text-white dark:bg-indigo-700
                         hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all"
            >
              {i18n.language === "en" ? "🇮🇳 हिंदी" : "🇺🇸 EN"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <AiOutlineMenu size={28} />
          </button>
        </header>
      </section>

      {/* 🔥 Spacer so content doesn't hide under fixed header */}
      <div className="h-[80px]" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="md:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95
                       backdrop-blur-lg flex flex-col items-center justify-center
                       space-y-8 text-gray-900 dark:text-white text-lg z-[60]"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-6"
            >
              <AiOutlineClose size={28} />
            </button>

            {["about", "skills", "projects", "experience", "contact"].map(
              (section) => (
                <ScrollLink
                  key={section}
                  to={section}
                  smooth
                  offset={-80}
                  duration={600}
                  className="cursor-pointer text-xl font-medium hover:text-indigo-600 transition"
                  onClick={() => {
                    setActiveSection(section);
                    setIsMenuOpen(false);
                  }}
                >
                  {t(`nav.${section}`)}
                </ScrollLink>
              )
            )}

            <div className="flex gap-4 items-center mt-6">
              <ThemeToggle />
              <button
                onClick={() => toggleLanguage(i18n)}
                className="px-4 py-1.5 rounded-full text-sm font-medium
                           bg-indigo-500 text-white dark:bg-indigo-700
                           hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all"
              >
                {i18n.language === "en" ? "🇮🇳 हिंदी" : "🇺🇸 EN"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
