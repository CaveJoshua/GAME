import React from 'react';

/**
 * TrackShowcase - Core Capabilities Chassis
 * Modular 3-pillar breakdown of network & cybersecurity engineering proficiencies.
 */
export const TrackShowcase: React.FC = () => {
  return (
    <div className="netsec-track-showcase isolation-chassis">
      {/* Pillar 01 */}
      <div className="netsec-pillar-card">
        <div className="pillar-header">
          <span className="pillar-num">[ PILLAR 01 ]</span>
          <span className="pillar-icon">🛡️</span>
        </div>
        <h3 className="pillar-title">Network Infrastructure & CISCO LAN</h3>
        <p className="pillar-sub">
          CCNA 1–4 Routing & Switching, VLANs, Subnetting, Server Diagnostics & NC II Certified Systems
        </p>
      </div>

      {/* Pillar 02 */}
      <div className="netsec-pillar-card red-accent">
        <div className="pillar-header">
          <span className="pillar-num">[ PILLAR 02 ]</span>
          <span className="pillar-icon">⚔️</span>
        </div>
        <h3 className="pillar-title">Offensive Security & Pen-Testing</h3>
        <p className="pillar-sub">
          Kali Linux Toolchain, Ghidra & JADX Decompilation, Wireshark, Burp Suite, Binary & CTF Ops
        </p>
      </div>

      {/* Pillar 03 */}
      <div className="netsec-pillar-card dual-accent">
        <div className="pillar-header">
          <span className="pillar-num">[ PILLAR 03 ]</span>
          <span className="pillar-icon">⚙️</span>
        </div>
        <h3 className="pillar-title">Enterprise Defense & AI Security</h3>
        <p className="pillar-sub">
          SAP HANA & SAP Generative AI Developer Certified, PostgreSQL Indexing, Render & Cloudflare
        </p>
      </div>
    </div>
  );
};
