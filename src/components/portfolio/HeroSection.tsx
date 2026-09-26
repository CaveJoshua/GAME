import React from 'react';
import { ProfileData } from '../../types';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenNgfwModal: () => void;
  onCopyClipboard: (text: string, label: string) => void;
}

/**
 * HeroSection - Executive Hero Chassis
 * Isolated hero section featuring cybersecurity clearance telemetry,
 * typography hierarchy, authenticated contact pill channels, and executive portrait card.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenNgfwModal,
  onCopyClipboard,
}) => {
  const verifiedLinkedin = profile.linkedinUrl || "https://www.linkedin.com/in/rameljoshua";
  const verifiedGithub = profile.githubUrl || "https://github.com/CaveJoshua";

  return (
    <section className="resume-hero isolation-chassis">
      <div className="hero-grid-layout">
        <div className="hero-main-content">
          {/* Telemetry Strip */}
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
              className="telemetry-tag cursor-pointer hover:border-sky-400 transition-colors"
              onClick={onOpenNgfwModal}
              style={{ borderColor: 'rgba(56, 189, 248, 0.45)', color: '#38bdf8' }}
              title="Click to inspect NGFW & CSP Zero-Trust Security Protocol"
            >
              <span>🛡️ NGFW DEFENSE: CSP STRICT & ENFORCED</span>
            </div>
          </div>

          {/* Track Pill */}
          <div className="hero-status-pill netsec-pill">
            <span className="status-blink-dot"></span>
            <span className="netsec-tag-text">NETSECURITY TRACK</span>
            <span className="pill-divider">//</span>
            <span>BSIT GRADUATE 2026</span>
            <span className="pill-divider">//</span>
            <span className="netsec-univ">UNIVERSITY OF THE CORDILLERAS</span>
          </div>

          {/* Main Name & Titles */}
          <h1 className="hero-name">{profile.name}</h1>
          <div className="hero-title">
            <span className="title-red">Information Technology Specialist</span>
            <span className="title-sep">•</span>
            <span className="title-blue">Network & Cyber Security Engineering</span>
          </div>
          <p className="hero-about">{profile.about}</p>

          {/* Contact Details Bar */}
          <div className="hero-contact-bar flex flex-wrap items-center gap-3 mt-4">
            {/* Location */}
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
                href={verifiedLinkedin}
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
                onClick={() => onCopyClipboard(verifiedLinkedin, 'LinkedIn URL')}
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
                href={verifiedGithub}
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
                onClick={() => onCopyClipboard(verifiedGithub, 'GitHub URL')}
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
        </div>

        {/* Executive Portrait Badge Chassis */}
        {profile.profileImageUrl && (
          <div className="hero-portrait-card">
            <div className="portrait-frame">
              <div className="portrait-header">
                <span className="portrait-status-dot"></span>
                <span className="portrait-status-text">OPERATOR // VERIFIED</span>
                <span className="portrait-clearance">LEVEL 01</span>
              </div>
              <div className="portrait-image-wrapper">
                <img
                  src={profile.profileImageUrl}
                  alt={profile.name}
                  className="portrait-img"
                  loading="eager"
                />
                <div className="portrait-scan-line"></div>
              </div>
              <div className="portrait-footer">
                <div className="portrait-meta-name">{profile.name}</div>
                <div className="portrait-meta-title">BSIT • NETWORK & SECURITY SPECIALIST</div>
                <div className="portrait-meta-id">AUTHENTICATED IDENTITY // 2026</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
