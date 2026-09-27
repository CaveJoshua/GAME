/**
 * C++ WebAssembly Security Guardrail Core
 * Architected for Ramel Joshua O. Cave's Network & Cyber Security Portfolio
 * 
 * Target: WebAssembly (wasm32-unknown-unknown / Emscripten) & Native Toolchain
 * Features:
 * - Linear memory canary protection (0xDEADBEEF / 0xBAADF00D).
 * - Adler-32 cryptographic memory integrity checksums.
 * - Hardware key interception telemetry & tamper bitmask recording.
 * - Native fast-byte webshell signature scanning.
 */

#include "security_guard.hpp"

// Global static security context resident in WebAssembly linear memory
static SecurityContext g_security_ctx;

// Adler-32 checksum constant
#define ADLER32_MOD 65521U

/**
 * Initializes the C++ security context in linear memory
 */
extern "C" void init_security_mesh(uint32_t memory_size) {
    g_security_ctx.magic             = SECURITY_MAGIC_HEADER;
    g_security_ctx.version           = SECURITY_VERSION;
    g_security_ctx.reserved          = 0x0000;
    g_security_ctx.memory_limit      = memory_size > 0 ? memory_size : 131072U; // 128 KB
    g_security_ctx.active_flags      = 0x00000001U; // Shield armed
    g_security_ctx.canary            = CANARY_INTACT_SIGNATURE; // 0xDEADBEEF
    g_security_ctx.tamper_bitmask    = FLAG_NOMINAL;
    g_security_ctx.probe_counter     = 0;
    g_security_ctx.last_intercept_ts = 0;

    // Zero out guard isolation pad
    for (size_t i = 0; i < sizeof(g_security_ctx.guard_pad); i++) {
        g_security_ctx.guard_pad[i] = 0xAA; // 0xAA memory boundary fence
    }

    g_security_ctx.checksum = compute_adler32_checksum();
}

/**
 * Computes Adler-32 checksum over the C++ SecurityContext struct
 */
extern "C" uint32_t compute_adler32_checksum(void) {
    const uint8_t* buffer = reinterpret_cast<const uint8_t*>(&g_security_ctx);
    uint32_t a = 1;
    uint32_t b = 0;

    for (size_t i = 0; i < sizeof(SecurityContext); i++) {
        // Skip the checksum field itself during calculation
        if (i >= offsetof(SecurityContext, checksum) && i < offsetof(SecurityContext, checksum) + sizeof(uint32_t)) {
            continue;
        }
        a = (a + buffer[i]) % ADLER32_MOD;
        b = (b + a) % ADLER32_MOD;
    }

    return ((b << 16) | a);
}

/**
 * Verifies the integrity of the memory canary
 * Returns 1 if canary is intact (0xDEADBEEF), 0 if compromised
 */
extern "C" uint32_t verify_memory_canary(void) {
    if (g_security_ctx.canary != CANARY_INTACT_SIGNATURE) {
        return 0; // Compromised
    }

    // Verify boundary fence
    for (size_t i = 0; i < sizeof(g_security_ctx.guard_pad); i++) {
        if (g_security_ctx.guard_pad[i] != 0xAA) {
            g_security_ctx.canary = CANARY_CORRUPTED_SIGNATURE;
            g_security_ctx.tamper_bitmask |= FLAG_BOUNDS_VIOLATION;
            return 0;
        }
    }

    return 1; // Intact
}

/**
 * Records an intercepted hardware key or unauthorized inspection probe
 */
extern "C" void record_tamper_event(uint32_t reason_flag) {
    g_security_ctx.probe_counter++;
    g_security_ctx.tamper_bitmask |= reason_flag;
    g_security_ctx.canary = CANARY_CORRUPTED_SIGNATURE; // Poison canary to 0xBAADF00D
    g_security_ctx.checksum = compute_adler32_checksum();
}

/**
 * Resets the canary to nominal state after clearance
 */
extern "C" void reset_canary(void) {
    g_security_ctx.canary = CANARY_INTACT_SIGNATURE; // Restore 0xDEADBEEF
    g_security_ctx.checksum = compute_adler32_checksum();
}

/**
 * Get the current 32-bit canary signature value
 */
extern "C" uint32_t get_canary_value(void) {
    return g_security_ctx.canary;
}

/**
 * Get total intercepted probes counter
 */
extern "C" uint32_t get_tamper_count(void) {
    return g_security_ctx.probe_counter;
}

/**
 * Get accumulated tamper bitmask
 */
extern "C" uint32_t get_tamper_bitmask(void) {
    return g_security_ctx.tamper_bitmask;
}

/**
 * Native C++ substring search helper
 */
static int contains_sub(const char* haystack, int hlen, const char* needle, int nlen) {
    if (nlen > hlen || !haystack || !needle) return 0;
    for (int i = 0; i <= hlen - nlen; i++) {
        int match = 1;
        for (int j = 0; j < nlen; j++) {
            char h = haystack[i + j];
            char n = needle[j];
            // Case-insensitive ASCII comparison
            if (h >= 'A' && h <= 'Z') h = h + ('a' - 'A');
            if (n >= 'A' && n <= 'Z') n = n + ('a' - 'A');
            if (h != n) {
                match = 0;
                break;
            }
        }
        if (match) return 1;
    }
    return 0;
}

/**
 * Native C++ Webshell & Reverse Shell Signature Scanner
 * Returns 1 if malicious pattern detected, 0 if clean
 */
extern "C" int32_t scan_webshell_signature_native(const char* payload, int32_t length) {
    if (!payload || length <= 0) return 0;

    // Classic webshell fingerprints
    if (contains_sub(payload, length, "c99shell", 8)) return 1;
    if (contains_sub(payload, length, "r57shell", 8)) return 1;
    if (contains_sub(payload, length, "b374k", 5)) return 1;
    if (contains_sub(payload, length, "wso_version", 11)) return 1;
    if (contains_sub(payload, length, "alfa-shell", 10)) return 1;
    if (contains_sub(payload, length, "weevely", 7)) return 1;

    // Reverse shell & command execution vectors
    if (contains_sub(payload, length, "/dev/tcp/", 9)) return 1;
    if (contains_sub(payload, length, "nc -e", 5)) return 1;
    if (contains_sub(payload, length, "powershell -enc", 15)) return 1;
    if (contains_sub(payload, length, "cmd.exe /c", 10)) return 1;
    if (contains_sub(payload, length, "mkfifo /tmp/", 12)) return 1;
    if (contains_sub(payload, length, "eval(base64", 11)) return 1;

    return 0; // Clean
}
