import React from 'react';
import { PortfolioChassis } from './portfolio/PortfolioChassis';

interface ResumeScreenProps {
  onRestartGame: () => void;
}

/**
 * ResumeScreen - Backward-compatible facade delegating directly to
 * the new modular PortfolioChassis architectural framework.
 */
export const ResumeScreen: React.FC<ResumeScreenProps> = ({ onRestartGame }) => {
  return <PortfolioChassis onRestartGame={onRestartGame} />;
};

export default ResumeScreen;
