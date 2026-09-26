/**
 * RESUME & PORTFOLIO DATA STORE
 * Easily editable central data source for Joshua Cave's portfolio.
 */

const resumeData = {
  profile: {
    name: "Joshua Cave",
    initials: "JC",
    title: "Senior Full Stack Engineer & Systems Architect",
    statusText: "Available for full-time & high-impact contracts",
    location: "Manila, Philippines (UTC+8)",
    remotePreference: "Available for Global Remote & Hybrid",
    email: "nsec.fuhua.cv@gmail.com",
    github: "https://github.com/CaveJoshua",
    linkedin: "https://linkedin.com/in/cavejoshua",
    bio: "Senior Full Stack Software Engineer and Systems Architect with 5+ years of experience engineering high-throughput distributed backends, resilient microservices, and high-performance interactive web experiences. Passionate about crafting clean architectures, low-latency APIs, and intuitive user interfaces that deliver exceptional business value."
  },

  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "24+", label: "Shipped Projects" },
    { value: "99.98%", label: "Production SLA" },
    { value: "12+", label: "Core Technologies" }
  ],

  pillars: [
    {
      icon: "server",
      title: "Distributed Systems & Cloud",
      desc: "Architecting cloud-native microservices, message queues, and high-availability infrastructure that reliably scales to millions of daily events."
    },
    {
      icon: "layout",
      title: "Modern Full Stack & UI/UX",
      desc: "Building accessible, ultra-responsive web applications with React, Next.js, and TypeScript, engineered for lightning performance and sub-second load times."
    },
    {
      icon: "cpu",
      title: "Performance & Canvas / WebGL",
      desc: "Developing low-level 2D/3D interactive visual engines, GPU shaders, and procedural simulations with smooth 60 FPS animation pipelines."
    },
    {
      icon: "shield",
      title: "Clean Code & Production Quality",
      desc: "Enforcing test-driven design, CI/CD automated deployments, comprehensive telemetry, and strict security compliance across all software layers."
    }
  ],

  experience: [
    {
      role: "Senior Full Stack Engineer & Architect",
      company: "Apex Cloud Solutions",
      period: "2023 - Present",
      location: "Remote / Manila",
      bullets: [
        "Architected an event-driven microservices architecture processing 45M+ events daily with 99.98% production uptime.",
        "Spearheaded the migration of legacy monolith applications to Next.js and Go microservices, decreasing server response time by 48%.",
        "Mentored a cross-functional team of 8 engineers and introduced automated GitHub Actions CI/CD pipelines, slashing release cycles by 60%.",
        "Implemented high-concurrency Redis caching and connection pooling in PostgreSQL, cutting database query latency from 320ms to 42ms."
      ],
      tags: ["TypeScript", "Go", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"]
    },
    {
      role: "Full Stack Software Engineer",
      company: "Hyperion Digital Labs",
      period: "2021 - 2023",
      location: "Manila, Philippines",
      bullets: [
        "Engineered real-time telemetry analytics dashboards and interactive reporting views handling over 15,000 WebSocket events/sec.",
        "Designed and maintained RESTful & GraphQL APIs with automated schema validation, rate-limiting, and comprehensive Swagger documentation.",
        "Built and maintained a company-wide accessible component design system adhering to WCAG 2.1 AA accessibility standards.",
        "Configured Terraform infrastructure-as-code scripts for AWS deployment, eliminating configuration drift across development, staging, and production."
      ],
      tags: ["React", "Node.js", "GraphQL", "Python", "Tailwind CSS", "Terraform", "AWS S3 / EC2", "Jest"]
    },
    {
      role: "Frontend & Interactive Systems Developer",
      company: "CyberCore Technologies",
      period: "2019 - 2021",
      location: "Manila, Philippines",
      bullets: [
        "Developed custom HTML5 Canvas interactive graphics and web applications with strict 60 FPS performance budgets.",
        "Optimized client-side memory consumption, asset chunking, and bundle sizes, reducing initial bundle weight by 52%.",
        "Implemented secure JWT/OAuth2 authentication workflows and integrated payment gateways with zero security vulnerabilities recorded."
      ],
      tags: ["JavaScript (ES6+)", "React", "HTML5 Canvas", "Web Audio API", "WebSockets", "CSS3 / Sass"]
    }
  ],

  projects: [
    {
      id: "nier-system-core",
      title: "NieR System Core // Terminal Diagnostic Engine",
      category: "interactive",
      categoryLabel: "Interactive / Canvas",
      featured: true,
      desc: "High-precision 2D Canvas space combat and system clearance boot terminal inspired by NieR: Automata. Features procedural entity simulation, dynamic collision matrices, retro CRT scanline shader filters, and real-time Web Audio API sound synthesis.",
      tags: ["HTML5 Canvas", "Web Audio API", "Physics Engine", "Procedural VFX"],
      demoUrl: "game.html",
      sourceUrl: "https://github.com/CaveJoshua/GAME",
      internalDemo: true
    },
    {
      id: "omniflow-gateway",
      title: "OmniFlow // Distributed Event Gateway",
      category: "systems",
      categoryLabel: "Cloud & Systems",
      featured: false,
      desc: "High-throughput asynchronous message routing gateway engineered with Go and Redis Streams. Handles 50k+ events/sec with guaranteed delivery semantics, circuit-breaker fault tolerance, and dynamic load balancing.",
      tags: ["Go", "Redis Streams", "Docker", "gRPC", "Prometheus"],
      demoUrl: "https://github.com/CaveJoshua",
      sourceUrl: "https://github.com/CaveJoshua"
    },
    {
      id: "cloudpulse-observability",
      title: "CloudPulse // Real-Time Observability Suite",
      category: "fullstack",
      categoryLabel: "Full Stack",
      featured: false,
      desc: "Enterprise-grade real-time infrastructure telemetry platform. Aggregates microservice logs, traces, and metrics with sub-second WebSocket updates and interactive canvas timeline charts.",
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
      demoUrl: "https://github.com/CaveJoshua",
      sourceUrl: "https://github.com/CaveJoshua"
    },
    {
      id: "aura-webgl-engine",
      title: "AuraEngine // High-Performance WebGL Visualizer",
      category: "interactive",
      categoryLabel: "Interactive / Canvas",
      featured: false,
      desc: "GPU-accelerated multi-dimensional data visualization engine supporting 100,000+ simultaneous particles and nodes with zero frame drops, leveraging WebGL shaders and Web Workers.",
      tags: ["WebGL", "Three.js", "Web Workers", "GLSL Shaders", "TypeScript"],
      demoUrl: "https://github.com/CaveJoshua",
      sourceUrl: "https://github.com/CaveJoshua"
    },
    {
      id: "nexuspay-orchestrator",
      title: "NexusPay // Resilient Payment Orchestrator",
      category: "fullstack",
      categoryLabel: "Full Stack",
      featured: false,
      desc: "Multi-tenant payment orchestration engine supporting idempotent webhook delivery, automated retry mechanisms, and zero-downtime ledger reconciliation.",
      tags: ["Next.js", "FastAPI", "PostgreSQL", "Stripe API", "Docker"],
      demoUrl: "https://github.com/CaveJoshua",
      sourceUrl: "https://github.com/CaveJoshua"
    },
    {
      id: "kubeshield-scanner",
      title: "KubeShield // Container Security Auditor",
      category: "systems",
      categoryLabel: "Cloud & Systems",
      featured: false,
      desc: "Lightweight container image vulnerability auditor and CIS compliance scanner built with Python and Go, integrating directly into GitHub CI/CD workflows.",
      tags: ["Python", "Go", "Docker API", "GitHub Actions", "Linux"],
      demoUrl: "https://github.com/CaveJoshua",
      sourceUrl: "https://github.com/CaveJoshua"
    }
  ],

  skills: [
    {
      category: "Languages & Core",
      icon: "code",
      items: [
        { name: "TypeScript / JavaScript (ESNext)", level: 96 },
        { name: "Go (Golang)", level: 88 },
        { name: "Python", level: 90 },
        { name: "SQL (PostgreSQL / MySQL)", level: 94 },
        { name: "HTML5 / CSS3 / Web Standards", level: 98 }
      ]
    },
    {
      category: "Frontend & Interactive",
      icon: "layout",
      items: [
        { name: "React / Next.js", level: 95 },
        { name: "HTML5 Canvas API / WebGL", level: 92 },
        { name: "Tailwind CSS & Design Systems", level: 94 },
        { name: "State Architecture (Redux, Zustand)", level: 90 },
        { name: "Web Audio API & Sound Synthesis", level: 86 }
      ]
    },
    {
      category: "Backend & Distributed",
      icon: "server",
      items: [
        { name: "Node.js & Express / NestJS", level: 95 },
        { name: "FastAPI / Python Microservices", level: 88 },
        { name: "RESTful & GraphQL APIs", level: 95 },
        { name: "WebSockets & Real-Time Sync", level: 92 },
        { name: "gRPC & Protocol Buffers", level: 84 }
      ]
    },
    {
      category: "Cloud, DevOps & Storage",
      icon: "cloud",
      items: [
        { name: "Docker & Container Architecture", level: 92 },
        { name: "Kubernetes & Microservice Clusters", level: 82 },
        { name: "AWS (S3, EC2, ECS, Lambda, RDS)", level: 88 },
        { name: "PostgreSQL & Redis Caching", level: 94 },
        { name: "CI/CD (GitHub Actions) & Terraform", level: 90 }
      ]
    }
  ],

  educationAndCerts: [
    {
      type: "education",
      icon: "graduation-cap",
      title: "Bachelor of Science in Computer Science",
      issuer: "Technological University",
      period: "Graduated with Academic Honors",
      desc: "Focus on Distributed Systems, Algorithms, Data Structures, and Software Architecture."
    },
    {
      type: "cert",
      icon: "award",
      title: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services (AWS)",
      period: "Issued • Verified Credential",
      desc: "Validated proficiency in architecting secure, resilient, high-performance, and cost-optimized cloud architectures."
    },
    {
      type: "cert",
      icon: "award",
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "The Linux Foundation / CNCF",
      period: "Issued • Verified Credential",
      desc: "Demonstrated competence in Kubernetes cluster architecture, networking, storage, and troubleshooting."
    }
  ]
};
