import React from "react";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";

const Footer = () => {
  const { t } = useTranslation();
  const { email, phone, social } = profileData.contactInfo;

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#e8ecff] to-[#f9faff] dark:from-[#020617] dark:via-[#0b1220] dark:to-[#020617] pt-24 pb-14 px-6 border-t border-white/10 dark:border-gray-800">

      {/* Animated Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full animate-pulse" />

      <div className="relative max-w-6xl mx-auto grid gap-16 md:grid-cols-2 items-center">

        {/* LEFT */}
        <div className="space-y-8 text-center md:text-left">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent tracking-wide">
            {t("footer.contact", "Get in Touch")}
          </h2>

          {/* Contact */}
          <div className="space-y-6 text-gray-700 dark:text-gray-300">

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center md:justify-start gap-4 group"
            >
              <div className="
                p-3 rounded-xl
                bg-white/40 dark:bg-gray-800/40
                backdrop-blur-xl border border-white/20
                group-hover:scale-110 group-hover:rotate-3
                transition duration-300
              ">
                <FiMail className="text-indigo-600 dark:text-indigo-400 text-lg" />
              </div>

              <span className="relative font-medium tracking-wide">
                {email}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center md:justify-start gap-4 group"
            >
              <div className="
                p-3 rounded-xl
                bg-white/40 dark:bg-gray-800/40
                backdrop-blur-xl border border-white/20
                group-hover:scale-110 group-hover:-rotate-3
                transition duration-300
              ">
                <FiPhone className="text-indigo-600 dark:text-indigo-400 text-lg" />
              </div>

              <span className="relative font-medium tracking-wide">
                {phone}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT - SOCIAL */}
        <div className="flex justify-center md:justify-end gap-6">
          {[
            {
              url: social.linkedin,
              icon: <FiLinkedin />,
              glow: "hover:shadow-[0_0_30px_#0A66C2] hover:text-[#0A66C2]",
            },
            {
              url: social.github,
              icon: <FiGithub />,
              glow: "hover:shadow-[0_0_30px_#6e5494] hover:text-[#6e5494]",
            },
            {
              url: social.instagram,
              icon: <FaInstagram />,
              glow: "hover:shadow-[0_0_30px_#E4405F] hover:text-[#E4405F]",
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
                bg-white/30 dark:bg-gray-800/40
                backdrop-blur-xl border border-white/20
                text-xl text-gray-800 dark:text-gray-200
                transition-all duration-300
                hover:-translate-y-3 hover:scale-110
                ${item.glow}
              `}
            >
              {item.icon}

              {/* glow layer */}
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-white/30 to-transparent" />

              {/* border glow */}
              <span className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/30 transition" />
            </a>
          ))}
        </div>
      </div>

      {/* Premium Divider */}
      <div className="relative my-14">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
        <div className="absolute top-0 left-0 w-1/4 h-[2px] bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400 animate-[move_4s_linear_infinite]" />
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 tracking-wide">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
          Amardeep Dwivedi
        </span>
        . {t("footer.rights", "All rights reserved.")}
      </div>
    </footer>
  );
};

export default Footer;