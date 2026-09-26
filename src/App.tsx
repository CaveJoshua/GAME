import React, { useState } from 'react';
import { OriginalGame } from './components/OriginalGame';
import { ResumeScreen } from './components/ResumeScreen';
import './styles/theme.css';

export const App: React.FC = () => {
  const [stage, setStage] = useState<'game' | 'resume'>('game');

  return (
    <div className="app-root">
      {stage === 'game' ? (
        <OriginalGame onComplete={() => setStage('resume')} />
      ) : (
        <ResumeScreen onRestartGame={() => setStage('game')} />
      )}
    </div>
  );
};

export default App;
