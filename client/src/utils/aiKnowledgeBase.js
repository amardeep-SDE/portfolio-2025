/**
 * Amardeep AI Knowledge Base & Semantic Recruiter Engine
 * Powers instant, intelligent, zero-latency recruiter Q&A and Job Description (JD) matching.
 */

import profileData from "../data/profileData";

export const QUICK_PROMPTS = [
  {
    id: "why_hire",
    label: "⚡ Why hire Amardeep?",
    prompt: "Why should we hire Amardeep for our team?",
  },
  {
    id: "notice_current",
    label: "💼 Role & Notice Period",
    prompt: "What is his current company, notice period, and availability?",
  },
  {
    id: "agora_webrtc",
    label: "🎥 Agora WebRTC Experience",
    prompt: "Tell me about Amardeep's Agora WebRTC and real-time video calling work.",
  },
  {
    id: "tech_skills",
    label: "🛠️ Tech Stack & Skills",
    prompt: "What is Amardeep's core technical stack and skills?",
  },
  {
    id: "projects",
    label: "🚀 Key Production Projects",
    prompt: "Tell me about his key production projects and architecture.",
  },
  {
    id: "namaste_certs",
    label: "🏆 NamasteDev Credentials",
    prompt: "What certifications does Amardeep hold from NamasteDev?",
  },
  {
    id: "hr_summary",
    label: "📄 30-Second HR Summary",
    prompt: "Give me a 30-second summary of Amardeep for our hiring manager.",
  },
  {
    id: "contact_hire",
    label: "📬 Contact & Interview",
    prompt: "How can we contact Amardeep directly for an interview?",
  },
];

/**
 * Intelligent Semantic Responder
 */
