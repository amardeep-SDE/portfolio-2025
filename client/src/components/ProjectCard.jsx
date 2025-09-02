import React, { useRef } from "react";
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
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `rotateY(${x * 20}deg) rotateX(${y * -20}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
  };

  return (
    <CardWrapper>
      <motion.div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="glow-border" />
        <div className="content">
          <motion.div className="icon-row">
            {techIcons.map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.25, rotate: 8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="icon-wrapper"
              >
                <img src={src} alt="tech-icon" className="tech-icon" />
              </motion.div>
            ))}
          </motion.div>

          <motion.h3
            className="title"
            whileHover={{ textShadow: "0px 0px 15px rgba(96,165,250,0.9)" }}
          >
            {t(project.titleKey)}
          </motion.h3>
          <p className="desc">{t(project.descriptionKey)}</p>

          <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
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
  perspective: 1200px;

  .card {
    position: relative;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(160%);
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    height: 100%;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    transform-style: preserve-3d;
    text-align: center;
    color: #1f2937;
    overflow: hidden;
  }

  .glow-border {
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: 20px;
    background: linear-gradient(135deg, #93c5fd, #c4b5fd, #f9a8d4);
    background-size: 250% 250%;
    animation: borderGlow 10s ease infinite;
    z-index: 0;
    opacity: 0.6;
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

  @keyframes borderGlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .icon-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .icon-wrapper {
    background: rgba(255, 255, 255, 0.6);
    padding: 0.6rem;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,0.08);
    transition: all 0.25s ease;
  }

  .icon-wrapper:hover {
    box-shadow: 0 0 14px rgba(147, 197, 253, 0.6);
  }

  .tech-icon {
    width: 36px;
    height: 36px;
    opacity: 0.9;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
  }

  .desc {
    font-size: 0.95rem;
    color: #4b5563;
    max-width: 85%;
    line-height: 1.5;
  }

  .button {
    margin-top: 1rem;
    padding: 0.7rem 1.4rem;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    background: linear-gradient(90deg, #3b82f6, #93c5fd);
    color: #fff;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  }

  .button:hover {
    background: linear-gradient(90deg, #60a5fa, #3b82f6);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.35);
  }

  @media (prefers-color-scheme: dark) {
    .card {
      background: rgba(30, 41, 59, 0.85);
      color: #f9fafb;
    }
    .title { color: #f3f4f6; }
    .desc { color: #d1d5db; }
  }
`;

