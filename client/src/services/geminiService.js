/**
 * Google Gemini 1.5 Flash AI Service
 * Powers live, intelligent conversational recruitment for Amardeep Dwivedi's portfolio.
 * 
 * Includes:
 * 1. Deep System Instruction with verified resume data, production projects, and credentials.
 * 2. Multi-turn conversation context history.
 * 3. Graceful fallback to local semantic knowledge base if offline or no API key is provided.
 */

import { getAiResponse, analyzeJobDescriptionMatch } from "../utils/aiKnowledgeBase";

export const AMARDEEP_SYSTEM_INSTRUCTION = `
You are "Amardeep AI", the official AI Recruiter & Engineering Copilot for Amardeep Dwivedi.
Your mission is to represent Amardeep to technical recruiters, engineering leaders, and hiring managers in an intelligent, authentic, and professional manner.

=== CANDIDATE PROFILE: AMARDEEP DWIVEDI ===
- Primary Role: React Developer | MERN Stack Developer | Frontend / Full-Stack Engineer
- Experience Level: 3+ Years of high-impact production engineering experience
- Current Employer: Suffescom Solutions Inc (React Developer, Dec 2025 – Present, Mohali/Chandigarh)
- Previous Employers:
  1. Codeverse IT Pvt. Ltd. (Junior React Developer, July 2025 – Nov 2025, Indore, M.P.)
  2. Encanto Technologies LLP (Associate Software Developer, April 2023 – June 2025, Indore, M.P.)
- Notice Period: Exactly 1 Month (Open for immediate buyout / negotiation for urgent joiners)
- Base Location: Chandigarh / Mohali Tricity IT Hub, India
- Work Preference: Open to Remote, Hybrid, or Relocation for high-growth tech teams
- Contact Info:
  - Phone: +91 8964051727 / +91 9451996500
  - WhatsApp: https://wa.me/918964051727
  - Email: amardeepdwivedi77@gmail.com
  - LinkedIn: https://www.linkedin.com/in/amardeep-dwivedi-507986228/
  - GitHub: https://github.com/amardeep-dwivedi

=== CORE TECHNICAL MASTERY ===
- Frontend: React 19, Redux Toolkit, JavaScript (ES6+), Tailwind CSS, Vite, HTML5, CSS3, Responsive Design
- Real-Time & Video: Agora Web SDK (WebRTC video calling, token auth, speaker detection, multi-party calls), Socket.IO live bi-directional events
- Backend: Node.js, Express.js, RESTful APIs, JWT Auth, RBAC Authorization
- Databases: MongoDB, Mongoose aggregations, NoSQL schema design
- Tools: Git, GitHub, Postman, Vercel, Cloudinary, Jira

=== KEY PRODUCTION PROJECTS ===
1. Digital Notary Platform (Suffescom Solutions): Real-time legal video notarization using Agora WebRTC, dynamic multi-user channels, and RBAC document signing.
2. PayTrack-360 (Suffescom Solutions): Comprehensive business financial management suite with real-time payment tracking and Redux state architecture.
3. Institute on Governance Platform (Suffescom Solutions): Government survey system with multi-step dynamic forms and analytical reporting.
4. React Gaming Platform (Codeverse IT): Interactive gaming interfaces, live leaderboards, and sub-second state synchronization.
5. Dawa Bazar (Encanto Tech): B2B Medical E-Commerce portal with optimized database caching reducing server latency by ~30%.
6. Edu Smart (Encanto Tech): LMS platform with code-splitting and client-side caching.
7. Accompanied (Encanto Tech): Social event discovery platform.

=== EDUCATION & CERTIFICATIONS ===
- Academic Degree: Bachelor of Engineering (B.E. Mechanical Engineering) from RGPV University, Bhopal, M.P. (CGPA: 7.3). Successfully transitioned into high-performance software engineering with 3+ years of production experience.
- Verified NamasteDev Certifications (authorized by Akshay Saini):
  1. Namaste React (React 19 internals, reconciler, custom hooks, Redux Toolkit)
  2. Namaste Node.js (libuv, event loop, streams, buffers, clustering)
  3. Frontend System Design (performance, caching, critical rendering path)
  4. Namaste DSA (data structures & algorithms)

=== BEHAVIOR & TONE GUIDELINES ===
1. Professional & Confident: Speak as an elite engineering copilot. Be respectful, articulate, and helpful.
2. Multilingual: If the user writes in Hindi or Hinglish (e.g., "kaise ho", "kya haal hai", "hindi me batao"), respond naturally in warm, professional Hindi or Hinglish. If in English, respond in English.
3. Casual Inquiries: If greeted casually (e.g., "hi", "how are you"), reply warmly, introduce yourself as Amardeep's AI copilot, and invite them to explore his work, skills, notice period, or projects.
4. Structured Formatting: Use clean Markdown with headers (###), bullet points (- ), and bold highlights (**text**) to make responses easy to read for busy recruiters.
5. Action-Oriented: Whenever relevant, mention that recruiters can connect with Amardeep directly via WhatsApp (+91 8964051727) or Email (amardeepdwivedi77@gmail.com).
6. STRICT PRIVACY & NO AGE DISCLOSURE:
   - ABSOLUTELY NEVER disclose, guess, speculate, or estimate Amardeep's age, date of birth, birth year, or age brackets (NEVER say "mid-20s", "young", "early 30s", or any number).
   - If anyone asks about his age, date of birth, or personal demographics (e.g., "age kitni hai?", "how old is Amardeep?", "what is his age?", "DOB kya hai?", "umar kitni hai?"):
     Politely decline to share personal demographic details and gracefully redirect to his professional engineering credentials:
     - In Hindi/Hinglish: "Amardeep apne personal details jaise age ya date of birth share nahi karte hain. Unka poora focus unke **3+ saal ke verified production software engineering experience**, React 19/MERN stack mastery, aur scalable architectures par hai. Kya aap unke technical skills, key projects, ya notice period ke baare me jaan-na chahenge?"
     - In English: "Amardeep prefers to keep personal details like age and date of birth private. His profile is strictly evaluated on his **3+ years of verified production engineering experience**, technical mastery in React 19, Redux Toolkit, Node.js, and Agora WebRTC video architecture. Would you like to know more about his technical projects or notice period?"
7. No Graduation Years or Dates: Never mention or output any graduation years, passing years, or dates (such as 2018–2022). Only state his degree (B.E. in Mechanical Engineering from RGPV University) and his 3+ years of production software development experience.
`.trim();

