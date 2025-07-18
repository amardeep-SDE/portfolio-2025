import profileImage from "../assets/profile_image.jpg";
const profileData = {
  image: profileImage,
  projects: [
    {
      id: 1,
      titleKey: "projects.0.title",
      descriptionKey: "projects.0.description",
      image: "https://via.placeholder.com/400x250?text=Doctor+App",
      link: "https://your-doctor-app-link.com"
    },
    {
      id: 2,
      titleKey: "projects.1.title",
      descriptionKey: "projects.1.description",
      image: "https://via.placeholder.com/400x250?text=Portfolio",
      link: "https://your-portfolio-link.com"
    },
    {
      id: 3,
      titleKey: "projects.2.title",
      descriptionKey: "projects.2.description",
      image: "https://via.placeholder.com/400x250?text=E-Commerce",
      link: "https://your-ecommerce-link.com"
    },
    {
      id: 4,
      titleKey: "projects.3.title",
      descriptionKey: "projects.3.description",
      image: "https://via.placeholder.com/400x250?text=Blog+App",
      link: "https://your-blog-app-link.com"
    },
    {
      id: 5,
      titleKey: "projects.0.title",
      descriptionKey: "projects.0.description",
      image: "https://via.placeholder.com/400x250?text=Doctor+App",
      link: "https://your-doctor-app-link.com"
    },
    {
      id: 6,
      titleKey: "projects.1.title",
      descriptionKey: "projects.1.description",
      image: "https://via.placeholder.com/400x250?text=Portfolio",
      link: "https://your-portfolio-link.com"
    }
  ],
   skills: [
    {
      name: "HTML",
      experience: "2+ yrs",
      level: "Advanced",
      projects: "25+",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      gradient: "bg-gradient-to-br from-orange-500 to-yellow-400"
    },
    {
      name: "CSS",
      experience: "2+ yrs",
      level: "Advanced",
      projects: "25+",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-500"
    },
    {
      name: "JavaScript",
      experience: "2+ yrs",
      level: "Advanced",
      projects: "20+",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      gradient: "bg-gradient-to-br from-yellow-400 to-yellow-200"
    },
    {
      name: "React.js",
      experience: "2+ yrs",
      level: "Advanced",
      projects: "12",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      gradient: "bg-gradient-to-br from-sky-500 to-blue-400"
    },
    {
      name: "Redux Toolkit",
      experience: "2 yrs",
      level: "Advanced",
      projects: "6",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-300"
    },
    {
      name: "Tailwind CSS",
      experience: "2 yrs",
      level: "Advanced",
      projects: "15",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-300"
    },
    {
      name: "Node.js",
      experience: "1 yrs",
      level: "Intermediate",
      projects: "10",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      gradient: "bg-gradient-to-br from-green-600 to-green-300"
    },
    {
      name: "Express.js",
      experience: "1 yrs",
      level: "Intermediate",
      projects: "10",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      gradient: "bg-gradient-to-br from-gray-800 to-gray-600"
    },
    {
      name: "MongoDB",
      experience: "1 yrs",
      level: "Advanced",
      projects: "8",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      gradient: "bg-gradient-to-br from-green-800 to-green-500"
    },
    {
      name: "Git & GitHub",
      experience: "2 yrs",
      level: "Intermediate",
      projects: "All",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      gradient: "bg-gradient-to-br from-zinc-800 to-zinc-500"
    },
    // {
    //   name: "Razorpay",
    //   experience: "1 yr",
    //   level: "Intermediate",
    //   projects: "2",
    //   icon: "https://avatars.githubusercontent.com/u/25720743?s=200&v=4",
    //   gradient: "bg-gradient-to-br from-indigo-600 to-purple-500"
    // },
    // {
    //   name: "Socket.IO",
    //   experience: "1 yr",
    //   level: "Beginner",
    //   projects: "1",
    //   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    //   gradient: "bg-gradient-to-br from-gray-700 to-black"
    // },
    // {
    //   name: "Auth Services",
    //   experience: "1 yr",
    //   level: "Beginner",
    //   projects: "1",
    //   icon: "https://cdn-icons-png.flaticon.com/512/2913/2913136.png", // common icon for auth
    //   gradient: "bg-gradient-to-br from-purple-500 to-pink-400"
    // }
  ],
    experience: [
    {
      companyKey: "experience.0.company",
      roleKey: "experience.0.role",
      locationKey: "experience.0.location",
      duration: "April 2023 – June 2025",
      descriptionKey: "experience.0.description",
      skills: [
        "JavaScript", "TypeScript", "React", "Redux Toolkit", "Tailwind CSS",
        "Material UI", "shadcn/ui", "Socket.IO", "Zod", "MongoDB",
        "Firebase", "Multer", "Mailtrap", "Express.js", "Node.js", "GitHub",
        "Jira", "Docker", "Swagger", "Payment Gateways"
      ]
    }
  ],
    contact: {
    email: "amardeep@example.com",
    phone: "+91-8964051727",
  },
  contactInfo: {
  email: "yourmail@example.com",
  phone: "+91-8964051727",
  social: {
    github: "https://github.com/amardeep1016",
    linkedin: "https://linkedin.com/in/amardeep-dwivedi",
  }
}

};

export default profileData;
