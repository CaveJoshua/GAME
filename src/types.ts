/**
 * Application Type Definitions
 */

export type AppStage = 'game' | 'loading' | 'resume';

export interface ProfileData {
  name: string;
  location: string;
  phone?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  credlyUrl: string;
  title: string;
  about: string;
  dateOfBirth: string;
  age: number;
  height: string;
  weight: string;
  references: string;
  profileImageUrl?: string;
}

export interface EducationItem {
  level: 'Tertiary' | 'Secondary' | 'Primary';
  degree: string;
  institution: string;
  address: string;
  completionDate: string;
  track?: string;
  honors?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface SeminarItem {
  title: string;
  date: string;
  venue: string;
  highlight?: boolean;
  award?: string;
  badge?: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface Hack4GovGalleryItem {
  id: string;
  title: string;
  competition: string;
  date: string;
  venue: string;
  award?: string;
  badge: string;
  description: string;
  imageUrl: string;
  alt: string;
}

export interface CredlyBadgeItem {
  id: string;
  name: string;
  issuer: string;
  imageUrl: string;
  verifyUrl: string;
}

export interface BootDiagnosticItem {
  text: string;
  pct?: number;
  isSemester?: boolean;
  pctStart?: number;
  pctEnd?: number;
  cls?: 'green' | 'complete' | 'gold' | '';
}

export interface ArchitectureProjectItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  overview: string;
  patterns: string[];
  techStack: string[];
  topologyNodes: string[];
  topologyFlow: string;
  securityControls: string[];
  githubUrl?: string;
}

