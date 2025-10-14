import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiUser, FiMessageCircle } from "react-icons/fi";
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

    // Agar sab valid hai
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
    setFocused({ name: false, email: false, message: false });

    // Yahan API call ya email sending logic add kar sakte ho
  };

  return (
    <section id="contact" className="relative py-20 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-6xl mx-auto space-y-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent"
        >
          {t("contact.heading")}
        </motion.h2>

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
              icon={<FiMail />}
              label={t("contact.altEmailLabel")}   // translation key for second label
              value={contact.alternateEmail}       // new email field
              href={`mailto:${contact.alternateEmail}`}
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
            onSubmit={handleSubmit}
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
              value={formData.name}
              onChange={handleChange}
            />

            <FloatingInput
              icon={<FiMail />}
              type="email"
              field="email"
              placeholder={t("contact.emailPlaceholder")}
              focused={focused}
              setFocused={setFocused}
              value={formData.email}
              onChange={handleChange}
            />

            <FloatingTextarea
              icon={<FiMessageCircle />}
              field="message"
              placeholder={t("contact.messagePlaceholder")}
              focused={focused}
              setFocused={setFocused}
              value={formData.message}
              onChange={handleChange}
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
      </div>
    </section>
  );
};

// ContactItem, FloatingInput, FloatingTextarea components same as before


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
          className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition block"
          // target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">{value}</p>
      )}
    </div>
  </motion.div>
);


const FloatingInput = ({ icon, type, field, placeholder, focused, setFocused, value, onChange }) => (
  <div className="relative">
    <div className="absolute top-4 left-3 text-gray-400">{icon}</div>
    <input
      type={type}
      name={field}
      value={value}              // <-- controlled
      onChange={onChange}        // <-- controlled
      onFocus={() => setFocused({ ...focused, [field]: true })}
      onBlur={(e) => setFocused({ ...focused, [field]: !!e.target.value })}
      className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
    <label
      className={`absolute left-10 top-3 transition-all duration-300 text-gray-400 pointer-events-none ${focused[field] ? "opacity-0" : "opacity-100"
        }`}
    >
      {placeholder} <span className="text-red-500">*</span>
    </label>
  </div>
);

const FloatingTextarea = ({ icon, field, placeholder, focused, setFocused, value, onChange }) => (
  <div className="relative">
    <div className="absolute top-4 left-3 text-gray-400">{icon}</div>
    <textarea
      name={field}
      rows="4"
      value={value}              // <-- controlled
      onChange={onChange}        // <-- controlled
      onFocus={() => setFocused({ ...focused, [field]: true })}
      onBlur={(e) => setFocused({ ...focused, [field]: !!e.target.value })}
      className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
    <label
      className={`absolute left-10 top-3 transition-all duration-300 text-gray-400 pointer-events-none ${focused[field] ? "opacity-0" : "opacity-100"
        }`}
    >
      {placeholder}
    </label>
  </div>
);

export default Contact;
