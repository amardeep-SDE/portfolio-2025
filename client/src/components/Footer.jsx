import React from "react";
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiMapPin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import profileData from "../data/profileData";

const Footer = () => {
  const { t } = useTranslation();
  const { email, phone, social } = profileData.contactInfo;

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#e8ecff] to-[#f9faff] dark:from-[#020617] dark:via-[#0b1220] dark:to-[#020617] pt-16 pb-10 px-4 sm:px-6 border-t border-gray-200/60 dark:border-gray-800">

      {/* Ambient Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Main Grid: Contact Info Left + Social Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-10">

          {/* LEFT: Contact Info */}
          <div className="space-y-5 text-center md:text-left">

            {/* Section Sub-label */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Get in Touch
            </div>

            {/* Heading — consistent with all section headings */}
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
              {t("footer.contact", "Contact Info")}
            </h2>

            {/* Contact Links */}
            <div className="space-y-3">

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center justify-center md:justify-start gap-3 group"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 shadow-xs group-hover:scale-110 group-hover:border-indigo-400 transition duration-300 shrink-0">
                  <FiMail className="text-indigo-600 dark:text-indigo-400 text-sm" />
                </div>
                <span className="relative text-sm font-medium text-gray-800 dark:text-gray-200 tracking-wide group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {email}
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center md:justify-start gap-3 group"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 shadow-xs group-hover:scale-110 group-hover:border-indigo-400 transition duration-300 shrink-0">
                  <FiPhone className="text-indigo-600 dark:text-indigo-400 text-sm" />
                </div>
                <span className="relative text-sm font-medium text-gray-800 dark:text-gray-200 tracking-wide group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {phone}
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>

              {/* Location */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 shadow-xs shrink-0">
                  <FiMapPin className="text-red-500 text-sm" />
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Chandigarh, India
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Social Icons */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Connect Online
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  url: social.linkedin,
                  icon: <FiLinkedin />,
                  label: "LinkedIn",
                  glow: "hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] hover:text-[#0A66C2] hover:border-[#0A66C2]/40",
                },
                {
                  url: social.github,
                  icon: <FiGithub />,
                  label: "GitHub",
                  glow: "hover:shadow-[0_0_20px_rgba(110,84,148,0.4)] hover:text-[#6e5494] hover:border-[#6e5494]/40",
                },
                {
                  url: social.instagram,
                  icon: <FaInstagram />,
                  label: "Instagram",
                  glow: "hover:shadow-[0_0_20px_rgba(228,64,95,0.4)] hover:text-[#E4405F] hover:border-[#E4405F]/40",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  title={item.label}
                  className={`
                    relative group
                    w-11 h-11 rounded-xl flex justify-center items-center 
                    bg-white/80 dark:bg-gray-800/60
                    backdrop-blur-xl border border-gray-200/70 dark:border-gray-700/60
                    text-base text-gray-700 dark:text-gray-300
                    transition-all duration-300
                    hover:-translate-y-1.5 hover:scale-110
                    ${item.glow}
                  `}
                >
                  {item.icon}
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-white/20 to-transparent" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Amardeep Dwivedi
          </span>
          . {t("footer.rights", "All rights reserved.")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;