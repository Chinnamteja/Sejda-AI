/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Zap,
  Sparkles,
  FileText,
  Layers,
  FileCheck,
  CreditCard,
  HardDrive,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Mail,
  Phone,
  RefreshCw,
} from 'lucide-react';
import { ToolId } from '../types';

export interface FAQItem {
  id: string;
  category: 'security' | 'editing' | 'organize' | 'convert' | 'ai' | 'billing';
  question: string;
  shortAnswer: string;
  fullAnswer: string[];
  suggestedTool?: {
    id: ToolId;
    label: string;
  };
}

export const FAQ_DATA: FAQItem[] = [
  // --- Security & Privacy ---
  {
    id: 'safe-private',
    category: 'security',
    question: 'Is Sejda safe and private? What happens to my uploaded files?',
    shortAnswer: 'Your documents remain 100% strictly confidential and your private property.',
    fullAnswer: [
      'Your documents remain 100% strictly confidential and your private property.',
      'Files uploaded for server processing are held exclusively in volatile RAM and permanently erased after exactly 2 hours via an automated cryptographic purge daemon.',
      'When using our browser-first tools (like offline signing, client-side viewing, and desktop app execution), your files never leave your device at all.',
      'We never inspect, mine, share, sell, or use your uploaded documents or annotations to train machine learning models.'
    ],
    suggestedTool: { id: 'privacy', label: 'View Privacy Policy' },
  },
  {
    id: 'purge-guarantee',
    category: 'security',
    question: 'How does the 2-hour automatic purge guarantee work?',
    shortAnswer: 'Every uploaded file receives an automated cryptographic Time-To-Live (TTL) token and is purged after 2 hours.',
    fullAnswer: [
      'Every file processed on our servers is tagged with an automated cryptographic Time-To-Live (TTL) token expiring in 120 minutes.',
      'Upon token expiration, our automated garbage collection daemon executes an irrecoverable deletion across all memory buffers, temporary render caches, and thumbnail caches.',
      'No unencrypted backups or long-term storage copies are created.'
    ],
    suggestedTool: { id: 'privacy', label: 'Security & Purge Protocols' },
  },
  {
    id: 'gdpr-compliance',
    category: 'security',
    question: 'Is Sejda compliant with GDPR, HIPAA, and CCPA regulations?',
    shortAnswer: 'Yes. Sejda operates under strict GDPR-compliant European hosting and zero-retention privacy standards.',
    fullAnswer: [
      'Yes. Sejda operates with complete European General Data Protection Regulation (GDPR) compliance, respecting user data privacy, erasure rights (Right to be Forgotten), and strict data minimization principles.',
      'All server communication is secured using TLS 1.3 with high-grade 256-bit encryption.',
      'Because uploaded files are purged automatically within 2 hours, user documents are not retained in long-term databases, greatly minimizing exposure for HIPAA and CCPA compliance requirements.'
    ],
    suggestedTool: { id: 'terms', label: 'Terms of Service & Compliance' },
  },

  // --- PDF Editing & E-Sign ---
  {
    id: 'edit-text-scanned',
    category: 'editing',
    question: 'Can I edit existing text in a PDF document directly in the browser?',
    shortAnswer: 'Yes, Sejda PDF Editor lets you edit existing text in digital PDFs with automatic font matching.',
    fullAnswer: [
      'Yes! Sejda PDF Editor allows you to directly click and edit existing digital text on any PDF page.',
      'Our editor analyzes the original font family, size, line-height, and weight to match replacements seamlessly.',
      'For scanned physical documents or photographed pages, you can add new text blocks, whiteout corrections, or use our OCR tools to convert images to editable text.'
    ],
    suggestedTool: { id: 'edit', label: 'Open PDF Editor' },
  },
  {
    id: 'legal-signatures',
    category: 'editing',
    question: 'Are digital signatures created with Sejda legally binding?',
    shortAnswer: 'Yes. Signatures generated with Fill & Sign comply with ESIGN, UETA, and eIDAS standards.',
    fullAnswer: [
      'Yes. Digital and electronic signatures created with Sejda Fill & Sign comply with the US Electronic Signatures in Global and National Commerce Act (ESIGN), the Uniform Electronic Transactions Act (UETA), and European eIDAS standards for simple electronic signatures (SES).',
      'You can draw your signature with a mouse or stylus, type your name using legal cursive typography, or upload a photo of your handwritten signature.',
      'The generated PDF includes timestamp metadata suitable for business contracts, NDAs, leases, and procurement orders.'
    ],
    suggestedTool: { id: 'fill_sign', label: 'Use Fill & Sign' },
  },
  {
    id: 'fill-interactive-forms',
    category: 'editing',
    question: 'Can I fill out interactive PDF forms and check radio buttons or checkboxes?',
    shortAnswer: 'Yes, Sejda natively detects interactive AcroForms, text fields, radio buttons, and checkboxes.',
    fullAnswer: [
      'Yes. Sejda natively detects interactive AcroForm fields, checkboxes, dropdown lists, and radio buttons.',
      'You can tab through fields, complete information, add signature blocks, and flatten the form to prevent subsequent tampering when sharing.'
    ],
    suggestedTool: { id: 'fill_sign', label: 'Fill & Sign Forms' },
  },

  // --- Organize, Merge & Split ---
  {
    id: 'merge-multiple-files',
    category: 'organize',
    question: 'How do I merge multiple PDF files into a single document?',
    shortAnswer: 'Upload your PDF files to the Merge tool, drag and drop to reorder, and click Merge PDF.',
    fullAnswer: [
      'Select the Merge tool and upload two or more PDF files from your device.',
      'You can drag and drop file cards or individual page thumbnails to reorder pages precisely as desired.',
      'Sejda preserves existing bookmarks, outlines, and form fields while optimizing file size during merge.'
    ],
    suggestedTool: { id: 'merge', label: 'Try Merge PDF' },
  },
  {
    id: 'split-in-half-range',
    category: 'organize',
    question: 'How does splitting a PDF work? Can I extract specific page ranges?',
    shortAnswer: 'You can split by page ranges, extract single pages, or split multi-page documents evenly in half.',
    fullAnswer: [
      'Our Split tool provides versatile options: Split by page ranges (e.g. 1-4, 5-8), Split into separate single-page documents, or Split in half for 2-up booklet scans.',
      'You can visually select thumbnails to extract or discard unwanted pages with a single click before downloading.'
    ],
    suggestedTool: { id: 'split', label: 'Split PDF Documents' },
  },
  {
    id: 'rotate-delete-reorder',
    category: 'organize',
    question: 'How can I rotate upside-down pages or delete blank pages from a PDF?',
    shortAnswer: 'Use the Organize & Rotate tool to flip individual pages 90° or 180° and delete unwanted pages.',
    fullAnswer: [
      'Our Organize tool displays an interactive visual grid of all document pages.',
      'Hover over any page thumbnail to rotate it clockwise or counterclockwise by 90 degrees, or click the trash icon to permanently remove blank or duplicate pages.',
      'Once organized, download the cleaned PDF with preserved fonts and vector graphics.'
    ],
    suggestedTool: { id: 'rotate', label: 'Rotate & Organize Pages' },
  },

  // --- Compress & Convert ---
  {
    id: 'compress-size-reduction',
    category: 'convert',
    question: 'How much can Sejda compress a PDF file without losing quality?',
    shortAnswer: 'Sejda typically reduces PDF file size by 40% to 85% while maintaining crisp readability.',
    fullAnswer: [
      'Sejda employs intelligent two-pass compression: optimizing raster image DPI (adjusting down to 144 or 72 DPI for web/email delivery), stripping redundant metadata, and removing embedded subset duplicates.',
      'Text vectors and digital signatures remain pin-sharp at any zoom level.',
      'Typical compression achieves 40% to 85% size reduction, making files easy to email under 10 MB or 25 MB limits.'
    ],
    suggestedTool: { id: 'compress', label: 'Compress PDF Now' },
  },
  {
    id: 'convert-jpg-pdf',
    category: 'convert',
    question: 'How do I convert JPG or PNG photos to PDF, and export PDF pages back to JPG images?',
    shortAnswer: 'Sejda provides bidirectional conversion between PDF documents and high-resolution JPG images.',
    fullAnswer: [
      'For image-to-PDF, upload one or multiple JPG or PNG photos. You can choose portrait or landscape orientation, adjust page margins, and combine them into one neat PDF.',
      'For PDF-to-image, every page of your document is rendered into crisp 300 DPI JPG images, packaged into a single ZIP archive or downloaded individually.'
    ],
    suggestedTool: { id: 'jpg_to_pdf', label: 'Convert JPG to PDF' },
  },

  // --- AI Document Intelligence ---
  {
    id: 'ai-document-intelligence',
    category: 'ai',
    question: 'What AI document features are available, and how does Gemini 3.8 assist?',
    shortAnswer: 'Sejda AI Copilot uses Google Gemini 3.8 to chat with documents, summarize key points, audit contracts, and extract tables.',
    fullAnswer: [
      'Sejda AI Copilot integrates state-of-the-art Google Gemini 3.8 models to provide interactive document intelligence right alongside your PDF pages:',
      '1. AI Ask PDF / Chat: Ask questions in natural language and receive answers with clause citations.',
      '2. AI Summarizer: Extract executive summaries, bullet points, and key deadlines in seconds.',
      '3. AI Contract Auditor: Scan commercial agreements for missing indemnities, termination clauses, and liability traps.',
      '4. AI Table Extractor: Identify financial tables, invoices, and bank statements and export clean CSV spreadsheets.',
      '5. AI Translator: Translate contracts and forms across 100+ languages while maintaining structure.'
    ],
    suggestedTool: { id: 'ai_chat', label: 'Open AI Copilot' },
  },
  {
    id: 'ai-privacy-training',
    category: 'ai',
    question: 'Does the AI model train on my confidential contracts or financial records?',
    shortAnswer: 'No. AI analysis operates under enterprise zero-retention policies; your data is never used to train public models.',
    fullAnswer: [
      'No. All AI queries sent to the Gemini 3.8 API operate under enterprise terms of service with zero retention.',
      'Your prompt tokens and document text are processed ephemerally in RAM exclusively to fulfill your immediate request.',
      'Google does not log, store, or use your document contents or query inputs to train foundation AI models.'
    ],
    suggestedTool: { id: 'privacy', label: 'Read AI Privacy Safeguards' },
  },

  // --- Billing, Limits & Desktop App ---
  {
    id: 'free-limits',
    category: 'billing',
    question: 'What are the limits of the free service on Sejda?',
    shortAnswer: 'Free users enjoy up to 3 tasks per hour for files up to 200 pages or 50 MB, with no credit card required.',
    fullAnswer: [
      'Sejda is free for daily personal and business use within generous hourly quotas:',
      '• Up to 3 free tasks per hour',
      '• Documents up to 200 pages',
      '• Files up to 50 MB in size',
      'No credit card or user registration is required to use the free tier. When you need to process large batches or massive files, you can upgrade to Web Week Pass or Web Pro.'
    ],
  },
  {
    id: 'payment-methods',
    category: 'billing',
    question: 'What payment options are supported for Pro upgrades?',
    shortAnswer: 'We accept Google Pay / UPI, PayPal, and all major international credit and debit cards.',
    fullAnswer: [
      'We support direct instant checkout with maximum flexibility:',
      '• Google Pay & UPI: Instant QR / UPI ID verification (registered merchant ID 7095074745@jio).',
      '• PayPal: Global checkout via chinnamteja05@gmail.com.',
      '• Credit & Debit Cards: Visa, MasterCard, American Express, and Discover with bank-grade 3D Secure verification.',
      'All payments are processed securely over TLS 1.3 encrypted connections.'
    ],
  },
  {
    id: 'desktop-offline',
    category: 'billing',
    question: 'Can I use Sejda completely offline without an internet connection?',
    shortAnswer: 'Yes! Sejda Desktop runs 100% locally on macOS, Windows, and Linux computers.',
    fullAnswer: [
      'Yes! Sejda Desktop is a standalone application built for macOS (Apple Silicon & Intel), Windows 10/11, and 64-bit Linux.',
      'When using Sejda Desktop, your documents never touch the internet or external servers—all PDF rendering, merging, splitting, and conversions execute locally on your computer’s CPU and memory.',
      'Desktop licenses include unlimited file sizes and unlimited tasks.'
    ],
  },
  {
    id: 'refund-policy',
    category: 'billing',
    question: 'What is Sejda’s refund and satisfaction policy?',
    shortAnswer: 'We offer a straightforward 14-day refund guarantee if Sejda does not meet your expectations.',
    fullAnswer: [
      'We stand behind our document software. If you experience technical incompatibility or Sejda Pro does not solve your document task, simply contact our support team at mediumwork999@gmail.com or chinnamteja05@gmail.com within 14 days of purchase.',
      'Our billing team processes eligible refunds promptly within 24 to 48 business hours.'
    ],
    suggestedTool: { id: 'contact', label: 'Contact Support' },
  }
];

