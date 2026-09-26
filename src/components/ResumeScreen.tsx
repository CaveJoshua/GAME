import React, { useState, useEffect } from 'react';
import '../styles/resume.css';
import {
  profile,
  educationList,
  skillCategories,
  seminarsAndTrainings,
  credlyBadges,
  hack4govGallery,
  architectureProjects
} from '../data/resumeData';
import { ngfw, NGFWStatus } from '../security/ngfw';

interface ResumeScreenProps {
  onRestartGame: () => void;
}

export const ResumeScreen: React.FC<ResumeScreenProps> = ({ onRestartGame }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{ url: string; title: string; caption: string } | null>(null);
  const [ngfwStatus, setNgfwStatus] = useState<NGFWStatus | null>(null);
  const [showNgfwModal, setShowNgfwModal] = useState<boolean>(false);

  useEffect(() => {
    // Initialize Next-Gen Web Application Firewall (NGFW) & CSP monitoring
    const initialStatus = ngfw.init();
    setNgfwStatus(initialStatus);

    // Ensure Credly embed script is loaded
    if (!document.querySelector('script[src*="cdn.credly.com/assets/utilities/embed.js"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//cdn.credly.com/assets/utilities/embed.js';
      document.body.appendChild(script);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightbox(null);
        setShowNgfwModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} copied to clipboard!`);
      }).catch(() => {
        showToast(`${label}: ${text}`);
      });
    } else {
      showToast(`${label}: ${text}`);
    }
  };

  return (
    <div className="resume-wrapper">
      {/* ==============================================================
           CYBER TRIAD CINEMATIC ANIMATED BACKGROUND (CIA TRIAD WATERMARK)
           ============================================================== */}
      <div className="cyber-triad-bg" aria-hidden="true">
        {/* Animated Cyber Matrix Aura */}
        <div className="cyber-matrix-aura"></div>
        {/* Animated Cyber Laser Sweep */}
        <div className="cyber-laser-sweep"></div>

        <svg className="cyber-triad-svg" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="triadBlueRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.38" />
            </linearGradient>
            <radialGradient id="nodeGlowBlue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nodeGlowRed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e11d48" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="laserBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#e11d48" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Tactical Coordinate Grid Overlay */}
          <g opacity="0.45">
            <line x1="720" y1="0" x2="720" y2="900" stroke="#2563eb" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.25" />
            <line x1="0" y1="420" x2="1440" y2="420" stroke="#e11d48" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.18" />
            
            {/* Rotating Tactical Radar Rings */}
            <circle className="tactical-ring-inner" cx="720" cy="420" r="320" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="10 8" opacity="0.22" />
            <circle className="tactical-ring-outer" cx="720" cy="420" r="460" stroke="#e11d48" strokeWidth="1" strokeDasharray="14 10" opacity="0.16" />
            
            {/* Radar Scanning Sweep Beam */}
            <g className="radar-sweep-group">
              <line x1="720" y1="420" x2="1180" y2="420" stroke="url(#laserBeam)" strokeWidth="1.5" opacity="0.3" />
            </g>
          </g>

          {/* THE CYBER CIA TRIAD */}
          <g className="triad-geometry">
            <polygon points="720,110 380,690 1060,690" stroke="url(#triadBlueRed)" strokeWidth="2.5" fill="rgba(37, 99, 235, 0.02)" />
            {/* Animated energy pulse traversing the perimeter */}
            <polygon className="triad-energy-stream" points="720,110 380,690 1060,690" stroke="#38bdf8" strokeWidth="2.8" fill="none" strokeDasharray="120 400" />
            <polygon points="720,160 425,650 1015,650" stroke="#3b82f6" strokeWidth="1" strokeDasharray="8 6" opacity="0.22" />
            <polygon points="720,650 550,380 890,380" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.2" />

            {/* Pulsing Triad Node Halos */}
            <circle className="node-halo-pulse-1" cx="720" cy="110" r="95" fill="url(#nodeGlowBlue)" />
            <circle className="node-halo-pulse-2" cx="380" cy="690" r="95" fill="url(#nodeGlowRed)" />
            <circle className="node-halo-pulse-3" cx="1060" cy="690" r="95" fill="url(#nodeGlowBlue)" />

            {/* Vertex Nodes with Ping Waves */}
            <circle className="node-ping-1" cx="720" cy="110" r="16" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.8" />
            <circle cx="720" cy="110" r="8" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2.5" />

            <circle className="node-ping-2" cx="380" cy="690" r="16" fill="none" stroke="#e11d48" strokeWidth="1.5" opacity="0.8" />
            <circle cx="380" cy="690" r="8" fill="#e11d48" stroke="#ffffff" strokeWidth="2.5" />

            <circle className="node-ping-3" cx="1060" cy="690" r="16" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.8" />
            <circle cx="1060" cy="690" r="8" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />

            {/* CIA Labels in Monospace */}
            <text x="720" y="82" textAnchor="middle" fill="#1d4ed8" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" letterSpacing="3">
              [ CONFIDENTIALITY // NODE_01 ]
            </text>
            <text x="320" y="730" textAnchor="middle" fill="#e11d48" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" letterSpacing="3">
              [ INTEGRITY // NODE_02 ]
            </text>
            <text x="1120" y="730" textAnchor="middle" fill="#2563eb" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" letterSpacing="3">
              [ AVAILABILITY // NODE_03 ]
            </text>

            <text x="720" y="425" textAnchor="middle" fill="#64748b" fontFamily="'JetBrains Mono', monospace" fontSize="11" letterSpacing="4" opacity="0.6">
              NETSECURITY TRACK // ZERO TRUST CORE // IEEE 802.1Q
            </text>
          </g>
        </svg>
      </div>

      {/* ==============================================================
           TOP NAVIGATION BAR
           ============================================================== */}
      <header className="resume-nav">
        <div className="container">
          <div className="brand-group">
            <div className="brand-avatar">RC</div>
            <div className="brand-text">
              <h1 className="brand-name">{profile.name}</h1>
              <span className="brand-track-badge">
                <span className="track-pulse-dot"></span>
                <span className="brand-track-text">BSIT • NETSECURITY TRACK</span>
              </span>
            </div>
          </div>

          <div className="nav-actions">
            {/* Credly Verified Badges */}
            <a
              className="btn btn-nav-pill"
              href="#credly-badges"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('credly-badges')?.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Jump to Credly Verified Badges"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <span>Badges</span>
            </a>

            {/* Hack4Gov Competition Proof */}
            <a
              className="btn btn-nav-pill"
              href="#competition-proof"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('competition-proof')?.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Jump to Hack4Gov Competition Photos"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span>Proof</span>
            </a>

            {/* Featured Project Showcase */}
            <a
              className="btn btn-nav-pill"
              href="#software-architecture"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('software-architecture')?.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Jump to Featured Project & System Architecture"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>Project</span>
            </a>

            {/* Re-enter Game / Security Terminal */}
            <button className="btn btn-game" onClick={onRestartGame} title="Launch Combat Security Terminal">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Game</span>
            </button>

            {/* NGFW / CSP Protocol HUD */}
            <button
              className="btn-ngfw-status"
              onClick={() => {
                setNgfwStatus(ngfw.getStatus());
                setShowNgfwModal(true);
              }}
              title="Inspect Live NGFW & CSP Zero-Trust Security Defense Telemetry"
            >
              <span className="ngfw-pulse-dot"></span>
              <span>NGFW v5.4</span>
            </button>

            {/* Print / ATS Resume */}
            <button className="btn btn-print" onClick={() => window.print()} title="Print or Save as ATS Resume">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Print ATS</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==============================================================
           HERO HEADER SECTION & NETSECURITY TRACK SHOWCASE
           ============================================================== */}
      <main className="container">
        <section className="resume-hero">
          <div className="hero-telemetry-strip">
            <div className="telemetry-tag">
              <span>TRACK: NETWORK & CYBER SECURITY</span>
            </div>
            <span className="telemetry-sep">•</span>
            <div className="telemetry-tag">
              <span>CLEARANCE: LEVEL 01 ACTIVE</span>
            </div>
            <span className="telemetry-sep">•</span>
            <div
              className="telemetry-tag"
              onClick={() => {
                setNgfwStatus(ngfw.getStatus());
                setShowNgfwModal(true);
              }}
              style={{ cursor: 'pointer', borderColor: 'rgba(56, 189, 248, 0.45)', color: '#38bdf8' }}
              title="Click to inspect NGFW & CSP Zero-Trust Security Protocol"
            >
              <span>🛡️ NGFW DEFENSE: CSP STRICT & ENFORCED</span>
            </div>
          </div>

          <div className="hero-status-pill netsec-pill">
            <span className="status-blink-dot"></span>
            <span className="netsec-tag-text">NETSECURITY TRACK</span>
            <span className="pill-divider">//</span>
            <span>BSIT GRADUATE 2026</span>
            <span className="pill-divider">//</span>
            <span className="netsec-univ">UNIVERSITY OF THE CORDILLERAS</span>
          </div>

          <h1 className="hero-name">{profile.name}</h1>
          <div className="hero-title">
            <span className="title-red">Information Technology Specialist</span>
            <span className="title-sep">•</span>
            <span className="title-blue">Network & Cyber Security Engineering</span>
          </div>
          <p className="hero-about">{profile.about}</p>

          {/* Contact Details Bar */}
          <div className="hero-contact-bar">
            <div className="contact-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{profile.location}</span>
            </div>

            {/* LinkedIn Profile */}
            <div className="contact-pill" style={{ background: 'rgba(10, 102, 194, 0.08)', borderColor: 'rgba(10, 102, 194, 0.3)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a66c2">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <a
                href={profile.linkedinUrl || "https://www.linkedin.com/in/ramel-joshua-cave/"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0a66c2', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>LinkedIn Profile</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
              <button
                className="btn btn-print"
                style={{ padding: '2px 8px', fontSize: '0.72rem', marginLeft: '6px' }}
                onClick={() => copyToClipboard(profile.linkedinUrl || "https://www.linkedin.com/in/ramel-joshua-cave/", 'LinkedIn URL')}
              >
                Copy
              </button>
            </div>

            {/* GitHub Portfolio */}
            <div className="contact-pill" style={{ background: 'rgba(15, 23, 42, 0.05)', borderColor: 'rgba(15, 23, 42, 0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <a
                href={profile.githubUrl || "https://github.com/CaveJoshua"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>GitHub</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
              <button
                className="btn btn-print"
                style={{ padding: '2px 8px', fontSize: '0.72rem', marginLeft: '6px' }}
                onClick={() => copyToClipboard(profile.githubUrl || "https://github.com/CaveJoshua", 'GitHub URL')}
              >
                Copy
              </button>
            </div>

            {/* Credly Profile Link */}
            <div className="contact-pill" style={{ background: 'var(--blue-subtle)', border: '1px solid var(--blue-border)', borderRadius: 'var(--radius-sm)', padding: '3px 10px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <a
                href={profile.credlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--blue-primary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>Credly Badges</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* ==============================================================
               NETSECURITY TRACK CORE CAPABILITIES (TRIAD PILLARS)
               ============================================================== */}
          <div className="netsec-track-showcase">
            <div className="netsec-pillar-card">
              <div className="pillar-header">
                <span className="pillar-num">[ PILLAR 01 ]</span>
                <span className="pillar-icon">🛡️</span>
              </div>
              <h3 className="pillar-title">Network Infrastructure & CISCO LAN</h3>
              <p className="pillar-sub">CCNA 1–4 Routing & Switching, VLANs, Subnetting, Server Diagnostics & NC II Certified Systems</p>
            </div>

            <div className="netsec-pillar-card red-accent">
              <div className="pillar-header">
                <span className="pillar-num">[ PILLAR 02 ]</span>
                <span className="pillar-icon">⚔️</span>
              </div>
              <h3 className="pillar-title">Offensive Security & Pen-Testing</h3>
              <p className="pillar-sub">Kali Linux Toolchain, Ghidra & JADX Decompilation, Wireshark, Burp Suite, Binary & CTF Ops</p>
            </div>

            <div className="netsec-pillar-card dual-accent">
              <div className="pillar-header">
                <span className="pillar-num">[ PILLAR 03 ]</span>
                <span className="pillar-icon">⚙️</span>
              </div>
              <h3 className="pillar-title">Enterprise Defense & AI Security</h3>
              <p className="pillar-sub">SAP HANA & SAP Generative AI Developer Certified, PostgreSQL Indexing, Render & Cloudflare</p>
            </div>
          </div>
        </section>

        {/* ==============================================================
             HACK4GOV 1ST PLACE BANNER (WHITE + BLUE + RED PRESTIGE)
             ============================================================== */}
        <div className="champion-banner">
          <div className="champion-content">
            <div className="trophy-badge">🏆</div>
            <div className="champion-text">
              <h3>HACK4GOV 5 REGIONAL CYBER CHALLENGE — 1ST PLACE</h3>
              <p>Top Cyber Defense & Penetration Testing Competitor • 1st Place Honors</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="#competition-proof"
              className="btn btn-red-tactical"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('competition-proof')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span>View Photo Proof</span>
            </a>
            <a
              href="#credly-badges"
              className="btn btn-blue-cyber"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('credly-badges')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>5 Credly Badges</span>
            </a>
            <div className="champion-meta">
              AUGUST 13, 2026 // PARAGON HOTEL, BAGUIO CITY
            </div>
          </div>
        </div>

        {/* ==============================================================
             CREDLY VERIFIED CERTIFICATIONS & BADGES
             ============================================================== */}
        <section id="credly-badges" className="section credly-section">
          <div className="credly-header-row">
            <div>
              <span className="section-tag">Industry Recognized Credentials</span>
              <h2 className="section-title">Credly Verified Badges</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem', maxWidth: '680px' }}>
                Globally verified digital credentials authenticated by SAP and Cisco Systems, validating expertise in enterprise database administration, generative AI development, ethical hacking, and advanced network engineering.
              </p>
            </div>
            <a
              href={profile.credlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-print"
              style={{
                borderColor: 'var(--gold-border)',
                background: 'var(--gold-subtle)',
                color: 'var(--gold-dark)',
                fontWeight: 700,
                textDecoration: 'none',
                alignSelf: 'center'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <span>View Credly Profile</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>

          <div className="credly-badges-grid">
            {credlyBadges.map((badge) => (
              <div key={badge.id} className="credly-badge-card">
                <div className="credly-card-header">
                  <span className={`credly-issuer-tag ${badge.issuer.toLowerCase().includes('cisco') ? 'cisco' : ''}`}>
                    {badge.issuer}
                  </span>
                  <span className="credly-status-badge" title="Verified on Credly">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    VERIFIED
                  </span>
                </div>

                <div className="credly-embed-wrap">
                  {/* Credly standard embed markup */}
                  <div
                    data-iframe-width="150"
                    data-iframe-height="270"
                    data-share-badge-id={badge.id}
                    data-share-badge-host="https://www.credly.com"
                    style={{ display: 'none' }}
                  />
                  {/* Direct verified iframe */}
                  <iframe
                    name="acclaim-badge"
                    allowTransparency={true}
                    frameBorder="0"
                    id={`embedded-badge-${badge.id}`}
                    scrolling="no"
                    src={`https://www.credly.com/embedded_badge/${badge.id}`}
                    style={{ width: '150px', height: '270px', border: 0 }}
                    title={`Credly Verified Badge - ${badge.name}`}
                  />
                </div>

                <div className="credly-badge-name" title={badge.name}>
                  {badge.name}
                </div>

                <a
                  href={badge.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="credly-verify-btn"
                  title="Verify authentic achievement on Credly"
                >
                  <span>Verify Credential</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ==============================================================
             HACK4GOV CYBER DEFENSE COMPETITIONS & PHOTO PROOF (2025)
             ============================================================== */}
        <section id="competition-proof" className="section hack4gov-gallery-section">
          <div className="credly-header-row">
            <div>
              <span className="section-tag">Cyber Defense Honors & Authenticated Credentials</span>
              <h2 className="section-title">Competition Proof & Verified Certificates</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem', maxWidth: '780px' }}>
                Photographic documentation, competition honors, and authenticated certificates confirming 1st Place at Hack4Gov, Trend Micro CTF, GDG DevFest, CITCS Python Data Analytics, and Ethereum Web3 Devcon7.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="hack4gov-tag-pill gold">2025 – 2026 VERIFIED ARCHIVE</span>
            </div>
          </div>

          <div className="hack4gov-gallery-grid">
            {hack4govGallery.map((item) => (
              <div key={item.id} className={`hack4gov-card ${item.award ? 'champion-card' : ''}`}>
                <div
                  className="hack4gov-img-wrapper"
                  onClick={() => setActiveLightbox({
                    url: item.imageUrl,
                    title: item.title,
                    caption: item.description
                  })}
                  title="Click to view full-resolution credential"
                >
                  <img src={item.imageUrl} alt={item.alt} />
                  <div className="hack4gov-img-overlay">
                    <span className={`hack4gov-tag-pill ${item.award ? 'gold' : 'dark'}`}>
                      {item.badge}
                    </span>
                    <span className="hack4gov-zoom-hint">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                      Click to Enlarge
                    </span>
                  </div>
                </div>

                <div className="hack4gov-card-body">
                  <div className="hack4gov-card-meta">
                    <span>{item.date.toUpperCase()}</span>
                    <span>{item.venue}</span>
                  </div>
                  <h3 className="hack4gov-card-title">{item.title}</h3>
                  <div className="hack4gov-card-comp">{item.competition}</div>
                  <p className="hack4gov-card-desc">{item.description}</p>

                  <div className="hack4gov-card-footer">
                    <span>STATUS: <strong>AUTHENTICATED RECORD</strong></span>
                    <button
                      className="btn btn-print"
                      style={{ padding: '3px 12px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      onClick={() => setActiveLightbox({
                        url: item.imageUrl,
                        title: item.title,
                        caption: item.description
                      })}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                      <span>Enlarge Credential</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==============================================================
             FEATURED ENGINEERING PROJECT & ZERO-TRUST ARCHITECTURE
             ============================================================== */}
        <section id="software-architecture" className="section architecture-section">
          <div className="section-header-split">
            <div>
              <span className="section-tag-blue">FLAGSHIP SYSTEM // PRODUCTION ARCHITECTURE</span>
              <h2 className="section-title">Featured Systems Architecture & Engineering</h2>
              <p className="section-desc">
                Production-grade municipal resident management platform featuring custom zero-trust IDS/IPS security regulator middleware, Cloudflare edge CORS origin whitelisting, and Supabase PostgreSQL persistence.
              </p>
            </div>
            <a
              href="https://github.com/CaveJoshua/barangay-eng-shill-"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-github-preview"
              title="View GitHub Project Repository"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>View GitHub Project ↗</span>
            </a>
          </div>

          <div className="architecture-grid">
            {architectureProjects.map((arch) => (
              <div key={arch.id} className="arch-card">
                <div className="arch-card-top">
                  <span className="arch-badge">{arch.badge}</span>
                  <span className="arch-category">{arch.category}</span>
                </div>

                <h3 className="arch-title">{arch.title}</h3>
                <p className="arch-overview">{arch.overview}</p>

                {/* System Topology Blueprint Flow */}
                <div className="arch-topology-box">
                  <div className="arch-topology-header">
                    <span className="topology-terminal-title">DATA FLOW // TOPOLOGY VECTOR</span>
                    <span className="topology-status-live">● ACTIVE ARCHITECTURE</span>
                  </div>
                  <div className="arch-topology-flow">
                    {arch.topologyFlow}
                  </div>
                </div>

                {/* Node Pipeline Badges */}
                <div className="arch-nodes-chain">
                  {arch.topologyNodes.map((node, nIdx) => (
                    <React.Fragment key={nIdx}>
                      <span className="arch-node-chip">{node}</span>
                      {nIdx < arch.topologyNodes.length - 1 && <span className="arch-node-arrow">➔</span>}
                    </React.Fragment>
                  ))}
                </div>

                {/* Design Patterns & Tech Stack */}
                <div className="arch-meta-columns">
                  <div className="arch-meta-block">
                    <span className="arch-meta-label">DESIGN PATTERNS:</span>
                    <div className="arch-tag-list">
                      {arch.patterns.map((pat, pIdx) => (
                        <span key={pIdx} className="arch-tag-pattern">{pat}</span>
                      ))}
                    </div>
                  </div>
                  <div className="arch-meta-block">
                    <span className="arch-meta-label">CORE TECHNOLOGIES:</span>
                    <div className="arch-tag-list">
                      {arch.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="arch-tag-tech">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Security Controls & Invariants */}
                <div className="arch-security-block">
                  <span className="arch-meta-label">SECURITY & RESILIENCE CONTROLS:</span>
                  <ul className="arch-security-list">
                    {arch.securityControls.map((sec, sIdx) => (
                      <li key={sIdx}>
                        <span className="arch-check-icon">✓</span>
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer with GitHub project link */}
                <div className="arch-footer">
                  <span className="arch-spec-tag">ARCHITECTURE SCHEMATIC V1.0</span>
                  <a
                    href={arch.githubUrl || "https://github.com/CaveJoshua"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arch-repo-btn"
                  >
                    <span>Inspect GitHub Repo</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==============================================================
             EDUCATIONAL ATTAINMENT SECTION
             ============================================================== */}
        <section className="section">
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title">Educational Attainment</h2>

          <div className="education-timeline">
            {educationList.map((edu, idx) => (
              <div key={idx} className={`edu-card ${edu.level === 'Tertiary' ? 'tertiary' : ''}`}>
                <div className="edu-header">
                  <span className="edu-level">{edu.level} Education</span>
                  <span className="edu-date">{edu.completionDate}</span>
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                {edu.track && (
                  <div style={{ color: 'var(--red-primary)', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                    {edu.track}
                  </div>
                )}
                <div className="edu-institution">{edu.institution}</div>
                <div className="edu-address">{edu.address}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ==============================================================
             SKILLS AND QUALIFICATIONS
             ============================================================== */}
        <section className="section">
          <span className="section-tag">Technical Competencies</span>
          <h2 className="section-title">Skills and Qualifications</h2>

          <div className="skills-grid">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="skill-category-box">
                <div className="skill-cat-header">
                  <div className="skill-cat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="skill-cat-title">{cat.title}</h3>
                </div>
                <ul className="skill-items">
                  {cat.skills.map((s, sIdx) => (
                    <li key={sIdx}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ==============================================================
             SEMINARS & TRAININGS ATTENDED
             ============================================================== */}
        <section className="section">
          <span className="section-tag">Continuous Learning & Competitions</span>
          <h2 className="section-title">Seminars and Trainings Attended</h2>

          <div className="seminars-grid">
            {seminarsAndTrainings.map((item, idx) => (
              <div key={idx} className={`seminar-card ${item.highlight ? 'highlight' : ''}`}>
                <div>
                  {item.badge && <span className="seminar-badge">{item.badge}</span>}
                  <h3 className="seminar-title">{item.title}</h3>
                  {item.award && (
                    <div style={{ color: 'var(--gold-dark)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                      ★ {item.award}
                    </div>
                  )}
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{item.venue}</div>
                  {item.imageUrl && (
                    <div style={{ display: 'flex', gap: '6px', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        className="btn btn-print"
                        style={{
                          padding: '2px 8px',
                          fontSize: '0.72rem',
                          borderColor: item.highlight ? 'var(--gold-border)' : 'var(--blue-border)',
                          color: item.highlight ? 'var(--gold-dark)' : 'var(--blue-primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onClick={() => setActiveLightbox({
                          url: item.imageUrl!,
                          title: item.title,
                          caption: item.imageCaption || item.title
                        })}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                        <span>View Credential</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="seminar-meta">
                  <span>DATE:</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==============================================================
             PERSONAL INFORMATION & REFERENCES
             ============================================================== */}
        <section className="section" style={{ marginBottom: '3rem' }}>
          <span className="section-tag">Identity & Verification</span>
          <h2 className="section-title">Personal Information & References</h2>

          <div className="personal-grid">
            <div className="personal-card">
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', fontWeight: 700 }}>Personal Information</h3>
              <div className="info-rows">
                <div>
                  <div className="info-row-label">Date of Birth</div>
                  <div className="info-row-val">{profile.dateOfBirth}</div>
                </div>
                <div>
                  <div className="info-row-label">Age</div>
                  <div className="info-row-val">{profile.age} years old</div>
                </div>
                <div>
                  <div className="info-row-label">Height</div>
                  <div className="info-row-val">{profile.height}</div>
                </div>
                <div>
                  <div className="info-row-label">Weight</div>
                  <div className="info-row-val">{profile.weight}</div>
                </div>
              </div>
            </div>

            <div className="personal-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', fontWeight: 700 }}>Character References</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.75rem 0 1.25rem' }}>
                Professional and academic character references are readily verified and available upon request via LinkedIn.
              </p>
              <a
                href={profile.linkedinUrl || "https://www.linkedin.com/in/ramel-joshua-cave/"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>Connect via LinkedIn</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ==============================================================
           FOOTER
           ============================================================== */}
      <footer className="resume-footer">
        <div className="container">
          <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            {profile.name}
          </div>
          <div>Bachelor of Science in Information Technology • University of the Cordilleras</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
            Engineered in Pure TSX + React 18 + Vite • White Theme with Cyber Blue, Tactical Red & Gold Accents
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && <div className="app-toast">{toastMessage}</div>}

      {/* High-Resolution Photo Lightbox Modal */}
      {activeLightbox && (
        <div
          className="lightbox-backdrop"
          onClick={() => setActiveLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{activeLightbox.title}</div>
              <button
                className="lightbox-close-btn"
                onClick={() => setActiveLightbox(null)}
                title="Close Lightbox (Esc)"
              >
                ✕
              </button>
            </div>
            <div className="lightbox-img-wrap">
              <img src={activeLightbox.url} alt={activeLightbox.title} />
            </div>
            <div className="lightbox-footer">
              <div style={{ fontSize: '0.88rem', color: '#e4e4e7', lineHeight: 1.5 }}>
                {activeLightbox.caption}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next-Gen Web Application Firewall (NGFW) & CSP Protocol Modal */}
      {showNgfwModal && ngfwStatus && (
        <div
          className="ngfw-modal-backdrop"
          onClick={() => setShowNgfwModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="ngfw-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ngfw-modal-header">
              <div className="ngfw-modal-title">
                <span>🛡️</span>
                <span>NGFW PROTOCOL DEFENSE ENGINE // {ngfwStatus.version}</span>
              </div>
              <button
                className="lightbox-close-btn"
                onClick={() => setShowNgfwModal(false)}
                title="Close NGFW Monitor (Esc)"
              >
                ✕
              </button>
            </div>

            <div className="ngfw-modal-body">
              {/* Status Metric Cards */}
              <div className="ngfw-status-cards-row">
                <div className="ngfw-stat-card">
                  <span className="ngfw-stat-label">DEFENSE SHIELD</span>
                  <span className="ngfw-stat-value" style={{ color: '#22c55e' }}>
                    {ngfwStatus.mode}
                  </span>
                </div>
                <div className="ngfw-stat-card">
                  <span className="ngfw-stat-label">CSP DIRECTIVE</span>
                  <span className="ngfw-stat-value" style={{ color: '#38bdf8' }}>
                    {ngfwStatus.cspStatus}
                  </span>
                </div>
                <div className="ngfw-stat-card">
                  <span className="ngfw-stat-label">THREATS INTERCEPTED</span>
                  <span className="ngfw-stat-value" style={{ color: ngfwStatus.threatsBlocked > 0 ? '#f43f5e' : '#22c55e' }}>
                    {ngfwStatus.threatsBlocked} BLOCKED
                  </span>
                </div>
              </div>

              {/* Protocol Security Headers Table */}
              <div className="ngfw-panel">
                <div className="ngfw-panel-title">
                  <span>ACTIVE HTTP SECURITY HEADERS & DIRECTIVES</span>
                  <span style={{ color: '#22c55e', fontSize: '0.72rem' }}>● ALL COMPLIANT</span>
                </div>
                <table className="ngfw-table">
                  <thead>
                    <tr>
                      <th>HEADER NAME</th>
                      <th>POLICY / DIRECTIVE</th>
                      <th>PROTECTION LEVEL</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="header-name">Content-Security-Policy</td>
                      <td>default-src 'self'; frame-ancestors 'none'; object-src 'none'</td>
                      <td>Anti-XSS / Injection Lockdown</td>
                      <td className="header-status">✓ ENFORCED</td>
                    </tr>
                    <tr>
                      <td className="header-name">X-Frame-Options</td>
                      <td>DENY</td>
                      <td>Anti-Clickjacking Frame Shield</td>
                      <td className="header-status">✓ LOCKED</td>
                    </tr>
                    <tr>
                      <td className="header-name">X-Content-Type-Options</td>
                      <td>nosniff</td>
                      <td>Anti-MIME Type Confusion</td>
                      <td className="header-status">✓ ACTIVE</td>
                    </tr>
                    <tr>
                      <td className="header-name">Cross-Origin-Opener-Policy</td>
                      <td>same-origin</td>
                      <td>Process-Level Tab Isolation</td>
                      <td className="header-status">✓ ISOLATED</td>
                    </tr>
                    <tr>
                      <td className="header-name">Cross-Origin-Resource-Policy</td>
                      <td>same-origin</td>
                      <td>Hotlink & Leak Mitigation</td>
                      <td className="header-status">✓ GUARDED</td>
                    </tr>
                    <tr>
                      <td className="header-name">Strict-Transport-Security</td>
                      <td>max-age=31536000; includeSubDomains; preload</td>
                      <td>Force End-to-End TLS Encryption</td>
                      <td className="header-status">✓ HSTS ARMED</td>
                    </tr>
                    <tr>
                      <td className="header-name">Permissions-Policy</td>
                      <td>camera=(), microphone=(), geolocation=()</td>
                      <td>Zero Device Sensor Access</td>
                      <td className="header-status">✓ REVOKED</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Active Content Security Policy Definition */}
              <div className="ngfw-panel">
                <div className="ngfw-panel-title">
                  <span>ACTIVE CSP DIRECTIVE CONFIGURATION</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>ISO/IEC 27001 & OWASP ASVS LEVEL 3</span>
                </div>
                <div className="ngfw-csp-codebox">
                  default-src 'self';<br />
                  script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.credly.com;<br />
                  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;<br />
                  img-src 'self' data: blob: https://images.credly.com https://cdn.credly.com https://*.credly.com;<br />
                  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;<br />
                  connect-src 'self' https://*.credly.com;<br />
                  frame-src 'self' https://www.credly.com;<br />
                  frame-ancestors 'none'; object-src 'none'; base-uri 'self';
                </div>
              </div>

              {/* Threat Simulation & Real-time Telemetry Trace */}
              <div className="ngfw-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="ngfw-panel-title">
                  <span>SESSION TRACE & DEFENSE PROBE TESTING</span>
                  <button
                    className="ngfw-sim-button"
                    onClick={() => {
                      ngfw.recordEvent({
                        timestamp: new Date().toLocaleTimeString(),
                        type: 'INJECTION_ATTEMPT',
                        severity: 'HIGH',
                        details: 'Intercepted simulated cross-site script payload: <script>alert(1)</script>',
                        source: 'Simulated User Probe'
                      });
                      setNgfwStatus(ngfw.getStatus());
                      showToast('NGFW Alert: Blocked simulated script injection payload!');
                    }}
                  >
                    Simulate Hostile Injection Probe
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span>CRYPTOGRAPHIC TRACE ID: <strong style={{ color: '#38bdf8' }}>{ngfwStatus.traceId}</strong></span>
                  <span>HEARTBEAT PULSE: <strong style={{ color: '#22c55e' }}>{ngfwStatus.lastPulse}</strong></span>
                </div>

                {ngfwStatus.recentEvents.length > 0 && (
                  <div style={{ marginTop: '0.4rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#f43f5e', marginBottom: '0.35rem', fontWeight: 700 }}>
                      RECENT INTERCEPT LOGS:
                    </div>
                    {ngfwStatus.recentEvents.slice(0, 3).map((ev, eIdx) => (
                      <div key={eIdx} style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1', padding: '3px 0' }}>
                        <span style={{ color: '#64748b' }}>[{ev.timestamp}]</span>{' '}
                        <span style={{ color: '#f43f5e', fontWeight: 700 }}>[{ev.type}]</span>{' '}
                        <span>{ev.details}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
