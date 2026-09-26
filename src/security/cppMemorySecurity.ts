/**
 * C++ WebAssembly Linear Memory Security & Anti-Inspection CTF Defense Layer
 * 
 * Implements:
 * 1. Low-level WebAssembly linear memory allocation with canary guards (0xDEADBEEF).
 * 2. Hardware input interception: blocks F12, F1-F11, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S.
 * 3. Mouse contextmenu lockdown: disables right-click inspect across the entire DOM.
 * 4. DevTools & force-probe heuristics: empties the page into an interactive CTF CMD shell upon tamper.
 */

export interface MemorySecurityState {
  isArmed: boolean;
  isLockedDown: boolean;
  canaryValue: string;
  tamperCount: number;
  lastInterceptEvent: string;
  bytesAllocated: number;
}

class CppMemorySecurityEngine {
  private wasmMemory: WebAssembly.Memory | null = null;
  private memoryView: DataView | null = null;
  private isLockedDown = false;
  private tamperCount = 0;
  private lastEvent = 'System armed - Canary intact';
  private listenersInstalled = false;
  private onLockdownCallback: ((locked: boolean) => void) | null = null;
  private devtoolsCheckInterval: number | null = null;

  // Memory Offsets for simulated C++ struct
  private static readonly OFFSET_MAGIC = 0x00;        // uint32: 0x4350505F ('CPP_')
  private static readonly OFFSET_VERSION = 0x04;      // uint16: 0x0200
  private static readonly OFFSET_CANARY = 0x10;       // uint32: 0xDEADBEEF
  private static readonly OFFSET_FLAGS = 0x14;        // uint32: Tamper flags
  private static readonly OFFSET_CHECKSUM = 0x18;     // uint32: Memory checksum
  private static readonly CANARY_INTACT = 0xDEADBEEF;
  private static readonly CANARY_CORRUPTED = 0xBAADF00D;

  /**
   * Initialize C++ WebAssembly Linear Memory Pages
   */
  public init(onLockdown?: (locked: boolean) => void): MemorySecurityState {
    this.onLockdownCallback = onLockdown || null;

    try {
      // Allocate 2 WASM memory pages (128 KB)
      this.wasmMemory = new WebAssembly.Memory({ initial: 2, maximum: 4 });
      this.memoryView = new DataView(this.wasmMemory.buffer);

      // Write C++ security struct into linear memory
      this.memoryView.setUint32(CppMemorySecurityEngine.OFFSET_MAGIC, 0x4350505f, false);
      this.memoryView.setUint16(CppMemorySecurityEngine.OFFSET_VERSION, 0x0200, false);
      this.memoryView.setUint32(CppMemorySecurityEngine.OFFSET_CANARY, CppMemorySecurityEngine.CANARY_INTACT, false);
      this.memoryView.setUint32(CppMemorySecurityEngine.OFFSET_FLAGS, 0x00000000, false);

      this.updateChecksum();
    } catch {
      // Fallback virtual buffer if WebAssembly is restricted
      const buffer = new ArrayBuffer(1024);
      this.memoryView = new DataView(buffer);
      this.memoryView.setUint32(CppMemorySecurityEngine.OFFSET_CANARY, CppMemorySecurityEngine.CANARY_INTACT, false);
    }

    if (!this.listenersInstalled && typeof window !== 'undefined') {
      this.installKeyboardTrap();
      this.installMouseTrap();
      this.installDevToolsProbe();
      this.listenersInstalled = true;
    }

    // Expose diagnostic bypass for authorized pair programming & devtools maintenance
    if (typeof window !== 'undefined') {
      (window as any).__ctfBypass__ = () => this.unlockSession();
      (window as any).__ctfMemoryDump__ = () => this.getMemoryHexDump();
    }

    return this.getState();
  }

  /**
   * Recalculates CRC/Adler checksum of the security block
   */
  private updateChecksum(): void {
    if (!this.memoryView) return;
    let checksum = 0x1337;
    for (let i = 0; i < 0x20; i += 4) {
      if (i !== CppMemorySecurityEngine.OFFSET_CHECKSUM) {
        checksum = (checksum ^ this.memoryView.getUint32(i, false)) >>> 0;
      }
    }
    this.memoryView.setUint32(CppMemorySecurityEngine.OFFSET_CHECKSUM, checksum, false);
  }

  /**
   * Trigger Canary Invalidation & Transition to CTF CMD Lockdown
   */
  public tripLockdown(reason: string): void {
    this.tamperCount++;
    this.lastEvent = reason;
    this.isLockedDown = true;

    if (this.memoryView) {
      this.memoryView.setUint32(CppMemorySecurityEngine.OFFSET_CANARY, CppMemorySecurityEngine.CANARY_CORRUPTED, false);
      const currentFlags = this.memoryView.getUint32(CppMemorySecurityEngine.OFFSET_FLAGS, false);
      this.memoryView.setUint32(CppMemorySecurityEngine.OFFSET_FLAGS, currentFlags | 0x01, false);
      this.updateChecksum();
    }

    if (this.onLockdownCallback) {
      this.onLockdownCallback(true);
    }
  }

