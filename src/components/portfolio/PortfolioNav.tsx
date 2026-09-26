import React from 'react';
import { ProfileData } from '../../types';

interface PortfolioNavProps {
  profile: ProfileData;
  onRestartGame: () => void;
  onOpenNgfwModal: () => void;
  onPrintAts: () => void;
}

/**
 * PortfolioNav - Sticky Cybernetic Header Chassis
 * Isolated navigation layer with status HUD, rapid jump shortcuts, and ATS print pipeline.
 */
export const PortfolioNav: React.FC<PortfolioNavProps> = ({
  profile,
  onRestartGame,
  onOpenNgfwModal,
  onPrintAts,
}) => {
  return (
    <header className="resume-nav isolation-chassis">
      <div className="container flex justify-between items-center w-full">
        {/* Brand Group */}
        <div className="brand-group">
          <div className="brand-avatar">
            {profile.profileImageUrl ? (
              <img src={profile.profileImageUrl} alt={profile.name} loading="eager" />
            ) : (
              'RC'
            )}
          </div>
          <div className="brand-text">
            <h1 className="brand-name">{profile.name}</h1>
            <span className="brand-track-badge">
              <span className="track-pulse-dot"></span>
              <span className="brand-track-text">BSIT • NETSECURITY TRACK</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="nav-actions flex items-center gap-2">
          {/* Credly Badges */}
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

          {/* Hack4Gov Proof */}
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

          {/* Featured Project */}
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
            onClick={onOpenNgfwModal}
            title="Inspect Live NGFW & CSP Zero-Trust Security Defense Telemetry"
          >
            <span className="ngfw-pulse-dot"></span>
            <span>NGFW v5.4</span>
          </button>

          {/* Print / ATS Resume */}
          <button className="btn btn-print" onClick={onPrintAts} title="Print or Save as ATS Resume">
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
  );
};
