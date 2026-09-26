import React from 'react';
import { ArchitectureProjectItem } from '../../types';

interface FeaturedProjectSectionProps {
  projects: ArchitectureProjectItem[];
}

/**
 * FeaturedProjectSection - Flagship System Architecture Chassis
 * Renders technical blueprints, data flows, topology vectors, and resilience invariants.
 */
export const FeaturedProjectSection: React.FC<FeaturedProjectSectionProps> = ({ projects }) => {
  return (
    <section id="software-architecture" className="section architecture-section isolation-chassis">
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
        {projects.map((arch) => (
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
              <div className="arch-topology-flow">{arch.topologyFlow}</div>
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
                href={arch.githubUrl || "https://github.com/CaveJoshua/barangay-eng-shill-"}
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
  );
};
