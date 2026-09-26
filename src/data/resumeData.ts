import { ProfileData, EducationItem, SkillCategory, SeminarItem, CredlyBadgeItem, Hack4GovGalleryItem, ArchitectureProjectItem } from '../types';

export const profile: ProfileData = {
  name: "RAMEL JOSHUA O. CAVE",
  location: "Tugui Grande, Bani, Pangasinan, Philippines",
  linkedinUrl: "https://www.linkedin.com/in/rameljoshua",
  githubUrl: "https://github.com/CaveJoshua",
  credlyUrl: "https://www.credly.com/users/ramel-joshua-o-cave/edit/badges/credly",
  title: "Information Technology Professional • Network & Cyber Security Specialist",
  about: "Bachelor of Science in Information Technology (Network & Security Track) graduate from the University of the Cordilleras with 1st Place honors at Hack4Gov. Certified in Computer Systems Servicing & Networking (NC II) with extensive expertise in CISCO LAN routing & switching (CCNA 1-4), penetration testing toolchains (Kali Linux, Ghidra, Wireshark, Burp Suite), Python data analytics, C# Unity, React Router v7, PostgreSQL indexing, and cloud deployments.",
  dateOfBirth: "July 15, 2004",
  age: 21,
  height: "5'6\"",
  weight: "64 kgs",
  references: "Available upon request via LinkedIn."
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
    date: "August 13, 2026",
    venue: "Paragon Hotel, Baguio City",
    highlight: true,
    award: "1st Place",
    badge: "1ST PLACE",
    imageUrl: "/images/hack4gov5_2026_cert.png",
    imageCaption: "Official 1st Place Certificate • Hack for Gov 5 Cordillera Regional Competition • August 13, 2026"
  },
  {
    title: "Accenture Technology Academy - SAP Basis",
    date: "August 22, 2026",
    venue: "Accenture Philippines & University of the Cordilleras",
    badge: "SAP BASIS // 350 HRS",
    imageUrl: "/images/accenture_academy_cert.png",
    imageCaption: "Official Certificate of Completion • Accenture Technology Academy (SAP Basis - 350 Hours) • August 22, 2026"
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
    title: "Practical Data Analytics Using Python and Data Visualization",
    date: "March 14, 2026",
    venue: "University of the Cordilleras (CITCS Webinar Series)",
    badge: "ANALYTICS",
    imageUrl: "/images/python_analytics_cert.png",
    imageCaption: "Certificate of Participation • CITCS Webinar Series: Practical Data Analytics using Python and Data Visualization • March 14, 2026"
  },
  {
    title: "Sui Move in Campus",
    date: "October 23, 2025",
    venue: "University of the Cordilleras, Baguio City",
    badge: "WEB3 / SUI",
    imageUrl: "/images/sui_move_cert.png",
    imageCaption: "Official Certificate of Completion • Sui Move in Campus Smart Contract Training • October 23, 2025"
  },
  {
    title: "DevFest Baguio 2025",
    date: "October 18, 2025",
    venue: "Baguio Convention and Cultural Center, Baguio City",
    badge: "GOOGLE / GDG",
    imageUrl: "/images/devfest_baguio_cert.png",
    imageCaption: "Certificate of Participation • DevFest Baguio 2025 • Google Developer Group (GDG) Baguio • October 18, 2025"
  },
  {
    title: "Hack4Gov Regional Qualifiers",
    date: "October 2, 2025",
    venue: "Paragon Hotel, Baguio City",
    badge: "CYBERSEC",
    imageUrl: "/images/hack4gov_2025_cert.png",
    imageCaption: "Official Certificate of Participation • DICT Hack4Gov Regional Qualifiers • October 2, 2025"
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
    venue: "Trend Micro / TrendLabs (Preliminary Round)",
    badge: "CTF",
    imageUrl: "/images/trendmicro_uctf_cert.png",
    imageCaption: "Certificate of Participation • University Capture the Flag Preliminary Round • Trend Micro / TrendLabs • August 22, 2025"
  },
  {
    title: "Devcon7 SEA Recap - Baguio (Ethereum Philippines)",
    date: "February 15, 2025",
    venue: "University of the Cordilleras, Baguio City",
    badge: "WEB3 / ETH",
    imageUrl: "/images/devcon7_baguio_cert.png",
    imageCaption: "Certificate of Recognition • Devcon7 SEA Recap Baguio • Ethereum Philippines & CITCS • February 15, 2025"
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
    id: "hack4gov5_cert_2026",
    title: "Hack4Gov 5 Regional Cyber Challenge Certificate",
    competition: "Department of Information and Communications Technology (DICT) • Region 1 / CAR",
    date: "August 13, 2026",
    venue: "Paragon Hotel, Otek St., Baguio City",
    award: "1st Place",
    badge: "1ST PLACE CERT // 2026",
    description: "Official 1st Place Certificate awarded to Ramel Joshua O. Cave in the Hack for Gov 5 – Cordillera Regional Competition under the national theme 'Decoding Youth Innovation, Anchoring One Nation's Digital Defense'. Competed in offensive web exploitation, reverse engineering, binary analysis, and incident mitigation.",
    imageUrl: "/images/hack4gov5_2026_cert.png",
    alt: "Hack for Gov 5 1st Place Official Certificate of Award"
  },
  {
    id: "hack4gov5_1stplace",
    title: "Hack4Gov 5 Regional Cyber Challenge Victory Stage",
    competition: "Department of Information and Communications Technology (DICT) • Region 1 / CAR",
    date: "August 13, 2026",
    venue: "Paragon Hotel, Otek St., Baguio City",
    award: "1st Place",
    badge: "1ST PLACE STAGE // 2026",
    description: "Official 1st Place team photograph on stage at Paragon Hotel under the national theme 'Decoding Youth Innovation, Anchoring One Nation's Digital Defense'. Competed and triumphed against leading universities in offensive web exploitation, reverse engineering, binary analysis, and incident mitigation.",
    imageUrl: "/images/hack4gov5_2025.png",
    alt: "Hack4Gov 5 1st Place Winners on Stage at Paragon Hotel, Baguio City"
  },
  {
    id: "hack4gov_qualifiers_cert_2025",
    title: "Hack4Gov 2025 Regional Qualifiers Certificate",
    competition: "Cybersecurity Bureau & National Computer Emergency Response Team (NCERT)",
    date: "October 2, 2025",
    venue: "Paragon Hotel, Baguio City",
    award: "Official Certificate of Participation",
    badge: "QUALIFIERS CERT // 2025",
    description: "Official Certificate of Participation awarded to Ramel Joshua O. Cave for competing in the 2025 Regional Qualifiers of Hack4Gov at Paragon Hotel, Baguio City. Recognized by DICT for excellence in technical cyber challenges and protocol defense.",
    imageUrl: "/images/hack4gov_2025_cert.png",
    alt: "Hack4Gov 2025 Regional Qualifiers Official Certificate of Participation"
  },
  {
    id: "hack4gov_qualifiers",
    title: "Hack4Gov Regional Delegation",
    competition: "Cybersecurity Bureau & National Computer Emergency Response Team (NCERT)",
    date: "October 2, 2025",
    venue: "Paragon Hotel, Baguio City",
    award: "Official Certificate of Participation",
    badge: "DELEGATION // 2025",
    description: "Ramel Joshua O. Cave holding his official Certificate of Participation alongside his team in Hack4Gov cybersecurity uniform. Recognized by DICT for excellence in technical cyber challenges, OSINT, and protocol packet inspection.",
    imageUrl: "/images/hack4gov_2025.png",
    alt: "Ramel Joshua O. Cave and team holding DICT Hack4Gov Certificates of Participation"
  },
  {
    id: "accenture_sap_academy_2026",
    title: "Accenture Technology Academy - SAP Basis (350 Hours)",
    competition: "Accenture Philippines & University of the Cordilleras",
    date: "August 22, 2026",
    venue: "University of the Cordilleras, Baguio City",
    award: "Certificate of Completion",
    badge: "SAP BASIS // 350 HRS",
    description: "Official Certificate of Completion awarded to Ramel Joshua O. Cave for successfully completing the 350-hour intensive curriculum of the Accenture Technology Academy for SAP Basis.",
    imageUrl: "/images/accenture_academy_cert.png",
    alt: "Accenture Technology Academy SAP Basis Certificate of Completion"
  },
  {
    id: "sui_move_campus_2025",
    title: "Sui Move in Campus Certification",
    competition: "Sui Foundation & UC Baguio Web3 Initiative",
    date: "October 23, 2025",
    venue: "University of the Cordilleras, Baguio City",
    award: "Certificate of Completion",
    badge: "WEB3 / SUI // 2025",
    description: "Official Certificate of Completion awarded to Cave Ramel Joshua for successfully participating in and completing the Sui Move in Campus smart contract training program.",
    imageUrl: "/images/sui_move_cert.png",
    alt: "Sui Move in Campus Certificate of Completion"
  },
  {
    id: "uctf_trendmicro_2025",
    title: "University Capture the Flag Preliminary Round",
    competition: "Trend Micro & TrendLabs Cybersecurity Division",
    date: "August 22, 2025",
    venue: "Trend Micro / TrendLabs",
    badge: "CTF // 2025",
    description: "Official Certificate of Participation awarded to Joshua Cave for successfully participating in the University Capture the Flag Preliminary Round sponsored by Trend Micro.",
    imageUrl: "/images/trendmicro_uctf_cert.png",
    alt: "Trend Micro University Capture the Flag Certificate of Participation"
  },
  {
    id: "devfest_baguio_2025",
    title: "DevFest Baguio 2025 Tech Summit",
    competition: "Google Developer Groups (GDG) Baguio",
    date: "October 18, 2025",
    venue: "Baguio Convention and Cultural Center, Baguio City",
    badge: "GOOGLE GDG // 2025",
    description: "Official Certificate of Participation awarded to Ramel Joshua O. Cave for attending and actively participating in DevFest Baguio 2025 organized by Google Developer Group (GDG) Baguio.",
    imageUrl: "/images/devfest_baguio_cert.png",
    alt: "DevFest Baguio 2025 Google Developer Groups Certificate of Participation"
  },
  {
    id: "python_analytics_citcs_2026",
    title: "Practical Data Analytics using Python and Data Visualization",
    competition: "CITCS Webinar Series • University of the Cordilleras",
    date: "March 14, 2026",
    venue: "University of the Cordilleras, Baguio City (via Zoom)",
    badge: "ANALYTICS // 2026",
    description: "Official Certificate of Participation awarded to Ramel Joshua O. Cave for actively participating in the CITCS Webinar Series on Practical Data Analytics using Python and Data Visualization.",
    imageUrl: "/images/python_analytics_cert.png",
    alt: "CITCS Certificate of Participation Practical Data Analytics using Python"
  },
  {
    id: "devcon7_baguio_2025",
    title: "Devcon7 SEA Recap - Baguio",
    competition: "Ethereum Philippines & CITCS-CSC",
    date: "February 15, 2025",
    venue: "University of the Cordilleras, Baguio City",
    badge: "WEB3 / ETH // 2025",
    description: "Official Certificate of Recognition awarded to Cave Ramel Joshua for commendable participation and dedication in Devcon7 SEA Recap - Baguio, contributing to Ethereum, Blockchain, and Web3 innovation.",
    imageUrl: "/images/devcon7_baguio_cert.png",
    alt: "Certificate of Recognition Devcon7 SEA Recap Baguio Ethereum Philippines"
  }
];

