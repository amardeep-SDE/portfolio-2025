import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import profileData from "../data/profileData";
import {
  FaGraduationCap,
  FaCertificate,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaUniversity,
  FaMapMarkerAlt,
} from "react-icons/fa";

const EducationCertifications = () => {
  const { t } = useTranslation();
  const edu = profileData.education[0];

  return (
    <section
      id="credentials"
      className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]
                 dark:from-[#090d16] dark:via-[#0f172a] dark:to-[#090d16] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Heading */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t("credentials.heading", "Education & Certifications")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto"
          >
            Academic foundation and specialized software engineering credentials
          </motion.p>
        </div>

        {/* 1. CERTIFICATIONS SECTION */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2.5 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
                <FaCertificate className="text-sm" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {t("credentials.certificationsTitle", "Certifications")}
                </h3>
                <p className="text-[11px] sm:text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  {t("credentials.authorizedBy", "Authorized by NamasteDev.com")}
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              <FaCheckCircle className="text-[10px]" /> {t("credentials.verifiedBadge", "Verified Credentials")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {profileData.certifications.map((cert, index) => {
              const certId = cert.id.replace("namaste-", "");
              const certDetails = t(`credentials.certifications.${certId}`, {
                returnObjects: true,
                defaultValue: {},
              });

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-xl p-5 bg-white dark:bg-gray-900/90 border border-gray-200/90 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.gradient}`}
                  />

                  <div>
                    {/* Header: Icon & Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 shadow-2xs border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <img
                          src={cert.icon}
                          alt={cert.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {cert.issuer}
                      </span>
                    </div>

                    {/* Certificate Name */}
                    <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {certDetails.name || cert.name}
                    </h4>

                    {/* Instructor */}
                    <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                      Instructor: <span className="text-gray-800 dark:text-gray-200 font-semibold">{cert.instructor}</span>
                    </p>

                    {/* Description */}
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                      {certDetails.description}
                    </p>

                    {/* Key Topics */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verification Link */}
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <FaCheckCircle className="text-[10px]" /> Verified
                    </span>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      <span>{t("credentials.viewCert", "View Certificate")}</span>
                      <FaExternalLinkAlt className="text-[9px]" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. EDUCATION SECTION (Compact, refined, and proportional) */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-6 pb-2.5 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-xs">
                <FaGraduationCap className="text-sm" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {t("credentials.educationTitle", "Education")}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                  Academic Background & Engineering Qualifications
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              <FaCheckCircle className="text-[10px]" /> {t("credentials.gradeStatus", "Degree Completed")}
            </span>
          </div>

          {/* Education Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Left 2 Columns: Degree & Institution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative rounded-xl p-5 sm:p-6 bg-white dark:bg-gray-900/90 border border-gray-200/90 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500" />

              <div>
                {/* Degree & Major Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {t("credentials.degree", edu.degree)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {t("credentials.major", edu.major)}
                  </span>
                </div>

                {/* Degree Title */}
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Bachelor of Engineering in{" "}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Mechanical Engineering
                  </span>
                </h4>

                {/* Institution & Location details */}
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-200">
                    <FaUniversity className="text-indigo-500 shrink-0 text-base" />
                    <span>{t("credentials.institution", edu.institution)}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-normal hidden sm:inline">
                      ({t("credentials.institutionFull", edu.institutionFullName)})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 pl-0.5">
                    <FaMapMarkerAlt className="text-red-500 shrink-0 text-xs" />
                    <span>{t("credentials.location", edu.location)}</span>
                  </div>
                </div>
              </div>

              {/* Core Academic Highlights Tags */}
              <div className="mt-5 pt-3.5 border-t border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Core Engineering & Academic Highlights
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.highlights.map((highlight, hIdx) => (
                    <span
                      key={hIdx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md font-medium bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right 1 Column: Score & Analytical Foundation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-xl p-5 sm:p-6 bg-white dark:bg-gray-900/90 border border-gray-200/90 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500" />

              {/* Score Highlight - Reduced, elegant size */}
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-pink-50/30 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/20 border border-indigo-100/80 dark:border-indigo-800/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                  {t("credentials.gradeLabel", "Academic Score")}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {edu.grade}
                </div>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60">
                  First Class Degree
                </span>
              </div>

              {/* Foundation Narrative */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  {t("credentials.foundationTitle", "Engineering Foundation")}
                </h5>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t("credentials.foundationDesc")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
