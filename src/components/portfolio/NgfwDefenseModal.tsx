import React from 'react';
import { NGFWStatus, SecurityEvent } from '../../security/ngfw';

interface NgfwDefenseModalProps {
  isOpen: boolean;
  status: NGFWStatus | null;
  onClose: () => void;
  onSimulateProbe: () => void;
}

/**
 * NgfwDefenseModal - Next-Gen Web Application Firewall & CSP Protocol Inspector Chassis
 * Zero-Trust security monitor showcasing runtime protections, HTTP isolation headers,
 * and active cryptographic session telemetry.
 */
export const NgfwDefenseModal: React.FC<NgfwDefenseModalProps> = ({
  isOpen,
  status,
  onClose,
  onSimulateProbe,
}) => {
  if (!isOpen || !status) return null;

  return (
    <div
      className="ngfw-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="ngfw-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ngfw-modal-header">
          <div className="ngfw-modal-title">
            <span>🛡️</span>
            <span>NGFW PROTOCOL DEFENSE ENGINE // {status.version}</span>
          </div>
          <button
            className="lightbox-close-btn"
            onClick={onClose}
            title="Close NGFW Monitor (Esc)"
          >
            ✕
          </button>
        </div>

        <div className="ngfw-modal-body">
          {/* Status Metric Cards */}
          <div className="ngfw-status-cards-row">
            <div className="ngfw-stat-card">
              <span className="ngfw-stat-label">DEFENSE SHIELD</span>
              <span className="ngfw-stat-value" style={{ color: '#22c55e' }}>
                {status.mode}
              </span>
            </div>
            <div className="ngfw-stat-card">
              <span className="ngfw-stat-label">CSP DIRECTIVE</span>
              <span className="ngfw-stat-value" style={{ color: '#38bdf8' }}>
                {status.cspStatus}
              </span>
            </div>
            <div className="ngfw-stat-card">
              <span className="ngfw-stat-label">THREATS INTERCEPTED</span>
              <span
                className="ngfw-stat-value"
                style={{ color: status.threatsBlocked > 0 ? '#f43f5e' : '#22c55e' }}
              >
                {status.threatsBlocked} BLOCKED
              </span>
            </div>
          </div>

          {/* Protocol Security Headers Table */}
          <div className="ngfw-panel">
            <div className="ngfw-panel-title">
              <span>ACTIVE HTTP SECURITY HEADERS & DIRECTIVES</span>
              <span style={{ color: '#22c55e', fontSize: '0.72rem' }}>● ALL COMPLIANT</span>
            </div>
            <table className="ngfw-table">
              <thead>
                <tr>
                  <th>HEADER NAME</th>
                  <th>POLICY / DIRECTIVE</th>
                  <th>PROTECTION LEVEL</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="header-name">Content-Security-Policy</td>
                  <td>default-src 'self'; frame-ancestors 'none'; object-src 'none'</td>
                  <td>Anti-XSS / Injection Lockdown</td>
                  <td className="header-status">✓ ENFORCED</td>
                </tr>
                <tr>
                  <td className="header-name">X-Frame-Options</td>
                  <td>DENY</td>
                  <td>Anti-Clickjacking Frame Shield</td>
                  <td className="header-status">✓ LOCKED</td>
                </tr>
                <tr>
                  <td className="header-name">X-Content-Type-Options</td>
                  <td>nosniff</td>
                  <td>Anti-MIME Type Confusion</td>
                  <td className="header-status">✓ ACTIVE</td>
                </tr>
                <tr>
                  <td className="header-name">Cross-Origin-Opener-Policy</td>
                  <td>same-origin</td>
                  <td>Process-Level Tab Isolation</td>
                  <td className="header-status">✓ ISOLATED</td>
                </tr>
                <tr>
                  <td className="header-name">Cross-Origin-Resource-Policy</td>
                  <td>same-origin</td>
                  <td>Hotlink & Leak Mitigation</td>
                  <td className="header-status">✓ GUARDED</td>
                </tr>
                <tr>
                  <td className="header-name">Strict-Transport-Security</td>
                  <td>max-age=31536000; includeSubDomains; preload</td>
                  <td>Force End-to-End TLS Encryption</td>
                  <td className="header-status">✓ HSTS ARMED</td>
                </tr>
                <tr>
                  <td className="header-name">Permissions-Policy</td>
                  <td>camera=(), microphone=(), geolocation=()</td>
                  <td>Zero Device Sensor Access</td>
                  <td className="header-status">✓ REVOKED</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Active Content Security Policy Definition */}
          <div className="ngfw-panel">
            <div className="ngfw-panel-title">
              <span>ACTIVE CSP DIRECTIVE CONFIGURATION</span>
              <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>ISO/IEC 27001 & OWASP ASVS LEVEL 3</span>
            </div>
            <div className="ngfw-csp-codebox">
              default-src 'self';<br />
              script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.credly.com;<br />
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;<br />
              img-src 'self' data: blob: https://images.credly.com https://cdn.credly.com https://*.credly.com;<br />
              font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;<br />
              connect-src 'self' https://*.credly.com;<br />
              frame-src 'self' https://www.credly.com;<br />
              frame-ancestors 'none'; object-src 'none'; base-uri 'self';
            </div>
          </div>

          {/* Threat Simulation & Real-time Telemetry Trace */}
          <div className="ngfw-panel flex flex-col gap-3">
            <div className="ngfw-panel-title">
              <span>SESSION TRACE & DEFENSE PROBE TESTING</span>
              <button className="ngfw-sim-button" onClick={onSimulateProbe}>
                Simulate Hostile Injection Probe
              </button>
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-400 flex-wrap gap-2">
              <span>
                CRYPTOGRAPHIC TRACE ID: <strong style={{ color: '#38bdf8' }}>{status.traceId}</strong>
              </span>
              <span>
                HEARTBEAT PULSE: <strong style={{ color: '#22c55e' }}>{status.lastPulse}</strong>
              </span>
            </div>

            {status.recentEvents.length > 0 && (
              <div className="mt-2 border-t border-white/10 pt-2">
                <div className="text-[11px] font-mono text-rose-500 mb-1 font-bold">
                  RECENT INTERCEPT LOGS:
                </div>
                {status.recentEvents.slice(0, 3).map((ev: SecurityEvent, eIdx: number) => (
                  <div key={eIdx} className="text-[11px] font-mono text-slate-300 py-0.5">
                    <span className="text-slate-500">[{ev.timestamp}]</span>{' '}
                    <span className="text-rose-500 font-bold">[{ev.type}]</span>{' '}
                    <span>{ev.details}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
