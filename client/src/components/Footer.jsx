import React from "react";
import { useTranslation } from "react-i18next";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import profileData from "../data/profileData";
import styled from "styled-components";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
const Footer = () => {
  const { t } = useTranslation();
  const { email, phone, social } = profileData.contactInfo;

  return (
    <StyledWrapper>
      <footer className="bg-gray-100 dark:bg-gray-900 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Contact Info */}
          <div className="text-center md:text-left space-y-2">
            <p className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <FiMail className="text-indigo-600 dark:text-indigo-400" />
              <a href={`mailto:${email}`} className="hover:underline">{email}</a>
            </p>
            <p className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <FiPhone className="text-indigo-600 dark:text-indigo-400" />
              <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
            </p>
          </div>

          {/* Social Icons */}
          <div className="card">
            <div className="socialContainer containerThree">
              <a href={social.linkedin} target="_blank" rel="noreferrer">
                <FiLinkedin className="icon" />
              </a>
            </div>
            <div className="socialContainer containerOne">
              <a href={social.github} target="_blank" rel="noreferrer">
                <FiGithub className="icon" />
              </a>
            </div>
            <div className="socialContainer containerTwo">
              <a href={social.twitter} target="_blank" rel="noreferrer">
                <FaTwitter className="icon" />
              </a>
            </div>
            <div className="socialContainer containerFour">
              <a href={social.facebook} target="_blank" rel="noreferrer">
                <FaFacebookF className="icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Amardeep Dwivedi. {t("footer.rights", "All rights reserved.")}
        </div>
      </footer>
    </StyledWrapper>
  );
};

export default Footer;
const StyledWrapper = styled.div`
  .card {
    display: flex;
    gap: 16px;
    padding-top: 1rem;
  }
  .socialContainer {
    width: 44px;
    height: 44px;
    background-color: #2c2c2c;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  .containerOne:hover {
    background-color: #d62976; /* GitHub pinky hover */
  }
  .containerTwo:hover {
    background-color: #00acee;
  }
  .containerThree:hover {
    background-color: #0072b1; /* LinkedIn blue */
  }
  .containerFour:hover {
    background-color: #128c7e;
  }
  .socialContainer:active {
    transform: scale(0.92);
  }
  .icon {
    color: #fff;
    font-size: 18px;
    animation: none;
  }
  .socialContainer:hover .icon {
    animation: slide-in-top 0.3s both;
  }
  @keyframes slide-in-top {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
