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
} from "react-icons/fi";

const Projects = () => {
  const { t } = useTranslation();
  const { projects } = profileData;
  const [selectedCompany, setSelectedCompany] = useState("all");

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
      badge: "React.memo • useMemo • useCallback",
      gradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
      borderColor: "border-teal-200/80 dark:border-teal-800/60",
    },
    {
      icon: <FiMinimize2 className="text-amber-600 dark:text-amber-400 text-lg" />,
      title: "Code Splitting & Lazy Loading",
      desc: "Employed React.lazy & Suspense for route-based chunking and tree-shaking, slashing initial JavaScript payload and deferred loading heavy vendor modules.",
      badge: "React.lazy • Suspense • Tree Shaking",
      gradient: "from-amber-500/10 via-yellow-500/5 to-transparent",
      borderColor: "border-amber-200/80 dark:border-amber-800/60",
    },
    {
      icon: <FiZap className="text-rose-600 dark:text-rose-400 text-lg" />,
      title: "TanStack Query & Data Caching",
      desc: "Implemented server-state caching with TanStack Query (React Query) using stale-while-revalidate, background re-fetching, and optimistic updates to eliminate waterfalls.",
      badge: "TanStack Query • Stale Caching",
      gradient: "from-rose-500/10 via-red-500/5 to-transparent",
      borderColor: "border-rose-200/80 dark:border-rose-800/60",
    },
    {
      icon: <FiSearch className="text-purple-600 dark:text-purple-400 text-lg" />,
      title: "Debouncing & Server Pagination",
      desc: "Debounced search inputs & filter controls to eliminate API hammering. Leveraged server-side pagination, sorting & virtual scrolling for high-volume datasets.",
      badge: "Debounce • Server Pagination • Virtualize",
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
                Core architectural patterns, performance engineering, and full-stack optimizations delivered across 7 platforms
              </p>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 self-start sm:self-auto shrink-0 flex items-center gap-1.5">
              <FiActivity className="text-indigo-500" /> 3+ Years Production Tested
            </span>
          </div>

          {/* Metric KPI Chips */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
            {impactMetrics.map((kpi, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-gray-50/90 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                    {kpi.label}
                  </span>
                  <FiTrendingUp className="text-emerald-500 text-xs" />
                </div>
                <div className="text-lg sm:text-xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {kpi.value}
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                  {kpi.detail}
                </span>
              </div>
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
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${item.borderColor} bg-gradient-to-br ${item.gradient} bg-white/70 dark:bg-gray-800/50 backdrop-blur-md shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-xs flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-700">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60">
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
                </div>
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
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${item.borderColor} bg-gradient-to-br ${item.gradient} bg-white/70 dark:bg-gray-800/50 backdrop-blur-md shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-xs flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-700">
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
                </div>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
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
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