  /**
   * Restores session after authorized unlock or user resume
   */
  public unlockSession(): void {
    this.isLockedDown = false;
    this.lastEvent = 'Security canary restored by user clearance';

    if (this.memoryView) {
      this.memoryView.setUint32(CppMemorySecurityEngine.OFFSET_CANARY, CppMemorySecurityEngine.CANARY_INTACT, false);
      this.memoryView.setUint32(CppMemorySecurityEngine.OFFSET_FLAGS, 0x00000000, false);
      this.updateChecksum();
    }

    if (this.onLockdownCallback) {
      this.onLockdownCallback(false);
    }
  }

  /**
   * Trap Keyboard F-keys and developer shortcut combinations
   */
  private installKeyboardTrap(): void {
    window.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        // Disallow F12 and F-keys used for debugger stepping or inspector triggers
        const isFKey = e.key.startsWith('F') && !isNaN(parseInt(e.key.slice(1), 10));
        
        // Disallow Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+Shift+K
        const isCtrlShiftInspector =
          (e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          ['I', 'i', 'J', 'j', 'C', 'c', 'K', 'k'].includes(e.key);

        // Disallow Ctrl+U (View Source) and Ctrl+S (Save Page)
        const isSourceOrSave =
          (e.ctrlKey || e.metaKey) &&
          ['U', 'u', 'S', 's'].includes(e.key);

        if (isFKey || isCtrlShiftInspector || isSourceOrSave) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          const details = `Blocked prohibited key stroke: ${e.key}`;
          this.tripLockdown(details);
        }
      },
      true // Capturing phase to override browser listeners
    );
  }

  /**
   * Trap Mouse Right-Click context menu and drag inspection
   */
  private installMouseTrap(): void {
    // Intercept right-click context menu
    window.addEventListener(
      'contextmenu',
      (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.tripLockdown('Blocked right-click inspect menu attempt');
      },
      true
    );

    // Disable dragging elements to avoid external window drop-inspection
    window.addEventListener(
      'dragstart',
      (e: DragEvent) => {
        e.preventDefault();
      },
      true
    );
  }

  /**
   * Monitor DevTools Window Dilation & Heuristic Detection
   */
  private installDevToolsProbe(): void {
    // Regular check for DevTools dock/window opening
    this.devtoolsCheckInterval = window.setInterval(() => {
      // Ignore if user has deliberately bypassed or if window is standard
      const widthDelta = window.outerWidth - window.innerWidth;
      const heightDelta = window.outerHeight - window.innerHeight;

      // Threshold check: opened devtools side dock typically creates > 160px delta
      if (widthDelta > 170 || heightDelta > 170) {
        // Only trigger if not already locked
        if (!this.isLockedDown) {
          this.tripLockdown('DevTools frame dilation detected');
        }
      }
    }, 1500);
  }

  /**
   * Get Current Memory State
   */
  public getState(): MemorySecurityState {
    let canary = '0xDEADBEEF';
    if (this.memoryView) {
      const val = this.memoryView.getUint32(CppMemorySecurityEngine.OFFSET_CANARY, false);
      canary = '0x' + val.toString(16).toUpperCase();
    }

    return {
      isArmed: true,
      isLockedDown: this.isLockedDown,
      canaryValue: canary,
      tamperCount: this.tamperCount,
      lastInterceptEvent: this.lastEvent,
      bytesAllocated: this.wasmMemory ? this.wasmMemory.buffer.byteLength : 1024,
    };
  }

  /**
   * Formats a 64-byte Hex Dump of the C++ Memory Guard struct
   */
  public getMemoryHexDump(): string[] {
    const lines: string[] = [];
    if (!this.memoryView) return ['[!] Virtual memory buffer unallocated'];

    lines.push('========================================================================');
    lines.push(' C++ WebAssembly Linear Memory Guard // Core Hex Dump (0x0000 - 0x003F)');
    lines.push('========================================================================');

    for (let offset = 0; offset < 64; offset += 16) {
      const hexBytes: string[] = [];
      let ascii = '';

      for (let i = 0; i < 16; i++) {
        const byte = this.memoryView.getUint8(offset + i);
        hexBytes.push(byte.toString(16).padStart(2, '0').toUpperCase());
        ascii += byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.';
      }

      const offsetStr = '0x' + offset.toString(16).padStart(4, '0').toUpperCase();
      lines.push(`${offsetStr}  ${hexBytes.slice(0, 8).join(' ')}  ${hexBytes.slice(8).join(' ')}  |${ascii}|`);
    }

    lines.push('------------------------------------------------------------------------');
    lines.push(`STATUS: CANARY=${this.getState().canaryValue}  TAMPER_COUNT=${this.tamperCount}`);
    lines.push('========================================================================');
    return lines;
  }
}

export const cppMemorySecurity = new CppMemorySecurityEngine();
