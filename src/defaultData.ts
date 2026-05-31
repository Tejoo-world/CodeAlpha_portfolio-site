import { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = {
  name: "Radhika Omar",
  role: "Biotechnology Engineer & Web Developer",
  tagline: "Bridging the gap between biotechnology innovation, computational logic, and modern web systems.",
  bio: "I am a highly motivated, growth-oriented Biotechnology student with a profound passion for scientific innovation, entrepreneurial setups, and digital systems design. By blending structural scientific principles of molecular biology with computational engineering, I build solutions that remove digital obstacles for learners and researchers alike.\n\nCurrently, I am actively honing my credentials as a full-stack engineer, specializing in robust Frontend Development, intuitive UI/UX Design patterns, Responsive Web Systems, and optimized C/C++ algorithms. Driven by a relentless work ethic, I bring strong communication, debating expertise, dynamic group leadership, and an analytical mindset to engineering problems. I excel at bridging the gap between biological concepts and physical code, helping teams scale ideas wisdom-first.",
  avatarUrl: "/src/assets/images/biotech_illustration_1780210614506.png",
  avatarRotation: 0,
  email: "omarradhika94@gmail.com",
  personalDetails: [
    { label: "Phone", value: "9956494942", icon: "Phone" },
    { label: "Email", value: "omarradhika94@gmail.com", icon: "Mail" },
    { label: "Location", value: "Kanpur / Bareilly, India", icon: "MapPin" },
    { label: "Education", value: "B.Tech in Biotechnology", icon: "GraduationCap" }
  ],
  skills: [
    // Tech skills from CV
    { name: "Frontend Development", level: 90, category: "frontend" },
    { name: "Full-Stack Development", level: 82, category: "backend" },
    { name: "UI/UX Design", level: 88, category: "design" },
    { name: "AI Prompting & Engineering", level: 85, category: "other" },
    { name: "Web Development", level: 85, category: "frontend" },
    { name: "C/C++ Language", level: 75, category: "backend" },
    { name: "MS Office (Word & PowerPoint)", level: 90, category: "design" },
    { name: "Basic Computer Skills", level: 85, category: "other" },
    // Leadership & Personal skills from CV
    { name: "Strong Public Speaking Skills", level: 95, category: "personal" },
    { name: "Leadership Mindset", level: 92, category: "personal" },
    { name: "Team Coordination", level: 90, category: "personal" },
    { name: "Effective Time Management", level: 88, category: "personal" },
    { name: "Strong Communication & Debatable Skills", level: 94, category: "personal" }
  ],
  qualifications: [
    {
      id: "q1",
      year: "2023 - Present",
      degree: "B.Tech in Biotechnology",
      institution: "Invertis University, Bareilly",
      description: "Currently pursuing. Focused on study of biotechnology, innovation, molecular biology and professional communication."
    },
    {
      id: "q2",
      year: "Completed 2023",
      degree: "Class 12 (PCB)",
      institution: "Vinyaas Public School, Kanpur",
      description: "Completed Grade 12 focusing on Physics, Chemistry, Biology, and foundational sciences."
    }
  ],
  work: [
    {
      id: "w1",
      title: "Creator & Lead Developer",
      company: "Next Step Learning Hub",
      period: "2024 - Active",
      description: "Designed and built an interactive web ecosystem for student guidance. Curated critical academic roadmaps, quality learning resources, and career portals into a unified clean space to remove information fragmentation for young learners.",
      tags: ["React", "HTML5", "Tailwind CSS", "User Experience Design", "Vercel"],
      type: "project",
      link: "https://next-step-five-dusky.vercel.app"
    },
    {
      id: "w2",
      title: "Interactive Nano Portfolio Developer",
      company: "Creative Portfolio Lab",
      period: "2026 - Present",
      description: "A highly dynamic interactive portfolio engineered with slate-colored twilight backdrop colors, glowing neon panels, customized soft skill synergies matrices, and integrated 10s interactive video players.",
      tags: ["React 18", "Motion Animation", "TypeScript", "Tailwind CSS", "Dynamic Forms"],
      type: "project",
      link: "https://ais-pre-sueteddyfaojg37wlwifdz-372950869524.asia-east1.run.app"
    },
    {
      id: "w3",
      title: "Sequence Analytics Research Intern",
      company: "Biotech & Computing Studies",
      period: "Academic Project",
      description: "Studying algorithmic solutions for protein structure mapping and bio-data. Practiced using C and C++ to parser structural molecular biology logs efficiently.",
      tags: ["C Programming", "C++", "Molecular Biology", "Algorithm Analysis"],
      type: "experience"
    }
  ]
};