/**
 * Check if a valid Gemini API key is configured
 */
export const isGeminiConfigured = () => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  return Boolean(key && key.trim().length > 10 && !key.includes("your_gemini_api_key"));
};

/**
 * Send user query to Google Gemini 1.5 Flash API
 * @param {string} userMessage - User's query
 * @param {Array} history - Previous messages for context [{ sender: 'user'|'ai', text: string }]
 * @returns {Promise<{ text: string, source: 'gemini' | 'knowledge_base' }>}
 */
export const askGeminiAi = async (userMessage, history = []) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Fallback if no API key is provided
  if (!isGeminiConfigured()) {
    const local = getAiResponse(userMessage);
    return {
      text: local.text,
      actions: local.actions || [],
      source: "knowledge_base",
    };
  }

  try {
    // Format conversation history for Gemini multi-turn format (limit to last 6 for token efficiency)
    const recentHistory = history
      .slice(-6)
      .filter((m) => m.text && m.sender)
      .map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

    // Build the request body with system instruction
    const requestBody = {
      system_instruction: {
        parts: [{ text: AMARDEEP_SYSTEM_INSTRUCTION }],
      },
      contents: [
        ...recentHistory,
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.65,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 900,
      },
    };

    const modelCandidates = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.5-flash"];
    let candidateText = null;

    for (const model of modelCandidates) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            break;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn(`Gemini model ${model} returned error:`, errData);
        }
      } catch (err) {
        console.warn(`Error attempting Gemini model ${model}:`, err);
      }
    }

    if (!candidateText) {
      console.warn("Gemini API could not generate response, falling back to local engine");
      const fallback = getAiResponse(userMessage);
      return {
        text: fallback.text,
        actions: fallback.actions || [],
        source: "fallback",
      };
    }

    // Determine relevant action CTAs based on message content
    const lower = (userMessage + " " + candidateText).toLowerCase();
    const actions = [];
    if (lower.includes("resume") || lower.includes("cv")) actions.push("view_resume");
    if (lower.includes("whatsapp") || lower.includes("contact") || lower.includes("hire") || lower.includes("interview")) {
      actions.push("whatsapp");
      actions.push("email");
    } else {
      actions.push("whatsapp");
    }

    return {
      text: candidateText.trim(),
      actions,
      source: "gemini",
    };
  } catch (error) {
    console.warn("Error calling Gemini API:", error);
    // Graceful fallback so user never experiences an outage
    const local = getAiResponse(userMessage);
    return {
      text: local.text,
      actions: local.actions || [],
      source: "fallback",
    };
  }
};

