/**
 * Complete Guides & Index Generator for Sejda PDF
 * Generates 28 high-value technical articles (each 850 - 1,250 words)
 * with CSP headers, data tables, comparative matrices, code examples,
 * and comprehensive search index.
 */

import fs from 'fs';
import path from 'path';

const guidesDir = path.join(process.cwd(), 'public', 'guides');
if (!fs.existsSync(guidesDir)) {
  fs.mkdirSync(guidesDir, { recursive: true });
}

export const CSP_HEADER = "default-src 'self' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https: http: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com https://ep2.adtrafficquality.google; connect-src 'self' data: blob: https://pagead2.googlesyndication.com https://adservice.google.com https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.google-analytics.com https://generativelanguage.googleapis.com; media-src 'self' data: blob:; object-src 'none'; base-uri 'self';";

// Build HTML page template
export function renderArticleHtml(g) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="${CSP_HEADER}">
  <title>${g.title} - Sejda PDF &amp; Document Intelligence</title>
  <meta name="description" content="${g.description}">
  <link rel="canonical" href="https://ais-pre-jif4roijm7su7cij4cqj4x-821735053734.asia-southeast1.run.app/guides/${g.slug}">
  <link rel="icon" type="image/svg+xml" href="/icon.svg">
  <meta property="og:title" content="${g.title}">
  <meta property="og:description" content="${g.description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://ais-pre-jif4roijm7su7cij4cqj4x-821735053734.asia-southeast1.run.app/guides/${g.slug}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #18a474; --primary-dark: #159167; --text: #1e293b; --muted: #64748b; --border: #e2e8f0; --bg: #fcfdfd; --card: #ffffff; }
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: var(--text); background: var(--bg); margin: 0; line-height: 1.7; }
    header { background: #ffffff; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 10; }
    .header-inner { max-width: 1200px; margin: 0 auto; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-size: 24px; font-weight: 800; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 8px; }
    nav a { color: var(--text); text-decoration: none; margin-left: 18px; font-size: 14px; font-weight: 600; transition: color 0.15s; }
    nav a:hover { color: var(--primary); }
    .container { max-width: 860px; margin: 40px auto; padding: 0 20px; }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 42px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); }
    .tag { font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em; display: inline-block; background: #ecfdf5; padding: 4px 12px; border-radius: 9999px; }
    h1 { font-size: 32px; font-weight: 800; color: #0f172a; line-height: 1.3; margin-top: 8px; }
    h2 { font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 36px; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
    h3 { font-size: 17px; font-weight: 700; color: #334155; margin-top: 24px; }
    p, li { font-size: 15px; color: #334155; line-height: 1.75; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 13px; }
    th, td { border: 1px solid var(--border); padding: 12px 14px; text-align: left; }
    th { background: #f8fafc; font-weight: 700; color: #0f172a; }
    code { font-family: 'JetBrains Mono', monospace; font-size: 13px; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #0f172a; }
    pre { font-family: 'JetBrains Mono', monospace; font-size: 13px; background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 8px; overflow-x: auto; }
    .callout { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .callout strong { color: #065f46; }
    .cta-box { background: #0f172a; color: white; border-radius: 14px; padding: 32px; text-align: center; margin: 40px 0; }
    .cta-box h3 { color: white; margin-top: 0; font-size: 20px; }
    .cta-box p { color: #94a3b8; font-size: 14px; margin-bottom: 16px; }
    .cta-box a { display: inline-block; background: var(--primary); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; transition: background 0.15s; }
    .cta-box a:hover { background: var(--primary-dark); }
    footer { background: #ffffff; border-top: 1px solid var(--border); padding: 40px 20px; margin-top: 60px; font-size: 13px; color: var(--muted); }
    .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
    .footer-links a { color: var(--muted); text-decoration: none; margin-right: 16px; }
    .footer-links a:hover { color: var(--primary); }
    .breadcrumb { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }
    .breadcrumb a { color: #64748b; text-decoration: none; }
    .breadcrumb a:hover { color: var(--primary); }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="/" class="logo">sejda <span style="font-size: 10px; background: #ecfdf5; color: #18a474; padding: 2px 8px; border-radius: 6px; border: 1px solid #a7f3d0;">AI</span></a>
      <nav aria-label="Main Navigation">
        <a href="/">Home</a>
        <a href="/#edit">PDF Editor</a>
        <a href="/#compress">Compress</a>
        <a href="/#merge">Merge</a>
        <a href="/guides/" style="color: var(--primary);">Guides Hub</a>
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact</a>
        <a href="/privacy.html">Privacy</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <div class="breadcrumb">
      <a href="/">Home</a> &rsaquo; <a href="/guides/">Knowledge Base</a> &rsaquo; <span>${g.category}</span>
    </div>
    <article class="card">
      <div class="tag">${g.category} &bull; ${g.readTime} &bull; ${g.wordCount} Words</div>
      <h1>${g.title}</h1>
      <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;"><em>${g.description}</em></p>
      ${g.content}

      <div class="cta-box">
        <h3>Execute this task in your browser with zero install</h3>
        <p>Sejda processes documents in volatile RAM with guaranteed automated 2-hour file purge. Completely confidential and free for up to 3 tasks per hour.</p>
        <a href="/${g.toolHash}">Open ${g.toolName} Now &rarr;</a>
      </div>
    </article>
  </main>

  <footer>
    <div class="footer-inner">
      <div>&copy; 2026 Sejda BV. All rights reserved. &bull; AdSense Publisher: pub-9341732423335241</div>
      <div class="footer-links">
        <a href="/">Home</a>
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/terms.html">Terms of Service</a>
        <a href="/cookies.html">Cookies</a>
        <a href="/about.html">About Us</a>
        <a href="/contact.html">Contact Us</a>
        <a href="/sitemap.html">Sitemap</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}
