import React, { useEffect, useRef } from 'react';
import '../styles/originalGame.css';

interface OriginalGameProps {
  onComplete: () => void;
}

export const OriginalGame: React.FC<OriginalGameProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bootScreenRef = useRef<HTMLDivElement | null>(null);
  const bootLinesContainerRef = useRef<HTMLDivElement | null>(null);
  const typingLineRef = useRef<HTMLDivElement | null>(null);
  const typingTextRef = useRef<HTMLSpanElement | null>(null);
  const bootCounterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bootScreen = bootScreenRef.current;
    const bootLinesContainer = bootLinesContainerRef.current;
    const typingLine = typingLineRef.current;
    const typingText = typingTextRef.current;
    const bootCounter = bootCounterRef.current;

    let W: number = window.innerWidth;
    let H: number = window.innerHeight;
    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Procedural Web Audio Engine
    let audioCtx: AudioContext | null = null;
    let masterGain: GainNode | null = null;

    function initAudio() {
      if (!audioCtx) {
        try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtx = new AudioContextClass();
          masterGain = audioCtx.createGain();
          masterGain.gain.setValueAtTime(0.18, audioCtx.currentTime);
          masterGain.connect(audioCtx.destination);
        } catch {}
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
    }
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });

    function playLaserSound() {
      if (!audioCtx || audioCtx.state !== 'running' || !masterGain) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1300, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.03);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      osc.stop(t + 0.03);
    }

    function playExplodeSound(isBoss: boolean) {
      if (!audioCtx || audioCtx.state !== 'running' || !masterGain) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(isBoss ? 160 : 250, t);
      osc.frequency.linearRampToValueAtTime(30, t + (isBoss ? 0.5 : 0.28));
      gain.gain.setValueAtTime(isBoss ? 0.45 : 0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + (isBoss ? 0.5 : 0.28));
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      osc.stop(t + (isBoss ? 0.5 : 0.28));
    }

    function playKeyTick() {
      if (!audioCtx || audioCtx.state !== 'running' || !masterGain) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750 + Math.random() * 450, t);
      gain.gain.setValueAtTime(0.025, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      osc.stop(t + 0.02);
    }

    function playSuccessChime(freq = 660) {
      if (!audioCtx || audioCtx.state !== 'running' || !masterGain) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      osc.stop(t + 0.22);
    }

    // ==============================================================
    // COMBAT ENCOUNTER: SEMESTER 1, 2, 3 (ONLY WORDS / NO BOXES)
    // ==============================================================
    interface EnemyDef {
      text: string;
      hp: number;
      isBoss?: boolean;
    }

    const enemyDefinitions: EnemyDef[] = [
      { text: "SEMES 1", hp: 14 },
      { text: "SEMES 2", hp: 18 },
      { text: "SEMES 3", hp: 28, isBoss: true }
    ];

    let wordIndex = 0;
    let screenShake = 0;
    let sequenceFinished = false;
    let spawnPauseTimer = 0;

    // Autonomous Player Unit
    const player = {
      x: W / 2,
      y: H - 110,
      targetX: W / 2,
      targetY: H - 110,
      angle: -Math.PI / 2,
      shootTimer: 0
    };

    interface EnemyEntity {
      text: string;
      x: number;
      y: number;
      targetY: number;
      swayPhase: number;
      vy: number;
      hp: number;
      maxHp: number;
      width: number;
      height: number;
      flashTimer: number;
      attackTimer: number;
      isBoss: boolean;
    }

    interface BulletEntity {
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      w: number;
      h: number;
    }

    interface OrbEntity {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      glow: string;
    }

    interface ParticleEntity {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }

    let enemies: EnemyEntity[] = [];
    let playerBullets: BulletEntity[] = [];
    let enemyOrbs: OrbEntity[] = [];
    let particles: ParticleEntity[] = [];

    function spawnNextTarget() {
      if (wordIndex >= enemyDefinitions.length || !ctx) return;
      const def = enemyDefinitions[wordIndex++];
      const isBoss = !!def.isBoss;

      ctx.font = isBoss ? '800 24px Rajdhani, sans-serif' : '700 20px Rajdhani, sans-serif';
      const textWidth = ctx.measureText(def.text).width;

      enemies.push({
        text: def.text,
        x: W / 2 + (Math.random() - 0.5) * (W * 0.35),
        y: -30,
        targetY: 100 + Math.random() * (H * 0.16),
        swayPhase: Math.random() * Math.PI * 2,
        vy: 2.8,
        hp: def.hp,
        maxHp: def.hp,
        width: textWidth,
        height: 26,
        flashTimer: 0,
        attackTimer: 0.3,
        isBoss: isBoss
      });
    }

    spawnNextTarget();

    let lastTime = performance.now();
    let animId: number;

    function update(dt: number) {
      if (sequenceFinished) return;

      if (enemies.length === 0 && wordIndex < enemyDefinitions.length) {
        spawnPauseTimer += dt;
        if (spawnPauseTimer >= 0.25) {
          spawnPauseTimer = 0;
          spawnNextTarget();
        }
      }

      const activeEnemy = enemies[0] || null;

      // Auto-Navigation
      if (activeEnemy) {
        player.targetX = activeEnemy.x + Math.sin(performance.now() / 300) * 40;
        player.targetY = Math.min(H - 80, Math.max(H * 0.65, activeEnemy.y + 220));

        const desiredAngle = Math.atan2(activeEnemy.y - player.y, activeEnemy.x - player.x);
        player.angle += (desiredAngle - player.angle) * 0.22;
      } else {
        player.targetX = W / 2;
        player.targetY = H - 110;
        player.angle += (-Math.PI / 2 - player.angle) * 0.15;
      }

      player.x += (player.targetX - player.x) * 0.18;
      player.y += (player.targetY - player.y) * 0.18;

      // Focused Laser Stream
      player.shootTimer += dt;
      if (activeEnemy && player.shootTimer > 0.06) {
        player.shootTimer = 0;
        playLaserSound();

        const speed = 1150;
        const tipX = player.x + Math.cos(player.angle) * 18;
        const tipY = player.y + Math.sin(player.angle) * 18;

        [-0.06, 0.06].forEach(offset => {
          const finalAngle = player.angle + offset;
          playerBullets.push({
            x: tipX,
            y: tipY,
            vx: Math.cos(finalAngle) * speed,
            vy: Math.sin(finalAngle) * speed,
            angle: finalAngle,
            w: 20,
            h: 3.5
          });
        });
      }

      // Laser Collisions
      for (let i = playerBullets.length - 1; i >= 0; i--) {
        const b = playerBullets[i];
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        let hit = false;
        for (let j = enemies.length - 1; j >= 0; j--) {
          const e = enemies[j];
          const halfW = e.width / 2 + 15;
          const halfH = 15;

          if (b.x >= e.x - halfW && b.x <= e.x + halfW &&
              b.y >= e.y - halfH && b.y <= e.y + halfH) {

            e.hp -= 1.6;
            e.flashTimer = 0.06;
            hit = true;

            particles.push({
              x: b.x,
              y: b.y,
              vx: (Math.random() - 0.5) * 140,
              vy: (Math.random() - 0.5) * 140,
              life: 0.15,
              maxLife: 0.15,
              color: '#ffffff',
              size: 2
            });

            if (e.hp <= 0) {
              playExplodeSound(e.isBoss);
              screenShake = e.isBoss ? 26 : 14;

              for (let k = 0; k < (e.isBoss ? 55 : 28); k++) {
                particles.push({
                  x: e.x + (Math.random() - 0.5) * e.width,
                  y: e.y + (Math.random() - 0.5) * 20,
                  vx: (Math.random() - 0.5) * (e.isBoss ? 440 : 280),
                  vy: (Math.random() - 0.5) * (e.isBoss ? 440 : 280),
                  life: 0.55,
                  maxLife: 0.55,
                  color: Math.random() > 0.3 ? '#ffffff' : '#d8d4c5',
                  size: Math.random() * 3 + 1.5
                });
              }
              enemies.splice(j, 1);
            }
            break;
          }
        }

        if (hit || b.y < -40 || b.y > H + 40 || b.x < -40 || b.x > W + 40) {
          playerBullets.splice(i, 1);
        }
      }

      // Enemies Hover & Wave Patterns
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        if (e.y < e.targetY) {
          e.y += e.vy * 1.5;
        } else {
          e.x += Math.sin(performance.now() / 600 + e.swayPhase) * 1.6;
        }

        if (e.flashTimer > 0) e.flashTimer -= dt;

        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          e.attackTimer = e.isBoss ? 0.45 : 0.65;
          const aimAngle = Math.atan2(player.y - e.y, player.x - e.x);

          if (e.isBoss) {
            for (let k = 0; k < 8; k++) {
              const ang = (Math.PI * 2 / 8) * k + performance.now() / 600;
              enemyOrbs.push({
                x: e.x,
                y: e.y,
                vx: Math.cos(ang) * 160,
                vy: Math.sin(ang) * 160,
                radius: 6,
                glow: '#f36868'
              });
            }
          } else {
            [-18, 18].forEach(offset => {
              enemyOrbs.push({
                x: e.x + offset,
                y: e.y,
                vx: Math.cos(aimAngle) * 180,
                vy: Math.sin(aimAngle) * 180,
                radius: 5.5,
                glow: '#e27d60'
              });
            });
          }
        }
      }

      // Incoming Bullets Harmlessly Deflected
      for (let i = enemyOrbs.length - 1; i >= 0; i--) {
        const orb = enemyOrbs[i];
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;

        if (Math.hypot(orb.x - player.x, orb.y - player.y) < 28) {
          for (let k = 0; k < 4; k++) {
            particles.push({
              x: orb.x,
              y: orb.y,
              vx: (Math.random() - 0.5) * 140,
              vy: (Math.random() - 0.5) * 140,
              life: 0.18,
              maxLife: 0.18,
              color: '#d8d4c5',
              size: 2
            });
          }
          enemyOrbs.splice(i, 1);
          continue;
        }

        if (orb.y < -50 || orb.y > H + 50 || orb.x < -50 || orb.x > W + 50) {
          enemyOrbs.splice(i, 1);
        }
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0) particles.splice(i, 1);
      }

      // Victory Condition -> Shift to Boot Diagnostic Screen
      if (wordIndex >= enemyDefinitions.length && enemies.length === 0 && !sequenceFinished) {
        sequenceFinished = true;
        setTimeout(() => {
          triggerDiagnosticBootScreen();
        }, 400);
      }
    }

    function render() {
      if (!ctx) return;
      let shakeX = 0, shakeY = 0;
      if (screenShake > 0) {
        shakeX = (Math.random() - 0.5) * screenShake;
        shakeY = (Math.random() - 0.5) * screenShake;
        screenShake = Math.max(0, screenShake - 0.016 * 32);
      }

      ctx.save();
      ctx.translate(shakeX, shakeY);
      ctx.clearRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = 'rgba(216, 212, 197, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Lasers
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffffff';
      for (let i = 0; i < playerBullets.length; i++) {
        const b = playerBullets[i];
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        ctx.restore();
      }
      ctx.shadowBlur = 0;

      // Enemy Bullets
      for (let i = 0; i < enemyOrbs.length; i++) {
        const orb = enemyOrbs[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(226, 125, 96, 0.16)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = orb.glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      // Clean Floating Typography Enemies
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        ctx.save();
        ctx.font = e.isBoss ? '800 24px Rajdhani, sans-serif' : '700 20px Rajdhani, sans-serif';

        if (e.flashTimer > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 18;
        } else if (e.isBoss) {
          ctx.fillStyle = '#f07878';
          ctx.shadowColor = 'rgba(240, 120, 120, 0.7)';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = '#d8d4c5';
          ctx.shadowColor = 'rgba(216, 212, 197, 0.45)';
          ctx.shadowBlur = 7;
        }

        ctx.fillText(e.text, e.x, e.y);
        ctx.restore();
      }

      // Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillRect(p.x, p.y, p.size || 2.5, p.size || 2.5);
        ctx.restore();
      }

      // Player Unit
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.angle + Math.PI / 2);

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(10, 11);
      ctx.lineTo(0, 5);
      ctx.lineTo(-10, 11);
      ctx.closePath();
      ctx.fill();

      // Shield Ring
      ctx.strokeStyle = 'rgba(216, 212, 197, 0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Clean HUD Telemetry
      ctx.save();
      ctx.textAlign = 'left';
      ctx.font = '600 12px "Share Tech Mono"';
      ctx.fillStyle = 'rgba(216, 212, 197, 0.6)';
      ctx.fillText(`EXECUTION THREAD // SYSTEM CLEARANCE ACTIVE`, 24, 34);
      ctx.fillText(`MODULE PROGRESS: ${wordIndex} / ${enemyDefinitions.length}`, 24, 52);
      ctx.restore();

      ctx.restore();
    }

    function loop(time: number) {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      update(dt);
      render();

      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    // ==============================================================
    // DIAGNOSTIC BOOT SEQUENCE WITH 0-100% NUMERICAL COUNT IN EVERY SEMESTER
    // ==============================================================
    interface DiagnosticBootItem {
      text: string;
      pct?: number;
      isSemester?: boolean;
      pctStart?: number;
      pctEnd?: number;
      cls?: string;
    }

    const diagnosticBootList: DiagnosticBootItem[] = [
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
      { text: "System Clearance Complete // Launching Resume Profile...", pct: 100, cls: "complete" }
    ];

    let targetPct = 0;
    let displayedPct = 0;

    // Smooth Rapid Overall Count Increment (1% -> 100%)
    function updateCounter() {
      if (displayedPct < targetPct && bootCounter) {
        displayedPct = Math.min(targetPct, displayedPct + 4);
        bootCounter.textContent = `[${displayedPct}%]`;
      }
    }
    const counterInterval = setInterval(updateCounter, 10);

    let bootActive = false;

    function triggerDiagnosticBootScreen() {
      if (bootActive || !bootScreen) return;
      bootActive = true;
      bootScreen.classList.add('active');

      let currentLineIdx = 0;

      function typeBootLine() {
        if (!typingText || !bootLinesContainer || !typingLine) return;

        if (currentLineIdx >= diagnosticBootList.length) {
          // Final Transition to Resume Screen!
          setTimeout(() => {
            onComplete();
          }, 200);
          return;
        }

        const item = diagnosticBootList[currentLineIdx];
        typingText.textContent = "";

        if (!item.isSemester) {
          targetPct = item.pct || 0;
        } else {
          targetPct = item.pctStart || 0;
        }

        let charIdx = 0;
        const textToType = item.text;

        function typeChar() {
          if (!typingText || !bootLinesContainer || !typingLine) return;

          if (charIdx < textToType.length) {
            // Rapid high-speed terminal burst typing
            const nextIdx = Math.min(textToType.length, charIdx + 2);
            typingText.textContent += textToType.substring(charIdx, nextIdx);
            if (charIdx % 4 === 0) playKeyTick();
            charIdx = nextIdx;
            setTimeout(typeChar, 4);
          } else {
            // Check if this line is a semester: run rapid 0% -> 100% count
            if (item.isSemester) {
              const permLine = document.createElement('div');
              permLine.className = `boot-line visible ${item.cls || ''}`;

              const labelSpan = document.createElement('span');
              labelSpan.textContent = textToType;

              const counterSpan = document.createElement('span');
              counterSpan.className = 'sem-counter-badge';
              counterSpan.textContent = '[ 0% ]';

              permLine.appendChild(labelSpan);
              permLine.appendChild(counterSpan);
              bootLinesContainer.insertBefore(permLine, typingLine);
              typingText.textContent = "";

              // Run fast numerical 0 -> 100 count checking
              let semCount = 0;
              const semTimer = setInterval(() => {
                semCount = Math.min(100, semCount + 5);
                counterSpan.textContent = `[ ${semCount}% ]`;
                
                if (semCount % 10 === 0) playKeyTick();

                const pStart = item.pctStart || 0;
                const pEnd = item.pctEnd || 100;
                targetPct = Math.round(pStart + (pEnd - pStart) * (semCount / 100));

                if (semCount >= 100) {
                  clearInterval(semTimer);
                  counterSpan.className = 'sem-counter-badge done';
                  counterSpan.textContent = '[ 100% VERIFIED ]';
                  playSuccessChime(620 + currentLineIdx * 40);

                  currentLineIdx++;
                  setTimeout(typeBootLine, 45);
                }
              }, 8);

            } else {
              const permLine = document.createElement('div');
              permLine.className = `boot-line visible ${item.cls || ''}`;
              permLine.textContent = textToType;
              bootLinesContainer.insertBefore(permLine, typingLine);

              typingText.textContent = "";
              currentLineIdx++;

              setTimeout(typeBootLine, item.cls === "complete" ? 60 : 25);
            }
          }
        }

        typeChar();
      }

      setTimeout(typeBootLine, 60);
    }

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(counterInterval);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, [onComplete]);

  return (
    <div className="original-game-wrapper">
      <div id="damage-overlay"></div>
      
      {/* Interactive Autonomous Combat Grid */}
      <canvas id="gameCanvas" ref={canvasRef}></canvas>

      {/* Skip Button */}
      <button className="original-skip-btn" onClick={onComplete}>
        SKIP TO RESUME ▶
      </button>

      {/* Diagnostic Boot Terminal Screen (Original Hardware Watermark & Layout) */}
      <div id="system-boot-screen" ref={bootScreenRef}>
        <div className="screen-grid-bg"></div>

        {/* Original Circuit & Hardware Insignia */}
        <div className="terminal-watermark">
          <svg viewBox="0 0 200 200" fill="none" stroke="#d8d4c5" strokeWidth="2.5">
            <polygon points="100,14 182,61 182,154 100,201 18,154 18,61" strokeDasharray="14 8"/>
            <polygon points="100,38 156,70 156,134 100,166 44,134 44,70" strokeDasharray="8 6"/>
            <circle cx="100" cy="102" r="28" strokeDasharray="4 4"/>
            <line x1="100" y1="14" x2="100" y2="201"/>
            <line x1="18" y1="102" x2="182" y2="102"/>
            <rect x="94" y="96" width="12" height="12" fill="#d8d4c5" transform="rotate(45 100 102)"/>
          </svg>
          <div className="watermark-title">CORE</div>
          <div className="watermark-sub">Kernel Clearance // Sector Validated</div>
        </div>

        {/* Diagnostic Stream (Original layout matching boot check image) */}
        <div className="boot-content">
          <div className="boot-header">
            <span className="boot-title">LOADING</span>
            <span className="boot-subtitle">- BOOTING SYSTEM...</span>
            <span className="boot-counter" id="boot-counter" ref={bootCounterRef}>[0%]</span>
          </div>

          <div className="boot-lines-container" id="boot-lines" ref={bootLinesContainerRef}>
            <div id="typing-line" className="boot-line visible" ref={typingLineRef}>
              <span id="typing-text" ref={typingTextRef}></span>
              <span className="boot-cursor"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