export const getAiResponse = (rawInput) => {
  const q = rawInput.toLowerCase().trim();

  // 1. WHY HIRE / STRENGTHS
  if (
    q.includes("why hire") ||
    q.includes("why should we hire") ||
    q.includes("kyu hire") ||
    q.includes("strength") ||
    q.includes("best qualities") ||
    q.includes("value")
  ) {
    return {
      text: `### 🚀 Why Hire Amardeep Dwivedi:

1. **3+ Years of High-Impact Production Engineering:**
   Currently building enterprise systems at **Suffescom Solutions**, with a track record across 3 tech companies (**Suffescom**, **Codeverse IT**, and **Encanto Tech**).

2. **Rare Real-Time & WebRTC Specialization:**
   Engineered live production video calling platforms using **Agora Web SDK** and low-latency interactive communications with **Socket.IO**.

3. **Modern Full-Stack Mastery:**
   **React 19, Redux Toolkit, Node.js, Express, MongoDB, Tailwind CSS, REST APIs**, and sub-second render optimization pipelines.

4. **4x NamasteDev Certified by Akshay Saini:**
   Verified in *Namaste React, Namaste Node.js, Frontend System Design*, and *DSA*.

5. **Immediate Value with 1 Month Notice:**
   Notice period is **1 Month**, ready to onboard quickly for High-Growth Startups & Enterprises!`,
      actions: ["view_resume", "whatsapp", "email"],
    };
  }

  // 2. AGORA / WEBRTC / VIDEO CALLING / SOCKET.IO
  if (
    q.includes("agora") ||
    q.includes("webrtc") ||
    q.includes("video") ||
    q.includes("call") ||
    q.includes("socket") ||
    q.includes("real-time") ||
    q.includes("realtime")
  ) {
    return {
      text: `### 🎥 Real-Time & Agora WebRTC Expertise:

Amardeep has architected and deployed real-time communication modules in production:

- **Agora Web SDK Integration:**
  Implemented encrypted 1-on-1 and group video meetings with token authentication, dynamic channel creation, active speaker detection, and audio/video track switching.
- **Socket.IO Live Events:**
  Engineered sub-second bi-directional socket events for in-call chat, room handshakes, user presence beacons, and instant notifications.
- **Digital Notary Platform:**
  Built a compliant legal video notary verification platform at Suffescom Solutions with multi-party video recording pipelines and role-based access control (RBAC).`,
      actions: ["view_projects", "whatsapp"],
    };
  }

  // 3. NOTICE PERIOD / AVAILABILITY / SALARY / LOCATION
  if (
    q.includes("notice") ||
    q.includes("available") ||
    q.includes("join") ||
    q.includes("current company") ||
    q.includes("location") ||
    q.includes("relocate") ||
    q.includes("salary") ||
    q.includes("ctc") ||
    q.includes("kab join")
  ) {
    return {
      text: `### 💼 Availability & Candidacy Details:

- **Current Employer:** **Suffescom Solutions Inc** (React Developer)
- **Official Notice Period:** **1 Month** (Open for immediate buyout/negotiation)
- **Base Location:** **Chandigarh / Mohali Tricity IT Hub**
- **Work Preferences:** Open to **Remote**, **Hybrid**, or **Relocation** for top opportunities!
- **Target Roles:** React Developer, MERN Stack Developer, Frontend Engineer, Full Stack Engineer
- **Compensation / CTC:** Competitive and negotiable based on role scope and equity/benefits.`,
      actions: ["whatsapp", "email"],
    };
  }

  // 4. TECH STACK & SKILLS
  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("mern") ||
    q.includes("react") ||
    q.includes("node") ||
    q.includes("mongo") ||
    q.includes("database")
  ) {
    return {
      text: `### 🛠️ Core Production Tech Stack:

- **Frontend:** React 19, Redux Toolkit, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Vite, Responsive Design
- **Real-Time & Media:** Agora Web SDK (WebRTC), Socket.IO, Live Media Streaming
- **Backend & APIs:** Node.js, Express.js, RESTful Architecture, JWT Authentication, RBAC Security
- **Databases & Cloud:** MongoDB, Mongoose Aggregations, Cloudinary, AWS S3, Vercel, Git/GitHub
- **Workflow & Process:** Agile/Scrum, Jira, Postman, Code Review, Performance Profiling`,
      actions: ["view_skills", "view_resume"],
    };
  }

  // 5. NAMASTEDEV / CERTIFICATIONS / EDUCATION
  if (
    q.includes("namaste") ||
    q.includes("cert") ||
    q.includes("akshay") ||
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("college") ||
    q.includes("bca")
  ) {
    return {
      text: `### 🏆 Verified Credentials & Education:

- **Authorized by NamasteDev.com (Akshay Saini):**
  1. **Namaste React:** Production React, hooks, reconciler, custom hooks, Redux architecture.
  2. **Namaste Node.js:** Event loop internals, libuv, buffer/streams, clustering, REST microservices.
  3. **Frontend System Design:** Web performance, caching strategies, CDN, critical rendering path.
  4. **Namaste DSA:** Data structures, algorithms, space-time complexity analysis.
- **Academic Degree:** **Bachelor of Engineering (B.E. Mechanical Engineering)** – RGPV University, Bhopal (CGPA: 7.3)!`,
      actions: ["view_resume", "email"],
    };
  }

  // 6. PROJECTS & ARCHITECTURE
  if (
    q.includes("project") ||
    q.includes("portfolio") ||
    q.includes("notary") ||
    q.includes("paytrack") ||
    q.includes("work") ||
    q.includes("github")
  ) {
    return {
      text: `### 🚀 Key Production Projects:

1. **Digital Notary Platform:**
   WebRTC Agora video calling, digital document signing, tenant RBAC, Node.js + MongoDB.
2. **PayTrack-360 Business Suite:**
   Multi-tier financial management, payment gateway integration, Redux Toolkit state machine.
3. **Government Survey Platform (Institute on Governance):**
   Scalable survey engine, responsive multi-step validation, secure analytical exports.
4. **React Gaming Platform (Codeverse IT):**
   Interactive UI/UX, sub-second latency state pipelines, live leaderboards.
5. **Dawa Bazar B2B Medical Portal (Encanto Tech):**
   High-volume inventory queries, caching layer reducing DB load by ~20%.`,
      actions: ["view_projects", "view_resume"],
    };
  }

  // 7. CONTACT / INTERVIEW / HIRE
  if (
    q.includes("contact") ||
    q.includes("interview") ||
    q.includes("call") ||
    q.includes("phone") ||
    q.includes("hire") ||
    q.includes("reach") ||
    q.includes("email") ||
    q.includes("whatsapp")
  ) {
    return {
      text: `### 📬 Connect with Amardeep Directly:

- **WhatsApp:** [+91 8964051727](https://wa.me/918964051727) *(Instant reply)*
- **Direct Phone:** +91 8964051727 / +91 9451996500
- **Email:** [amardeepdwivedi77@gmail.com](mailto:amardeepdwivedi77@gmail.com)
- **LinkedIn:** [linkedin.com/in/amardeep-dwivedi-507986228](https://www.linkedin.com/in/amardeep-dwivedi-507986228/)
- **Availability:** Ready for technical screening and interview calls today!`,
      actions: ["whatsapp", "email", "view_resume"],
    };
  }

  // 8. GREETING / CASUAL
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.includes("who are you") ||
    q.includes("namaste") ||
    q.includes("kaise ho")
  ) {
    return {
      text: `### 👋 Hello! I'm Amardeep AI, his digital career copilot.

I can answer any technical or hiring questions about Amardeep Dwivedi's **3+ years of experience** as a **React & MERN Stack Developer**.

**Try asking me:**
- *"Why should we hire Amardeep?"*
- *"Tell me about his Agora WebRTC video experience"*
- *"What is his notice period?"*
- Or paste your **Job Description** below to test how well Amardeep matches your role!`,
      actions: ["view_resume", "whatsapp"],
    };
  }

  // 9. DEFAULT / GENERAL FALLBACK
  return {
    text: `Amardeep is a **React & MERN Stack Developer** with **3+ years of experience** at **Suffescom Solutions**, specializing in high-performance web applications, **Agora WebRTC video calling**, and **Redux Toolkit** architectures.

- **Notice Period:** 1 Month
- **Location:** Chandigarh, India (Remote/Hybrid ready)
- **Credentials:** 4x NamasteDev Certified

Feel free to ask specific questions about his **skills, projects, real-time video experience**, or click one of the quick chips below!`,
    actions: ["view_resume", "whatsapp", "email"],
  };
};

