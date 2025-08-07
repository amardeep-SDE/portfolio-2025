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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
      >
        <div className="flip-card-inner">
          {/* Front */}
          <div className="flip-card-front">
            <motion.div className="icon-row" initial="hidden" animate="visible" variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}>
              {techIcons.map((src, idx) => (
                <motion.img
                  key={idx}
                  src={src}
                  alt="tech-icon"
                  className="tech-icon"
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.div>
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

export default ProjectCard;

const StyledWrapper = styled.div`
  perspective: 1500px;

  .flip-card {
    width: 100%;
    height: 340px;
    transform-style: preserve-3d;
    transition: transform 0.8s ease;
    cursor: pointer;
    border-radius: 20px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    border-radius: 20px;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .flip-card-front {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(12px);
    color: #1f2937;
    gap: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .flip-card-back {
    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
    color: #ffffff;
    transform: rotateY(180deg);
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
    width: 36px;
    height: 36px;
    object-fit: contain;
    transition: transform 0.3s;
  }

  .tech-icon:hover {
    transform: scale(1.2);
  }

  .subtitle {
    font-size: 0.9rem;
    font-weight: 400;
    color: #374151;
    opacity: 0.8;
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
    transition: background 0.3s, transform 0.2s;
  }

  .view-link:hover {
    background-color: #c7d2fe;
    transform: scale(1.05);
  }

  @media (prefers-color-scheme: dark) {
    .flip-card-front {
      background: rgba(31, 41, 55, 0.3);
      color: #f3f4f6;
      border: 1px solid rgba(255, 255, 255, 0.1);
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
