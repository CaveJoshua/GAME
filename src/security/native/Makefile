# ==============================================================================
# Makefile - C++ WebAssembly Security Guardrail Compiler
# Ramel Joshua O. Cave - Network & Cyber Security Portfolio
# ==============================================================================

CXX = emcc
CXXFLAGS = -O3 -std=c++17 -Wall -Wextra
WASM_FLAGS = -s WASM=1 -s SIDE_MODULE=1 -s EXPORTED_FUNCTIONS='["_init_security_mesh","_verify_memory_canary","_record_tamper_event","_reset_canary","_compute_adler32_checksum","_get_canary_value","_get_tamper_count","_get_tamper_bitmask","_scan_webshell_signature_native"]' -s ALLOW_MEMORY_GROWTH=1

TARGET = ../../../public/wasm/security_guard.wasm
SRC = security_guard.cpp

all: $(TARGET)

$(TARGET): $(SRC) security_guard.hpp
	@mkdir -p ../../../public/wasm
	$(CXX) $(CXXFLAGS) $(WASM_FLAGS) $(SRC) -o $(TARGET)
	@echo "[✓] Built C++ WebAssembly Security Guardrail: $(TARGET)"

clean:
	rm -f $(TARGET)
