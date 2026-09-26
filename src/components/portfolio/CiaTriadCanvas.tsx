import React from 'react';
import { GpuOptimizerState } from './useGpuOptimizer';

interface CiaTriadCanvasProps {
  gpu: GpuOptimizerState;
}

/**
 * CiaTriadCanvas - GPU-Compute Optimized CIA Triad Engine
 * Encapsulates the high-fidelity animated CIA Triad watermark inside a zero-reflow,
 * isolated GPU compositor layer with dynamic resolution and filter scaling.
 */
export const CiaTriadCanvas: React.FC<CiaTriadCanvasProps> = ({ gpu }) => {
  const { enableHeavyFilters, reduceMotion, tier, setTier } = gpu;

  return (
    <div
      className="cyber-triad-bg isolation-chassis contain-strict gpu-accelerated"
      aria-hidden="true"
      style={{
        willChange: 'transform, opacity',
        contain: 'layout paint size',
      }}
    >
      {/* Animated Cyber Matrix Aura */}
      <div className="cyber-matrix-aura gpu-accelerated"></div>

      {/* Animated Cyber Laser Sweep Beam */}
      {!reduceMotion && <div className="cyber-laser-sweep gpu-accelerated"></div>}

      {/* GPU Compute Tier Floating HUD Badge (Compact, non-intrusive) */}
      <div className="absolute top-20 right-6 z-20 hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded border border-cyber-border-light bg-white/70 backdrop-blur text-[10px] font-mono text-slate-500 shadow-sm pointer-events-auto">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            tier === 'high-performance'
              ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
              : tier === 'balanced'
              ? 'bg-amber-500 shadow-[0_0_6px_#f59e0b]'
              : 'bg-blue-500 shadow-[0_0_6px_#3b82f6]'
          }`}
        ></span>
        <span className="uppercase font-bold tracking-wider">GPU: {tier}</span>
        <button
          onClick={() => {
            const next =
              tier === 'high-performance'
                ? 'balanced'
                : tier === 'balanced'
                ? 'power-saver'
                : 'high-performance';
            setTier(next);
          }}
          className="ml-1 px-1 py-0.2 bg-slate-100 hover:bg-slate-200 text-[9px] rounded text-slate-700 transition-colors"
          title="Cycle GPU Compute Profile for performance/battery optimization"
        >
          Toggle
        </button>
      </div>

      <svg
        className="cyber-triad-svg gpu-accelerated"
        viewBox="0 0 1440 1020"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{
          shapeRendering: enableHeavyFilters ? 'auto' : 'optimizeSpeed',
        }}
      >
        <defs>
          {/* Dynamic SVG Glow Filters (Tuned bounding box to eliminate GPU fill overhead) */}
          {enableHeavyFilters ? (
            <>
              <filter id="triadGlowCyan" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="triadGlowBlue" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="3.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="triadGlowRed" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="3.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </>
          ) : (
            // Lightweight single-pass fallback for low compute tier / battery saver
            <>
              <filter id="triadGlowCyan">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
              <filter id="triadGlowBlue">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
              <filter id="triadGlowRed">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
            </>
          )}

          {/* Linear & Radial Cyber Gradients */}
          <linearGradient id="triadBlueRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0.48" />
          </linearGradient>
          <radialGradient id="nodeGlowBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlowRed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e11d48" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="laserBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.88" />
            <stop offset="70%" stopColor="#e11d48" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Tactical Coordinate Grid Overlay */}
        <g opacity="0.45" className="gpu-accelerated">
          <line x1="720" y1="0" x2="720" y2="1020" stroke="#2563eb" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.25" />
          <line x1="0" y1="490" x2="1440" y2="490" stroke="#e11d48" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.18" />

          {/* Center Core Ambient Glow */}
          <circle cx="720" cy="490" r="160" fill="url(#coreGlow)" />

          {/* Rotating Tactical Radar Rings with animateTransform */}
          <circle cx="720" cy="490" r="280" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="16 12 4 12" fill="none" opacity="0.26">
            {!reduceMotion && (
              <animateTransform attributeName="transform" type="rotate" from="0 720 490" to="360 720 490" dur="40s" repeatCount="indefinite" />
            )}
          </circle>
          <circle cx="720" cy="490" r="440" stroke="#e11d48" strokeWidth="1.1" strokeDasharray="20 14 6 14" fill="none" opacity="0.18">
            {!reduceMotion && (
              <animateTransform attributeName="transform" type="rotate" from="0 720 490" to="-360 720 490" dur="55s" repeatCount="indefinite" />
            )}
          </circle>

          {/* Radar Scanning Sweep Beam */}
          {!reduceMotion && (
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 720 490" to="360 720 490" dur="11s" repeatCount="indefinite" />
              <line x1="720" y1="490" x2="1160" y2="490" stroke="url(#laserBeam)" strokeWidth="2" opacity="0.45" />
              <circle cx="1160" cy="490" r="4" fill="#38bdf8" filter={enableHeavyFilters ? "url(#triadGlowCyan)" : undefined} />
            </g>
          )}

          {/* Tactical Crosshair Marks */}
          <line x1="710" y1="490" x2="730" y2="490" stroke="#2563eb" strokeWidth="1.5" />
          <line x1="720" y1="480" x2="720" y2="500" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="720" cy="490" r="6" fill="none" stroke="#2563eb" strokeWidth="1.2" />
        </g>

        {/* THE CYBER CIA TRIAD */}
        <g className="triad-geometry gpu-accelerated">
          {/* Outer Structural Wireframe */}
          <polygon points="720,80 130,660 1310,660" stroke="url(#triadBlueRed)" strokeWidth="2.8" fill="rgba(37, 99, 235, 0.025)" />

          {/* Concentric Inner Geometric Triangles */}
          <polygon points="720,150 210,620 1230,620" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="10 8" opacity="0.32" />
          <polygon points="720,620 380,360 1060,360" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.25" />

          {/* Dual Continuous Energy Streams */}
          <polygon
            className="triad-energy-stream-1"
            points="720,80 130,660 1310,660"
            stroke="#00f0ff"
            strokeWidth="3.2"
            fill="none"
            strokeDasharray="200 700"
            filter={enableHeavyFilters ? "url(#triadGlowCyan)" : undefined}
          />
          <polygon
            className="triad-energy-stream-2"
            points="720,80 130,660 1310,660"
            stroke="#f43f5e"
            strokeWidth="2.8"
            fill="none"
            strokeDasharray="140 800"
            filter={enableHeavyFilters ? "url(#triadGlowRed)" : undefined}
          />

          {/* Orbiting Continuous Data Packet Electrons Along Perimeter */}
          {!reduceMotion && (
            <>
              <g>
                <circle r="5" fill="#00f0ff" filter={enableHeavyFilters ? "url(#triadGlowCyan)" : undefined}>
                  <animateMotion path="M 720,80 L 130,660 L 1310,660 Z" dur="8.5s" repeatCount="indefinite" />
                </circle>
                <circle r="2.2" fill="#ffffff">
                  <animateMotion path="M 720,80 L 130,660 L 1310,660 Z" dur="8.5s" repeatCount="indefinite" />
                </circle>
              </g>
              <g>
                <circle r="4.5" fill="#38bdf8" filter={enableHeavyFilters ? "url(#triadGlowCyan)" : undefined}>
                  <animateMotion path="M 720,80 L 130,660 L 1310,660 Z" dur="8.5s" begin="-2.83s" repeatCount="indefinite" />
                </circle>
                <circle r="1.8" fill="#ffffff">
                  <animateMotion path="M 720,80 L 130,660 L 1310,660 Z" dur="8.5s" begin="-2.83s" repeatCount="indefinite" />
                </circle>
              </g>
              <g>
                <circle r="5" fill="#f43f5e" filter={enableHeavyFilters ? "url(#triadGlowRed)" : undefined}>
                  <animateMotion path="M 720,80 L 130,660 L 1310,660 Z" dur="8.5s" begin="-5.66s" repeatCount="indefinite" />
                </circle>
                <circle r="2" fill="#ffffff">
                  <animateMotion path="M 720,80 L 130,660 L 1310,660 Z" dur="8.5s" begin="-5.66s" repeatCount="indefinite" />
                </circle>
              </g>
            </>
          )}

          {/* ==================== NODE 01: CONFIDENTIALITY (TOP) ==================== */}
          <circle className="node-halo-pulse-1" cx="720" cy="80" r="105" fill="url(#nodeGlowBlue)" />
          <circle className="node-ping-1" cx="720" cy="80" r="14" fill="none" stroke="#2563eb" strokeWidth="1.8" />
          <circle className="node-ping-1-delay" cx="720" cy="80" r="14" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
          <circle cx="720" cy="80" r="32" stroke="#2563eb" strokeWidth="1.4" strokeDasharray="14 10" fill="none" opacity="0.65">
            {!reduceMotion && (
              <animateTransform attributeName="transform" type="rotate" from="0 720 80" to="360 720 80" dur="18s" repeatCount="indefinite" />
            )}
          </circle>
          {!reduceMotion && (
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 720 80" to="360 720 80" dur="3.8s" repeatCount="indefinite" />
              <circle cx="720" cy="42" r="3.8" fill="#00f0ff" filter={enableHeavyFilters ? "url(#triadGlowCyan)" : undefined} />
              <circle cx="720" cy="42" r="1.6" fill="#ffffff" />
            </g>
          )}
          <circle cx="720" cy="80" r="11" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2.8" filter={enableHeavyFilters ? "url(#triadGlowBlue)" : undefined} />
          <circle cx="720" cy="80" r="4" fill="#ffffff" />
          <text x="720" y="52" textAnchor="middle" fill="#1d4ed8" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="800" letterSpacing="3">
            [ CONFIDENTIALITY // NODE_01 ]
          </text>
          <text x="720" y="38" textAnchor="middle" fill="#0284c7" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" fontWeight="700" letterSpacing="2" opacity="0.85">
            STATE: ZERO_LEAK // AES-256-GCM
          </text>

          {/* ==================== NODE 02: INTEGRITY (BOTTOM-LEFT) ==================== */}
          <circle className="node-halo-pulse-2" cx="130" cy="660" r="105" fill="url(#nodeGlowRed)" />
          <circle className="node-ping-2" cx="130" cy="660" r="14" fill="none" stroke="#e11d48" strokeWidth="1.8" />
          <circle className="node-ping-2-delay" cx="130" cy="660" r="14" fill="none" stroke="#f43f5e" strokeWidth="1.2" />
          <circle cx="130" cy="660" r="32" stroke="#e11d48" strokeWidth="1.4" strokeDasharray="14 10" fill="none" opacity="0.65">
            {!reduceMotion && (
              <animateTransform attributeName="transform" type="rotate" from="0 130 660" to="-360 130 660" dur="18s" repeatCount="indefinite" />
            )}
          </circle>
          {!reduceMotion && (
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 130 660" to="-360 130 660" dur="4.4s" repeatCount="indefinite" />
              <circle cx="130" cy="622" r="3.8" fill="#f43f5e" filter={enableHeavyFilters ? "url(#triadGlowRed)" : undefined} />
              <circle cx="130" cy="622" r="1.6" fill="#ffffff" />
            </g>
          )}
          <circle cx="130" cy="660" r="11" fill="#e11d48" stroke="#ffffff" strokeWidth="2.8" filter={enableHeavyFilters ? "url(#triadGlowRed)" : undefined} />
          <circle cx="130" cy="660" r="4" fill="#ffffff" />
          <text x="130" y="705" textAnchor="middle" fill="#e11d48" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="800" letterSpacing="3">
            [ INTEGRITY // NODE_02 ]
          </text>
          <text x="130" y="720" textAnchor="middle" fill="#be123c" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" fontWeight="700" letterSpacing="2" opacity="0.85">
            HASH: SHA-384 // TAMPER_GUARD
          </text>

          {/* ==================== NODE 03: AVAILABILITY (BOTTOM-RIGHT) ==================== */}
          <circle className="node-halo-pulse-3" cx="1310" cy="660" r="105" fill="url(#nodeGlowBlue)" />
          <circle className="node-ping-3" cx="1310" cy="660" r="14" fill="none" stroke="#2563eb" strokeWidth="1.8" />
          <circle className="node-ping-3-delay" cx="1310" cy="660" r="14" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
          <circle cx="1310" cy="660" r="32" stroke="#2563eb" strokeWidth="1.4" strokeDasharray="14 10" fill="none" opacity="0.65">
            {!reduceMotion && (
              <animateTransform attributeName="transform" type="rotate" from="0 1310 660" to="360 1310 660" dur="18s" repeatCount="indefinite" />
            )}
          </circle>
          {!reduceMotion && (
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 1310 660" to="360 1310 660" dur="4.8s" repeatCount="indefinite" />
              <circle cx="1310" cy="622" r="3.8" fill="#38bdf8" filter={enableHeavyFilters ? "url(#triadGlowCyan)" : undefined} />
              <circle cx="1310" cy="622" r="1.6" fill="#ffffff" />
            </g>
          )}
          <circle cx="1310" cy="660" r="11" fill="#2563eb" stroke="#ffffff" strokeWidth="2.8" filter={enableHeavyFilters ? "url(#triadGlowBlue)" : undefined} />
          <circle cx="1310" cy="660" r="4" fill="#ffffff" />
          <text x="1310" y="705" textAnchor="middle" fill="#2563eb" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="800" letterSpacing="3">
            [ AVAILABILITY // NODE_03 ]
          </text>
          <text x="1310" y="720" textAnchor="middle" fill="#0284c7" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" fontWeight="700" letterSpacing="2" opacity="0.85">
            UPTIME: 99.999% // ACTIVE_HA
          </text>

          {/* Central Strategic Readout */}
          <text x="720" y="440" textAnchor="middle" fill="#475569" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" letterSpacing="4" opacity="0.75">
            NETSECURITY TRACK // ZERO TRUST CORE // IEEE 802.1Q
          </text>
          <text x="720" y="460" textAnchor="middle" fill="#64748b" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" fontWeight="600" letterSpacing="3" opacity="0.6">
            CYBER ARCHITECTURE // DEFENSE-IN-DEPTH ENFORCED
          </text>
        </g>
      </svg>
    </div>
  );
};
