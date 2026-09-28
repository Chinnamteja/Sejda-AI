/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
  ArrowLeft
} from 'lucide-react';
import { ToolId } from '../types';

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
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-[#18a474] bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 shadow-2xs transition"
            >
              <Code2 className="w-3.5 h-3.5 text-slate-500" />
              <span>View Raw sitemap.xml</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-50/50 via-slate-50/40 to-transparent border-b border-slate-200/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#18a474]" />
            <span>Complete Crawl Coverage & Site Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sejda PDF & AI Tools Sitemap
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Direct index to all 30+ browser-based and desktop PDF manipulation utilities, AI document copilots,
            legal policies, and transparency disclosures.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-slate-600">
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#18a474]" />
              <span>25+ Active Tools</span>
            </span>
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#18a474]" />
              <span>100% Crawlable URLs</span>
            </span>
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#18a474]" />
              <span>Auto 2-Hour Purge Guarantee</span>
            </span>
          </div>
        </div>
      </section>

      {/* Sitemap Sections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {categories.map((category) => (
          <section key={category.name} className="space-y-4">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{category.description}</p>
              </div>
              <span className="text-xs font-bold text-[#18a474] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 self-start sm:self-auto">
                {category.tools.length} Tools
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool) => {
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
        ))}

        {/* Legal, Transparency & Pricing Hub Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Legal, Privacy & Compliance Index</h2>
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
                AdSense & Cookie Policy
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
                Pricing & Payment Safeguards
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
      </div>
    </div>
  );
};
