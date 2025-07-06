import React from "react";
import profileData from "../data/profileData";
import SkillCard from "../components/SkillCard";
import { useTranslation } from "react-i18next";

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-16 bg-gradient-to-br from-[#ede7f6] via-[#e3f2fd] to-[#e8eaf6] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t("skills.heading")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 justify-center">
          {profileData.skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
