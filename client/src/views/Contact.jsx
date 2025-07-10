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
    <section id="contact" className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white"
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
            className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg space-y-5"
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

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
            >
              {t("contact.send")}
            </button>
          </motion.form>
        </div>

        {/* Map Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738.320234519448!2d75.85772755!3d22.71956845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fdad0372f36f%3A0x6c196b881f1b3c65!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1621234567890"
            width="100%"
            height="300"
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
  <div className="flex items-start gap-4">
    <div className="text-indigo-600 dark:text-indigo-400 mt-1 text-2xl">{icon}</div>
    <div>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{label}</p>
      {href ? (
        <a
          href={href}
          className="text-gray-700 dark:text-gray-300 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">{value}</p>
      )}
    </div>
  </div>
);

const FloatingInput = ({ icon, type, field, placeholder, focused, setFocused }) => (
  <div className="relative">
    <div className="absolute top-4 left-3 text-gray-400">{icon}</div>
    <input
      type={type}
      name={field}
      onFocus={() => setFocused({ ...focused, [field]: true })}
      onBlur={(e) =>
        setFocused({ ...focused, [field]: !!e.target.value })
      }
      className="w-full pl-10 p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
      onBlur={(e) =>
        setFocused({ ...focused, [field]: !!e.target.value })
      }
      className="w-full pl-10 p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
