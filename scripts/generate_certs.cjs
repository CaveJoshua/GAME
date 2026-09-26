/**
 * Automated TLS / SSL Transport Certificate Generator
 * Generates X.509 RSA 2048-bit Private Key, Certificate, and Bundle with Subject Alternative Names (SAN)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const certsDir = path.resolve(__dirname, '..', 'certs');
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

const keyPath = path.join(certsDir, 'server.key');
const crtPath = path.join(certsDir, 'server.crt');
const pemPath = path.join(certsDir, 'server.pem');

// Find OpenSSL binary (system or Git for Windows)
function getOpenSSLPath() {
  const candidates = [
    'openssl',
    'C:\\Program Files\\Git\\usr\\bin\\openssl.exe',
    'C:\\Program Files (x86)\\Git\\usr\\bin\\openssl.exe',
    '/usr/bin/openssl',
    '/usr/local/bin/openssl'
  ];

  for (const candidate of candidates) {
    try {
      execSync(`"${candidate}" version`, { stdio: 'ignore' });
      return candidate;
    } catch {
      // Continue checking
    }
  }
  return null;
}

const openssl = getOpenSSLPath();

if (openssl) {
  console.log(`[TLS GEN] Found OpenSSL at: ${openssl}`);
  console.log('[TLS GEN] Generating 2048-bit RSA Private Key & Self-Signed X.509 Transport Certificate...');
  
  const cmd = `"${openssl}" req -x509 -newkey rsa:2048 -nodes -keyout "${keyPath}" -out "${crtPath}" -days 365 -subj "/CN=localhost/O=CITCS Defense Mesh/OU=Network Security/C=PH" -addext "subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1,IP:0.0.0.0"`;
  execSync(cmd, { stdio: 'inherit' });

  // Create combined PEM bundle
  const keyContent = fs.readFileSync(keyPath, 'utf8');
  const crtContent = fs.readFileSync(crtPath, 'utf8');
  fs.writeFileSync(pemPath, crtContent + '\n' + keyContent, 'utf8');

  console.log(`✓ TLS Key:         ${keyPath}`);
  console.log(`✓ TLS Certificate: ${crtPath}`);
  console.log(`✓ TLS PEM Bundle:  ${pemPath}`);
  console.log('[TLS GEN] Transport certificates successfully generated and ready for HTTPS/TLS deployment.');
} else {
  console.warn('[TLS GEN] OpenSSL binary not found. Checking if certificates already exist...');
  if (fs.existsSync(keyPath) && fs.existsSync(crtPath)) {
    console.log('✓ Existing TLS certificates found in certs directory.');
  } else {
    console.error('[TLS GEN] Error: Unable to generate TLS certificates without OpenSSL.');
  }
}
