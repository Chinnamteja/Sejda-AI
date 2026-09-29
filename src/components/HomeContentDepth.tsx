/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  HardDrive,
  FileText,
  FileCheck,
  CreditCard,
  Layers,
  HelpCircle,
  Clock,
  EyeOff,
  Monitor,
  Check,
  X as XIcon,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { ToolId } from '../types';
import { ALL_GUIDES } from '../data/guidesData';

interface HomeContentDepthProps {
  onSelectTool: (tool: ToolId) => void;
  onOpenPricing?: () => void;
  onOpenDesktopModal?: () => void;
}

export const HomeContentDepth: React.FC<HomeContentDepthProps> = ({
  onSelectTool,
  onOpenPricing,
  onOpenDesktopModal,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [guideCategory, setGuideCategory] = useState<string>('All');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Is Sejda safe and private? What happens to my uploaded files?',
      a: 'Your documents remain 100% strictly confidential and your private property. Files uploaded for server processing are held exclusively in volatile RAM and permanently erased after exactly 2 hours. When using our browser-first tools (like offline signing, client-side viewing, and desktop app execution), your files never leave your device at all.',
    },
    {
      q: 'How does the 2-hour automatic purge guarantee work?',
      a: 'Every uploaded file receives an automated cryptographic Time-To-Live (TTL) token. At the 2-hour mark, our automated cleanup daemon executes a cryptographic purge that permanently deletes the file buffers, thumbnails, and cache entries. We do not maintain unencrypted backups of user documents.',
    },
    {
      q: 'Are digital signatures created with Sejda legally binding?',
      a: 'Yes. Signatures generated with our Fill & Sign tool comply with the US Electronic Signatures in Global and National Commerce Act (ESIGN), Uniform Electronic Transactions Act (UETA), and European eIDAS regulation for simple electronic signatures (SES), creating an enforceable audit trail.',
    },
    {
      q: 'What payment options are available for Sejda Pro and Unlimited plans?',
      a: 'We support instant direct checkout via Google Pay / UPI (registered merchant ID 7095074745@jio) and PayPal (chinnamteja05@gmail.com), in addition to major credit and debit cards. Payments are processed with bank-grade TLS 1.3 encryption, and we never store your private banking passwords, UPI PINs, or card security codes.',
    },
    {
      q: 'Can I use Sejda completely offline without an internet connection?',
      a: 'Yes! Sejda Desktop is a standalone application available for macOS, Windows, and Linux. When using Sejda Desktop, all PDF manipulation, merging, splitting, and OCR occurs 100% locally on your machine without transmitting any data over the internet.',
    },
    {
      q: 'How does the AI Document Copilot handle sensitive document contents?',
      a: 'Our AI features are powered by Google Gemini 3.8. Under our enterprise data agreements, document text submitted for AI summarization, contract audit, or translation is processed ephemerally in RAM and is never retained, logged, or used to train public machine learning foundation models.',
    },
    {
      q: 'How does PDF conversion work for images, scans, and documents?',
      a: 'Sejda delivers high-fidelity bidirectional PDF conversion for JPG, PNG, WEBP, and TIFF. Raster images are converted with color space normalization and page margin adjustment, while documents preserve vector typography and structural layouts without loss of clarity.',
    },
    {
      q: 'What AI tool compatibility does Sejda offer for document analysis?',
      a: 'Sejda AI Copilot integrates Google Gemini 3.8 to enable multilingual translation across 100+ languages, contract risk audits, Q&A document chat, and automated financial table extraction directly into CSV, operating strictly in ephemeral memory without model training.',
    },
    {
      q: 'What are the limits of the free service?',
      a: 'The free tier provides full access to our entire suite of tools for documents up to 200 pages or 50 MB, with a generous limit of 3 free tasks per hour. Users needing batch processing, unlimited hourly tasks, and larger files can upgrade to Web Week Pass or Web Pro.',
    },
    {
      q: 'What PDF versions and file formats are supported?',
      a: 'Sejda natively supports all PDF versions from 1.0 through 2.0, PDF/A archival standards, password-encrypted PDFs, as well as image conversions for JPG, PNG, WEBP, and TIFF. Extracted tables can be exported directly into CSV format.',
    },
  ];

  return (
    <div className="space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      {/* 1. THREE-STEP WORKFLOW GUIDE */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#18a474]" />
            <span>Fast, Zero-Friction Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Edit, Compress &amp; Sign Any PDF in Seconds
          </h2>
          <p className="text-sm text-slate-600">
            No cumbersome software installations or credit cards required to start.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18a474] flex items-center justify-center font-extrabold text-base">
              01
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">Choose or Drop Your PDF</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Drag any PDF, image scan, or invoice directly into your browser window or select from your local drive. Files stay securely encrypted in transit.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center space-x-1">
              <span>Up to 50 MB free</span>
              <span aria-hidden="true">&bull;</span>
              <span>200 Pages</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18a474] flex items-center justify-center font-extrabold text-base">
              02
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">Modify, Sign or Optimize</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Edit text inline, add legally compliant electronic signatures, shrink file size, merge files, or prompt the Gemini 3.8 AI Copilot for rapid audits.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center space-x-1">
              <span>30+ Precision Tools</span>
              <span aria-hidden="true">&bull;</span>
              <span>Instant Preview</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18a474] flex items-center justify-center font-extrabold text-base">
              03
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">Download &amp; Auto-Purge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download your finalized PDF document with zero watermarks. Server memory is automatically purged after 2 hours for absolute privacy.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center space-x-1">
              <span>Zero Watermarks</span>
              <span aria-hidden="true">&bull;</span>
              <span>100% Confidential</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE COMPARISON MATRIX */}
      <section className="space-y-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#18a474]" />
            <span>Honest Feature Comparison</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Professionals Prefer Sejda
          </h2>
          <p className="text-sm text-slate-600">
            Compare Sejda against legacy desktop PDF editors and cluttered web alternatives.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="py-3.5 px-4 font-bold text-slate-800 rounded-l-xl">Feature / Capability</th>
                <th className="py-3.5 px-4 font-extrabold text-[#18a474] bg-emerald-50/60 border-x border-emerald-100">
                  Sejda (Web &amp; Desktop)
                </th>
                <th className="py-3.5 px-4 font-bold text-slate-600">Adobe Acrobat Pro</th>
                <th className="py-3.5 px-4 font-bold text-slate-600 rounded-r-xl">Generic PDF Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Free Daily Access Without Account</td>
                <td className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/30 border-x border-emerald-100 flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-[#18a474]" />
                  <span>Yes (3 tasks/hour)</span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">Requires Adobe ID &amp; Card</td>
                <td className="py-3.5 px-4 text-slate-500">Limited (1-2 tasks/day)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Ephemeral In-Memory Auto-Purge</td>
                <td className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/30 border-x border-emerald-100 flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-[#18a474]" />
                  <span>Guaranteed 2 Hours</span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">Cloud Storage Sync</td>
                <td className="py-3.5 px-4 text-slate-500">Varies (often 24+ hrs)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">AI Document Copilot (Gemini 3.8)</td>
                <td className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/30 border-x border-emerald-100 flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-[#18a474]" />
                  <span>Built-in (Zero Training)</span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">Additional Paid Add-on</td>
                <td className="py-3.5 px-4 text-slate-500">None</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Full Offline Desktop Software</td>
                <td className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/30 border-x border-emerald-100 flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-[#18a474]" />
                  <span>Mac, Windows, Linux</span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">Heavy Desktop Install</td>
                <td className="py-3.5 px-4 text-slate-500">Web Only</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Payment Options</td>
                <td className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/30 border-x border-emerald-100">
                  GPay UPI, PayPal, Cards
                </td>
                <td className="py-3.5 px-4 text-slate-500">Annual Card Recurring Only</td>
                <td className="py-3.5 px-4 text-slate-500">Credit Card Only</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Price Flexibility</td>
                <td className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/30 border-x border-emerald-100">
                  $5 Week Pass or $7.50/mo
                </td>
                <td className="py-3.5 px-4 text-slate-500">$239.88/year auto-renew</td>
                <td className="py-3.5 px-4 text-slate-500">$12/mo recurring</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. TECHNICAL SPECIFICATIONS & FORMATS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <HardDrive className="w-3.5 h-3.5 text-[#18a474]" />
            <span>Specifications &amp; Compatibility</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Engineered for High-Precision Document Processing
          </h2>
          <p className="text-sm text-slate-600">
            Strict compliance with international PDF standards and cryptographic validation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-[#18a474]" />
              <span>Standard Compliance</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Full support for PDF 1.0 through 2.0 (ISO 32000-2), PDF/A-1b and PDF/A-2b archival compliance.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center space-x-2">
              <Lock className="w-4 h-4 text-[#18a474]" />
              <span>Encryption &amp; Security</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Standard 128-bit and 256-bit AES encryption with separate owner and user permissions password management.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#18a474]" />
              <span>Input &amp; Output Formats</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Direct processing for PDF, JPG, PNG, WEBP, TIFF, TXT, and structured CSV export for table extraction.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#18a474]" />
              <span>Capacity &amp; Throughput</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Up to 200 pages and 50 MB per task on the free tier; up to 500 MB and unlimited pages on Pro plans.
            </p>
          </div>
        </div>
      </section>

      {/* 4. EXPANDABLE FAQ ACCORDION */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#18a474]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers
          </h2>
          <p className="text-sm text-slate-600">
            Clear, transparent details about our security, document privacy, and tools.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-[#18a474] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#18a474]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => onSelectTool('faq')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-[#18a474] border border-slate-300 hover:border-emerald-300 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#18a474]" />
            <span>View Dedicated FAQ &amp; Help Center (All 16+ Topics) &rarr;</span>
          </button>
        </div>
      </section>

      {/* 5. AUTHORITATIVE KNOWLEDGE BASE & GUIDES (28 IN-DEPTH ARTICLES) */}
      <section className="space-y-8 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#18a474]" />
              <span>Valuable Inventory &bull; 28 Authoritative Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              In-Depth Technical Guides &amp; Architecture Library
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Over 31,000 words of engineering documentation, legal matrices, and step-by-step PDF optimization standards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectTool('guides')}
              className="px-4 py-2 bg-[#18a474] hover:bg-[#159167] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-2xs whitespace-nowrap"
            >
              Browse All 28 Guides Hub &rarr;
            </button>
            <a
              href="/guides/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Static Index</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60">
          {['All', 'Signatures & Forms', 'Optimization & Standards', 'AI Intelligence & OCR', 'Organization & Editing'].map((cat) => (
            <button
              key={cat}
              onClick={() => setGuideCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                guideCategory === cat
                  ? 'bg-[#18a474] text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Guides (28)' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_GUIDES.filter((art) => guideCategory === 'All' || art.category === guideCategory)
            .slice(0, guideCategory === 'All' ? 9 : 12)
            .map((art) => (
            <div
              key={art.url}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-xs transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#18a474] uppercase tracking-wider">{art.category}</span>
                  <span className="text-slate-400 font-semibold">{art.wordCount}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  <a href={art.url} className="hover:text-[#18a474] transition">
                    {art.title}
                  </a>
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {art.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={art.url}
                  className="font-bold text-[#18a474] hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Read Article</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={() => onSelectTool(art.toolId as ToolId)}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-[#18a474] rounded text-[11px] font-semibold"
                >
                  Tool &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span>Complete Directory: <a href="/sitemap.html" className="text-[#18a474] font-semibold hover:underline">HTML Sitemap</a></span>
          <span aria-hidden="true">&bull;</span>
          <span>Machine Readable: <a href="/sitemap.xml" target="_blank" className="text-[#18a474] font-semibold hover:underline">Root sitemap.xml</a></span>
          <span aria-hidden="true">&bull;</span>
          <span>Crawlers: <a href="/robots.txt" target="_blank" className="text-[#18a474] font-semibold hover:underline">robots.txt</a></span>
        </div>
      </section>

      {/* 6. AUDITED TRUST & COMPLIANCE BADGE STRIP */}
      <section className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Enterprise Security Guarantee</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Ready to experience frictionless, private PDF tasks?
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Over 50 million files processed securely. Certified GDPR compliant, TLS 1.3 encrypted, and zero unauthorized data mining.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTool('edit')}
            className="px-5 py-2.5 bg-[#18a474] hover:bg-[#159167] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Launch PDF Editor
          </button>
          {onOpenDesktopModal && (
            <button
              onClick={onOpenDesktopModal}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              <span>Get Desktop App</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
