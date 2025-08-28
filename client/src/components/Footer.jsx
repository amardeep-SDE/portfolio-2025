import React from "react";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";

const Footer = () => {
  const { t } = useTranslation();
  const { email, phone, social } = profileData.contactInfo;

  return (
    <footer className="bg-gradient-to-r from-[#eef2ff] via-[#e3e8ff] to-[#f4f5ff] dark:from-[#111827] dark:via-[#1e293b] dark:to-[#0f172a] py-10 px-6 border-t border-white/20 dark:border-gray-800 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Contact */}
        <div className="space-y-3 text-center md:text-left">
          <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <FiMail className="text-indigo-600 dark:text-indigo-400" />
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </p>
          <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <FiPhone className="text-indigo-600 dark:text-indigo-400" />
            <a href={`tel:${phone}`} className="hover:underline">
              {phone}
            </a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          {[
            {
              url: social.linkedin,
              icon: <FiLinkedin />,
              hover: "hover:bg-[#0A66C2]",
            },
            {
              url: social.github,
              icon: <FiGithub />,
              hover: "hover:bg-[#6e5494]",
            },
            {
              url: social.instagram, 
              icon: <FaInstagram />, 
              hover: "hover:bg-[#E4405F]", 
            },
           
          ].map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`
                w-11 h-11 rounded-2xl flex justify-center items-center transition-transform
                bg-gray-800/90 dark:bg-gray-700/90 hover:-translate-y-2 ${item.hover}
              `}
            >
              <span className="text-white text-lg">{item.icon}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Amardeep Dwivedi.{" "}
        {t("footer.rights", "All rights reserved.")}
      </div>
    </footer>
  );
};

export default Footer;
