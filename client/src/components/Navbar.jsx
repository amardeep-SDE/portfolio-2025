import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";

// 🔁 Define outside the component
const toggleLanguage = (i18n) => {
  const newLang = i18n.language === "en" ? "hi" : "en";
  i18n.changeLanguage(newLang);
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { t, i18n } = useTranslation();
  console.log("i18n current lang:", i18n.language);
  console.log("translated home:", t("nav.home"));

  const navLinkClasses = (section) =>
    `cursor-pointer pb-1 transition-all border-b-2 ${
      activeSection === section
        ? "text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400"
        : "text-gray-900 dark:text-white border-transparent hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400"
    }`;

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md"
          : "bg-gradient-to-b from-blue-100 via-purple-100 to-purple-200 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900"
      }`}
    >
      <header className="flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto w-full">
        <ScrollLink
          to="about"
          smooth
          offset={-40}
          duration={500}
          className="cursor-pointer"
        >
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("nav.name")}
        </span>
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Portfolio Logo"
            className="h-10 w-10 object-contain"
          /> */}
        </ScrollLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-xl text-gray-900 dark:text-white">
          {["about", "skills", "projects", "experience", "contact"].map(
            (section) => (
              <ScrollLink
                key={section}
                to={section}
                smooth
                offset={-40}
                duration={600}
                className={navLinkClasses(section)}
                onClick={() => setActiveSection(section)}
              >
                {t(`nav.${section}`)}
              </ScrollLink>
            )
          )}
        </nav>
        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {/* <div className="flex gap-1 border px-2 rounded-full text-sm">
            <button onClick={() => toggleLanguage(i18n)}>EN</button>
            <span>|</span>
            <button onClick={() => toggleLanguage(i18n)}>हिंदी</button>
          </div> */}
          <button
            onClick={() => toggleLanguage(i18n)}
            className="border px-3 py-1 rounded-full text-sm text-gray-900 dark:text-white bg-indigo-200 dark:bg-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
          >
            {i18n.language === "en" ? "हिंदी" : "EN"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 dark:text-white"
          onClick={() => setIsMenuOpen(true)}
        >
          <AiOutlineMenu size={24} />
        </button>
      </header>

      {/* Mobile Menu */}

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur flex flex-col items-center justify-center space-y-6 text-gray-900 dark:text-white text-lg z-50">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-6 text-gray-700 dark:text-white"
          >
            <AiOutlineClose size={28} />
          </button>

          {["about", "skills", "projects", "experience", "contact"].map(
            (section) => (
              <ScrollLink
                key={section}
                to={section}
                smooth
                offset={-40}
                duration={600}
                className="cursor-pointer hover:text-indigo-600"
                onClick={() => {
                  setActiveSection(section);
                  setIsMenuOpen(false);
                }}
              >
                {t(`nav.${section}`)}
              </ScrollLink>
            )
          )}

          <div className="flex gap-4 mt-6">
            {/* <button onClick={() => toggleLanguage(i18n)}>EN</button>
            <button onClick={() => toggleLanguage(i18n)}>हिंदी</button> */}
            <button
              onClick={() => toggleLanguage(i18n)}
              className="border px-3 py-1 rounded-full text-sm text-gray-900 dark:text-white bg-indigo-200 dark:bg-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition "
            >
              {i18n.language === "en" ? "हिंदी" : "EN"}
            </button>
          </div>

          <ThemeToggle />
        </div>
      )}
    </section>
  );
};

export default Navbar;
