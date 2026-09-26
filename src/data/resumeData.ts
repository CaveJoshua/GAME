import { ProfileData, EducationItem, SkillCategory, SeminarItem, CredlyBadgeItem, Hack4GovGalleryItem } from '../types';

export const profile: ProfileData = {
  name: "RAMEL JOSHUA O. CAVE",
  location: "Tugui Grande, Bani, Pangasinan, Philippines",
  phone: "+63 977 754 6284",
  email: "nsec.fuhua.cv@gmail.com",
  credlyUrl: "https://www.credly.com/users/ramel-joshua-o-cave/edit/badges/credly",
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
    title: "Hack4Gov 5 (Regional Cyber Competition)",
    date: "August 13, 2025",
    venue: "Paragon Hotel, Baguio City",
    highlight: true,
    award: "1st Place Champion",
    badge: "CHAMPION",
    imageUrl: "/images/hack4gov5_2025.png",
    imageCaption: "Hack4Gov 5 1st Place Champion Team • August 13, 2025"
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
    title: "Hack4Gov Regional Qualifiers",
    date: "October 2, 2025",
    venue: "Paragon Hotel, Baguio City",
    badge: "CYBERSEC",
    imageUrl: "/images/hack4gov_2025.png",
    imageCaption: "Hack4Gov Regional Qualifiers Certificate Presentation • October 2, 2025"
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

export const credlyBadges: CredlyBadgeItem[] = [
  {
    id: "1b42801f-132d-4c9c-8c05-a93fa64b6c83",
    name: "SAP Certified - Database Administrator - SAP HANA",
    issuer: "SAP",
    imageUrl: "https://images.credly.com/images/0e248c1a-44ee-4cea-b9ef-ed54cd6337fb/blob",
    verifyUrl: "https://www.credly.com/badges/1b42801f-132d-4c9c-8c05-a93fa64b6c83/public_url"
  },
  {
    id: "194057c2-bf2d-4e7d-bc5f-7342a7edd0c8",
    name: "SAP Certified - SAP Generative AI Developer",
    issuer: "SAP",
    imageUrl: "https://images.credly.com/images/1f77d707-1538-46fd-92e0-c49649da87dc/blob",
    verifyUrl: "https://www.credly.com/badges/194057c2-bf2d-4e7d-bc5f-7342a7edd0c8/public_url"
  },
  {
    id: "bfc588da-2e7e-4a30-a773-b430c3ef3534",
    name: "Ethical Hacker",
    issuer: "Cisco",
    imageUrl: "https://images.credly.com/images/242902b5-f527-42ad-865e-977c9e1b5b58/image.png",
    verifyUrl: "https://www.credly.com/badges/bfc588da-2e7e-4a30-a773-b430c3ef3534/public_url"
  },
  {
    id: "7c45903e-cf78-4240-a3a6-96bcdccf718a",
    name: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco",
    imageUrl: "https://images.credly.com/images/0a6d331e-8abf-4272-a949-33f754569a76/CCNAENSA__1_.png",
    verifyUrl: "https://www.credly.com/badges/7c45903e-cf78-4240-a3a6-96bcdccf718a/public_url"
  },
  {
    id: "1bc5786d-359f-4873-b3ab-3bcf63c2e965",
    name: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    imageUrl: "https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png",
    verifyUrl: "https://www.credly.com/badges/1bc5786d-359f-4873-b3ab-3bcf63c2e965/public_url"
  }
];

export const hack4govGallery: Hack4GovGalleryItem[] = [
  {
    id: "hack4gov5_champion",
    title: "Hack4Gov 5 Regional Cyber Challenge",
    competition: "Department of Information and Communications Technology (DICT) • Region 1 / CAR",
    date: "August 13, 2025",
    venue: "Paragon Hotel, Otek St., Baguio City",
    award: "1st Place Regional Champion",
    badge: "CHAMPION // 2025",
    description: "Official 1st Place Regional Champion team photo under the national theme 'Decoding Youth Innovation, Anchoring One Nation's Digital Defense'. Competed and triumphed against leading universities in offensive web exploitation, reverse engineering, binary analysis, and incident mitigation.",
    imageUrl: "/images/hack4gov5_2025.png",
    alt: "Hack4Gov 5 1st Place Champions on Stage at Paragon Hotel, Baguio City"
  },
  {
    id: "hack4gov_qualifiers",
    title: "Hack4Gov Regional Qualifiers",
    competition: "Cybersecurity Bureau & National Computer Emergency Response Team (NCERT)",
    date: "October 2, 2025",
    venue: "Paragon Hotel, Baguio City",
    award: "Official Certificate of Participation",
    badge: "FINALIST // 2025",
    description: "Ramel Joshua O. Cave holding his official Certificate of Participation alongside his team in Hack4Gov cybersecurity uniform. Recognized by DICT for excellence in technical cyber challenges, OSINT, and protocol packet inspection.",
    imageUrl: "/images/hack4gov_2025.png",
    alt: "Ramel Joshua O. Cave and team holding DICT Hack4Gov Certificates of Participation"
  }
];
