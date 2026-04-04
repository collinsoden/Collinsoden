export const personalInfo = {
  name: "Collins Oden",
  title: "Fullstack Software Engineer",
  tagline: "Node.js · TypeScript · React",
  bio: "Fullstack engineer with four years of experience building and shipping scalable backend systems and web applications across Node.js, TypeScript, Python and React. Experienced owning large technical decisions independently, from database schema design and API architecture through to CI/CD and deployment, with a track record of shipping production platforms solo without PM or DevOps support.",
  location: "Remote, Global",
  availability: "Open to opportunities",
  email: "Collinsoden22@gmail.com",
  github: "https://github.com/collinsoden",
  linkedin: "https://linkedin.com/in/collinsoden",
  facebook: "https://facebook.com/collinsoden",
  resume: "/resume.pdf",
};

export const skills = [
  // Languages
  { name: "TypeScript", category: "Language", icon: "𝙏𝙎" },
  { name: "JavaScript", category: "Language", icon: "𝙅𝙎" },
  { name: "Python", category: "Language", icon: "𝙋𝙔" },
  { name: "HTML / CSS", category: "Language", icon: "⟨⟩" },
  // Frontend
  { name: "React", category: "Frontend", icon: "⚛" },
  { name: "Tailwind CSS", category: "Frontend", icon: "🌊" },
  { name: "Zustand", category: "Frontend", icon: "⊛" },
  { name: "Redux", category: "Frontend", icon: "↻" },
  // Backend
  { name: "Node.js", category: "Backend", icon: "⬡" },
  { name: "Django", category: "Backend", icon: "🐍" },
  { name: "PostgreSQL", category: "Backend", icon: "🐘" },
  { name: "MongoDB", category: "Backend", icon: "🍃" },
  { name: "MySQL", category: "Backend", icon: "⬦" },
  { name: "REST API", category: "Backend", icon: "⇌" },
  // Tools
  { name: "Docker", category: "Tools", icon: "🐳" },
  { name: "GitHub Actions", category: "Tools", icon: "⚙" },
  { name: "AWS", category: "Tools", icon: "☁" },
  { name: "Jest", category: "Tools", icon: "✓" },
  { name: "TypeORM", category: "Tools", icon: "◈" },
  { name: "Git", category: "Tools", icon: "⎇" },
  { name: "Claude Code", category: "Tools", icon: "</>" },
];

export const techBadges = [
  {
    name: "TypeScript",
    color:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30",
  },
  {
    name: "JavaScript",
    color:
      "bg-amber-100 text-amber-900 border-amber-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30",
  },
  {
    name: "Python",
    color:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30",
  },
  {
    name: "React",
    color:
      "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30",
  },
  {
    name: "Node.js",
    color:
      "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
  },
  {
    name: "Django",
    color:
      "bg-lime-100 text-lime-900 border-lime-200 dark:bg-green-600/20 dark:text-green-300 dark:border-green-600/30",
  },
  {
    name: "PostgreSQL",
    color:
      "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/30",
  },
  {
    name: "MongoDB",
    color:
      "bg-teal-100 text-teal-800 border-teal-200 dark:bg-emerald-600/20 dark:text-emerald-300 dark:border-emerald-600/30",
  },
  {
    name: "Tailwind",
    color:
      "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30",
  },
  {
    name: "Docker",
    color:
      "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-blue-600/20 dark:text-blue-300 dark:border-blue-600/30",
  },
  {
    name: "GitHub Actions",
    color:
      "bg-zinc-200 text-zinc-800 border-zinc-300 dark:bg-zinc-500/20 dark:text-zinc-300 dark:border-zinc-500/30",
  },
  {
    name: "REST API",
    color:
      "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-500/30",
  },
];

