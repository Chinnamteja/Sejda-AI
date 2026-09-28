/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Compass,
  FileText,
  FileSignature,
  Files,
  Scissors,
  Minimize2,
  Image,
  RotateCw,
  Stamp,
  Bot,
  Languages,
  Table,
  ShieldCheck,
  Lock,
  Crop,
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Search,
  BookOpen,
  Copy,
  Check,
  HardDrive
} from 'lucide-react';
import { ToolId } from '../types';
import { ALL_GUIDES } from '../data/guidesData';

interface SitemapPageProps {
  onSelectTool: (tool: ToolId) => void;
  onBackToHome: () => void;
  onOpenPricing?: () => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({
  onSelectTool,
  onBackToHome,
  onOpenPricing,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'tools' | 'ai' | 'guides' | 'legal'>('all');
  const [copied, setCopied] = useState(false);

  const handleCopySitemapUrl = () => {
    const url = window.location.origin + '/sitemap.xml';
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = [
    {
      name: 'Edit & Sign Tools',
      description: 'Modify text, annotate documents, and append legally binding electronic signatures.',
      tools: [
        {
          id: 'edit' as ToolId,
          name: 'PDF Editor',
          description: 'Edit existing text, insert images, add shapes, whiteout text, and modify PDF pages.',
          badge: 'Most Popular',
          icon: FileText,
        },
        {
          id: 'fill_sign' as ToolId,
          name: 'Fill & Sign PDF',
          description: 'Type or draw electronic signatures, add initials, checkmarks, and fill interactive PDF forms.',
          badge: 'ESIGN Compliant',
          icon: FileSignature,
        },
        {
          id: 'watermark' as ToolId,
          name: 'Watermark PDF',
          description: 'Add custom text or image watermarks across pages with opacity and angle controls.',
          badge: 'Security',
          icon: Stamp,
        },
        {
          id: 'crop' as ToolId,
          name: 'Crop PDF',
          description: 'Trim page margins and adjust visible document viewport coordinates.',
          badge: 'Formatting',
          icon: Crop,
        },
        {
          id: 'protect' as ToolId,
          name: 'Protect & Encrypt PDF',
          description: 'Add AES-256 password encryption and set print/copy permissions on documents.',
          badge: 'Security',
          icon: Lock,
        },
      ],
    },
    {
      name: 'Merge & Split Tools',
      description: 'Combine multiple documents or dissect large files into custom page groupings.',
      tools: [
        {
          id: 'merge' as ToolId,
          name: 'Merge PDF Files',
          description: 'Combine multiple PDF documents, images, and scans into a single cohesive file.',
          badge: 'High Speed',
          icon: Files,
        },
        {
          id: 'split' as ToolId,
          name: 'Split PDF by Pages',
          description: 'Extract individual pages, split by custom page ranges, or create separate documents.',
          badge: 'Precision',
          icon: Scissors,
        },
        {
          id: 'split_in_half' as ToolId,
          name: 'Split in Half',
          description: 'Evenly divide large books or presentations into two balanced document portions.',
          badge: 'Automated',
          icon: Scissors,
        },
        {
          id: 'extract_pages' as ToolId,
          name: 'Extract Specific Pages',
          description: 'Cherry-pick select pages from complex legal briefs or multi-page invoices.',
          badge: 'Selective',
          icon: FileText,
        },
        {
          id: 'delete_pages' as ToolId,
          name: 'Delete Pages',
          description: 'Visually preview thumbnails and permanently excise redundant pages.',
          badge: 'Cleanup',
          icon: RotateCw,
        },
      ],
    },
    {
      name: 'Compress & Convert Tools',
      description: 'Shrink file sizes for email distribution and convert between image and PDF formats.',
      tools: [
        {
          id: 'compress' as ToolId,
          name: 'Compress PDF',
          description: 'Reduce PDF file size up to 85% while preserving typography and image resolution.',
          badge: 'Essential',
          icon: Minimize2,
        },
        {
          id: 'rotate' as ToolId,
          name: 'Rotate PDF Pages',
          description: 'Rotate individual landscape/portrait pages clockwise or counter-clockwise (90°/180°).',
          badge: 'Orientation',
          icon: RotateCw,
        },
        {
          id: 'jpg_to_pdf' as ToolId,
          name: 'JPG to PDF Converter',
          description: 'Convert JPG, PNG, and WEBP image files into standardized PDF documents.',
          badge: 'Multi-Image',
          icon: Image,
        },
        {
          id: 'pdf_to_jpg' as ToolId,
          name: 'PDF to JPG Converter',
          description: 'Extract high-resolution image representations from each PDF page.',
          badge: 'Export',
          icon: Image,
        },
      ],
    },
    {
      name: 'AI Document Intelligence Suite',
      description: 'Powered by Gemini 3.8 AI for deep document parsing, translation, and contract audits.',
      tools: [
        {
          id: 'ai_chat' as ToolId,
          name: 'AI Ask PDF / Chat',
          description: 'Engage in natural-language interactive dialogue with document context and page citations.',
          badge: 'Gemini 3.8',
          icon: Bot,
        },
        {
          id: 'ai_summary' as ToolId,
          name: 'AI Document Summarizer',
          description: 'Generate concise executive summaries, key takeaway bullet points, and action items.',
          badge: 'Executive',
          icon: Sparkles,
        },
        {
          id: 'ai_translate' as ToolId,
          name: 'AI PDF Translator',
          description: 'Translate complete document contents into Spanish, French, German, Japanese, and 10+ languages.',
          badge: 'Polyglot',
          icon: Languages,
        },
        {
          id: 'ai_extract' as ToolId,
          name: 'AI Table & Data Extractor',
          description: 'Parse unstructured financial tables, receipts, and line-items directly into CSV spreadsheets.',
          badge: 'Structured',
          icon: Table,
        },
        {
          id: 'ai_audit' as ToolId,
          name: 'AI Contract & Risk Auditor',
          description: 'Detect indemnification traps, missing termination clauses, and legal liabilities in agreements.',
          badge: 'Legal Audit',
          icon: ShieldCheck,
        },
        {
          id: 'ai_rewrite' as ToolId,
          name: 'AI Document Re-writer & Polish',
          description: 'Enhance executive tone, grammatical clarity, and conciseness across paragraphs.',
          badge: 'Editorial',
          icon: FileText,
        },
      ],
    },
  ];

  return (
    <div id="sitemap-page" className="min-h-screen bg-[#fcfdfd] text-slate-800 pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#18a474] bg-slate-100 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">HTML & XML Sitemap Index</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopySitemapUrl}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-[#18a474] bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 shadow-2xs transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied XML URL</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy sitemap.xml URL</span>
                </>
              )}
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-[#18a474] hover:bg-[#159167] px-3.5 py-1.5 rounded-lg shadow-2xs transition"
            >
              <Code2 className="w-3.5 h-3.5 text-white" />
              <span>Root sitemap.xml</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-50/50 via-slate-50/40 to-transparent border-b border-slate-200/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#18a474]" />
            <span>Complete Crawl Coverage &amp; Depth Index</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sejda PDF &amp; AI Tools Complete Sitemap
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Index to all browser-based and desktop PDF manipulation utilities, AI document copilots,
            28 in-depth technical guides (over 31,000 words), legal disclosures, and crawler feeds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-slate-600">
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#18a474]" />
              <span>18 Core Interactive Tools</span>
            </span>
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-[#18a474]" />
              <span>28 In-Depth Guides</span>
            </span>
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <Code2 className="w-3.5 h-3.5 text-[#18a474]" />
              <span>XML &amp; HTML Directives</span>
            </span>
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#18a474]" />
              <span>2-Hour Auto-Purge</span>
            </span>
          </div>

          {/* Interactive Search & Filter Controls */}
          <div className="pt-6 max-w-xl mx-auto space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 18 tools, 28 guides, and legal pages..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#18a474] focus:border-transparent shadow-xs transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
              {(
                [
                  { id: 'all', label: 'All Resources' },
                  { id: 'tools', label: 'PDF Tools (12)' },
                  { id: 'ai', label: 'AI Copilots (6)' },
                  { id: 'guides', label: 'Technical Guides (28)' },
                  { id: 'legal', label: 'Legal & Transparency (5)' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#18a474] text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sitemap Sections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Core Tools and AI Categories */}
        {activeTab !== 'guides' && activeTab !== 'legal' && (
          <>
            {categories
              .filter((category) => {
                if (activeTab === 'tools') return category.name !== 'AI Document Copilot & Intelligence';
                if (activeTab === 'ai') return category.name === 'AI Document Copilot & Intelligence';
                return true;
              })
              .map((category) => {
                const filteredTools = category.tools.filter(
                  (tool) =>
                    !searchQuery ||
                    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (filteredTools.length === 0) return null;

                return (
                  <section key={category.name} className="space-y-4">
                    <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
                        <p className="text-xs text-slate-500 mt-0.5">{category.description}</p>
                      </div>
                      <span className="text-xs font-bold text-[#18a474] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 self-start sm:self-auto">
                        {filteredTools.length} Tools
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTools.map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                          <button
                            key={tool.id}
                            onClick={() => onSelectTool(tool.id)}
                            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all text-left group flex flex-col justify-between cursor-pointer space-y-3"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#18a474] group-hover:bg-[#18a474] group-hover:text-white transition-colors flex items-center justify-center font-bold">
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#18a474] transition-colors">
                                  {tool.badge}
                                </span>
                              </div>
                              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#18a474] transition-colors">
                                {tool.name}
                              </h3>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                {tool.description}
                              </p>
                            </div>

                            <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-[#18a474] pt-2 transition-colors">
                              <span>Launch Tool</span>
                              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
          </>
        )}

        {/* 28 IN-DEPTH TECHNICAL GUIDES & KNOWLEDGE BASE */}
        {(activeTab === 'all' || activeTab === 'guides') && (
          <section className="space-y-6 pt-4 border-t border-slate-200">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    All 28 In-Depth Technical Guides &amp; Architecture Library
                  </h2>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                    31,000+ Words
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Engineering documentation, ISO 32000 specifications, legal discovery compliance, and cryptographic algorithms.
                </p>
              </div>
              <a
                href="/guides/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#18a474] hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Browse Guides Hub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_GUIDES.filter(
                (guide) =>
                  !searchQuery ||
                  guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  guide.category.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((guide) => (
                <div
                  key={guide.url}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#18a474] uppercase tracking-wider">{guide.category}</span>
                      <span className="text-slate-400 font-semibold">{guide.wordCount}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      <a href={guide.url} className="hover:text-[#18a474] transition">
                        {guide.title}
                      </a>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {guide.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={guide.url}
                      className="font-bold text-[#18a474] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>Read Guide</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {guide.toolId && (
                      <button
                        type="button"
                        onClick={() => onSelectTool(guide.toolId as ToolId)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#18a474] rounded-lg text-[11px] font-semibold cursor-pointer transition"
                      >
                        Try Tool &rarr;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Legal, Transparency & Pricing Hub Section */}
        {(activeTab === 'all' || activeTab === 'legal') && (
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Legal, Privacy &amp; Compliance Index</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official terms, AdSense disclosures, GDPR guarantees, and billing security protocols.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => onSelectTool('privacy')}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition text-left cursor-pointer space-y-2 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#18a474] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#18a474]">Privacy Policy</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  2-hour auto-purge guarantee, zero AI training on user documents, and data retention rules.
                </p>
                <span className="inline-block text-[11px] font-bold text-[#18a474] pt-1">
                  View Policy &rarr;
                </span>
              </button>

              <button
                onClick={() => onSelectTool('cookies')}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition text-left cursor-pointer space-y-2 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#18a474]">
                  AdSense &amp; Cookie Policy
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Publisher ID pub-9341732423335241 disclosures, cookie categories, and opt-out links.
                </p>
                <span className="inline-block text-[11px] font-bold text-[#18a474] pt-1">
                  View Disclosures &rarr;
                </span>
              </button>

              <button
                onClick={() => onSelectTool('terms')}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition text-left cursor-pointer space-y-2 group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#18a474]">Terms of Service</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Acceptable use rules, task quota allocations (3 tasks/hour free tier), and user ownership.
                </p>
                <span className="inline-block text-[11px] font-bold text-[#18a474] pt-1">
                  View Terms &rarr;
                </span>
              </button>

              <button
                onClick={() => {
                  if (onOpenPricing) onOpenPricing();
                  else onSelectTool('home');
                }}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition text-left cursor-pointer space-y-2 group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#18a474]">
                  Pricing &amp; Payment Safeguards
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct merchant account verification for Google Pay (7095074745@jio) and PayPal (chinnamteja05@gmail.com).
                </p>
                <span className="inline-block text-[11px] font-bold text-[#18a474] pt-1">
                  View Pricing &rarr;
                </span>
              </button>
            </div>
          </section>
        )}

        {/* Technical Architecture Depth Card */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <HardDrive className="w-4 h-4" />
            <span>Search Crawler &amp; Machine Readable Directory Architecture</span>
          </div>
          <h3 className="text-lg font-bold">Sitemap Standards &amp; XML Schema Compliance</h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Our sitemap strictly conforms to the Sitemaps.org 0.9 schema specification and includes the Google Image sitemap extension (xmlns:image).
            All indexable URLs provide canonical references, automated last modification timestamps, and change frequency hints.
            Both human users and search engine indexing spiders (Googlebot, Bingbot, AdsBot-Google) can traverse direct endpoints without javascript dependency.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#18a474] hover:bg-[#159167] text-white font-bold rounded-xl transition inline-flex items-center gap-1.5"
            >
              <span>Inspect Raw XML</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl transition inline-flex items-center gap-1.5"
            >
              <span>Inspect robots.txt</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
