import React from 'react';
import { Hack4GovGalleryItem } from '../../types';

interface CertificatesGalleryProps {
  hack4govGallery: Hack4GovGalleryItem[];
  onOpenLightbox: (data: { url: string; title: string; caption?: string }) => void;
}

/**
 * CertificatesGallery - Cyber Defense Honors, Competition Proof & Authenticated Credentials
 * Clean, high-performance gallery of photographic proof and verified certificates.
 */
export const CertificatesGallery: React.FC<CertificatesGalleryProps> = ({
  hack4govGallery,
  onOpenLightbox,
}) => {
  return (
    <section id="competition-proof" className="section hack4gov-gallery-section isolation-chassis">
      <div className="credly-header-row">
        <div>
          <span className="section-tag">Cyber Defense Honors & Authenticated Credentials</span>
          <h2 className="section-title">Competition Proof & Verified Certificates</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem', maxWidth: '780px' }}>
            Photographic documentation, competition honors, and authenticated certificates confirming 1st Place at Hack4Gov, Trend Micro CTF, GDG DevFest, CITCS Python Data Analytics, and Ethereum Web3 Devcon7.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="hack4gov-tag-pill gold">2025 – 2026 VERIFIED ARCHIVE</span>
        </div>
      </div>

      <div className="hack4gov-gallery-grid">
        {hack4govGallery.map((item) => (
          <div key={item.id} className={`hack4gov-card ${item.award ? 'champion-card' : ''}`}>
            <div
              className="hack4gov-img-wrapper"
              onClick={() =>
                onOpenLightbox({
                  url: item.imageUrl,
                  title: item.title,
                  caption: item.description,
                })
              }
              title="Click to view full-resolution credential"
            >
              <img src={item.imageUrl} alt={item.alt} loading="lazy" />
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
                  style={{ padding: '3px 12px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  onClick={() =>
                    onOpenLightbox({
                      url: item.imageUrl,
                      title: item.title,
                      caption: item.description,
                    })
                  }
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <span>Enlarge Credential</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
