export const mockProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    shortDescription: "Modern e-commerce platform with advanced features",
    description:
      "A comprehensive e-commerce platform built with React and Node.js, featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. The platform supports multiple payment methods and provides a seamless shopping experience.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Stripe",
      "Socket.io",
    ],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
    ],
    liveLink: "https://example-ecommerce.com",
    githubLink: "https://github.com/example/ecommerce",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    shortDescription: "Collaborative task management with real-time updates",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and project tracking. Built with modern web technologies and responsive design.",
    technologies: ["React", "Firebase", "Material-UI", "Redux", "WebSocket"],
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&q=80",
    ],
    liveLink: "https://example-taskmanager.com",
    githubLink: "https://github.com/example/taskmanager",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    shortDescription: "Interactive weather dashboard with data visualization",
    description:
      "An interactive weather dashboard providing real-time weather data, forecasts, and beautiful data visualizations. Features include location-based weather, weather maps, and historical data analysis.",
    technologies: [
      "React",
      "D3.js",
      "OpenWeather API",
      "Chart.js",
      "Tailwind CSS",
    ],
    images: [
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    ],
    liveLink: "https://example-weather.com",
    githubLink: "https://github.com/example/weather",
    featured: false,
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    shortDescription: "Analytics dashboard for social media management",
    description:
      "A comprehensive social media management dashboard with analytics, post scheduling, engagement tracking, and performance metrics. Integrates with multiple social media platforms.",
    technologies: ["React", "Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    images: [
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    ],
    liveLink: "https://example-social.com",
    githubLink: "https://github.com/example/social",
    featured: true,
  },
  {
    id: 5,
    title: "Portfolio Website",
    shortDescription: "Personal portfolio with 3D elements and animations",
    description:
      "A modern portfolio website showcasing projects and skills with stunning 3D elements, smooth animations, and interactive features. Built with cutting-edge web technologies.",
    technologies: [
      "React",
      "Three.js",
      "Framer Motion",
      "Tailwind CSS",
      "GSAP",
    ],
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    ],
    liveLink: "https://example-portfolio.com",
    githubLink: "https://github.com/example/portfolio",
    featured: false,
  },
];

export const mockSkills = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "⚛️" },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      { name: "HTML/CSS", level: 90, icon: "🎨" },
      {
        name: "Tailwind CSS",
        icon: "https://www.svgrepo.com/show/374118/tailwind.svg",
      },
      {
        name: "Bootstrap CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
      {
        name: "Three.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original-wordmark.svg",
      },
      {
        name: "Shadcn UI",
        icon: "https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/apple-touch-icon.png",
      },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      {
        name: "Git",

        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "Figma",

        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "Adobe XD",

        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
      },
      {
        name: "Photoshop",

        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
      },
    ],
  },
];

export const mockPersonalInfo = {
  name: "Alankrit Aggarwal",
  title: "UI/UX Designer & Frontend Developer",
  email: "codewithalankrit@gmail.com",
  phone: "+91 99586 27696",
  location: "Noida, India",
  bio: "Passionate UI/UX designer and frontend developer with a love for creating beautiful, functional, and user-centered digital experiences. I specialize in modern web technologies and have a keen eye for design details.",
  resumeUrl: "/Alankrit_Aggarwal_CV.pdf",
  social: {
    linkedin: "https://www.linkedin.com/in/alankrit-aggarwal-b2968122a/",
    github: "https://github.com/codewithalankrit",
  },
};
