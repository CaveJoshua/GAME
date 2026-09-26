/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          canvas: "#fafafc",
          card: "#ffffff",
          "card-elevated": "#f4f4f7",
          contrast: "#09090b",
          "contrast-soft": "#18181b",
          "blue-primary": "#1d4ed8",
          "blue-vivid": "#2563eb",
          "blue-light": "#3b82f6",
          "blue-sky": "#60a5fa",
          "blue-cyan": "#00f0ff",
          "blue-subtle": "rgba(37, 99, 235, 0.07)",
          "blue-border": "rgba(37, 99, 235, 0.28)",
          "blue-glow": "rgba(37, 99, 235, 0.25)",
          "red-primary": "#e11d48",
          "red-dark": "#be123c",
          "red-light": "#f43f5e",
          "red-subtle": "rgba(225, 29, 72, 0.07)",
          "red-border": "rgba(225, 29, 72, 0.28)",
          "red-glow": "rgba(225, 29, 72, 0.25)",
          "gold-primary": "#c59b27",
          "gold-light": "#fbbf24",
          "gold-dark": "#997517",
          "gold-subtle": "rgba(197, 155, 39, 0.08)",
          "gold-border": "rgba(197, 155, 39, 0.32)",
          "gold-glow": "rgba(197, 155, 39, 0.25)",
          "border-light": "rgba(15, 23, 42, 0.08)",
          "border-medium": "rgba(15, 23, 42, 0.15)",
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Share Tech Mono', 'monospace'],
      },
      boxShadow: {
        "cyber-card": "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
        "cyber-elevated": "0 12px 30px -4px rgba(15, 23, 42, 0.09)",
        "blue-glow": "0 0 16px rgba(37, 99, 235, 0.35)",
        "red-glow": "0 0 16px rgba(225, 29, 72, 0.35)",
        "cyan-glow": "0 0 16px rgba(0, 240, 255, 0.45)",
      },
      animation: {
        "triad-float": "triadFloat 10s ease-in-out infinite",
        "laser-scan": "laserScan 14s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "aura-breath": "auraBreath 12s ease-in-out infinite alternate",
        "cyber-pulse": "cyberPulse 1.8s infinite ease-in-out",
        "rotate-cw": "rotateClockwise 35s linear infinite",
        "rotate-ccw": "rotateCounter 45s linear infinite",
      },
      keyframes: {
        triadFloat: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-8px) scale(1.008)" },
        },
        laserScan: {
          "0%": { top: "0%", opacity: "0" },
          "10%": { opacity: "0.85" },
          "90%": { opacity: "0.85" },
          "100%": { top: "100%", opacity: "0" },
        },
        auraBreath: {
          "0%": { transform: "scale(1) translateY(0)", opacity: "0.7" },
          "50%": { transform: "scale(1.04) translateY(-12px)", opacity: "1" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "0.7" },
        },
        cyberPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
        },
        rotateClockwise: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        rotateCounter: {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
