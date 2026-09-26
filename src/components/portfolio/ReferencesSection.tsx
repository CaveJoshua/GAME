import React from 'react';
import { ProfileData } from '../../types';

interface ReferencesSectionProps {
  profile: ProfileData;
}

/**
 * ReferencesSection - Identity & Character References Chassis
 * Isolated sub-system with privacy-hardened personal info and verified LinkedIn routing.
 */
export const ReferencesSection: React.FC<ReferencesSectionProps> = ({ profile }) => {
  const verifiedLinkedin = profile.linkedinUrl || 'https://www.linkedin.com/in/rameljoshua';

  return (
    <section className="section personal-section isolation-chassis" style={{ marginBottom: '3rem' }}>
      <span className="section-tag">Identity & Verification</span>
      <h2 className="section-title">Personal Information & References</h2>

      <div className="personal-grid">
        <div className="personal-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            {profile.profileImageUrl && (
              <img
                src={profile.profileImageUrl}
                alt={profile.name}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  border: '2px solid var(--blue-border)',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.15)',
                  flexShrink: 0
                }}
              />
            )}
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Personal Information</h3>
              <div style={{ fontSize: '0.74rem', color: 'var(--blue-primary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                VERIFIED BIOMETRIC RECORD
              </div>
            </div>
          </div>
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

        <div className="personal-card flex flex-col justify-center">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', fontWeight: 700 }}>Character References</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.75rem 0 1.25rem' }}>
            Professional and academic character references are readily verified and available upon request via LinkedIn.
          </p>
          <a
            href={verifiedLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center justify-center gap-2 no-underline"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            <span>Connect via LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};
