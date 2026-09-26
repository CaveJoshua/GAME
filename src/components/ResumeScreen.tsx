import React, { useState, useEffect } from 'react';
import '../styles/resume.css';
import {
  profile,
  educationList,
  skillCategories,
  seminarsAndTrainings,
  credlyBadges,
  hack4govGallery
} from '../data/resumeData';

interface ResumeScreenProps {
  onRestartGame: () => void;
}

export const ResumeScreen: React.FC<ResumeScreenProps> = ({ onRestartGame }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{ url: string; title: string; caption: string } | null>(null);

  useEffect(() => {
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
           TOP NAVIGATION BAR
           ============================================================== */}
      <header className="resume-nav">
        <div className="container">
          <div className="brand-group">
            <div className="brand-avatar">RC</div>
            <div className="brand-text">
              <h1>{profile.name}</h1>
              <span>BSIT • NETWORK & SECURITY TRACK</span>
            </div>
          </div>

          <div className="nav-actions">
            {/* Credly Verified Badges */}
            <a
              className="btn btn-print"
              href="#credly-badges"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('credly-badges')?.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Jump to Credly Verified Badges"
              style={{ borderColor: 'var(--gold-border)', color: 'var(--gold-dark)', textDecoration: 'none' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <span>5 Badges</span>
            </a>

            {/* Hack4Gov Competition Proof */}
            <a
              className="btn btn-print"
              href="#competition-proof"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('competition-proof')?.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Jump to Hack4Gov Competition Photos"
              style={{ borderColor: 'rgba(225, 29, 72, 0.4)', color: 'var(--red-primary)', textDecoration: 'none' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span>Photo Proof</span>
            </a>

            {/* Re-enter Game / Security Terminal */}
            <button className="btn btn-game" onClick={onRestartGame} title="Launch Combat Security Terminal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Security Terminal Game</span>
            </button>

            {/* Print / ATS PDF */}
            <button className="btn btn-print" onClick={() => window.print()} title="Print or Save as ATS PDF">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==============================================================
           HERO HEADER SECTION
           ============================================================== */}
      <main className="container">
        <section className="resume-hero">
          <div className="hero-status-pill">
            <span style={{ color: 'var(--red-primary)' }}>●</span>
            <span>UNIVERSITY OF THE CORDILLERAS • GRADUATE 2026</span>
          </div>

          <h1 className="hero-name">{profile.name}</h1>
          <div className="hero-title">{profile.title}</div>
          <p className="hero-about">{profile.about}</p>

          {/* Contact Details Bar */}
          <div className="hero-contact-bar">
            <div className="contact-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{profile.location}</span>
            </div>

            <div className="contact-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              <button
                className="btn btn-print"
                style={{ padding: '2px 8px', fontSize: '0.72rem', marginLeft: '6px' }}
                onClick={() => copyToClipboard(profile.phone, 'Phone')}
              >
                Copy
              </button>
            </div>

            <div className="contact-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                className="btn btn-print"
                style={{ padding: '2px 8px', fontSize: '0.72rem', marginLeft: '6px' }}
                onClick={() => copyToClipboard(profile.email, 'Email')}
              >
                Copy
              </button>
            </div>

            {/* Credly Profile Link */}
            <div className="contact-pill" style={{ background: 'var(--gold-subtle)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-sm)', padding: '3px 10px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <a
                href={profile.credlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--gold-dark)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
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
        </section>

        {/* ==============================================================
             HACK4GOV 1ST PLACE CHAMPION BANNER (GOLD & BLACK PRESTIGE)
             ============================================================== */}
        <div className="champion-banner">
          <div className="champion-content">
            <div className="trophy-badge">🏆</div>
            <div className="champion-text">
              <h3>HACK4GOV 5 REGIONAL CYBER CHALLENGE — 1ST PLACE</h3>
              <p>Top Cyber Defense & Penetration Testing Competitor • Champion Honors</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="#competition-proof"
              className="btn"
              style={{ background: 'var(--gold-primary)', color: '#09090b', fontWeight: 700, textDecoration: 'none' }}
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
              className="btn"
              style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.25)', fontWeight: 600, textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('credly-badges')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>5 Credly Badges</span>
            </a>
            <div className="champion-meta">
              AUGUST 13, 2025 // PARAGON HOTEL, BAGUIO CITY
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
              <span className="section-tag">Cyber Defense Honors & Documentation</span>
              <h2 className="section-title">Hack4Gov Competition Proof</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem', maxWidth: '750px' }}>
                Photographic documentation and verified credentials confirming 1st Place Regional Championship and Regional Finalist honors at the Department of Information and Communications Technology (DICT) Hack4Gov Cyber Challenges.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="hack4gov-tag-pill gold">2025 COMPETITION ARCHIVE</span>
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
                  title="Click to view full-resolution photograph"
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
                      style={{ padding: '3px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
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
                      <span>Enlarge Photo</span>
                    </button>
                  </div>
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
                    <button
                      className="btn btn-print"
                      style={{
                        padding: '2px 8px',
                        fontSize: '0.72rem',
                        marginTop: '0.5rem',
                        borderColor: 'var(--gold-border)',
                        color: 'var(--gold-dark)',
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
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                      <span>Photo Proof</span>
                    </button>
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
                Professional and academic character references are readily verified and available upon request.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => copyToClipboard(profile.email, 'Contact Email')}
              >
                Request References
              </button>
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
            Engineered in Pure TSX + React 18 + Vite • White Theme with Red, Black & Gold Accents
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
    </div>
  );
};
