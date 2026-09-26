import React, { useEffect, useRef, useState } from 'react';
import '../styles/game.css';

interface GameScreenProps {
  onComplete: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerHp, setPlayerHp] = useState(100);
  const [targetCount, setTargetCount] = useState(3);
  const [isDamaged, setIsDamaged] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Audio Context (Synthesized Audio)
    let audioCtx: AudioContext | null = null;
    const getAudioCtx = () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    };

    const playLaserSound = () => {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } catch {
        // Fallback for audio restrictions
      }
    };

    const playHitSound = () => {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } catch {
        // Fallback
      }
    };

    // Game Entities
    const player = {
      x: width / 2,
      y: height - 120,
      vx: 0,
      vy: 0,
      speed: 6.5,
      angle: -Math.PI / 2,
      hp: 100,
      maxHp: 100,
      dashCooldown: 0
    };

    const keys: { [key: string]: boolean } = {};

    interface Bullet {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }
    const bullets: Bullet[] = [];

    interface Enemy {
      id: number;
      label: string;
      x: number;
      y: number;
      hp: number;
      maxHp: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }

    const enemies: Enemy[] = [
      { id: 1, label: 'SECTOR 01: NETWORKING', x: width * 0.25, y: height * 0.28, hp: 12, maxHp: 12, radius: 42, vx: 1.2, vy: 0.6, color: '#dc2626' },
      { id: 2, label: 'SECTOR 02: CYBERSEC', x: width * 0.5, y: height * 0.22, hp: 16, maxHp: 16, radius: 48, vx: -1.0, vy: 0.8, color: '#c59b27' },
      { id: 3, label: 'SECTOR 03: CLEARANCE', x: width * 0.75, y: height * 0.3, hp: 14, maxHp: 14, radius: 45, vx: 0.8, vy: -0.7, color: '#ffffff' }
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
    }
    const particles: Particle[] = [];

    const spawnExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 24; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 5 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          color
        });
      }
    };

    let shootCooldown = 0;

    const fireBullet = () => {
      if (shootCooldown > 0) return;
      playLaserSound();
      bullets.push({
        x: player.x,
        y: player.y - 18,
        vx: 0,
        vy: -14,
        life: 0
      });
      shootCooldown = 8;
    };

    // Key event listeners
    const onKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.code === 'Space') {
        fireBullet();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    const onMouseDown = () => {
      fireBullet();
    };

    const onTouchStart = () => {
      fireBullet();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('touchstart', onTouchStart);

    let completedTriggered = false;

    // Game Loop
    const loop = () => {
      animId = requestAnimationFrame(loop);

      // Clear
      ctx.fillStyle = '#08080a';
      ctx.fillRect(0, 0, width, height);

      // Handle Input
      let dx = 0;
      let dy = 0;
      if (keys['w'] || keys['arrowup']) dy -= 1;
      if (keys['s'] || keys['arrowdown']) dy += 1;
      if (keys['a'] || keys['arrowleft']) dx -= 1;
      if (keys['d'] || keys['arrowright']) dx += 1;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      player.x += dx * player.speed;
      player.y += dy * player.speed;

      // Keep within bounds
      player.x = Math.max(30, Math.min(width - 30, player.x));
      player.y = Math.max(50, Math.min(height - 50, player.y));

      if (shootCooldown > 0) shootCooldown--;

      // Background Starfield Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw Bullets
      ctx.fillStyle = '#dc2626';
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.vx;
        b.y += b.vy;
        b.life++;

        // Laser visual
        ctx.fillStyle = '#ff4d4d';
        ctx.shadowColor = '#dc2626';
        ctx.shadowBlur = 10;
        ctx.fillRect(b.x - 2, b.y - 12, 4, 18);
        ctx.shadowBlur = 0;

        // Collision check with enemies
        for (let j = enemies.length - 1; j >= 0; j--) {
          const en = enemies[j];
          const dist = Math.hypot(b.x - en.x, b.y - en.y);
          if (dist < en.radius) {
            en.hp--;
            playHitSound();
            spawnExplosion(b.x, b.y, en.color);
            bullets.splice(i, 1);

            if (en.hp <= 0) {
              spawnExplosion(en.x, en.y, en.color);
              enemies.splice(j, 1);
              setTargetCount(enemies.length);

              if (enemies.length === 0 && !completedTriggered) {
                completedTriggered = true;
                setTimeout(onComplete, 500);
              }
            }
            break;
          }
        }

        if (b.y < -30 || b.life > 120) {
          bullets.splice(i, 1);
        }
      }

      // Update & Draw Enemies
      for (const en of enemies) {
        en.x += en.vx;
        en.y += en.vy;

        if (en.x - en.radius < 20 || en.x + en.radius > width - 20) en.vx *= -1;
        if (en.y - en.radius < 60 || en.y + en.radius > height * 0.55) en.vy *= -1;

        // Hexagonal / Circular Core
        ctx.save();
        ctx.translate(en.x, en.y);

        // Outer Target Ring
        ctx.strokeStyle = en.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, en.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Pulsing Core
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(0, 0, en.radius - 4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(en.label, 0, -6);

        // HP Bar
        const hpBarW = en.radius * 1.3;
        const hpBarH = 4;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(-hpBarW / 2, 10, hpBarW, hpBarH);
        ctx.fillStyle = en.color;
        ctx.fillRect(-hpBarW / 2, 10, hpBarW * (en.hp / en.maxHp), hpBarH);

        ctx.restore();
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // Draw Player Vessel (Tactical Jet)
      ctx.save();
      ctx.translate(player.x, player.y);

      // Jet Glow
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(12, 12);
      ctx.lineTo(0, 5);
      ctx.lineTo(-12, 12);
      ctx.closePath();
      ctx.fill();

      // Wing Accents in Gold & Crimson
      ctx.strokeStyle = '#c59b27';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(12, 12);
      ctx.stroke();

      ctx.strokeStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(-12, 12);
      ctx.stroke();

      // Shield Ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, [onComplete]);

  return (
    <div className="game-viewport">
      <canvas ref={canvasRef} className="game-canvas" />
      <div className={`damage-overlay ${isDamaged ? 'active' : ''}`} />

      {/* Tactical HUD */}
      <div className="game-hud">
        <div className="hud-left">
          <div className="hud-title">
            <span className="badge-red">TACTICAL POD</span>
            <span>SYSTEM CLEARANCE ACTIVE</span>
          </div>
          <div className="hud-sub">
            CLEARANCE TARGETS REMAINING: <strong>{targetCount}</strong> / 3
          </div>
          <div className="hud-hp-track">
            <div className="hud-hp-bar" style={{ width: `${playerHp}%` }} />
          </div>
        </div>

        <div className="hud-right">
          <div className="hud-controls-pill">
            [WASD / ARROWS] MOVE • [SPACE / CLICK] FIRE CANNON
          </div>
          {/* Prominent Bypass Button for recruiters */}
          <button className="btn-bypass" onClick={onComplete}>
            <span>BYPASS SECURITY // SKIP TO CLEARANCE</span>
            <span>▶</span>
          </button>
        </div>
      </div>
    </div>
  );
};
