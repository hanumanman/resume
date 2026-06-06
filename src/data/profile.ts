export interface Profile {
  name: string
  title: string
  tagline: string
  location: string
  email: string
  resumeUrl: string
  socials: {
    github: string
    linkedin: string
  }
}

export interface Skill {
  name: string
  category: string
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  responsibility: string[]
}

export interface Project {
  name: string
  description: string
  techStack: string[]
  url?: string
  sourceUrl?: string
}

export interface PortfolioData {
  profile: Profile
  about: string[]
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
}

export const data: PortfolioData = {
  profile: {
    name: "Hoang Nguyen",
    title: "Full-Stack Engineer",
    tagline: "Building robust web applications end to end.",
    location: "Hanoi, Vietnam",
    email: "hoang20161678@gmail.com",
    resumeUrl: "/resume.pdf",
    socials: {
      github: "https://github.com/hanumanman",
      linkedin: "https://www.linkedin.com/in/hoangnh151/"
    }
  },
  about: [
    "I'm a full-stack engineer with 6 years of experience building products that solve real problems. I work across the entire stack — from crafting thoughtful UIs to designing database schemas and APIs that scale.",
    "I value simplicity, performance, and maintainability. Good software is boring: it does its job reliably and gets out of the way. I aim for code that the next engineer can pick up without a decoder ring. That being said, tinkering with bleeding edge tech is my hobby.",
    "Off the keyboard, I'm usually lost in a book or a film, or spending time with my family."
  ],
  skills: [
    { name: "TypeScript", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "C#", category: "Languages" },
    { name: "SQL", category: "Languages" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Figma", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "FastAPI", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "MongoDB", category: "Backend" },
    { name: "CosmosDB", category: "Backend" },
    { name: "Redis", category: "Backend" },
    { name: "Docker", category: "Infrastructure" },
    { name: "Azure", category: "Infrastructure" },
    { name: "GCP", category: "Infrastructure" },
    { name: "CI/CD", category: "Infrastructure" },
    { name: "LangChain", category: "AI/Agents" },
    { name: "RAG", category: "AI/Agents" },
    { name: "LLM Agents", category: "AI/Agents" },
    { name: "Chroma", category: "AI/Agents" },
    { name: "Qdrant", category: "AI/Agents" }
  ],
  experience: [
    {
      company: "JVB Vietnam",
      role: "Full-Stack Engineer",
      period: "2025 – Present",
      description:
        "Driving AI-powered product development across the full stack while strengthening the engineering team through knowledge sharing and talent acquisition.",
      responsibility: [
        "Develop and maintain Next.js web applications with TypeScript, delivering performant and accessible user interfaces.",
        "Build and deploy FastAPI Python backends, designing RESTful APIs and integrating with LLM pipelines.",
        "Create C# PowerPoint plugins for automated report generation and presentation workflows.",
        "Manage Azure cloud infrastructure — provisioning resources, configuring CI/CD, and monitoring production deployments.",
        "Implement end-to-end AI integration solutions, spanning frontend, backend, and infrastructure.",
        "Hold technical seminars and knowledge-sharing sessions on emerging technologies for the company.",
        "Conduct technical interviews with recruitment team to grow a high-caliber engineering team.",
        "Onboard, train, and mentor junior and intern engineers through structured ramp-up plans and code reviews."
      ]
    },
    {
      company: "Sotatek",
      role: "Frontend Engineer",
      period: "2022 – 2025",
      description:
        "Worked on various B2B SaaS platform, scaling the product from early-stage startup  with a direct impact on architecture, performance, and developer experience.",
      responsibility: [
        "Architected and delivered real-time collaboration features using WebSockets/SSE.",
        "Achieved a 60% reduction in page load time through route-based code splitting, lazy hydration, and strategic caching.",
        "Ensure high-quality codebase with strict code review practices adopted across the team.",
        "Ensure a11y compliance with WCAG AA and WCAG AAA standards."
      ]
    }
  ],
  projects: [
    {
      name: "Taskflow",
      description:
        "Open-source task runner with a visual pipeline editor. Designed the DAG execution engine and the React-based node editor.",
      techStack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
      sourceUrl: "https://github.com/alexchen/taskflow"
    },
    {
      name: "MinimalBlog",
      description:
        "A lightweight, zero-JS blog engine that generates static HTML from Markdown. Focused on performance and accessibility.",
      techStack: ["Go", "Markdown", "HTML", "CSS"],
      sourceUrl: "https://github.com/alexchen/minimalblog",
      url: "https://minimalblog.example.com"
    },
    {
      name: "Walls",
      description:
        "Privacy-first habit tracker. Offline-first PWA with encrypted local storage and optional peer-to-peer sync.",
      techStack: ["React", "IndexedDB", "Crypto API", "Service Workers"],
      sourceUrl: "https://github.com/alexchen/walls"
    }
  ]
}
