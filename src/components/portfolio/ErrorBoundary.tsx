import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Component Chassis Isolation Handler
 * Prevents cascade failure across modular UI sub-systems.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[CHASSIS ISOLATION HANDLER] Caught component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-4 border border-cyber-red-border bg-cyber-red-subtle/10 rounded-lg text-left isolation-chassis">
          <div className="flex items-center gap-2 mb-2 text-cyber-red-primary font-mono text-sm font-bold">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyber-red-primary animate-pulse"></span>
            <span>[ ISOLATION FAULT RECOVERED: {this.props.fallbackTitle || 'SUB-SYSTEM'} ]</span>
          </div>
          <p className="text-xs text-cyber-text-secondary font-mono">
            {this.state.error?.message || 'Component execution safely throttled to protect application runtime.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-3 px-3 py-1 bg-cyber-card border border-cyber-blue-border text-cyber-blue-primary text-xs font-mono rounded hover:bg-cyber-blue-subtle transition-colors"
          >
            Retry Module Hydration
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
