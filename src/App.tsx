import React, { useState } from 'react';
import { AppStage } from './types';
import { GameScreen } from './components/GameScreen';
import { LoadingAnimation } from './components/LoadingAnimation';
import { ResumeScreen } from './components/ResumeScreen';
import './styles/theme.css';

export const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('game');

  return (
    <div className="app-root">
      {stage === 'game' && (
        <GameScreen onComplete={() => setStage('loading')} />
      )}

      {stage === 'loading' && (
        <LoadingAnimation onComplete={() => setStage('resume')} />
      )}

      {stage === 'resume' && (
        <ResumeScreen onRestartGame={() => setStage('game')} />
      )}
    </div>
  );
};

export default App;
