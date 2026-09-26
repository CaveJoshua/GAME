import { ProfileData, EducationItem, SkillCategory, SeminarItem } from '../types';

export const profile: ProfileData = {
  name: "RAMEL JOSHUA O. CAVE",
  location: "Tugui Grande, Bani, Pangasinan, Philippines",
  phone: "+63 977 754 6284",
  email: "nsec.fuhua.cv@gmail.com",
  title: "Information Technology Professional • Network & Cyber Security Specialist",
  about: "Bachelor of Science in Information Technology (Network & Security Track) graduate from the University of the Cordilleras with 1st Place Champion honors at Hack4Gov. Certified in Computer Systems Servicing & Networking (NC II) with extensive expertise in CISCO LAN routing & switching (CCNA 1-4), penetration testing toolchains (Kali Linux, Ghidra, Wireshark, Burp Suite), Python data analytics, C# Unity, React Router v7, PostgreSQL indexing, and cloud deployments.",
  dateOfBirth: "July 15, 2004",
  age: 21,
  height: "5'6\"",
  weight: "64 kgs",
  references: "Available upon request."
};

export const educationList: EducationItem[] = [
  {
    level: "Tertiary",
    degree: "Bachelor of Science in Information Technology",
    track: "Network and Security Track",
    institution: "University of the Cordilleras",
    address: "Governor Pack Road, Baguio City",
    completionDate: "September 24, 2026"
  },
  {
    level: "Secondary",
    degree: "Technical-Vocational-Livelihood (TVL)",
    institution: "Alaminos City National High School",
    address: "San Jose Drive, Poblacion, Alaminos City, Pangasinan",
    completionDate: "July 12, 2023"
  },
  {
    level: "Primary",
    degree: "Elementary Graduate",
    institution: "San Jose Elementary School",
    address: "San Jose, Bani, Pangasinan",
    completionDate: "March 2016"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Cyber Security & Reverse Engineering",
    icon: "shield",
    skills: [
      "Kali Linux Environment & Security Toolchains",
      "Ghidra & JADX (Decompilation & Binary Analysis)",
      "Wireshark (Deep Packet Inspection & Protocol Analysis)",
      "Burp Suite & OWASP ZAP (Web Vulnerability Assessment)",
      "Binwalk & ExifTool (Firmware & Metadata Forensics)"
    ]
  },
  {
    title: "Networking & System Infrastructure",
    icon: "network",
    skills: [
      "CISCO LAN Switches and Routers Installation & Configuration (CCNA 1 to CCNA 4)",
      "National Certificate II (NC II) in Computer Systems Servicing & Networking",
      "Network Topologies, Subnetting, VLANs, OSPF, and Access Control Lists (ACLs)",
      "Hardware Diagnostics, Server Assembly & Network Cable Termination"
    ]
  },
  {
    title: "Software Engineering & Game Development",
    icon: "code",
    skills: [
      "C# Unity Engine Game Development & Physics Simulation",
      "React Router v7 & Pure TSX / React Component Architecture",
      "Vanilla JavaScript (ESNext) & DOM Canvas Rendering",
      "Software Architecture, Design Patterns & Clean Code Engineering"
    ]
  },
  {
    title: "Data Analytics, AI & Cloud Deployment",
    icon: "database",
    skills: [
      "Data Analytics: Collection, Cleaning & Clustering Techniques with Python",
      "PostgreSQL Database Design, Query Optimization & Indexing",
      "AI Prompt Engineering & Production Guardrails Architecture",
      "Production Website Deployment using Cloudflare & Render"
    ]
  }
];

export const seminarsAndTrainings: SeminarItem[] = [
  {
    title: "Hack4Gov (Regional Cyber Competition)",
    date: "August 13, 2026",
    venue: "Paragon Hotel, Baguio City",
    highlight: true,
    award: "1st Place Champion",
    badge: "CHAMPION"
  },
  {
    title: "SAP HANA Training",
    date: "July 10, 2026",
    venue: "University of the Cordilleras",
    badge: "ENTERPRISE"
  },
  {
    title: "SAP Generative AI Developer",
    date: "June 19, 2026",
    venue: "University of the Cordilleras",
    badge: "AI / ML"
  },
  {
    title: "Accenture Academy",
    date: "May 20, 2026",
    venue: "University of the Cordilleras",
    badge: "INDUSTRY"
  },
  {
    title: "Practical Data Analytics Using Python and Data Visualization",
    date: "March 14, 2026",
    venue: "University of the Cordilleras",
    badge: "ANALYTICS"
  },
  {
    title: "DevFest Baguio 2025",
    date: "October 18, 2025",
    venue: "Baguio Convention Center, Baguio City",
    badge: "TECH SUMMIT"
  },
  {
    title: "Hack4Gov Cybersecurity Challenge",
    date: "October 2, 2025",
    venue: "Paragon Hotel, Baguio City",
    badge: "CYBERSEC"
  },
  {
    title: "Based Build and Basics of Web3",
    date: "September 30, 2025",
    venue: "University of the Cordilleras",
    badge: "WEB3"
  },
  {
    title: "University Capture the Flag TrendMicro",
    date: "August 22, 2025",
    venue: "University of the Cordilleras",
    badge: "CTF"
  },
  {
    title: "Ethereum Development Workshop",
    date: "February 15, 2025",
    venue: "University of the Cordilleras",
    badge: "BLOCKCHAIN"
  }
];
