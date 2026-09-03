import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiUser, FiMessageCircle, FiClock, FiSend } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import profileData from "../data/profileData";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill all fields!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    toast.success("Message sent successfully!");
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
      <Toaster position="top-right" reverseOrder={false} />

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
            />
            <ContactItem
              icon={<FiMail />}
              label={t("contact.altEmailLabel", "Alternate Email")}
              value={contact.alternateEmail}
              href={`mailto:${contact.alternateEmail}`}
            />
            <ContactItem
              icon={<FiPhone />}
              label={t("contact.phoneLabel", "Phone")}
              value={contact.phone}
              href={`tel:${contact.phone}`}
            />
            <ContactItem
              icon={<FiClock />}
              label={t("contact.noticeLabel", "Availability")}
              value={t("contact.noticeValue", "1 Month Notice Period")}
            />
            <ContactItem
              icon={<FiMapPin />}
              label={t("contact.locationLabel", "Location")}
              value={t("contact.location", "Chandigarh, India")}
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
            />

            <FloatingTextarea
              icon={<FiMessageCircle />}
              field="message"
              placeholder={t("contact.messagePlaceholder", "Your Message")}
              focused={focused}
              setFocused={setFocused}
              value={formData.message}
              onChange={handleChange}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiSend className="text-sm" />
              <span>{t("contact.send", "Send Message")}</span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, label, value, href }) => (
  <motion.div
    whileHover={{ y: -3, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
    className="
      group relative overflow-hidden
      flex items-center gap-3.5 p-3.5
      rounded-xl
      bg-white/80 dark:bg-gray-800/80
      backdrop-blur-lg
      border border-gray-200/70 dark:border-gray-700/60
      shadow-xs hover:shadow-md transition-all duration-300
    "
  >
    {/* Subtle Glow on hover */}
    <span
      className="
      absolute inset-0 opacity-0 group-hover:opacity-100
      bg-gradient-to-r from-indigo-500/5 to-pink-500/5
      transition duration-300
    "
    />

    {/* Compact Icon badge */}
    <div
      className="
      relative z-10
      w-10 h-10 flex items-center justify-center
      rounded-lg
      bg-gradient-to-br from-indigo-600 to-pink-500
      text-white text-base
      shadow-xs shrink-0
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
  </motion.div>
);

const FloatingInput = ({
  icon,
  type,
  field,
  placeholder,
  focused,
  setFocused,
  value,
  onChange,
}) => (
  <div className="relative">
    <div className="absolute top-3 left-3 text-gray-400 text-sm">{icon}</div>
    <input
      type={type}
      name={field}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused({ ...focused, [field]: true })}
      onBlur={(e) => setFocused({ ...focused, [field]: !!e.target.value })}
      className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
    />
    <label
      className={`absolute left-9 top-2.5 text-xs sm:text-sm transition-all duration-300 text-gray-400 pointer-events-none ${
        focused[field] || value ? "opacity-0" : "opacity-100"
      }`}
    >
      {placeholder} <span className="text-red-500">*</span>
    </label>
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
}) => (
  <div className="relative">
    <div className="absolute top-3 left-3 text-gray-400 text-sm">{icon}</div>
    <textarea
      name={field}
      rows="3"
      value={value}
      onChange={onChange}
      onFocus={() => setFocused({ ...focused, [field]: true })}
      onBlur={(e) => setFocused({ ...focused, [field]: !!e.target.value })}
      className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition resize-none"
    />
    <label
      className={`absolute left-9 top-2.5 text-xs sm:text-sm transition-all duration-300 text-gray-400 pointer-events-none ${
        focused[field] || value ? "opacity-0" : "opacity-100"
      }`}
    >
      {placeholder}
    </label>
  </div>
);

export default Contact;