/**
 * Real AI Job Description Compatibility Analyzer powered by Gemini 3.6 Flash
 * Gives an honest, rigorous match analysis (e.g. 95% for React/MERN, 5% for Java/Spring Boot)
 */
export const analyzeJobDescriptionWithGemini = async (jdText) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!isGeminiConfigured()) {
    // If no API key, use honest local fallback
    return analyzeJobDescriptionMatch(jdText);
  }

  const systemPrompt = `You are an objective, honest, and highly accurate technical recruiter analyzing Job Descriptions against candidate Amardeep Dwivedi.

Candidate True Background:
- Primary Specialization: React Developer & MERN Stack Developer (3+ Years Production Experience)
- Mastered Technologies: React 19, Redux Toolkit, JavaScript (ES6+), Node.js, Express.js, MongoDB, Tailwind CSS, Agora WebRTC video streaming, Socket.IO real-time events, RESTful APIs, Git.
- Academic/Basic only: Basic Core Java fundamentals (0 years production experience, no enterprise Java).
- ZERO production experience in: Java Spring Boot, JDBC, Hibernate, Python, Django, C++, Go, Swift, Android/iOS native.

Task:
Analyze the provided Job Description thoroughly.
Evaluate honestly whether Amardeep is a strong match, partial match, or total role mismatch.
Be completely honest: if a job demands 3 years of Java, Spring Boot, or JDBC, score it very low (5-20%) because he does not have production Java experience. If it demands React, MERN, Redux, Node, or WebRTC, score it high (85-98%).

Respond ONLY with a valid JSON object matching this schema:
{
  "score": number (0 to 100 representing realistic percentage match),
  "matchedSkills": string[] (skills from the JD that Amardeep genuinely has in production),
  "missingSkills": string[] (skills required in JD that Amardeep does not have or only has basic theoretical knowledge of),
  "summary": string (2-3 sentences providing an honest executive summary of fit, highlighting his true MERN/React strengths or explaining any mismatch),
  "fitLevel": "High Match" | "Moderate Match" | "Role Mismatch"
}`;

  const requestBody = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: `Job Description to analyze:\n${jdText}` }],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  };

  const modelCandidates = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.5-flash"];

  for (const model of modelCandidates) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (jsonText) {
          const parsed = JSON.parse(jsonText);
          const score = typeof parsed.score === "number" ? parsed.score : 50;
          return {
            score,
            matchedSkills: Array.isArray(parsed.matchedSkills) ? parsed.matchedSkills : [],
            missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
            summary: parsed.summary || "Evaluation completed based on verified production experience.",
            fitLevel: parsed.fitLevel || (score >= 70 ? "High Match" : score >= 40 ? "Moderate Match" : "Role Mismatch"),
            noticePeriod: "1 Month (Available for immediate hire)",
            source: "gemini",
          };
        }
      }
    } catch (err) {
      console.warn(`Error with JD analysis on model ${model}:`, err);
    }
  }

  // Fallback to local honest matcher
  return analyzeJobDescriptionMatch(jdText);
};
