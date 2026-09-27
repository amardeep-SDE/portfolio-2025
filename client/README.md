<div align="center">

  # ⚡ Portfolio Client Application (React 19 + Vite)

  <p align="center">
    <strong>Frontend client for Amardeep Dwivedi's Developer Portfolio & Gemini AI Recruiter Copilot</strong>
  </p>

  <p align="center">
    <a href="https://portfolio-2025-g29b.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-Vercel-00C7B7?style=flat-square&logo=vercel&logoColor=white" alt="Live Demo" /></a>
    <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-7.0-646C9A?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Google_Gemini-API-8E75C2?style=flat-square&logo=google&logoColor=white" alt="Gemini" />
  </p>

</div>

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in this directory based on `.env.example`:
```bash
cp .env.example .env
```
Populate your Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get a free key from [Google AI Studio](https://aistudio.google.com/))*

### 3. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## 📦 Key Packages & Libraries

- **UI & Animation:** `react 19`, `framer-motion`, `tailwindcss`, `three`, `vanta`
- **AI Integration:** Google Gemini REST integration with streaming & candidate knowledge base
- **Internationalization:** `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- **Icons & Polish:** `react-icons`, `react-hot-toast`, `react-scroll`

---

## 🔗 Repository Root Documentation

For full details regarding production projects, architecture, recruiter highlights, and candidate profile, refer to the [Root README](../README.md).
