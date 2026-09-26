import React from 'react';

/**
 * ChampionBanner - Hack4Gov Prestige Banner Chassis
 * Highlights regional cybersecurity competition 1st place victory.
 */
export const ChampionBanner: React.FC = () => {
  return (
    <div className="champion-banner isolation-chassis">
      <div className="champion-content">
        <div className="trophy-badge">🏆</div>
        <div className="champion-text">
          <h3>HACK4GOV 5 REGIONAL CYBER CHALLENGE — 1ST PLACE</h3>
          <p>Top Cyber Defense & Penetration Testing Competitor • 1st Place Honors</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
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
          className="btn btn-navy"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('credly-badges')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>5 Credly Badges</span>
        </a>

        <span className="champion-date-badge">
          AUGUST 13, 2026 // PARAGON HOTEL, BAGUIO CITY
        </span>
      </div>
    </div>
  );
};
