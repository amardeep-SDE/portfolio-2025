import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import profileData from "../data/profileData";
import ProjectCard from "../components/ProjectCard";
import {
  FiShield,
  FiVideo,
  FiCreditCard,
  FiZap,
  FiSliders,
  FiCheckCircle,
  FiLayers,
  FiMinimize2,
  FiTrendingUp,
  FiActivity,
  FiCpu,
  FiSearch,
  FiX,
  FiExternalLink,
  FiBriefcase,
} from "react-icons/fi";

const Projects = () => {
  const { t } = useTranslation();
  const { projects } = profileData;
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  const companyFilters = [
    { id: "all", label: "All Projects" },
    { id: "Suffescom Solutions Inc", label: "Suffescom Solutions" },
    { id: "Codeverse IT Pvt. Ltd.", label: "Codeverse IT" },
    { id: "Encanto Technologies LLP", label: "Encanto Tech" },
  ];

  // 1. Core Architectural Modules Delivered Across 3+ Years
  const architectureHighlights = [
    {
      icon: <FiShield className="text-indigo-600 dark:text-indigo-400 text-lg" />,
      title: "Role-Based Access Control (RBAC)",
      desc: "Multi-tier permissions across Admin, Organization, B2B, and Employee modules with JWT-protected routes and tenant isolation.",
      badge: "RBAC & Protected Routes",
      gradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
      borderColor: "border-indigo-200/80 dark:border-indigo-800/60",
    },
    {
      icon: <FiVideo className="text-emerald-600 dark:text-emerald-400 text-lg" />,
      title: "Real-Time Comms & Video Calling",
      desc: "Integrated Agora SDK for encrypted video meetings and Socket.IO for low-latency live messaging, room events, and alert broadcasts.",
      badge: "Agora SDK & Socket.IO",
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      borderColor: "border-emerald-200/80 dark:border-emerald-800/60",
    },
    {
      icon: <FiCreditCard className="text-pink-600 dark:text-pink-400 text-lg" />,
      title: "Payment Gateway Integration",
      desc: "Integrated secure checkout workflows, transaction state machines, idempotent webhook listeners, and automatic invoice generation.",
      badge: "Payment Gateways & Webhooks",
      gradient: "from-pink-500/10 via-rose-500/5 to-transparent",
      borderColor: "border-pink-200/80 dark:border-pink-800/60",
    },
    {
      icon: <FiSliders className="text-cyan-600 dark:text-cyan-400 text-lg" />,
      title: "Enterprise Dashboards & Workflows",
      desc: "Built scalable management interfaces, multi-step document verification flows, audit logs, and interactive data analytics views.",
      badge: "B2B & B2C Enterprise UI",
      gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
      borderColor: "border-cyan-200/80 dark:border-cyan-800/60",
    },
  ];

  // 2. Curated & Solid Production Performance Optimization Pillars
  const optimizationHighlights = [
    {
      icon: <FiCpu className="text-teal-600 dark:text-teal-400 text-lg" />,
      title: "React.memo & Memoization",
      desc: "Prevented unnecessary re-renders in heavy forms & tables using React.memo, useMemo, and useCallback. Profiled with React DevTools for 60 FPS smooth rendering.",
      gradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
      borderColor: "border-teal-200/80 dark:border-teal-800/60",
    },
    {
      icon: <FiMinimize2 className="text-amber-600 dark:text-amber-400 text-lg" />,
      title: "Code Splitting & Lazy Loading",
      desc: "Employed React.lazy & Suspense for route-based chunking and tree-shaking, slashing initial JavaScript payload and deferred loading heavy vendor modules.",
      gradient: "from-amber-500/10 via-yellow-500/5 to-transparent",
      borderColor: "border-amber-200/80 dark:border-amber-800/60",
    },
    {
      icon: <FiZap className="text-rose-600 dark:text-rose-400 text-lg" />,
      title: "TanStack Query & Data Caching",
      desc: "Implemented server-state caching with TanStack Query (React Query) using stale-while-revalidate, background re-fetching, and optimistic updates to eliminate waterfalls.",
      gradient: "from-rose-500/10 via-red-500/5 to-transparent",
      borderColor: "border-rose-200/80 dark:border-rose-800/60",
    },
    {
      icon: <FiSearch className="text-purple-600 dark:text-purple-400 text-lg" />,
      title: "Debouncing & Server Pagination",
      desc: "Debounced search inputs & filter controls to eliminate API hammering. Leveraged server-side pagination, sorting & virtual scrolling for high-volume datasets.",
      gradient: "from-purple-500/10 via-violet-500/5 to-transparent",
      borderColor: "border-purple-200/80 dark:border-purple-800/60",
    },
  ];

  // 3. Impact Metrics Summary
  const impactMetrics = [
    { label: "Initial JS Payload", value: "~40% Less", detail: "React.lazy & Tree Shaking" },
    { label: "Page Load Speedup", value: "~30% Faster", detail: "Suspense & Route Chunks" },
    { label: "Re-Render Overhead", value: "Zero Jitter", detail: "React.memo & useCallback" },
    { label: "Network Optimization", value: "~50% Fewer Hits", detail: "TanStack Caching & Debounce" },
  ];

  const filteredProjects =
    selectedCompany === "all"
      ? projects
      : projects.filter((p) => p.company === selectedCompany);

  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-6 overflow-hidden
                 bg-gradient-to-b from-[#f5f3ff] via-[#faf5ff] to-[#ede9fe]
                 dark:from-[#0d091e] dark:via-[#130d29] dark:to-[#0a0718]
                 transition-colors duration-300"
    >
      {/* Ambient Violet Studio Glows */}
      <div className="absolute top-1/3 -left-28 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-2.5">
            <FiLayers /> 3+ Years Production Highlights & Optimization
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t("projects.heading", "Featured Projects")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto"
          >
            Enterprise platforms, client web systems, and high-impact full-stack solutions optimized for scale and speed
          </motion.p>
        </div>

        {/* 🌟 3+ Years Key Capabilities & Optimization Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mb-14 p-5 sm:p-7 rounded-2xl bg-white/95 dark:bg-gray-900/85 backdrop-blur-xl border border-gray-200/90 dark:border-gray-800 shadow-sm"
        >
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiCheckCircle className="text-emerald-500" />
                Key Engineering & Optimization Highlights
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Core architectural patterns, performance engineering, and full-stack optimizations delivered across 8 platforms
              </p>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 self-start sm:self-auto shrink-0 flex items-center gap-1.5">
              <FiActivity className="text-indigo-500" /> 3+ Years Production Tested
            </span>
          </div>

          {/* Metric KPI Chips */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
            {impactMetrics.map((kpi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 18, delay: idx * 0.06 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-3 rounded-xl bg-gray-50/90 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-indigo-400/40 transition-all duration-300 group cursor-default"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                    {kpi.label}
                  </span>
                  <FiTrendingUp className="text-emerald-500 text-xs group-hover:scale-125 transition-transform" />
                </div>
                <div className="text-lg sm:text-xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {kpi.value}
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                  {kpi.detail}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Section 1: Architecture & Business Capabilities */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <FiShield /> Core Architecture & Scalable Modules
              </span>
              <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {architectureHighlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, delay: idx * 0.07 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`group relative p-4 rounded-xl border ${item.borderColor} bg-gradient-to-br ${item.gradient} bg-white/70 dark:bg-gray-800/50 backdrop-blur-md shadow-2xs hover:shadow-xl hover:border-indigo-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default`}
                >
                  {/* Shimmer Light Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none z-10" />

                  <div className="relative z-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-xs flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white tracking-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Solid Production Performance & Optimization Pillars */}
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <FiZap /> Production Performance & Optimization Pillars
              </span>
              <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {optimizationHighlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, delay: idx * 0.07 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`group relative p-4 rounded-xl border ${item.borderColor} bg-gradient-to-br ${item.gradient} bg-white/70 dark:bg-gray-800/50 backdrop-blur-md shadow-2xs hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default`}
                >
                  {/* Shimmer Light Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none z-10" />

                  <div className="relative z-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-xs flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white tracking-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Company Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {companyFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCompany(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer
                ${
                  selectedCompany === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid - items-stretch to enforce equal row card heights */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full flex"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onOpenModal={(proj) => setSelectedModalProject(proj)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 🌟 Modern Project Details Open Modal Dialog */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalProject(null)}
              className="absolute inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/90 dark:border-gray-700/80 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Image Banner Header */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gray-900 shrink-0">
                <img
                  src={selectedModalProject.image}
                  alt={t(selectedModalProject.titleKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedModalProject(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer"
                >
                  <FiX className="text-base" />
                </button>

                {/* Company Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <FiBriefcase className="text-indigo-500 text-xs" />
                  <span>{selectedModalProject.company}</span>
                </div>

                {/* Title and Subtitle */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                    {t(selectedModalProject.titleKey)}
                  </h3>
                  {selectedModalProject.subtitle && (
                    <p className="text-xs sm:text-sm text-indigo-300 font-medium">
                      {selectedModalProject.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">
                    Architecture & Scope Overview
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {t(selectedModalProject.descriptionKey)}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                    Technologies & Modules Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedModalProject.tags &&
                      selectedModalProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-lg font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Modal Footer with Actions */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <FiCheckCircle /> Production Deployed Platform
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedModalProject(null)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                    >
                      Close
                    </button>
                    {selectedModalProject.link && selectedModalProject.link !== "#" ? (
                      <a
                        href={selectedModalProject.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/25 hover:scale-105 transition-all"
                      >
                        <span>Visit Live Site</span>
                        <FiExternalLink className="text-xs" />
                      </a>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        Enterprise Access
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
