import React, { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage on first load
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") return true;
    if (storedTheme === "light") return false;
    // Default: check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="text-lg p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <BsSun /> : <BsMoon />}
    </button>
  );
};

export default ThemeToggle;
