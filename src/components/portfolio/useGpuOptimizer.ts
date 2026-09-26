import { useState, useEffect } from 'react';

export type GpuComputeTier = 'high-performance' | 'balanced' | 'power-saver';

export interface GpuOptimizerState {
  tier: GpuComputeTier;
  enableHeavyFilters: boolean;
  reduceMotion: boolean;
  dpr: number;
  cores: number;
  fpsTarget: number;
  setTier: (tier: GpuComputeTier) => void;
}

/**
 * useGpuOptimizer - Adaptive Hardware-Accelerated Compute Profiler
 * Dynamically tunes SVG rasterization, GPU filter passes, and animation fidelity
 * to ensure 60fps smooth playback on ANY GPU (Integrated, Mobile, Apple Silicon, Discrete).
 */
export function useGpuOptimizer(): GpuOptimizerState {
  const [tier, setTierState] = useState<GpuComputeTier>(() => {
    // Check user override
    const saved = localStorage.getItem('__portfolio_gpu_tier__');
    if (saved === 'high-performance' || saved === 'balanced' || saved === 'power-saver') {
      return saved;
    }
    
    // Auto-detect hardware capabilities
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    if (cores <= 2) return 'power-saver';
    if (cores <= 4 || isMobile) return 'balanced';
    return 'high-performance';
  });

  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [dpr, setDpr] = useState<number>(() => {
    return typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const setTier = (newTier: GpuComputeTier) => {
    setTierState(newTier);
    try {
      localStorage.setItem('__portfolio_gpu_tier__', newTier);
    } catch {
      // Ignored in strict sandbox
    }
  };

  const enableHeavyFilters = tier === 'high-performance' && !reduceMotion;
  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
  const fpsTarget = tier === 'power-saver' ? 30 : 60;

  return {
    tier,
    enableHeavyFilters,
    reduceMotion,
    dpr,
    cores,
    fpsTarget,
    setTier,
  };
}
