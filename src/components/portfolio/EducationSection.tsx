import React from 'react';
import { EducationItem } from '../../types';

interface EducationSectionProps {
  educationList: EducationItem[];
}

/**
 * EducationSection - Academic Attainment Timeline Chassis
 * Isolated education timeline featuring the University of the Cordilleras green liner and authentic watermark seal.
 */
export const EducationSection: React.FC<EducationSectionProps> = ({ educationList }) => {
  return (
    <section className="section education-section isolation-chassis">
      <span className="section-tag" style={{ color: '#005a36', borderColor: 'rgba(0, 90, 54, 0.3)' }}>
        Academic Background
      </span>
      <h2 className="section-title">Educational Attainment</h2>

      <div className="education-timeline">
        {educationList.map((edu, idx) => (
          <div
            key={idx}
            className={`edu-card ${edu.level === 'Tertiary' ? 'tertiary uc-card' : ''}`}
          >
            {edu.level === 'Tertiary' && (
              <div className="uc-watermark-seal" aria-hidden="true">
                <img src="/images/uc_seal.jpg" alt="University of the Cordilleras Seal" />
              </div>
            )}
            <div className="edu-header">
              <span className={`edu-level ${edu.level === 'Tertiary' ? 'uc-level' : ''}`}>
                {edu.level} Education
              </span>
              <span className="edu-date">{edu.completionDate}</span>
            </div>
            <h3 className="edu-degree">{edu.degree}</h3>
            {edu.track && (
              <div
                style={{
                  color: edu.level === 'Tertiary' ? '#005a36' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  marginBottom: '0.25rem',
                }}
              >
                {edu.track}
              </div>
            )}
            <div
              className="edu-institution"
              style={{
                color: edu.level === 'Tertiary' ? '#005a36' : 'var(--text-primary)',
                fontWeight: edu.level === 'Tertiary' ? 700 : 600,
              }}
            >
              {edu.institution}
            </div>
            <div className="edu-address">{edu.address}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
