import React from "react";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";

const Footer = () => {
  const { t } = useTranslation();
  const { email, phone, social } = profileData.contactInfo;

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#e3e8ff] to-[#f8f9ff] dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617] pt-20 pb-12 px-6 border-t border-white/10 dark:border-gray-800">

      {/* Glow background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-400/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-400/20 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto grid gap-14 md:grid-cols-2 items-center">

        {/* Contact Info */}
        <div className="space-y-7 text-center md:text-left">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {t("footer.contact", "Get in Touch")}
          </h2>

          <div className="space-y-5 text-gray-700 dark:text-gray-300">

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center md:justify-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg group-hover:scale-110 transition">
                <FiMail className="text-indigo-600 dark:text-indigo-400 text-lg" />
              </div>

              <span className="relative font-medium">
                {email}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all group-hover:w-full" />
              </span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center md:justify-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg group-hover:scale-110 transition">
                <FiPhone className="text-indigo-600 dark:text-indigo-400 text-lg" />
              </div>

              <span className="relative font-medium">
                {phone}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all group-hover:w-full" />
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
              glow: "hover:shadow-[0_0_25px_#0A66C2] hover:text-[#0A66C2]",
            },
            {
              url: social.github,
              icon: <FiGithub />,
              glow: "hover:shadow-[0_0_25px_#6e5494] hover:text-[#6e5494]",
            },
            {
              url: social.instagram,
              icon: <FaInstagram />,
              glow: "hover:shadow-[0_0_25px_#E4405F] hover:text-[#E4405F]",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`
                relative group
                w-16 h-16 rounded-2xl flex justify-center items-center 
                bg-white/30 dark:bg-gray-800/40 text-xl text-gray-800 dark:text-gray-200
                backdrop-blur-xl border border-white/20
                transition-all duration-300
                hover:-translate-y-2 hover:scale-110 ${item.glow}
              `}
            >
              {item.icon}

              {/* inner glow */}
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-white/20 to-transparent" />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative my-12">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent" />
        <div className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-indigo-400 to-purple-500 animate-[move_3s_linear_infinite]" />
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Amardeep Dwivedi
        </span>
        . {t("footer.rights", "All rights reserved.")}
      </div>
    </footer>
  );
};

export default Footer;