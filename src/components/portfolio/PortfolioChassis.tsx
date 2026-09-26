import React, { useState, useEffect, useCallback } from 'react';
import {
  profile,
  educationList,
  skillCategories,
  seminarsAndTrainings,
  credlyBadges,
  hack4govGallery,
  architectureProjects,
} from '../../data/resumeData';
import { ngfw, NGFWStatus } from '../../security/ngfw';
import { cppMemorySecurity } from '../../security/cppMemorySecurity';

import { useGpuOptimizer } from './useGpuOptimizer';
import { ErrorBoundary } from './ErrorBoundary';
import { PortfolioNav } from './PortfolioNav';
import { HeroSection } from './HeroSection';
import { TrackShowcase } from './TrackShowcase';
import { ChampionBanner } from './ChampionBanner';
import { CredlyBadgesSection } from './CredlyBadgesSection';
import { CertificatesGallery } from './CertificatesGallery';
import { FeaturedProjectSection } from './FeaturedProjectSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { SeminarsSection } from './SeminarsSection';
import { ReferencesSection } from './ReferencesSection';
import { FooterSection } from './FooterSection';
import { NgfwDefenseModal } from './NgfwDefenseModal';
import { CertificateLightboxModal } from './CertificateLightboxModal';
import { antiWebshellGuard } from '../../security/antiWebshellGuard';

interface PortfolioChassisProps {
  onRestartGame: () => void;
}

/**
 * PortfolioChassis - Master Architectural Orchestrator & State Chassis
 * Features plain white professional background, C++ WebAssembly memory security,
 * anti-webshell terminal shield, anti-inspection protection, and live zero-trust synchronization.
 */
