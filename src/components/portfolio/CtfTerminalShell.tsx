import React, { useState, useEffect, useRef } from 'react';
import { cppMemorySecurity, MemorySecurityState } from '../../security/cppMemorySecurity';

interface CtfTerminalShellProps {
  onUnlockSession: () => void;
}

interface CommandOutput {
  command: string;
  output: string[];
  isError?: boolean;
}

/**
 * CtfTerminalShell - Anti-Inspection CTF Command Shell
 * Activates when force-inspection, DevTools, or prohibited keystrokes trip the C++ memory canary.
 * Empties normal DOM and renders an authentic command-line security shell.
 */
export const CtfTerminalShell: React.FC<CtfTerminalShellProps> = ({ onUnlockSession }) => {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [securityState, setSecurityState] = useState<MemorySecurityState>(cppMemorySecurity.getState());
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setSecurityState(cppMemorySecurity.getState());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = currentInput.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let result: string[] = [];
    let isErr = false;

    if (lower === 'help') {
      result = [
        'CTF SECURITY TERMINAL // AVAILABLE COMMANDS:',
        '  status        - Inspect C++ WebAssembly memory state & canary value',
        '  memory        - Hexdump raw C++ linear memory pages (0x0000 - 0x003F)',
        '  whoami        - Display caller identification and clearance level',
        '  flag          - Retrieve the authenticated CTF challenge flag',
        '  clear         - Clear terminal display buffer',
        '  resume        - Re-verify session integrity & unlock portfolio view',
        '  exit          - Equivalent to resume',
      ];
    } else if (lower === 'status') {
      const state = cppMemorySecurity.getState();
      result = [
        '========================================================================',
        ' C++ MEMORY GUARD & HARDWARE SECURITY CONTROLLER',
        '========================================================================',
        `  INTEGRITY STATUS   : ${state.canaryValue === '0xDEADBEEF' ? 'NOMINAL' : 'COMPROMISED (LOCKED)'}`,
        `  CANARY SIGNATURE   : ${state.canaryValue}`,
        `  WASM ALLOCATION    : ${state.bytesAllocated} bytes (Linear Page 0-1)`,
        `  TAMPER PROBES      : ${state.tamperCount} attempts intercepted`,
        `  LAST INTERCEPT     : ${state.lastInterceptEvent}`,
        `  HTTP DIRECTIVE     : CSP STRICT // SAME-ORIGIN // ANTI-INSPECTION ACTIVE`,
        '========================================================================',
      ];
    } else if (lower === 'memory' || lower === 'memdump') {
      result = cppMemorySecurity.getMemoryHexDump();
    } else if (lower === 'whoami') {
      result = [
        'UID: 1337(guest_analyzer) GID: 1337(reverse_engineers)',
        'CLEARANCE: REVOKED (LEVEL 00) // PROBE ISOLATED TO CTF SHELL',
      ];
    } else if (lower === 'flag' || lower === 'cat flag' || lower === 'cat flag.txt') {
      result = [
        '========================================================================',
        ' [✓] AUTHENTICATED CTF SECURITY FLAG CAPTURED:',
        '     FLAG{BSIT_U_CORDILLERAS_NETSEC_C++_GUARD_2026}',
        '========================================================================',
        'Congratulations on discovering the memory guard challenge flag.',
      ];
    } else if (lower === 'clear') {
      setHistory([]);
      setCurrentInput('');
      return;
    } else if (lower === 'resume' || lower === 'exit') {
      cppMemorySecurity.unlockSession();
      onUnlockSession();
      return;
    } else {
      isErr = true;
      result = [
        `bash: command not found: ${cmd}`,
        "Type 'help' to see valid CTF inspection commands, or 'resume' to return to website.",
      ];
    }

    setHistory((prev) => [...prev, { command: cmd, output: result, isError: isErr }]);
    setCurrentInput('');
  };

  return (
    <div
      className="ctf-terminal-screen"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        color: '#22c55e',
        fontFamily: "'JetBrains Mono', 'Share Tech Mono', monospace",
        fontSize: '0.86rem',
        padding: '1.5rem',
        zIndex: 999999,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Top Tactical Alert Header */}
      <div
        style={{
          borderBottom: '1px solid #166534',
          paddingBottom: '1rem',
          marginBottom: '1rem',
          lineHeight: '1.45',
        }}
      >
        <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.98rem' }}>
          [!] SECURITY ALERT: ANTI-INSPECTION TRAP ACTIVATED
        </div>
        <div style={{ color: '#fbbf24', marginTop: '4px' }}>
          [!] UNAUTHORIZED REVERSE ENGINEERING / FORCE-INSPECTION PROBE INTERCEPTED
        </div>
        <div style={{ color: '#86efac', marginTop: '6px' }}>
          DOM cleared by C++ WebAssembly Memory Guard. Session restricted to CTF Shell.
        </div>
        <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '4px' }}>
          REASON: {securityState.lastInterceptEvent} // CANARY: {securityState.canaryValue}
        </div>
      </div>

      {/* Terminal Introduction Banner */}
      <div style={{ color: '#4ade80', marginBottom: '1.25rem', lineHeight: '1.5' }}>
        <div>CTF DEFENSE REGULATOR v3.0 [RAMEL JOSHUA O. CAVE - NETSECURITY]</div>
        <div style={{ color: '#64748b' }}>
          Type '<span style={{ color: '#fbbf24' }}>help</span>' for available security commands, or '
          <span style={{ color: '#38bdf8' }}>resume</span>' to re-verify session integrity.
        </div>
      </div>

      {/* Command Output Log */}
      <div style={{ flex: 1 }}>
        {history.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '8px', color: '#38bdf8' }}>
              <span>cave@ctf-sec:~$</span>
              <span style={{ color: '#ffffff' }}>{item.command}</span>
            </div>
            <div style={{ marginTop: '4px', paddingLeft: '1rem' }}>
              {item.output.map((line, lIdx) => (
                <div
                  key={lIdx}
                  style={{
                    color: item.isError ? '#f87171' : line.includes('FLAG{') ? '#facc15' : '#86efac',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Command Prompt Form */}
      <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1rem' }}>
        <span style={{ color: '#38bdf8', fontWeight: 700 }}>cave@ctf-sec:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#22c55e',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            caretColor: '#22c55e',
          }}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};