export const architectureProjects: ArchitectureProjectItem[] = [
  {
    id: "barangay-eng-shill",
    title: "Smart Barangay Management & Zero-Trust Security System",
    category: "Full-Stack Enterprise & Network Security Architecture",
    badge: "FLAGSHIP PROJECT // ZERO-TRUST CORE",
    overview: "Production-grade municipal resident management, automated clearance processing, and zero-trust backend architecture. Features custom Intrusion Detection & Prevention (IDS/IPS) middleware (Regulator.js), real-time telemetry pulse diagnostics, Cloudflare edge CORS origin whitelisting, role-based access control (RBAC), and Supabase PostgreSQL persistence with 200MB multi-part document streaming.",
    patterns: [
      "Zero-Trust Security Handshake",
      "Custom IDS / IPS Middleware Engine",
      "Event Loop Lag & Telemetry Pulse",
      "Role-Based Access Control (RBAC)",
      "Dynamic Cloudflare Wildcard CORS",
      "Automated Document Generation (jsPDF / ExcelJS)"
    ],
    techStack: [
      "TypeScript & React 19",
      "Express.js 5.2 (Zero-Trust Core)",
      "Supabase (PostgreSQL + SSL CA)",
      "Cloudflare Pages (Edge Frontend)",
      "Helmet & Rate Limiter Flexible",
      "Cloudinary Asset CDN",
      "jsPDF & ExcelJS Document Generation"
    ],
    topologyNodes: [
      "Cloudflare Pages Frontend",
      "Express.js Gateway (Port 8000)",
      "Regulator IDS/IPS Handshake Engine",
      "Supabase PostgreSQL (SSL CA)",
      "Cloudinary & Document Export Engines"
    ],
    topologyFlow: "Client [Cloudflare Pages HTTPS] ➔ Zero-Trust CORS Whitelist ➔ Express Security Regulator [Trace ID + IDS/IPS Scan] ➔ RBAC Controllers ➔ Supabase DB [SSL CA] + Cloudinary CDN",
    securityControls: [
      "Custom Intrusion Detection & Prevention (IDS/IPS Regulator)",
      "Dynamic Cloudflare Origin Lockdown (*.barangay-engineer-s-hill.pages.dev)",
      "Crypto UUID Request Trace IDs (X-Trace-Id Header)",
      "15s Heartbeat Telemetry & Event Loop Lag Pulse Monitor",
      "Helmet Security Headers & Cross-Origin Resource Policy",
      "Rate Limiting, XSS Cleaning, and Zod / Joi Schema Validation"
    ],
    githubUrl: "https://github.com/CaveJoshua/barangay-eng-shill-"
  }
];

