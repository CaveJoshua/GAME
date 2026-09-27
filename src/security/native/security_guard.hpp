#ifndef SECURITY_GUARD_HPP
#define SECURITY_GUARD_HPP

#include <stdint.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

// ============================================================================
// C++ MEMORY SECURITY CANARY CONSTANTS & BITMASKS
// ============================================================================
#define SECURITY_MAGIC_HEADER       0x4350505FU   // "CPP_" in ASCII big-endian
#define SECURITY_VERSION            0x0200U       // Security Engine v2.0
#define CANARY_INTACT_SIGNATURE     0xDEADBEEFU   // Nominal state canary
#define CANARY_CORRUPTED_SIGNATURE  0xBAADF00DU   // Tripped / flagged canary

// Tamper Bitmask Flags
#define FLAG_NOMINAL                0x00000000U
#define FLAG_KEYBOARD_PROBE         0x00000001U
#define FLAG_MOUSE_INSPECT          0x00000002U
#define FLAG_WEBSHELL_PROBE         0x00000004U
#define FLAG_DEVTOOLS_TRIP          0x00000008U
#define FLAG_BOUNDS_VIOLATION       0x00000010U

// ============================================================================
// PACKED C++ SECURITY MEMORY CONTEXT
// Aligned to 64-byte boundary matching WebAssembly Linear Memory Page 0
// ============================================================================
#pragma pack(push, 1)
typedef struct {
    uint32_t magic;             // Offset 0x00: Magic header (0x4350505F)
    uint16_t version;           // Offset 0x04: Version (0x0200)
    uint16_t reserved;          // Offset 0x06: Alignment padding
    uint32_t memory_limit;      // Offset 0x08: Max boundary in bytes
    uint32_t active_flags;      // Offset 0x0C: Active security flags
    uint32_t canary;            // Offset 0x10: 0xDEADBEEF canary
    uint32_t tamper_bitmask;    // Offset 0x14: Bitmask of recorded violations
    uint32_t checksum;          // Offset 0x18: Adler-32 integrity checksum
    uint32_t probe_counter;     // Offset 0x1C: Total probes intercepted
    uint64_t last_intercept_ts; // Offset 0x20: Timestamp of last intercept
    uint8_t  guard_pad[24];     // Offset 0x28: Guard isolation padding
} SecurityContext;
#pragma pack(pop)

// ============================================================================
// EXPORTED C++ WASM RUNTIME API (ABI COMPATIBLE)
// ============================================================================
void     init_security_mesh(uint32_t memory_size);
uint32_t verify_memory_canary(void);
void     record_tamper_event(uint32_t reason_flag);
void     reset_canary(void);
uint32_t compute_adler32_checksum(void);
uint32_t get_canary_value(void);
uint32_t get_tamper_count(void);
uint32_t get_tamper_bitmask(void);
int32_t  scan_webshell_signature_native(const char* payload, int32_t length);

#ifdef __cplusplus
}
#endif

#endif // SECURITY_GUARD_HPP
