import React from "react";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";

const Footer = () => {
  const { t } = useTranslation();
  const { email, phone, social } = profileData.contactInfo;

  return (
    <footer className="relative bg-gradient-to-r from-[#eef2ff] via-[#e3e8ff] to-[#f4f5ff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#111827] pt-16 pb-10 px-6 border-t border-white/10 dark:border-gray-800 backdrop-blur-md">
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-center">
        
        {/* Contact Info */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {t("footer.contact", "Get in Touch")}
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center md:justify-start gap-3 group"
            >
              <FiMail className="text-indigo-600 dark:text-indigo-400 text-lg group-hover:scale-110 transition" />
              <span className="relative after:block after:h-[2px] after:w-0 after:bg-indigo-500 after:transition-all group-hover:after:w-full">
                {email}
              </span>
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center md:justify-start gap-3 group"
            >
              <FiPhone className="text-indigo-600 dark:text-indigo-400 text-lg group-hover:scale-110 transition" />
              <span className="relative after:block after:h-[2px] after:w-0 after:bg-indigo-500 after:transition-all group-hover:after:w-full">
                {phone}
              </span>
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-6">
          {[
            {
              url: social.linkedin,
              icon: <FiLinkedin />,
              glow: "hover:shadow-[0_0_20px_#0A66C2] hover:text-[#0A66C2]",
            },
            {
              url: social.github,
              icon: <FiGithub />,
              glow: "hover:shadow-[0_0_20px_#6e5494] hover:text-[#6e5494]",
            },
            {
              url: social.instagram,
              icon: <FaInstagram />,
              glow: "hover:shadow-[0_0_20px_#E4405F] hover:text-[#E4405F]",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`w-14 h-14 rounded-full flex justify-center items-center 
                bg-white/20 dark:bg-gray-800/40 text-xl text-gray-800 dark:text-gray-200
                backdrop-blur-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 ${item.glow}`}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative my-10">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent" />
        <div className="absolute top-0 left-0 w-1/4 h-[2px] bg-gradient-to-r from-indigo-400 to-purple-500 animate-pulse" />
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-indigo-600 dark:text-indigo-400">
          Amardeep Dwivedi
        </span>
        . {t("footer.rights", "All rights reserved.")}
      </div>
    </footer>
  );
};

export default Footer;
