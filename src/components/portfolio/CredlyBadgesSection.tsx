import React from 'react';
import { CredlyBadgeItem } from '../../types';

interface CredlyBadgesSectionProps {
  badges: CredlyBadgeItem[];
  credlyUrl: string;
}

/**
 * CredlyBadgesSection - Authenticated Digital Badges Chassis
 * Embeds official Credly verification iframes with issuer tags and cryptographically validated seals.
 */
export const CredlyBadgesSection: React.FC<CredlyBadgesSectionProps> = ({ badges, credlyUrl }) => {
  return (
    <section id="credly-badges" className="section credly-section isolation-chassis">
      <div className="credly-header-row">
        <div>
          <span className="section-tag">Industry Recognized Credentials</span>
          <h2 className="section-title">Credly Verified Badges</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem', maxWidth: '680px' }}>
            Globally verified digital credentials authenticated by SAP and Cisco Systems, validating expertise in enterprise database administration, generative AI development, ethical hacking, and advanced network engineering.
          </p>
        </div>
        <a
          href={credlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-print"
          style={{
            borderColor: 'var(--gold-border)',
            background: 'var(--gold-subtle)',
            color: 'var(--gold-dark)',
            fontWeight: 700,
            textDecoration: 'none',
            alignSelf: 'center',
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
        {badges.map((badge) => (
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
              <iframe
                name="acclaim-badge"
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
  );
};
