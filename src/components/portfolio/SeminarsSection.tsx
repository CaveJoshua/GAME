import React from 'react';
import { SeminarItem } from '../../types';

interface SeminarsSectionProps {
  seminars: SeminarItem[];
  onOpenLightbox: (data: { url: string; title: string; caption?: string }) => void;
}

/**
 * SeminarsSection - Continuous Learning, Competitions & Technical Seminars Chassis
 * Renders verified technical workshops, hackathons, and certifications attended with lightbox credential inspection.
 */
export const SeminarsSection: React.FC<SeminarsSectionProps> = ({
  seminars,
  onOpenLightbox,
}) => {
  return (
    <section className="section seminars-section isolation-chassis">
      <span className="section-tag">Continuous Learning & Competitions</span>
      <h2 className="section-title">Seminars and Trainings Attended</h2>

      <div className="seminars-grid">
        {seminars.map((item, idx) => (
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
                      gap: '4px',
                    }}
                    onClick={() =>
                      onOpenLightbox({
                        url: item.imageUrl!,
                        title: item.title,
                        caption: item.imageCaption || item.title,
                      })
                    }
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
  );
};
