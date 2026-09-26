import React from 'react';

interface LightboxData {
  url: string;
  title: string;
  caption?: string;
}

interface CertificateLightboxModalProps {
  data: LightboxData | null;
  onClose: () => void;
}

/**
 * CertificateLightboxModal - High-Fidelity Credential Lightbox Chassis
 * Displays full-resolution certificates, photos, and records with blurred signature safeguards.
 */
export const CertificateLightboxModal: React.FC<CertificateLightboxModalProps> = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-header">
          <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#ffffff' }}>{data.title}</div>
          <button
            className="lightbox-close-btn"
            onClick={onClose}
            title="Close Lightbox (Esc)"
          >
            ✕
          </button>
        </div>
        <div className="lightbox-img-wrap">
          <img src={data.url} alt={data.title} />
        </div>
        {data.caption && (
          <div className="lightbox-footer">
            <div style={{ fontSize: '0.88rem', color: '#e4e4e7', lineHeight: 1.5 }}>{data.caption}</div>
          </div>
        )}
      </div>
    </div>
  );
};
