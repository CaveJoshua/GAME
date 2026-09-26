import React from 'react';
import { ProfileData } from '../../types';

interface FooterSectionProps {
  profile: ProfileData;
}

/**
 * FooterSection - Portfolio Chassis Cryptographic Seal & Footer
 */
export const FooterSection: React.FC<FooterSectionProps> = ({ profile }) => {
  return (
    <footer className="resume-footer isolation-chassis">
      <div className="container">
        <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          {profile.name}
        </div>
        <div>Bachelor of Science in Information Technology • University of the Cordilleras</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
          AUTHENTICATED CRYPTOGRAPHIC SIGNATURE // PORTFOLIO CHASSIS // 2026
        </div>
      </div>
    </footer>
  );
};
