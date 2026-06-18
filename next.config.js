/** @type {import('next').NextConfig} */

// Content-Security-Policy — scoped to the origins this app actually uses:
//   - Google Fonts CSS (fonts.googleapis.com) + font files (fonts.gstatic.com)
//   - Supabase REST/Realtime (*.supabase.co)
//   - data:/blob: for next/image and client-side jsPDF certificate rendering
// 'unsafe-inline' on script/style is required by Next.js App Router (inline
// hydration payload + Tailwind styles) without a nonce-injecting middleware.
// Next.js dev mode (webpack eval source maps + React Fast Refresh) requires
// 'unsafe-eval'; production builds do not. Adding it only in development keeps
// the production CSP strict while allowing local `next dev` to hydrate.
const scriptSrc =
  process.env.NODE_ENV === "production"
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob:",
  scriptSrc,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
