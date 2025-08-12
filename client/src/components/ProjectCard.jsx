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
    card.style.transform = `rotateY(${x * 15}deg) rotateX(${y * -15}deg)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <CardWrapper>
      <motion.div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="glow-border" />
        <div className="content">
          <div className="icon-row">
            {techIcons.map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.2 }}
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
            whileHover={{ scale: 1.05 }}
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
  perspective: 1000px;

  .card {
    position: relative;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(25px);
    border-radius: 24px;
    padding: 2rem;
    width: 100%;
    height: 100%;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    transform-style: preserve-3d;
    text-align: center;
    color: #fff;
    overflow: hidden;
  }

  .glow-border {
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: 24px;
    background: linear-gradient(120deg, #60a5fa, #3b82f6, #8b5cf6, #ec4899);
    background-size: 300% 300%;
    animation: borderGlow 6s ease infinite;
    z-index: 0;
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
    background: rgba(255, 255, 255, 0.08);
    padding: 0.6rem;
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(0,0,0,0.25);
    transition: all 0.2s ease;
  }

  .icon-wrapper:hover {
    box-shadow: 0 0 15px rgba(96, 165, 250, 0.8);
  }

  .tech-icon {
    width: 38px;
    height: 38px;
    opacity: 0.95;
  }

  .title {
    font-size: 1.7rem;
    font-weight: 800;
    letter-spacing: -0.5px;
  }

  .desc {
    font-size: 1rem;
    color: #d1d5db;
    max-width: 85%;
  }

  .button {
    margin-top: 1rem;
    padding: 0.7rem 1.5rem;
    border-radius: 14px;
    border: 2px solid transparent;
    background: linear-gradient(#1e293b, #1e293b) padding-box,
                linear-gradient(90deg, #3b82f6, #60a5fa) border-box;
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
    transition: all 0.3s ease;
  }

  .button:hover {
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
    background: linear-gradient(#1e293b, #1e293b) padding-box,
                linear-gradient(90deg, #60a5fa, #3b82f6) border-box;
  }

  @media (prefers-color-scheme: light) {
    .card {
      background: rgba(255, 255, 255, 0.9);
      color: #1f2937;
    }
    .title { color: #111827; }
    .desc { color: #4b5563; }
  }
`;
