import { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = {
  name: "Aria Chen",
  role: "Creative Technologist & Interaction Designer",
  tagline: "Bridging the gap between robust system engineering and visual sensory design.",
  bio: "I am a multi-disciplinary developer dedicated to building fluid, accessible, and high-fidelity interactive experiences. With 5+ years of experience crossing the boundaries of frontend architectures, fine arts, and human-computer interaction, I turn complex data spaces into beautifully simple digital products.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  email: "aria.chen@example.com",
  personalDetails: [
    { label: "Location", value: "San Francisco, California", icon: "MapPin" },
    { label: "Experience", value: "5+ Years Professional", icon: "Briefcase" },
    { label: "Availability", value: "Open to select roles", icon: "Sparkles" },
    { label: "Languages", value: "English, Mandarin, JavaScript", icon: "Languages" },
    { label: "Education", value: "B.S. Computer Science & Design", icon: "GraduationCap" },
    { label: "Website", value: "ariachen.dev", icon: "Globe" }
  ],
  skills: [
    // Tech skills
    { name: "React / Next.js", level: 95, category: "frontend" },
    { name: "TypeScript / ESNext", level: 90, category: "frontend" },
    { name: "Tailwind CSS & Motion", level: 95, category: "frontend" },
    { name: "Three.js & WebGL", level: 80, category: "frontend" },
    { name: "Node.js / Express", level: 85, category: "backend" },
    { name: "GraphQL & REST APIs", level: 88, category: "backend" },
    { name: "SQL & NoSQL Systems", level: 75, category: "backend" },
    { name: "UI/UX & Figma", level: 90, category: "design" },
    { name: "Framer & Prototyping", level: 92, category: "design" },
    { name: "Motion & Animation Systems", level: 85, category: "design" },
    // Personal skills
    { name: "Creative Problem Solving", level: 100, category: "personal" },
    { name: "Empathetic Communication", level: 95, category: "personal" },
    { name: "Technical Mentorship", level: 85, category: "personal" },
    { name: "Product Design Strategy", level: 90, category: "personal" },
    { name: "Collaborative Leadership", level: 92, category: "personal" }
  ],
  qualifications: [
    {
      id: "q1",
      year: "2018 - 2022",
      degree: "B.S. in Computer Science & Interaction Design",
      institution: "Stanford University",
      description: "Graduated with honors. Developed strong foundations in algorithms, graphic principles, human-centered systems, and graphics programming. Research thesis on spatial canvas interfaces."
    },
    {
      id: "q2",
      year: "2022 - 2023",
      degree: "Specialized Residency in Creative Coding & Interactive Art",
      institution: "Gray Area Foundation for the Arts",
      description: "Rigorous one-year cohort building installations crossing interactive audio-reactive canvases, projection-mapping, and hardware-software interaction interfaces."
    }
  ],
  work: [
    {
      id: "w1",
      title: "Senior Interactive Developer",
      company: "Atelier Web Systems",
      period: "2023 - Present",
      description: "Leading frontend visual development of internal design studios and user-facing interactive canvas dashboards. Reduced performance bottleneck on fluid asset rendering by 40% with advanced canvas caching.",
      tags: ["React", "TypeScript", "Three.js", "Web Audio API", "Tailwind"],
      type: "experience"
    },
    {
      id: "w2",
      title: "Full-Stack Web Architect",
      company: "Prism & Pixel Agency",
      period: "2022 - 2023",
      description: "Designed customizable web visualizer pipelines for fine-art exhibition platforms. Integrated full-stack API networks serving 500k monthly visitors with optimized Redis configurations.",
      tags: ["Node.js", "Express", "Next.js", "Tailwind CSS", "MongoDB"],
      type: "experience"
    },
    {
      id: "w3",
      title: "Cosmic Cartography Visualizer",
      company: "Personal Project",
      period: "2024",
      description: "An interactive stellar atlas depicting 20,000+ near-Earth star coordinates inside a smooth, custom-rendered 3D orbital system with real-time solar wind data injection.",
      tags: ["React Three Fiber", "D3.js", "Vite", "WebAudio API", "Math.gl"],
      type: "project",
      link: "https://stars.ariachen.dev"
    },
    {
      id: "w4",
      title: "Lumina Gestural Interface",
      company: "Research Project",
      period: "2023",
      description: "Open-source webcam gesture tracking engine translating hand-movement velocity directly into fluid typographic weight changes and audio filter triggers in real time.",
      tags: ["MediaPipe", "React", "TypeScript", "Tailwind CSS", "WebSockets"],
      type: "project",
      link: "https://lumina.ariachen.dev"
    }
  ]
};
