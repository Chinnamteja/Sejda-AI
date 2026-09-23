/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import {
  Upload,
  FileText,
  FilePlus,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Zap,
  ArrowRight,
  Monitor,
} from 'lucide-react';
import { ToolId, LoadedDocument } from '../types';
import { createSampleDocument } from '../data/sampleDocuments';
import { AdSenseUnit } from './AdSenseUnit';

interface HomeHeroProps {
  onFileUpload: (file: File) => void;
  onLoadSample: (type: 'nda' | 'invoice' | 'proposal' | 'blank') => void;
  onSelectTool: (tool: ToolId) => void;
  onOpenDesktopModal?: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onFileUpload,
  onLoadSample,
  onSelectTool,
  onOpenDesktopModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
      {/* AI Badge Announcement */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-xs animate-in fade-in duration-300">
        <Sparkles className="w-4 h-4 text-[#18a474]" />
        <span>Now supercharged with Gemini 3.8 AI Document Intelligence</span>
        <span className="text-emerald-400">•</span>
        <span className="text-emerald-700 underline cursor-pointer" onClick={() => onSelectTool('ai_chat')}>
          Try AI Tools
        </span>
      </div>

      {/* Main Taglines */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        Sejda helps with your PDF tasks
      </h1>
      <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
        Quick and simple online service, no installation required! Edit, merge, split, compress, fill & sign, and harness cutting-edge AI.
      </p>

      {/* Primary Upload / Action Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-8 max-w-xl mx-auto p-6 sm:p-8 rounded-2xl border-2 transition-all ${
          isDragging
            ? 'border-[#18a474] bg-emerald-50/60 scale-[1.01]'
            : 'border-dashed border-slate-300 bg-white hover:border-[#18a474]/70 shadow-sm'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onFileUpload(e.target.files[0]);
            }
          }}
        />

        {/* Big Emerald CTA Upload Button with Dropdown */}
        <div className="relative inline-flex items-center justify-center">
          <div className="inline-flex rounded-xl shadow-md overflow-hidden">
            <button
              id="hero-upload-pdf-btn"
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-4 bg-[#18a474] hover:bg-[#159167] text-white font-bold text-base sm:text-lg flex items-center space-x-3 transition active:scale-[0.99]"
            >
              <Upload className="w-5 h-5 stroke-[2.5]" />
              <span>Upload PDF files</span>
            </button>

            <button
              id="hero-upload-dropdown-toggle-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3.5 py-4 bg-[#159167] hover:bg-[#12805a] text-white border-l border-emerald-400/40 transition flex items-center justify-center"
              title="More upload options"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Upload Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-30 text-left text-sm">
              <button
                onClick={() => {
                  fileInputRef.current?.click();
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center space-x-2 text-slate-700"
              >
                <Upload className="w-4 h-4 text-[#18a474]" />
                <span>Upload from Computer</span>
              </button>
              <button
                onClick={() => {
                  onLoadSample('blank');
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center space-x-2 text-slate-700 border-t border-slate-100"
              >
                <FilePlus className="w-4 h-4 text-[#18a474]" />
                <span>Start with Blank Document</span>
              </button>
            </div>
          )}
        </div>

        <p className="mt-3 text-xs text-slate-400">or drop files anywhere here</p>

        {/* Start with Blank Document link */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center space-x-2 text-sm">
          <span className="text-slate-500">or</span>
          <button
            id="hero-blank-doc-btn"
            onClick={() => onLoadSample('blank')}
            className="text-[#18a474] font-semibold hover:underline inline-flex items-center space-x-1"
          >
            <FilePlus className="w-4 h-4" />
            <span>start with a blank document</span>
          </button>
        </div>

        {/* Instant Realistic Sample Documents Chips */}
        <div className="mt-5 text-left bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Try with ready-to-test sample PDFs:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              id="sample-nda-btn"
              onClick={() => onLoadSample('nda')}
              className="text-xs bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition font-medium flex items-center space-x-1.5 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#18a474]" />
              <span>Mutual NDA (Legal)</span>
            </button>
            <button
              id="sample-invoice-btn"
              onClick={() => onLoadSample('invoice')}
              className="text-xs bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition font-medium flex items-center space-x-1.5 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Consulting Invoice #8841</span>
            </button>
            <button
              id="sample-proposal-btn"
              onClick={() => onLoadSample('proposal')}
              className="text-xs bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition font-medium flex items-center space-x-1.5 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              <span>Executive Proposal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Pill */}
      <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-[#18a474]" />
        <span>
          Files stay private. Automatically deleted after 2 hours. Free service for documents up to 200 pages or 50 MB and 3 tasks per hour.
        </span>
      </div>

      {/* Responsive AdSense Ad Unit (conditionally rendered, hides/minimizes if no space is available) */}
      <AdSenseUnit
        client="ca-pub-9341732423335241"
        format="auto"
        className="my-5"
        minWidth={280}
      />

      {/* Sejda Desktop Software Callout for All OS */}
      <div className="mt-8 max-w-xl mx-auto p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md flex items-center justify-between text-left">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Sejda Desktop for All OS</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 text-[10px] font-mono">
                Windows • Mac • Linux
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Process files offline without uploading. 100% private local software.
            </p>
          </div>
        </div>
        {onOpenDesktopModal && (
          <button
            id="hero-desktop-learn-more-btn"
            onClick={onOpenDesktopModal}
            className="shrink-0 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
          >
            <span>Get Desktop</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </section>
  );
};
