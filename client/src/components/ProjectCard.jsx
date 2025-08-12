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
        whileHover={{ scale: 1.05, rotateX: 3, rotateY: 3 }}
      >
        <div className="content">
          <div className="icon-row">
            {techIcons.map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
                className="icon-wrapper"
              >
                <img src={src} alt="tech-icon" className="tech-icon" />
              </motion.div>
            ))}
          </div>

          <h3 className="title">{t(project.titleKey)}</h3>
          <p className="desc">{t(project.descriptionKey)}</p>

          <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="button"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("projects.viewProject")}
          </motion.a>
        </div>
      </motion.div>
    </CardWrapper>
  );
};

export default ProjectCard;

const CardWrapper = styled.div`
  .card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    padding: 2rem;
    width: 100%;
    height: 100%;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
    transform-style: preserve-3d;
    text-align: center;
    color: #f9fafb;
    position: relative;
    overflow: hidden;
  }

  /* Glow effect */
  .card::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      #60a5fa,
      #3b82f6,
      #8b5cf6,
      #ec4899,
      #f43f5e,
      #f97316,
      #60a5fa
    );
    animation: spin 8s linear infinite;
    z-index: 0;
    opacity: 0.2;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .icon-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .icon-wrapper {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }

  .tech-icon {
    width: 38px;
    height: 38px;
    opacity: 0.95;
    transition: transform 0.2s ease-in-out;
  }

  .title {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #ffffff;
  }

  .desc {
    font-size: 1rem;
    line-height: 1.6;
    color: #d1d5db;
    max-width: 85%;
  }

  .button {
    margin-top: 1rem;
    padding: 0.65rem 1.5rem;
    border-radius: 14px;
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 4px 18px rgba(59, 130, 246, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: none;
  }

  .button:hover {
    background: linear-gradient(90deg, #2563eb, #60a5fa);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
  }

  @media (prefers-color-scheme: light) {
    .card {
      background: rgba(255, 255, 255, 0.95);
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