export const experience = [
  {
    company: "Props Link",
    url: "https://propslinkapp.com",
    role: "Frontend Engineer",
    period: "2025 – 2026",
    location: "Remote",
    description:
      "Sole engineer on a digital networking platform, owning the full stack from infrastructure design through to deployment with no PM or DevOps support.",
    highlights: [
      "Engineered scalable RESTful API endpoints in Node.js/TypeScript, designing backend architecture from the ground up",
      "Implemented secure authentication and authorisation flows with protected data access",
      "Shipped a responsive, mobile-first frontend in parallel with the backend",
    ],
    tech: ["Node.js", "TypeScript", "React", "PostgreSQL", "Tailwind CSS"],
    type: "independent",
  },
  {
    company: "Along Cities",
    url: "https://alongcities.com",
    role: "Software Engineer",
    period: "2025 – 2026",
    location: "Remote",
    description:
      "Built and maintained backend services for a location-aware ride-hailing and rental platform, developing RESTful APIs in Node.js/TypeScript with MongoDB as the primary data store.",
    highlights: [
      "Implemented CI/CD pipelines with GitHub Actions, cutting manual deployment effort and improving release reliability",
      "Built responsive, mobile-friendly frontend interfaces maintaining ARIA/WCAG accessibility standards",
      "Explored LLM orchestration patterns to automate repetitive engineering tasks, improving team velocity",
    ],
    tech: ["Node.js", "TypeScript", "MongoDB", "GitHub Actions", "React"],
    type: "contract",
  },
  {
    company: "Test Bounty",
    url: "https://testbounty.vercel.app",
    role: "Software Developer",
    period: "2025 – 2026",
    location: "Remote",
    description:
      "Architected and built the entire backend for a bug-bounty and software testing platform from scratch as the sole engineer, now in active App Store and Play Store review.",
    highlights: [
      "Built user management, submission workflows, and notification systems from scratch",
      "Designed and optimised PostgreSQL schemas to ensure data integrity under high-concurrency operations",
      "Owned all end-to-end technical decisions from schema design through to deployment",
    ],
    tech: ["Node.js", "TypeScript", "PostgreSQL", "React", "Docker"],
    type: "independent",
  },
  {
    company: "Kiotapay",
    url: "https://kiotapay.com",
    role: "Software Developer",
    period: "Apr 2022 – Jan 2024",
    location: "Remote",
    description:
      "Owned core product development using TypeScript and Python across a property management platform, building both internal tooling and customer-facing features.",
    highlights: [
      "Owned core product development using TypeScript and Python across a property management platform",
      "Built both internal tooling and customer-facing features end-to-end",
      "Worked directly with stakeholders to define requirements and ship solutions with minimal hand-holding",
    ],
    tech: ["TypeScript", "Python", "React", "PostgreSQL", "Node.js"],
    type: "contract",
  },
  {
    company: "ALX Africa",
    url: "https://www.alxafrica.com",
    role: "Software Engineer",
    period: "Mar 2022 – Jan 2023",
    location: "Remote",
    description:
      "Co-engineered E-Bookshelf, a full-stack monolith application, as part of a three-person team. Contributed to open-source projects and cross-functional technical collaboration.",
    highlights: [
      "Co-engineered E-Bookshelf, a full-stack monolith, as part of a three-person team",
      "Contributed to open-source projects and cross-functional technical collaboration",
    ],
    tech: ["Python", "JavaScript", "MySQL", "HTML/CSS"],
    type: "full-time",
  },
  {
    company: "IEU Africa Limited",
    url: "#",
    role: "Software Developer",
    period: "Sep 2020 – Jan 2022",
    location: "Nigeria",
    description:
      "Developed and maintained software across multiple client-facing products using PHP, MySQL, jQuery, and JavaScript. Translated business requirements into technical deliverables.",
    highlights: [
      "Developed and maintained software across multiple client-facing products",
      "Translated business requirements into technical specifications and deliverables",
      "Mentored junior developers, contributing to team knowledge-sharing and professional development",
    ],
    tech: ["PHP", "MySQL", "jQuery", "JavaScript"],
    type: "full-time",
  },
];

export const projects = [
  {
    title: "Test Bounty",
    description:
      "A bug-bounty and software testing platform with user management, submission workflows, and notification systems. Currently in active App Store and Play Store review.",
    longDescription:
      "Architected and built entirely solo, backend, frontend, and infrastructure, from schema design through to deployment.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "React", "Docker"],
    github: null,
    live: "https://testbounty.vercel.app",
    image: null,
    featured: true,
    metrics: ["Sole engineer", "App Store review", "Full stack"],
    category: "Full Stack",
  },
  {
    title: "Along Cities",
    description:
      "A location-aware ride-hailing and rental platform. RESTful APIs in Node.js/TypeScript backed by MongoDB, with GitHub Actions CI/CD and WCAG-compliant frontend.",
    longDescription:
      "Backend services and responsive frontend interfaces, with CI/CD pipelines and accessibility-compliant UI.",
    tech: ["Node.js", "TypeScript", "MongoDB", "React", "GitHub Actions"],
    github: null,
    live: "https://alongcities.com",
    image: null,
    featured: true,
    metrics: ["Ride-hailing platform", "CI/CD pipelines", "WCAG compliant"],
    category: "Full Stack",
  },
  {
    title: "Theodore Effiong",
    description:
      "A bespoke personal portfolio site. Smooth animations, responsive layouts, and a strong personal brand aesthetic, designed and shipped end-to-end.",
    longDescription:
      "Designed and developed a bespoke portfolio site with smooth animations and responsive layouts.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: null,
    live: "https://theodoreeffiong.vercel.app",
    image: null,
    featured: true,
    metrics: ["Custom design", "Fully responsive", "Live on Vercel"],
    category: "Frontend",
  },
  {
    title: "Props Link",
    description:
      "A digital networking platform built solo from infrastructure to deployment. Scalable RESTful APIs, secure auth flows, and a mobile-first responsive frontend.",
    longDescription:
      "Owned the full stack on a digital networking platform with no PM or DevOps support.",
    tech: ["Node.js", "TypeScript", "React", "PostgreSQL", "Tailwind CSS"],
    github: null,
    live: "https://propslinkapp.com",
    image: null,
    featured: false,
    metrics: ["Sole engineer", "Mobile-first", "Full stack"],
    category: "Full Stack",
  },
  {
    title: "Kiotapay",
    description:
      "Property management platform featuring internal tooling and customer-facing features built across TypeScript and Python.",
    longDescription:
      "Core product development for Kiotapay, a property management fintech platform.",
    tech: ["TypeScript", "Python", "React", "PostgreSQL", "Node.js"],
    github: null,
    live: "https://kiotapay.com",
    image: null,
    featured: false,
    metrics: ["Fintech platform", "TypeScript + Python", "Property management"],
    category: "Full Stack",
  },
];

export const education = [
  {
    institution: "National Open University of Nigeria",
    degree: "BSc Computer Science",
    period: "Nov 2022 – Nov 2026",
    location: "Nigeria",
    type: "degree",
  },
  {
    institution: "ALX Africa",
    degree: "Software Engineering",
    period: "Mar 2022 – Apr 2023",
    location: "Remote",
    type: "certification",
  },
];

export const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "Projects Shipped" },
  { value: "6", label: "Companies" },
  { value: "∞", label: "Lines of Code" },
];