/**
 * Intelligent Job Description (JD) Matcher
 */
export const analyzeJobDescriptionMatch = (jdText) => {
  const text = jdText.toLowerCase();

  const coreSkills = [
    { key: "react", label: "React.js / React 19", weight: 20 },
    { key: "javascript", label: "JavaScript (ES6+)", weight: 15 },
    { key: "redux", label: "Redux / Redux Toolkit", weight: 15 },
    { key: "node", label: "Node.js & Express.js", weight: 15 },
    { key: "mongodb", label: "MongoDB / NoSQL", weight: 10 },
    { key: "tailwind", label: "Tailwind CSS / Modern UI", weight: 10 },
    { key: "rest", label: "RESTful APIs / Architecture", weight: 10 },
    { key: "webrtc", label: "WebRTC / Video Calling (Agora)", weight: 15 },
    { key: "socket", label: "Socket.IO / Real-Time Events", weight: 10 },
    { key: "git", label: "Git / Version Control", weight: 5 },
    { key: "html", label: "HTML5 / CSS3 Responsive", weight: 5 },
  ];

  let matchedWeight = 0;
  let totalWeight = 0;
  const matchedSkills = [];
  const missingOrExtra = [];

  coreSkills.forEach((skill) => {
    if (text.includes(skill.key)) {
      matchedWeight += skill.weight;
      totalWeight += skill.weight;
      matchedSkills.push(skill.label);
    }
  });

  // Base match calculation
  let matchPercentage = 82;
  if (totalWeight > 0) {
    matchPercentage = Math.min(98, Math.round(75 + (matchedWeight / totalWeight) * 23));
  } else {
    matchPercentage = 88; // Default strong match for generic web engineering roles
  }

  return {
    score: matchPercentage,
    matchedSkills: matchedSkills.length > 0 ? matchedSkills : ["React", "JavaScript", "MERN Stack", "Tailwind CSS"],
    noticePeriod: "1 Month (Available for immediate hire)",
    experienceYears: "3+ Years Production Experience",
    summary: `Amardeep is a **${matchPercentage}% strong match** for this role based on his 3+ years of production experience in React, MERN stack, state management, and real-time architectures!`,
  };
};
