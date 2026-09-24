/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Lock, Sparkles, Heart } from 'lucide-react';
import { ToolId } from '../types';

interface FooterProps {
  onSelectTool: (tool: ToolId) => void;
  onOpenLegal?: (tab: 'privacy' | 'terms' | 'cookies') => void;
  onOpenPricing?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool, onOpenLegal, onOpenPricing }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-sm">
      {/* Security & Privacy Banner */}
      <div className="border-b border-slate-100 bg-[#fbfdfc] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#18a474] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                Files stay 100% private. Automatically deleted after 2 hours.
              </p>
              <p className="text-xs text-slate-500">
                Encrypted in transit with TLS 1.3. Zero data selling or unauthorized model training.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-[#18a474]" />
              <span>End-to-End TLS Security</span>
            </span>
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#18a474]" />
              <span>Gemini 3.8 Intelligence</span>
            </span>
            <span>GDPR & ISO Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Edit & Sign
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTool('edit')}
                  className="hover:text-[#18a474] transition"
                >
                  PDF Editor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('fill_sign')}
                  className="hover:text-[#18a474] transition"
                >
                  Fill & Sign PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('watermark')}
                  className="hover:text-[#18a474] transition"
                >
                  Watermark PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('crop')}
                  className="hover:text-[#18a474] transition"
                >
                  Crop PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('protect')}
                  className="hover:text-[#18a474] transition"
                >
                  Protect & Encrypt
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Merge & Split
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTool('merge')}
                  className="hover:text-[#18a474] transition"
                >
                  Merge PDF Files
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('split')}
                  className="hover:text-[#18a474] transition"
                >
                  Split PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('extract_pages')}
                  className="hover:text-[#18a474] transition"
                >
                  Extract Pages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('delete_pages')}
                  className="hover:text-[#18a474] transition"
                >
                  Delete Pages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('rotate')}
                  className="hover:text-[#18a474] transition"
                >
                  Rotate PDF Pages
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center space-x-1 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Document Suite</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTool('ai_chat')}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI Ask PDF / Chat
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('ai_summary')}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI PDF Summarizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('ai_translate')}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI PDF Translator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('ai_extract')}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI Table & Data Extractor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('ai_audit')}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI Contract Auditor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('ai_rewrite')}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI Re-writer & Polish
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Convert & Compress
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTool('compress')}
                  className="hover:text-[#18a474] transition"
                >
                  Compress PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('jpg_to_pdf')}
                  className="hover:text-[#18a474] transition"
                >
                  JPG to PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('pdf_to_jpg')}
                  className="hover:text-[#18a474] transition"
                >
                  PDF to JPG
                </button>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={onOpenPricing}
                  className="font-semibold text-emerald-700 hover:text-emerald-800 transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Pricing & Pro Plans</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    GPay &bull; PayPal
                  </span>
                </button>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                Sejda helps with your PDF tasks. Free service for documents up to 200 pages or 50 MB and 3 tasks per hour.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#18a474] text-base">sejda</span>
            <span>© 2026 Sejda BV. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <button
              type="button"
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-slate-800 cursor-pointer transition text-left"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-slate-800 cursor-pointer transition text-left"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.('cookies')}
              className="hover:text-slate-800 cursor-pointer transition text-left"
            >
              Cookies & AdSense
            </button>
            <span>•</span>
            <span className="text-slate-400">English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
