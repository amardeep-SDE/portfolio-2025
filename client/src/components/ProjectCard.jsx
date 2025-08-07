import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import styled from "styled-components";

const getProjectIcons = (titleKey) => {
  const icons = {
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    mongo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  };

  const lower = titleKey.toLowerCase();
  const stack = [];

  if (lower.includes("doctor") || lower.includes("blog") || lower.includes("ecommerce")) {
    stack.push(icons.react, icons.node, icons.mongo, icons.express);
  } else if (lower.includes("portfolio")) {
    stack.push(icons.react);
  } else {
    stack.push(icons.react, icons.node, icons.mongo);
  }

  return stack;
};

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const techIcons = getProjectIcons(project.titleKey);

  return (
    <CardWrapper>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2 }}
      >
        <div className="content">
          <div className="icon-row">
            {techIcons.map((src, idx) => (
              <motion.img
                key={idx}
                src={src}
                alt="tech-icon"
                className="tech-icon"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
          <h3 className="title">{t(project.titleKey)}</h3>
          <p className="desc">{t(project.descriptionKey)}</p>

          <a href={project.link} target="_blank" rel="noreferrer" className="button">
            {t("projects.viewProject")}
          </a>
        </div>
      </motion.div>
    </CardWrapper>
  );
};

export default ProjectCard;

const CardWrapper = styled.div`
  .card {
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    height: 100%;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    transform-style: preserve-3d;
    text-align: center;
    color: #f9fafb;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .icon-row {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .tech-icon {
    width: 36px;
    height: 36px;
    opacity: 0.9;
    filter: drop-shadow(0 0 2px rgba(0,0,0,0.1));
    transition: all 0.2s ease-in-out;
  }

  .title {
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #ffffff;
  }

  .desc {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #d1d5db;
    max-width: 80%;
  }

  .button {
    margin-top: 0.8rem;
    padding: 0.6rem 1.4rem;
    border-radius: 12px;
    background: linear-gradient(to right, #60a5fa, #3b82f6);
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(59, 130, 246, 0.45);
  }

  @media (prefers-color-scheme: light) {
    .card {
      background: rgba(255, 255, 255, 0.9);
      color: #1f2937;
    }
    .title {
      color: #111827;
    }
    .desc {
      color: #4b5563;
    }
  }
`;
