import React, { useEffect, useState, useRef } from 'react';
import '../styles/loading.css';
import { BootDiagnosticItem } from '../types';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const diagnosticList: BootDiagnosticItem[] = [
  { text: "Commencing System Diagnostic", pct: 4 },
  { text: "Memory Architecture: Verified", pct: 8, cls: "green" },
  { text: "Initializing Execution Thread", pct: 14 },
  
  // Semester 1 Check with Live 0-100% Counter
  { 
    text: "Checking Sector 01: SEMESTER 1 ................ ",
    isSemester: true,
    pctStart: 16,
    pctEnd: 32,
    cls: "complete" 
  },
  
  { text: "Allocating Virtual Memory Arena", pct: 38 },
  { text: "Core Hardware Vitals: Nominal", pct: 44, cls: "green" },
  
  // Semester 2 Check with Live 0-100% Counter
  { 
    text: "Checking Sector 02: SEMESTER 2 ................ ",
    isSemester: true,
    pctStart: 48,
    pctEnd: 65,
    cls: "complete" 
  },
  
  { text: "CPU Instruction Cache: 100% Validated", pct: 70 },
  { text: "Register State: Synchronized", pct: 74 },
  { text: "Thread Stack Integrity: Validated", pct: 78 },
  { text: "Verifying Cryptographic Handshake", pct: 82 },
  
  // Semester 3 Check with Live 0-100% Counter
  { 
    text: "Checking Sector 03: SEMESTER 3 ................ ",
    isSemester: true,
    pctStart: 84,
    pctEnd: 95,
    cls: "complete" 
  },
  
  { text: "Compiling Binary Artifacts", pct: 97 },
  { text: "Academic Clearance Protocol: Verified", pct: 98, cls: "green" },
  { text: "All Systems Verified // Ready", pct: 100, cls: "green" },
  { text: "System Clearance Complete // Launching Executive Profile...", pct: 100, cls: "complete" }
];

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [completedLines, setCompletedLines] = useState<{ text: string; badge?: string; cls?: string }[]>([]);
  const [currentTyping, setCurrentTyping] = useState<string>('');
  const [overallPct, setOverallPct] = useState<number>(0);
  const [semesterProgress, setSemesterProgress] = useState<{ active: boolean; pct: number } | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTick = () => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio fallback
    }
  };

  const playChime = () => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    let isCancelled = false;
    let lineIdx = 0;

    const processNextLine = () => {
      if (isCancelled) return;
      if (lineIdx >= diagnosticList.length) {
        playChime();
        setTimeout(() => {
          if (!isCancelled) onComplete();
        }, 600);
        return;
      }

      const item = diagnosticList[lineIdx];
      let charIdx = 0;
      setCurrentTyping('');

      const typeInterval = setInterval(() => {
        if (isCancelled) {
          clearInterval(typeInterval);
          return;
        }

        if (charIdx < item.text.length) {
          setCurrentTyping(item.text.slice(0, charIdx + 1));
          if (charIdx % 3 === 0) playTick();
          charIdx++;
        } else {
          clearInterval(typeInterval);

          // If Semester line, perform 0% -> 100% count
          if (item.isSemester) {
            setSemesterProgress({ active: true, pct: 0 });
            let count = 0;

            const semInterval = setInterval(() => {
              if (isCancelled) {
                clearInterval(semInterval);
                return;
              }

              count += 2;
              setSemesterProgress({ active: true, pct: Math.min(100, count) });
              if (count % 4 === 0) playTick();

              // Sync overall progress
              const pStart = item.pctStart || 0;
              const pEnd = item.pctEnd || 100;
              const curOverall = Math.round(pStart + (pEnd - pStart) * (count / 100));
              setOverallPct(Math.min(100, curOverall));

              if (count >= 100) {
                clearInterval(semInterval);
                playChime();
                setSemesterProgress(null);
                setCompletedLines(prev => [
                  ...prev,
                  { text: item.text, badge: "[ 100% VERIFIED ]", cls: "complete" }
                ]);
                setCurrentTyping('');
                lineIdx++;
                setTimeout(processNextLine, 180);
              }
            }, 18);
          } else {
            // Standard line
            setOverallPct(item.pct || 100);
            setCompletedLines(prev => [
              ...prev,
              { text: item.text, cls: item.cls }
            ]);
            setCurrentTyping('');
            lineIdx++;
            setTimeout(processNextLine, item.cls === "complete" ? 140 : 80);
          }
        }
      }, 14);
    };

    const initialTimeout = setTimeout(processNextLine, 300);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimeout);
    };
  }, [onComplete]);

  return (
    <div className="boot-viewport">
      <div className="boot-grid-bg" />

      {/* Top Telemetry Bar */}
      <div className="boot-topbar">
        <div className="boot-title">
          <span>SYSTEM CLEARANCE // KERNEL BOOT</span>
          <span className="boot-counter-badge">[{overallPct}%]</span>
        </div>
        <button className="btn-skip-boot" onClick={onComplete}>
          SKIP TO PROFILE ▶
        </button>
      </div>

      {/* Typewriter Terminal Stream */}
      <div className="boot-log-container">
        {completedLines.map((line, idx) => (
          <div key={idx} className={`boot-line ${line.cls || ''}`}>
            <span>{line.text}</span>
            {line.badge && <span className="sem-badge verified">{line.badge}</span>}
          </div>
        ))}

        {/* Current Active Line */}
        {currentTyping && (
          <div className="boot-line">
            <span>{currentTyping}</span>
            <span className="typing-cursor" />
          </div>
        )}

        {/* Active Semester Count */}
        {semesterProgress && semesterProgress.active && (
          <div className="boot-line complete">
            <span>{diagnosticList.find(d => d.isSemester)?.text}</span>
            <span className="sem-badge">[ {semesterProgress.pct}% ]</span>
            <span className="typing-cursor" />
          </div>
        )}
      </div>
    </div>
  );
};
