import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiMessageCircle,
} from "react-icons/fi";
import profileData from "../data/profileData";

const Contact = () => {
  const { t } = useTranslation();
  const contact = profileData.contact;

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent"
        >
          {t("contact.heading")}
        </motion.h2>

        {/* Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <ContactItem
              icon={<FiMail />}
              label={t("contact.emailLabel")}
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
            <ContactItem
              icon={<FiPhone />}
              label={t("contact.phoneLabel")}
              value={contact.phone}
              href={`tel:${contact.phone}`}
            />
            <ContactItem
              icon={<FiMapPin />}
              label={t("contact.locationLabel")}
              value={t("contact.location")}
            />
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent successfully!");
            }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 p-8 rounded-2xl shadow-2xl space-y-6 border border-white/30"
          >
            <FloatingInput
              icon={<FiUser />}
              type="text"
              field="name"
              placeholder={t("contact.namePlaceholder")}
              focused={focused}
              setFocused={setFocused}
            />

            <FloatingInput
              icon={<FiMail />}
              type="email"
              field="email"
              placeholder={t("contact.emailPlaceholder")}
              focused={focused}
              setFocused={setFocused}
            />

            <FloatingTextarea
              icon={<FiMessageCircle />}
              field="message"
              placeholder={t("contact.messagePlaceholder")}
              focused={focused}
              setFocused={setFocused}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
            >
              {t("contact.send")}
            </motion.button>
          </motion.form>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738.320234519448!2d75.85772755!3d22.71956845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fdad0372f36f%3A0x6c196b881f1b3c65!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1621234567890"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Indore Map"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, label, value, href }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-start gap-4 p-4 rounded-xl bg-white/70 dark:bg-gray-800/60 shadow-md border border-gray-200 dark:border-gray-700 transition"
  >
    <div className="text-indigo-600 dark:text-indigo-400 text-2xl">{icon}</div>
    <div>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">{value}</p>
      )}
    </div>
  </motion.div>
);

const FloatingInput = ({ icon, type, field, placeholder, focused, setFocused }) => (
  <div className="relative">
    <div className="absolute top-4 left-3 text-gray-400">{icon}</div>
    <input
      type={type}
      name={field}
      onFocus={() => setFocused({ ...focused, [field]: true })}
      onBlur={(e) => setFocused({ ...focused, [field]: !!e.target.value })}
      className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
    <label
      className={`absolute left-10 top-3 transition-all duration-300 text-gray-400 pointer-events-none ${
        focused[field] ? "opacity-0" : "opacity-100"
      }`}
    >
      {placeholder}
    </label>
  </div>
);

const FloatingTextarea = ({ icon, field, placeholder, focused, setFocused }) => (
  <div className="relative">
    <div className="absolute top-4 left-3 text-gray-400">{icon}</div>
    <textarea
      name={field}
      rows="4"
      onFocus={() => setFocused({ ...focused, [field]: true })}
      onBlur={(e) => setFocused({ ...focused, [field]: !!e.target.value })}
      className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
    <label
      className={`absolute left-10 top-3 transition-all duration-300 text-gray-400 pointer-events-none ${
        focused[field] ? "opacity-0" : "opacity-100"
      }`}
    >
      {placeholder}
    </label>
  </div>
);

export default Contact;
