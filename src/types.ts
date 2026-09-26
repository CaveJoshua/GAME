/**
 * Application Type Definitions
 */

export type AppStage = 'game' | 'loading' | 'resume';

export interface ProfileData {
  name: string;
  location: string;
  phone: string;
  email: string;
  title: string;
  about: string;
  dateOfBirth: string;
  age: number;
  height: string;
  weight: string;
  references: string;
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
}

export interface BootDiagnosticItem {
  text: string;
  pct?: number;
  isSemester?: boolean;
  pctStart?: number;
  pctEnd?: number;
  cls?: 'green' | 'complete' | 'gold' | '';
}
