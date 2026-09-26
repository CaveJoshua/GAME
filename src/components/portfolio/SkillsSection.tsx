import React from 'react';
import { SkillCategory } from '../../types';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

/**
 * SkillsSection - Technical Competencies & Qualifications Chassis
 * Isolated technical capabilities grid across network engineering, security, and enterprise stacks.
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  return (
    <section className="section skills-section isolation-chassis">
      <span className="section-tag">Technical Competencies</span>
      <h2 className="section-title">Skills and Qualifications</h2>

      <div className="skills-grid">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="skill-category-box">
            <div className="skill-cat-header">
              <div className="skill-cat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <h3 className="skill-cat-title">{cat.title}</h3>
            </div>
            <ul className="skill-items">
              {cat.skills.map((s, sIdx) => (
                <li key={sIdx}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
