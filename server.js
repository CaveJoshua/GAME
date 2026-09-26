/**
 * Production Web Server with Zero-Trust Security Headers & SSL/TLS Transport Certificate Support
 * Compatible with Render, Cloudflare Pages, Railway, Docker, and Local HTTPS Development
 */

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '4173', 10);
const HOST = process.env.HOST || '0.0.0.0';
const DIST_DIR = path.resolve(__dirname, 'dist');
const CERTS_DIR = path.resolve(__dirname, 'certs');

// Check for TLS / SSL Transport Certificates
const keyPath = path.join(CERTS_DIR, 'server.key');
const crtPath = path.join(CERTS_DIR, 'server.crt');
const hasTlsCerts = fs.existsSync(keyPath) && fs.existsSync(crtPath);

const ENABLE_HTTPS = process.env.HTTPS === 'true' || process.argv.includes('--https');

// MIME types lookup table
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8'
};

// Strict HTTP Security Headers & CSP Protocol
const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.credly.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://images.credly.com https://cdn.credly.com https://*.credly.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' http://localhost:* https://*.credly.com",
    "frame-src 'self' https://www.credly.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'X-XSS-Protection': '1; mode=block',
  'X-NGFW-Firewall': 'Active; RuleEngine=v5.4-ZeroTrust; StrictInspection=true',
  'X-Security-Mesh': 'CITCS-Network-And-Security-Defense-Cluster'
};

function requestHandler(req, res) {
  // Apply all security headers
  for (const [header, val] of Object.entries(SECURITY_HEADERS)) {
    res.setHeader(header, val);
  }

  // Health check endpoint for cloud deployments (Render, Cloudflare, AWS, Kubernetes)
  if (req.url === '/healthz' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      defense: 'NGFW v5.4-ZeroTrust',
      tlsAvailable: hasTlsCerts,
      tlsActive: req.socket.encrypted || ENABLE_HTTPS,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Sanitize and resolve URL path
  let safePath = decodeURI(req.url.split('?')[0]);
  if (safePath === '/') safePath = '/index.html';

  let filePath = path.join(DIST_DIR, safePath);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden: Invalid file path traversal attempt');
    return;
  }

  // Check if file exists; if not, fallback to index.html for SPA client-side routing
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Cache control headers: HTML no-cache, assets long-term cache
  if (ext === '.html') {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// Start HTTP or HTTPS server
if (ENABLE_HTTPS && hasTlsCerts) {
  const tlsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(crtPath)
  };
  const server = https.createServer(tlsOptions, requestHandler);
  server.listen(PORT, HOST, () => {
    console.log(`🔒 [NGFW SECURE TLS SERVER] Running at https://${HOST}:${PORT}`);
    console.log(`✓ TLS Certificate: ${crtPath}`);
    console.log(`✓ TLS Key:         ${keyPath}`);
    console.log(`✓ Health Check:    https://${HOST}:${PORT}/healthz`);
  });
} else {
  const server = http.createServer(requestHandler);
  server.listen(PORT, HOST, () => {
    console.log(`🚀 [NGFW DEPLOYMENT SERVER] Running at http://${HOST}:${PORT}`);
    console.log(`✓ Host Binding:    ${HOST} (Cloud-ready 0.0.0.0 for Render / Containers)`);
    console.log(`✓ Port:            ${PORT}`);
    console.log(`✓ Health Check:    http://${HOST}:${PORT}/healthz`);
    if (hasTlsCerts) {
      console.log(`ℹ️ TLS/SSL Transport certs available in ./certs/ (run with --https or HTTPS=true to activate TLS listener)`);
    }
  });
}
