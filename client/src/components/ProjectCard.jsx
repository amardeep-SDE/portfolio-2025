import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import styled from "styled-components";

// 🎯 Return MERN icon image URLs for a project
const getProjectIcons = (titleKey) => {
  const icons = {
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    mongo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
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
    <StyledWrapper>
      <motion.div
        className="flip-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flip-card-inner">
          {/* Front */}
          <div className="flip-card-front">
            <div className="icon-row">
              {techIcons.map((src, idx) => (
                <img key={idx} src={src} alt="tech-icon" className="tech-icon" />
              ))}
            </div>
            <h3>{t(project.titleKey)}</h3>
            <div className="subtitle">MERN Stack Project</div>
          </div>

          {/* Back */}
          <div className="flip-card-back">
            <h3>{t(project.titleKey)}</h3>
            <p>{t(project.descriptionKey)}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="view-link"
            >
              {t("projects.viewProject")}
            </a>
          </div>
        </div>
      </motion.div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  perspective: 1500px;

  .flip-card {
    width: 100%;
    height: 330px;
    border-radius: 16px;
    transform-style: preserve-3d;
    position: relative;
    transition: transform 0.8s ease;
    cursor: pointer;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    border-radius: 16px;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .flip-card-front {
    background: linear-gradient(135deg, #eef2ff, #dbeafe);
    color: #1f2937;
    gap: 0.75rem;
  }

  .icon-row {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .tech-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  .subtitle {
    font-size: 0.9rem;
    font-weight: 400;
    color: #374151;
    opacity: 0.9;
  }

  .flip-card-back {
    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
    color: #ffffff;
    transform: rotateY(180deg);
  }

  .flip-card-back p {
    font-size: 0.95rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    padding: 0 10px;
  }

  .view-link {
    background-color: #ffffff;
    color: #1e3a8a;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.3s;
  }

  .view-link:hover {
    background-color: #c7d2fe;
  }

  @media (prefers-color-scheme: dark) {
    .flip-card-front {
      background: linear-gradient(135deg, #1f2937, #111827);
      color: #f3f4f6;
    }

    .flip-card-back {
      background: linear-gradient(135deg, #0f172a, #1e3a8a);
    }

    .subtitle {
      color: #9ca3af;
    }

    .view-link {
      background-color: #f3f4f6;
      color: #1e40af;
    }

    .view-link:hover {
      background-color: #dbeafe;
    }
  }
`;

export default ProjectCard;