export const PortfolioChassis: React.FC<PortfolioChassisProps> = ({ onRestartGame }) => {
  // GPU Compute & Fidelity Profiler
  const gpu = useGpuOptimizer();

  // NGFW & Telemetry State
  const [ngfwStatus, setNgfwStatus] = useState<NGFWStatus | null>(null);
  const [showNgfwModal, setShowNgfwModal] = useState<boolean>(false);

  // Lightbox Modal State
  const [activeLightbox, setActiveLightbox] = useState<{
    url: string;
    title: string;
    caption?: string;
  } | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live State Synchronization per Rule [user_global]
  const sync = useCallback(() => {
    setNgfwStatus(ngfw.getStatus());
  }, []);

  // Toast Dispatcher
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  useEffect(() => {
    sync();
    // Expose sync globally for live inspection
    (window as any).__syncPortfolioState__ = sync;

    // Arm C++ WebAssembly Memory Guard and Anti-Inspection Traps (discreet & protective)
    cppMemorySecurity.init((reason) => {
      showToast(`🛡️ Security Guard: ${reason}`);
      sync();
    });

    // Arm Anti-WebShell & Terminal Injection Shield
    antiWebshellGuard.init((alertMsg) => {
      showToast(alertMsg);
      sync();
    });
  }, [sync, showToast]);

  // Safe Clipboard Copy Handler
  const handleCopyClipboard = useCallback(
    (text: string, label: string) => {
      try {
        navigator.clipboard.writeText(text);
        showToast(`Copied ${label} to clipboard!`);
      } catch {
        showToast(`Selected: ${text}`);
      }
    },
    [showToast]
  );

  // Simulated Penetration Probe
  const handleSimulateProbe = useCallback(() => {
    ngfw.recordEvent({
      timestamp: new Date().toLocaleTimeString(),
      type: 'INJECTION_ATTEMPT',
      severity: 'HIGH',
      details: 'Intercepted simulated cross-site script payload: <script>alert(1)</script>',
      source: 'Simulated User Probe',
    });
    sync();
    showToast('NGFW Alert: Intercepted and blocked simulated attack probe!');
  }, [showToast, sync]);

  // Simulated WebShell / Reverse-Shell Probe
  const handleSimulateWebshellProbe = useCallback(() => {
    antiWebshellGuard.simulateWebshellProbe();
    sync();
  }, [sync]);

  // Keyboard shortcut listener (Esc closes modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightbox(null);
        setShowNgfwModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="resume-wrapper">
      {/* ==============================================================
           LAYER 1: TOP NAVIGATION BAR
           ============================================================== */}
      <ErrorBoundary fallbackTitle="NAVIGATION_HEADER">
        <PortfolioNav
          profile={profile}
          onRestartGame={onRestartGame}
          onOpenNgfwModal={() => {
            sync();
            setShowNgfwModal(true);
          }}
          onPrintAts={() => window.print()}
        />
      </ErrorBoundary>

      {/* ==============================================================
           LAYER 2: MAIN RESUME CONTENT CONTAINER (PLAIN WHITE PROFESSIONAL)
           ============================================================== */}
      <main className="container relative z-10">
        {/* Executive Hero Showcase */}
        <ErrorBoundary fallbackTitle="HERO_SECTION">
          <HeroSection
            profile={profile}
            onOpenNgfwModal={() => {
              sync();
              setShowNgfwModal(true);
            }}
            onCopyClipboard={handleCopyClipboard}
          />
        </ErrorBoundary>

        {/* 3 Core Capability Pillars */}
        <ErrorBoundary fallbackTitle="TRACK_CAPABILITIES">
          <TrackShowcase />
        </ErrorBoundary>

        {/* Hack4Gov 1st Place Prestige Banner */}
        <ErrorBoundary fallbackTitle="CHAMPION_BANNER">
          <ChampionBanner />
        </ErrorBoundary>

        {/* Credly Verified Digital Badges */}
        <ErrorBoundary fallbackTitle="CREDLY_BADGES">
          <CredlyBadgesSection badges={credlyBadges} credlyUrl={profile.credlyUrl} />
        </ErrorBoundary>

        {/* Competition Proof & Verified Certificates (Hack4Gov 10-Card Gallery) */}
        <ErrorBoundary fallbackTitle="CERTIFICATES_GALLERY">
          <CertificatesGallery
            hack4govGallery={hack4govGallery}
            onOpenLightbox={setActiveLightbox}
          />
        </ErrorBoundary>

        {/* Featured Engineering Architecture Showcase (Barangay System) */}
        <ErrorBoundary fallbackTitle="FEATURED_ARCHITECTURE">
          <FeaturedProjectSection projects={architectureProjects} />
        </ErrorBoundary>

        {/* Educational Attainment Timeline with UC Green Liner & Seal */}
        <ErrorBoundary fallbackTitle="EDUCATION_SECTION">
          <EducationSection educationList={educationList} />
        </ErrorBoundary>

        {/* Skills & Technical Competencies */}
        <ErrorBoundary fallbackTitle="SKILLS_SECTION">
          <SkillsSection skillCategories={skillCategories} />
        </ErrorBoundary>

        {/* Seminars and Trainings Attended */}
        <ErrorBoundary fallbackTitle="SEMINARS_SECTION">
          <SeminarsSection
            seminars={seminarsAndTrainings}
            onOpenLightbox={setActiveLightbox}
          />
        </ErrorBoundary>

        {/* Personal Information & Character References */}
        <ErrorBoundary fallbackTitle="REFERENCES_SECTION">
          <ReferencesSection profile={profile} />
        </ErrorBoundary>
      </main>

      {/* ==============================================================
           LAYER 3: FOOTER
           ============================================================== */}
      <ErrorBoundary fallbackTitle="FOOTER_SECTION">
        <FooterSection profile={profile} />
      </ErrorBoundary>

      {/* ==============================================================
           LAYER 4: TELEMETRY & LIGHTBOX MODALS
           ============================================================== */}
      <ErrorBoundary fallbackTitle="LIGHTBOX_MODAL">
        <CertificateLightboxModal
          data={activeLightbox}
          onClose={() => setActiveLightbox(null)}
        />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="NGFW_MODAL">
        <NgfwDefenseModal
          isOpen={showNgfwModal}
          status={ngfwStatus}
          onClose={() => setShowNgfwModal(false)}
          onSimulateProbe={handleSimulateProbe}
          onSimulateWebshellProbe={handleSimulateWebshellProbe}
        />
      </ErrorBoundary>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="app-toast isolation-chassis animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
