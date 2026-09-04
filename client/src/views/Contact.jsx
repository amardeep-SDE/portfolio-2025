import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiMessageCircle,
  FiClock,
  FiSend,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import profileData from "../data/profileData";
import RocketCelebration from "../components/RocketCelebration";
import {
  playCelestialChime,
  playLuxuryGlassChime,
} from "../utils/audioEffects";

const Contact = () => {
  const { t } = useTranslation();
  const contact = profileData.contact;

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showRocketCelebration, setShowRocketCelebration] = useState(false);
  const [celebrationName, setCelebrationName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = t("contact.errors.nameRequired", "Name is required");
    }

    if (!email.trim()) {
      newErrors.email = t("contact.errors.emailRequired", "Email is required");
    } else if (!validateEmail(email)) {
      newErrors.email = t("contact.errors.emailInvalid", "Please enter a valid email address");
    }

    if (!message.trim()) {
      newErrors.message = t("contact.errors.messageRequired", "Message cannot be empty");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success: play Rocket Victory Chime & launch rocket celebration modal
    playCelestialChime();
    setErrors({});
    setCelebrationName(name);
    setShowRocketCelebration(true);
    setFormData({ name: "", email: "", message: "" });
    setFocused({ name: false, email: false, message: false });
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 overflow-hidden
                 bg-gradient-to-br from-[#fff1f2] via-[#fdf2f8] to-[#ffe4e6]
                 dark:from-[#180811] dark:via-[#220c19] dark:to-[#14060e]
                 transition-colors duration-300"
    >
      {/* Rocket & Fireworks Celebration Modal */}
      <RocketCelebration
        isActive={showRocketCelebration}
        senderName={celebrationName}
        onClose={() => setShowRocketCelebration(false)}
      />

      {/* Ambient Rose & Ruby Glows */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 bg-rose-500/10 dark:bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 bg-pink-500/10 dark:bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-12 z-10">
        {/* Section Header */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight"
          >
            {t("contact.heading", "Contact Me")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto text-center"
          >
            {t("contact.subheading", "Let's connect and discuss opportunities")}
          </motion.p>
        </div>

        {/* 2-Column Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Contact Info Items */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <ContactItem
              icon={<FiMail />}
              label={t("contact.emailLabel", "Email")}
              value={contact.email}
              href={`mailto:${contact.email}`}
              copyable={true}
            />
            <ContactItem
              icon={<FiMail />}
              label={t("contact.altEmailLabel", "Alternate Email")}
              value={contact.alternateEmail}
              href={`mailto:${contact.alternateEmail}`}
              copyable={true}
            />
            <ContactItem
              icon={<FiPhone />}
              label={t("contact.phoneLabel", "Phone")}
              value={contact.phone}
              href={`tel:${contact.phone}`}
              copyable={true}
            />
            <ContactItem
              icon={<FiClock />}
              label={t("contact.noticeLabel", "Availability")}
              value={t("contact.noticeValue", "1 Month Notice Period")}
              copyable={false}
            />
            <ContactItem
              icon={<FiMapPin />}
              label={t("contact.locationLabel", "Location")}
              value={t("contact.location", "Chandigarh, India")}
              copyable={false}
            />
          </motion.div>

          {/* Right: Compact Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-5 sm:p-6 rounded-2xl shadow-lg border border-white/40 dark:border-gray-800 space-y-4"
          >
            <FloatingInput
              icon={<FiUser />}
              type="text"
              field="name"
              placeholder={t("contact.namePlaceholder", "Your Name")}
              focused={focused}
              setFocused={setFocused}
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <FloatingInput
              icon={<FiMail />}
              type="email"
              field="email"
              placeholder={t("contact.emailPlaceholder", "Your Email")}
              focused={focused}
              setFocused={setFocused}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FloatingTextarea
              icon={<FiMessageCircle />}
              field="message"
              placeholder={t("contact.messagePlaceholder", "Your Message")}
              focused={focused}
              setFocused={setFocused}
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 w-1/3 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out pointer-events-none" />
              <FiSend className="text-sm group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200 relative z-10" />
              <span className="relative z-10">{t("contact.send", "Send Message")}</span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, label, value, href, copyable = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(value);
      playLuxuryGlassChime();
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      // fallback
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2.5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="
        group relative overflow-hidden
        flex items-center justify-between gap-3 p-3.5
        rounded-2xl
        bg-white/85 dark:bg-gray-800/85
        backdrop-blur-lg
        border border-gray-200/80 dark:border-gray-700/70
        shadow-xs hover:shadow-md hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-300
      "
    >
      {/* Subtle Glow on hover */}
      <span
        className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-indigo-500/5 to-pink-500/5
        transition duration-300 pointer-events-none
      "
      />

      <div className="flex items-center gap-3.5 min-w-0 flex-1 relative z-10">
        {/* Compact Icon badge */}
        <div
          className="
          relative z-10
          w-10 h-10 flex items-center justify-center
          rounded-xl
          bg-gradient-to-br from-indigo-600 to-pink-500
          text-white text-base
          shadow-xs shrink-0 group-hover:scale-105 transition-transform
        "
        >
          {icon}
        </div>

        {/* Text content */}
        <div className="relative z-10 min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-400 font-semibold">
            {label}
          </p>

          {href ? (
            <a
              href={href}
              className="
                block text-xs sm:text-sm font-semibold
                text-gray-900 dark:text-white
                hover:text-indigo-600 dark:hover:text-indigo-400
                transition truncate
              "
              rel="noopener noreferrer"
            >
              {value}
            </a>
          ) : (
            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
              {value}
            </p>
          )}
        </div>
      </div>

      {/* 1-Click Copy Button */}
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          className={`relative z-10 px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1 text-xs font-semibold shrink-0 active:scale-95 ${
            copied
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 shadow-xs"
              : "bg-gray-100/90 dark:bg-gray-700/60 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-gray-200/80 dark:border-gray-600/50"
          }`}
          title={`Copy ${label} to clipboard`}
        >
          {copied ? (
            <>
              <FiCheck className="text-emerald-500 text-xs animate-bounce" />
              <span className="text-[10px] font-bold">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy className="text-xs" />
              <span className="hidden sm:inline-block text-[10px]">Copy</span>
            </>
          )}
        </button>
      )}
    </motion.div>
  );
};

const FloatingInput = ({
  icon,
  type,
  field,
  placeholder,
  focused,
  setFocused,
  value,
  onChange,
  error,
}) => (
  <div className="relative">
    <div className="relative">
      <div className="absolute top-3 left-3 text-gray-400 text-sm">{icon}</div>
      <input
        type={type}
        name={field}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused({ ...focused, [field]: true })}
        onBlur={(e) => setFocused({ ...focused, [field]: !!e.target.value })}
        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white focus:outline-none transition ${error
            ? "border-rose-500 dark:border-rose-500 focus:ring-2 focus:ring-rose-500/40"
            : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500/50"
          }`}
      />
      <label
        className={`absolute left-9 top-2.5 text-xs sm:text-sm transition-all duration-300 pointer-events-none ${error ? "text-rose-400" : "text-gray-400"
          } ${focused[field] || value ? "opacity-0" : "opacity-100"}`}
      >
        {placeholder} <span className="text-red-500">*</span>
      </label>
    </div>
    {error && (
      <p className="text-[11.5px] text-rose-500 dark:text-rose-400 font-semibold mt-1 pl-1 flex items-center gap-1.5">
        <span>⚠️</span>
        <span>{error}</span>
      </p>
    )}
  </div>
);

const FloatingTextarea = ({
  icon,
  field,
  placeholder,
  focused,
  setFocused,
  value,
  onChange,
  error,
}) => (
  <div className="relative">
    <div className="relative">
      <div className="absolute top-3 left-3 text-gray-400 text-sm">{icon}</div>
      <textarea
        name={field}
        rows="3"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused({ ...focused, [field]: true })}
        onBlur={(e) => setFocused({ ...focused, [field]: !!e.target.value })}
        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white focus:outline-none transition resize-none ${error
            ? "border-rose-500 dark:border-rose-500 focus:ring-2 focus:ring-rose-500/40"
            : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500/50"
          }`}
      />
      <label
        className={`absolute left-9 top-2.5 text-xs sm:text-sm transition-all duration-300 pointer-events-none ${error ? "text-rose-400" : "text-gray-400"
          } ${focused[field] || value ? "opacity-0" : "opacity-100"}`}
      >
        {placeholder} <span className="text-red-500">*</span>
      </label>
    </div>
    {error && (
      <p className="text-[11.5px] text-rose-500 dark:text-rose-400 font-semibold mt-1 pl-1 flex items-center gap-1.5">
        <span>⚠️</span>
        <span>{error}</span>
      </p>
    )}
  </div>
);

export default Contact;
