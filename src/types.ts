export interface PersonalDetails {
  label: string;
  value: string;
  icon: string; // lucide icon name
}

export interface Skill {
  name: string;
  level: number; // 0 to 100 for tech skills, or simple ratings
  category: 'frontend' | 'backend' | 'design' | 'other' | 'personal';
}

export interface Qualification {
  id: string;
  year: string;
  degree: string;
  institution: string;
  description: string;
}

export interface WorkItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  type: 'experience' | 'project';
  link?: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  avatarRotation?: number;
  personalDetails: PersonalDetails[];
  skills: Skill[];
  qualifications: Qualification[];
  work: WorkItem[];
  email: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
