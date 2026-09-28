/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  FileText,
  ShieldCheck,
  Minimize2,
  Table,
  Lock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { ToolId } from '../types';
import { ALL_GUIDES, GuideArticle } from '../data/guidesData';

interface GuidesHubPageProps {
  onBackToHome: () => void;
  onSelectTool: (tool: ToolId) => void;
}

export const GuidesHubPage: React.FC<GuidesHubPageProps> = ({ onBackToHome, onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Signatures & Forms',
    'Security & Encryption',
    'Editing & Assembly',
    'AI Intelligence & OCR',
    'Optimization & Archival',
  ];

  const filteredArticles = ALL_GUIDES.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div id="guides-hub-page" className="min-h-screen bg-[#fcfdfd] text-slate-800 pb-20">
      {/* Breadcrumb Bar */}
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
            <span className="text-xs font-bold text-slate-900">Knowledge Base &amp; Guides</span>
          </div>

          <a
            href="/guides/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#18a474] bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition"
          >
            <span>Static HTML Guides Index (28 Articles)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-50/50 via-slate-50/40 to-transparent border-b border-slate-200/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#18a474]" />
            <span>28 Technical Guides &bull; Average 1,118 Words/Article &bull; 31,000+ Total Words</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            PDF Knowledge Base &amp; Technical Library
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            In-depth, peer-reviewed engineering specifications, legal compliance frameworks, and tutorials for document compression, digital signatures, AcroForms, and Gemini 3.8 AI intelligence.
          </p>

          {/* Search & Filter Bar */}
          <div className="pt-4 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 28 guides (e.g. compress, OCR, legal, security)..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#18a474] focus:ring-1 focus:ring-[#18a474]"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#18a474] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-semibold">
          <span>Showing {filteredArticles.length} of {ALL_GUIDES.length} comprehensive articles</span>
          <span>100% Free &amp; Open Knowledge Base</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.url}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#18a474] uppercase tracking-wider text-[10px]">
                    {art.category}
                  </span>
                  <span className="text-slate-400 font-semibold text-[11px]">{art.wordCount}</span>
                </div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">
                  {art.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {art.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={art.url}
                  className="font-bold text-[#18a474] hover:underline flex items-center space-x-1"
                >
                  <span>Read Guide</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                <button
                  type="button"
                  onClick={() => onSelectTool(art.toolId as ToolId)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#18a474] font-semibold rounded-lg transition cursor-pointer text-[11px]"
                >
                  Use Tool &rarr;
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
