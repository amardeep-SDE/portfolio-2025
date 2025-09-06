import React from "react";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";

const Footer = () => {
  const { t } = useTranslation();
  const { email, phone, social } = profileData.contactInfo;

  return (
    <footer className="relative bg-gradient-to-r from-[#eef2ff] via-[#e3e8ff] to-[#f4f5ff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#111827] pt-12 pb-8 px-6 border-t border-white/10 dark:border-gray-800 backdrop-blur-md">
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-center">
        {/* Contact Info */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            {t("footer.contact", "Get in Touch")}
          </h2>
          <div className="space-y-3">
            <p className="flex items-center justify-center md:justify-start gap-3 text-gray-700 dark:text-gray-300">
              <FiMail className="text-indigo-600 dark:text-indigo-400 text-lg" />
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-3 text-gray-700 dark:text-gray-300">
              <FiPhone className="text-indigo-600 dark:text-indigo-400 text-lg" />
              <a href={`tel:${phone}`} className="hover:underline">
                {phone}
              </a>
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-5">
          {[
            {
              url: social.linkedin,
              icon: <FiLinkedin />,
              hover: "hover:shadow-[0_0_15px_#0A66C2] hover:text-[#0A66C2]",
            },
            {
              url: social.github,
              icon: <FiGithub />,
              hover: "hover:shadow-[0_0_15px_#6e5494] hover:text-[#6e5494]",
            },
            {
              url: social.instagram,
              icon: <FaInstagram />,
              hover: "hover:shadow-[0_0_15px_#E4405F] hover:text-[#E4405F]",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`w-12 h-12 rounded-xl flex justify-center items-center 
                bg-white/10 dark:bg-gray-800/50 text-white text-xl 
                backdrop-blur-lg transition-all duration-300 transform hover:-translate-y-2 ${item.hover}`}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent my-8" />

      {/* Copyright */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} <span className="font-medium">Amardeep Dwivedi</span>.{" "}
        {t("footer.rights", "All rights reserved.")}
      </div>
    </footer>
  );
};

export default Footer;
