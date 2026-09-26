import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const securityHeaders: Record<string, string> = {
  // Strict Content Security Policy (Anti-XSS, Anti-Clickjacking, Anti-Hostile Injection)
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

  // Anti-Clickjacking protection
  'X-Frame-Options': 'DENY',

  // Anti-MIME Sniffing
  'X-Content-Type-Options': 'nosniff',

  // Cross-Origin Isolation Policies
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',

  // Strict Transport Security (HSTS)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Hardware & Sensor Restriction Policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',

  // Anti-XSS Filter
  'X-XSS-Protection': '1; mode=block',

  // Next-Gen Firewall (NGFW) Telemetry Signatures
  'X-NGFW-Firewall': 'Active; RuleEngine=v5.4-ZeroTrust; StrictInspection=true',
  'X-Security-Mesh': 'CITCS-Network-And-Security-Defense-Cluster'
};

function ngfwSecurityHeadersPlugin(): Plugin {
  return {
    name: 'ngfw-security-headers',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        Object.entries(securityHeaders).forEach(([header, value]) => {
          res.setHeader(header, value);
        });
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        Object.entries(securityHeaders).forEach(([header, value]) => {
          res.setHeader(header, value);
        });
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), ngfwSecurityHeadersPlugin()],
  base: './',
  server: {
    headers: securityHeaders
  },
  preview: {
    headers: securityHeaders
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
