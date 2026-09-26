import React from 'react';
import { EducationItem } from '../../types';

interface EducationSectionProps {
  educationList: EducationItem[];
}

/**
 * EducationSection - Academic Attainment Timeline Chassis
 * Isolated education timeline showing tertiary, secondary, and NC II achievements.
 */
export const EducationSection: React.FC<EducationSectionProps> = ({ educationList }) => {
  return (
    <section className="section education-section isolation-chassis">
      <span className="section-tag">Academic Background</span>
      <h2 className="section-title">Educational Attainment</h2>

      <div className="education-timeline">
        {educationList.map((edu, idx) => (
          <div key={idx} className={`edu-card ${edu.level === 'Tertiary' ? 'tertiary' : ''}`}>
            <div className="edu-header">
              <span className="edu-level">{edu.level} Education</span>
              <span className="edu-date">{edu.completionDate}</span>
            </div>
            <h3 className="edu-degree">{edu.degree}</h3>
            {edu.track && (
              <div style={{ color: 'var(--red-primary)', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                {edu.track}
              </div>
            )}
            <div className="edu-institution">{edu.institution}</div>
            <div className="edu-address">{edu.address}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
