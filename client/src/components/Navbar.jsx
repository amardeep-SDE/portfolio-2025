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

const navSections = [
  "about",
  "skills",
  "projects",
  "experience",
  "credentials",
  "contact",
];

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
    `relative cursor-pointer pb-1 transition-all font-semibold text-sm lg:text-base
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
              ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-800 shadow-sm"
              : "bg-white/40 dark:bg-gray-900/40 backdrop-blur-md"
          }`}
      >
        <header
          className={`flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto w-full
            ${isScrolled ? "py-3" : "py-4"} transition-all`}
        >
          {/* Logo */}
          <ScrollLink
            to="about"
            smooth
            offset={-80}
            duration={500}
            className="cursor-pointer flex items-center gap-2"
          >
            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t("nav.name")}
            </span>
          </ScrollLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navSections.map((section) => (
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
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => toggleLanguage(i18n)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold
                         bg-indigo-600 text-white dark:bg-indigo-600
                         hover:bg-indigo-700 dark:hover:bg-indigo-500 shadow-sm transition-all"
            >
              {i18n.language === "en" ? "🇮🇳 हिंदी" : "🇺🇸 EN"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
          >
            <AiOutlineMenu size={24} />
          </button>
        </header>
      </section>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95
                       backdrop-blur-xl flex flex-col items-center justify-center
                       space-y-6 text-gray-900 dark:text-white text-lg z-[60] p-6"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-6 p-2 text-gray-700 dark:text-white"
              aria-label="Close Menu"
            >
              <AiOutlineClose size={26} />
            </button>

            {navSections.map((section) => (
              <ScrollLink
                key={section}
                to={section}
                smooth
                offset={-80}
                duration={600}
                className="cursor-pointer text-lg font-semibold hover:text-indigo-600 transition"
                onClick={() => {
                  setActiveSection(section);
                  setIsMenuOpen(false);
                }}
              >
                {t(`nav.${section}`)}
              </ScrollLink>
            ))}

            <div className="flex gap-4 items-center pt-6 border-t border-gray-200 dark:border-gray-800 w-full justify-center">
              <ThemeToggle />
              <button
                onClick={() => toggleLanguage(i18n)}
                className="px-4 py-1.5 rounded-full text-xs font-bold
                           bg-indigo-600 text-white
                           hover:bg-indigo-700 transition-all"
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