interface FaqPageProps {
  onBackToHome: () => void;
  onSelectTool: (tool: ToolId) => void;
  onOpenPricing?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  onBackToHome,
  onSelectTool,
  onOpenPricing,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'safe-private': true,
    'edit-text-scanned': true,
    'legal-signatures': true,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Synchronize category or question anchor from URL hash if present
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParam = window.location.hash.replace('#faq-', '').replace('#faq', '').trim();
      if (hashParam && hashParam !== '') {
        const matchingItem = FAQ_DATA.find((item) => item.id === hashParam);
        if (matchingItem) {
          setExpandedIds((prev) => ({ ...prev, [matchingItem.id]: true }));
          setSelectedCategory(matchingItem.category);
          setTimeout(() => {
            const el = document.getElementById(`faq-${matchingItem.id}`);
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 200);
        }
      }
    }
  }, []);

  const toggleAccordion = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    FAQ_DATA.forEach((item) => {
      allExpanded[item.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#faq-${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const questionMatch = item.question.toLowerCase().includes(q);
      const answerMatch = item.fullAnswer.some((line) => line.toLowerCase().includes(q));
      const shortMatch = item.shortAnswer.toLowerCase().includes(q);

      return questionMatch || answerMatch || shortMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Generate Schema.org FAQPage JSON-LD dynamically for this view
  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_DATA.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.fullAnswer.join(' '),
        },
      })),
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQ_DATA.length },
    { id: 'security', label: 'Security & Privacy', count: FAQ_DATA.filter((f) => f.category === 'security').length },
    { id: 'editing', label: 'Editing & E-Sign', count: FAQ_DATA.filter((f) => f.category === 'editing').length },
    { id: 'organize', label: 'Merge & Split', count: FAQ_DATA.filter((f) => f.category === 'organize').length },
    { id: 'convert', label: 'Compress & Convert', count: FAQ_DATA.filter((f) => f.category === 'convert').length },
    { id: 'ai', label: 'AI Document Tools', count: FAQ_DATA.filter((f) => f.category === 'ai').length },
    { id: 'billing', label: 'Pricing & Desktop', count: FAQ_DATA.filter((f) => f.category === 'billing').length },
  ];

  return (
    <div id="faq-page" className="min-h-screen bg-[#fcfdfd] text-slate-800 pb-24">
      {/* Schema.org FAQPage Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#18a474] bg-slate-100 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to PDF Tools</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">Frequently Asked Questions (FAQ)</span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={expandAll}
              className="text-slate-500 hover:text-slate-900 font-medium px-2 py-1 rounded hover:bg-slate-100 transition cursor-pointer"
            >
              Expand all
            </button>
            <span className="text-slate-300">&bull;</span>
            <button
              onClick={collapseAll}
              className="text-slate-500 hover:text-slate-900 font-medium px-2 py-1 rounded hover:bg-slate-100 transition cursor-pointer"
            >
              Collapse all
            </button>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-emerald-50/60 via-slate-50/40 to-transparent border-b border-slate-200/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-[#18a474]" />
            <span>Help Center &bull; Structured Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about privacy guarantees, PDF editing, legal e-signatures, file compression, and Gemini 3.8 AI document analysis.
          </p>

          {/* Quick Search Input */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. privacy, signatures, merge, offline, pricing)..."
                className="w-full pl-11 pr-10 py-3 text-sm bg-white border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-[#18a474] focus:border-transparent outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCategory === cat.id
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results Counter if searching */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Found <strong>{filteredFaqs.length}</strong> matching questions for &ldquo;{searchQuery}&rdquo;
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#18a474] font-semibold hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No questions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any questions matching &ldquo;{searchQuery}&rdquo;. Try using different keywords or browse by category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center space-x-1 text-xs font-bold text-[#18a474] hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isExpanded = Boolean(expandedIds[faq.id]);
              return (
                <article
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className={`bg-white rounded-xl border transition-all duration-200 ${
                    isExpanded
                      ? 'border-emerald-300/80 shadow-xs ring-1 ring-emerald-500/10'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                          {faq.category}
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h2>
                      {!isExpanded && (
                        <p className="text-xs text-slate-500 line-clamp-1 pt-1">
                          {faq.shortAnswer}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 pt-1">
                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(faq.id, e)}
                        title="Copy direct link to this question"
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition"
                      >
                        {copiedId === faq.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                          isExpanded
                            ? 'rotate-180 bg-emerald-50 text-[#18a474]'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                      <div className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
                        {faq.fullAnswer.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>

                      {faq.suggestedTool && (
                        <div className="pt-3 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onSelectTool(faq.suggestedTool!.id)}
                            className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-[#18a474] hover:bg-[#159167] px-3.5 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
                          >
                            <span>{faq.suggestedTool.label}</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                          </button>
                          <span className="text-[11px] text-slate-400">
                            Instant access &bull; Free up to 3 tasks/hr
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* Feature Highlights Grid */}
        <section className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6 mt-12">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Why Users Choose Sejda
            </h3>
            <p className="text-xs text-slate-500">
              High-security document engineering with zero unnecessary complications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#18a474] flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">2-Hour Auto Purge</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Files uploaded to servers are automatically and irreversibly erased after 2 hours. Client-side tools keep files entirely on your machine.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#18a474] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Gemini 3.8 AI Suite</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Extract tables to CSV, summarize contracts, audit liability clauses, and translate across 100+ languages with zero data retention.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#18a474] flex items-center justify-center font-bold">
                <HardDrive className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Offline Desktop App</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Available for macOS, Windows, and Linux. Work completely offline with no file size caps and zero network transmission.
              </p>
            </div>
          </div>
        </section>

        {/* Support & Contact Card */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#18a474]">
              <MessageCircle className="w-4 h-4" />
              <span>Still have questions?</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Our support engineers are ready to assist
            </h3>
            <p className="text-xs text-slate-500 max-w-lg">
              Can&apos;t find what you&apos;re looking for? Reach out to our verified technical support team for document assistance, custom enterprise licensing, or billing inquiries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="mailto:mediumwork999@gmail.com"
              className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <Mail className="w-4 h-4" />
              <span>mediumwork999@gmail.com</span>
            </a>
            <button
              onClick={() => onSelectTool('contact')}
              className="inline-flex items-center space-x-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition cursor-pointer"
            >
              <span>Contact Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
