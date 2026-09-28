import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure iframe compatibility, crawler access, and robust Content Security Policy (CSP)
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self' data: blob:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https: http: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
      "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com https://ep2.adtrafficquality.google",
      "connect-src 'self' data: blob: https://pagead2.googlesyndication.com https://adservice.google.com https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.google-analytics.com https://generativelanguage.googleapis.com",
      "media-src 'self' data: blob:",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; ')
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    name: 'Sejda AI PDF Backend',
  });
});

// AdSense Authorized Digital Sellers (ads.txt) verification route
app.get('/ads.txt', (req, res) => {
  res.type('text/plain');
  res.send('google.com, pub-9341732423335241, DIRECT, f08c47fec0942fa0\n');
});

// Dedicated HTML routes for crawlers, AdSense review bots, and direct links
app.get(['/privacy', '/privacy.html'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'privacy.html'));
});
app.get(['/about', '/about.html'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'about.html'));
});
app.get(['/contact', '/contact.html'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'contact.html'));
});
app.get(['/terms', '/terms.html'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'terms.html'));
});
app.get(['/cookies', '/cookies.html'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'cookies.html'));
});
app.get(['/sitemap', '/sitemap.html'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'sitemap.html'));
});
app.use('/guides', express.static(path.join(process.cwd(), 'public', 'guides')));

// Search Engine & AdSense Crawler directives (robots.txt)
app.get('/robots.txt', (req, res) => {
  const host = req.get('host') || 'ais-pre-jif4roijm7su7cij4cqj4x-821735053734.asia-southeast1.run.app';
  const proto = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${proto}://${host}/sitemap.xml\n\nUser-agent: Mediapartners-Google\nAllow: /\n\nUser-agent: AdsBot-Google\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n`);
});

// XML Sitemap route for search crawlers & SEO indexing
app.get('/sitemap.xml', (req, res) => {
  const host = req.get('host') || 'ais-pre-jif4roijm7su7cij4cqj4x-821735053734.asia-southeast1.run.app';
  const proto = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const baseUrl = `${proto}://${host}`;
  
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/privacy.html', priority: '0.9', changefreq: 'weekly' },
    { url: '/about.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/contact.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/terms.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/cookies.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/sitemap.html', priority: '0.85', changefreq: 'weekly' },
    { url: '/guides/', priority: '0.9', changefreq: 'weekly' },
    { url: '/guides/how-to-compress-pdf.html', priority: '0.85', changefreq: 'monthly' },
    { url: '/guides/how-to-sign-pdf-legally.html', priority: '0.85', changefreq: 'monthly' },
    { url: '/guides/extract-tables-from-pdf-to-csv.html', priority: '0.85', changefreq: 'monthly' },
    { url: '/guides/pdf-security-best-practices.html', priority: '0.85', changefreq: 'monthly' },
    { url: '/#edit', priority: '0.95', changefreq: 'weekly' },
    { url: '/#fill_sign', priority: '0.95', changefreq: 'weekly' },
    { url: '/#merge', priority: '0.95', changefreq: 'weekly' },
    { url: '/#split', priority: '0.95', changefreq: 'weekly' },
    { url: '/#compress', priority: '0.95', changefreq: 'weekly' },
    { url: '/#rotate', priority: '0.90', changefreq: 'weekly' },
    { url: '/#watermark', priority: '0.85', changefreq: 'weekly' },
    { url: '/#crop', priority: '0.85', changefreq: 'weekly' },
    { url: '/#protect', priority: '0.85', changefreq: 'weekly' },
    { url: '/#jpg_to_pdf', priority: '0.90', changefreq: 'weekly' },
    { url: '/#pdf_to_jpg', priority: '0.90', changefreq: 'weekly' },
    { url: '/#ai_chat', priority: '0.90', changefreq: 'weekly' },
    { url: '/#ai_summary', priority: '0.90', changefreq: 'weekly' },
    { url: '/#ai_translate', priority: '0.90', changefreq: 'weekly' },
    { url: '/#ai_extract', priority: '0.90', changefreq: 'weekly' },
    { url: '/#ai_audit', priority: '0.90', changefreq: 'weekly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.type('application/xml');
  res.send(xml);
});

// 1. AI Ask PDF / Chat
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { documentText, documentName, question, history } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const ai = getAIClient();
    const systemPrompt = `You are Sejda AI, a specialized document intelligence assistant.
You assist the user with analyzing, interpreting, and answering questions about their PDF document titled "${documentName || 'Document'}".
Reference specific facts, clauses, and figures directly from the text if available.
If the answer is not mentioned in the document, clarify clearly while offering helpful general knowledge.
Format your response using clean Markdown with bolding, lists, and clear paragraphs where helpful.`;

    const docContext = documentText
      ? `=== DOCUMENT CONTENT START ===\n${documentText.slice(0, 40000)}\n=== DOCUMENT CONTENT END ===\n\n`
      : '=== (No raw text could be extracted, answer based on general context or provided excerpt) ===\n\n';

    const prompt = `${docContext}User Question: ${question}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
      },
    });

    res.json({ answer: response.text || 'No response generated.' });
  } catch (error: any) {
    console.error('Error in /api/ai/ask:', error);
    res.status(500).json({ error: error?.message || 'Failed to process AI request' });
  }
});

// 2. AI Summarizer
app.post('/api/ai/summarize', async (req, res) => {
  try {
    const { documentText, documentName, summaryType = 'executive' } = req.body;
    if (!documentText) {
      return res.status(400).json({ error: 'Document text is required for summarization' });
    }

    const ai = getAIClient();
    const instructionsByType: Record<string, string> = {
      executive: 'Provide a concise Executive Summary (2-3 paragraphs) highlighting core objectives, key findings, and final outcome.',
      bullet_points: 'Provide a structured bullet-point breakdown of all main topics, data points, and critical conclusions.',
      action_items: 'Extract all actionable tasks, responsibilities, deadlines, and next steps implied or stated in the document.',
      key_clauses: 'Identify and summarize key terms, agreements, warranties, liabilities, and milestones.',
    };

    const instruction = instructionsByType[summaryType] || instructionsByType.executive;
    const prompt = `Document Title: ${documentName || 'Uploaded PDF'}

TASK: ${instruction}

DOCUMENT TEXT:
${documentText.slice(0, 40000)}

Please return the output in neat, well-structured Markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are Sejda AI Document Intelligence. Deliver precise, high-value, crisp executive summaries.',
        temperature: 0.2,
      },
    });

    res.json({ summary: response.text || 'Unable to generate summary.' });
  } catch (error: any) {
    console.error('Error in /api/ai/summarize:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate summary' });
  }
});

