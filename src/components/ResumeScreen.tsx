import React, { useState } from 'react';
import '../styles/resume.css';
import {
  profile,
  educationList,
  skillCategories,
  seminarsAndTrainings
} from '../data/resumeData';

interface ResumeScreenProps {
  onRestartGame: () => void;
}

export const ResumeScreen: React.FC<ResumeScreenProps> = ({ onRestartGame }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
            {/* Re-enter Game / Security Terminal */}
            <button className="btn btn-game" onClick={onRestartGame} title="Launch Combat Security Terminal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Security Terminal Game</span>
            </button>

            {/* Print / ATS PDF */}
            <button className="btn btn-print" onClick={() => window.print()} title="Print or Save as ATS PDF">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{profile.location}</span>
            </div>

            <div className="contact-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          </div>
        </section>

        {/* ==============================================================
             HACK4GOV 1ST PLACE CHAMPION BANNER (GOLD & BLACK PRESTIGE)
             ============================================================== */}
        <div className="champion-banner">
          <div className="champion-content">
            <div className="trophy-badge">🏆</div>
            <div className="champion-text">
              <h3>HACK4GOV REGIONAL CYBER CHALLENGE — 1ST PLACE</h3>
              <p>Top Cyber Defense & Penetration Testing Competitor • Champion Honors</p>
            </div>
          </div>
          <div className="champion-meta">
            AUGUST 13, 2026 // PARAGON HOTEL, BAGUIO CITY
          </div>
        </div>

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
    </div>
  );
};