// 3. AI Translate PDF
app.post('/api/ai/translate', async (req, res) => {
  try {
    const { text, targetLanguage = 'Spanish' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for translation' });
    }

    const ai = getAIClient();
    const prompt = `Translate the following PDF document text faithfully and naturally into ${targetLanguage}. Maintain technical, legal, and formatting consistency where applicable:

${text.slice(0, 30000)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert multilingual document translator. Output only the translated text in ${targetLanguage} without conversational preamble.`,
        temperature: 0.1,
      },
    });

    res.json({ translatedText: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/translate:', error);
    res.status(500).json({ error: error?.message || 'Failed to translate' });
  }
});

// 4. AI Structured Data / Table Extractor
app.post('/api/ai/extract-data', async (req, res) => {
  try {
    const { documentText } = req.body;
    if (!documentText) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    const ai = getAIClient();
    const prompt = `Analyze this document content and extract structured data:
1. Document metadata (Type, Estimated Date, Author/Issuer, Recipient/Party, Currency if any).
2. Key Entities (Names, Organizations, Addresses, Emails, Phone numbers).
3. Any Tabular / Numerical line items (like invoice items, pricing, milestones, dates, quantities, totals).
4. Key Deadlines and Financial figures.

DOCUMENT TEXT:
${documentText.slice(0, 35000)}

Return purely valid JSON matching this schema:
{
  "documentType": string,
  "parties": string[],
  "dates": string[],
  "keyMetrics": { "label": string, "value": string }[],
  "tables": [
    {
      "title": string,
      "headers": string[],
      "rows": string[][]
    }
  ],
  "actionableDeadlines": string[]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/ai/extract-data:', error);
    res.status(500).json({ error: error?.message || 'Failed to extract structured data' });
  }
});

// 5. AI Contract / Risk Auditor
app.post('/api/ai/analyze-contract', async (req, res) => {
  try {
    const { documentText } = req.body;
    if (!documentText) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    const ai = getAIClient();
    const prompt = `Perform a comprehensive contract risk and compliance audit on this document:
Identify:
1. Overall Risk Score (Low / Medium / High) and short rationale.
2. Risky or One-Sided Clauses (Indemnity, Unlimited Liability, Non-compete, Termination penalties, Jurisdiction).
3. Critical Obligations & Milestones (Payment terms, deliverables, renewal dates).
4. Missing Standard Clauses (e.g. Force Majeure, Confidentiality, Dispute Resolution).
5. Recommended Redlines / Amendments to protect the user.

DOCUMENT TEXT:
${documentText.slice(0, 35000)}

Return purely valid JSON:
{
  "riskScore": "Low" | "Medium" | "High",
  "rationale": string,
  "riskyClauses": [{ "clause": string, "risk": string, "severity": "low" | "medium" | "high", "recommendation": string }],
  "keyObligations": string[],
  "missingProtections": string[],
  "summaryRating": string
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/ai/analyze-contract:', error);
    res.status(500).json({ error: error?.message || 'Failed to audit document' });
  }
});

// 6. AI Re-writer / Grammar Polish
app.post('/api/ai/rewrite', async (req, res) => {
  try {
    const { text, tone = 'professional' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const ai = getAIClient();
    const prompt = `Rewrite the following text with target style: "${tone}". Correct grammatical errors, improve clarity, and maintain semantic intent:

${text.slice(0, 10000)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an elite legal and business document editor. Return only the rewritten text.',
        temperature: 0.3,
      },
    });

    res.json({ rewrittenText: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/rewrite:', error);
    res.status(500).json({ error: error?.message || 'Failed to rewrite text' });
  }
});

// Vite middleware and static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sejda AI PDF Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
