/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Lock, Sparkles, Heart, Clock } from 'lucide-react';
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
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-[#18a474]" />
              <span>End-to-End TLS Security</span>
            </span>
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#18a474]" />
              <span>Gemini 3.8 Intelligence</span>
            </span>
            <a
              href="/privacy.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onOpenLegal?.('privacy');
                }
              }}
              className="text-[#18a474] font-bold hover:underline cursor-pointer flex items-center space-x-1"
            >
              <span>View Privacy Policy</span>
              <span>&rarr;</span>
            </a>
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
                <a
                  href="/#edit"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('edit');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  PDF Editor
                </a>
              </li>
              <li>
                <a
                  href="/#fill_sign"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('fill_sign');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Fill & Sign PDF
                </a>
              </li>
              <li>
                <a
                  href="/#watermark"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('watermark');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Watermark PDF
                </a>
              </li>
              <li>
                <a
                  href="/#crop"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('crop');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Crop PDF
                </a>
              </li>
              <li>
                <a
                  href="/#protect"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('protect');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Protect & Encrypt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Merge & Split
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/#merge"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('merge');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Merge PDF Files
                </a>
              </li>
              <li>
                <a
                  href="/#split"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('split');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Split PDF
                </a>
              </li>
              <li>
                <a
                  href="/#extract_pages"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('extract_pages');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Extract Pages
                </a>
              </li>
              <li>
                <a
                  href="/#delete_pages"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('delete_pages');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Delete Pages
                </a>
              </li>
              <li>
                <a
                  href="/#rotate"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('rotate');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Rotate PDF Pages
                </a>
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
                <a
                  href="/#ai_chat"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('ai_chat');
                  }}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI Ask PDF / Chat
                </a>
              </li>
              <li>
                <a
                  href="/#ai_summary"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('ai_summary');
                  }}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI PDF Summarizer
                </a>
              </li>
              <li>
                <a
                  href="/#ai_translate"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('ai_translate');
                  }}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI PDF Translator
                </a>
              </li>
              <li>
                <a
                  href="/#ai_extract"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('ai_extract');
                  }}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI Table & Data Extractor
                </a>
              </li>
              <li>
                <a
                  href="/#ai_audit"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('ai_audit');
                  }}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI Contract Auditor
                </a>
              </li>
              <li>
                <a
                  href="/#ai_rewrite"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('ai_rewrite');
                  }}
                  className="hover:text-[#18a474] text-emerald-800 font-medium transition"
                >
                  AI Re-writer & Polish
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Convert & Compress
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/#compress"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('compress');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  Compress PDF
                </a>
              </li>
              <li>
                <a
                  href="/#jpg_to_pdf"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('jpg_to_pdf');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  JPG to PDF
                </a>
              </li>
              <li>
                <a
                  href="/#pdf_to_jpg"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool('pdf_to_jpg');
                  }}
                  className="hover:text-[#18a474] transition"
                >
                  PDF to JPG
                </a>
              </li>
              <li>
                <a
                  href="/faq.html"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      onSelectTool('faq');
                    }
                  }}
                  className="hover:text-[#18a474] font-medium transition"
                >
                  FAQ &amp; Help Center
                </a>
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
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#18a474] text-base">sejda</span>
              <span>© 2026 Sejda BV. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/70 text-[11px] text-slate-600">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#18a474]" />
                <span>Last modified: <time dateTime="2026-09-28" className="font-medium text-slate-700">Sep 28, 2026</time></span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                Published: <time dateTime="2026-01-15">Jan 2026</time>
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-emerald-700 ml-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Fresh</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-4 gap-y-1">
            <a
              href="/about.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('about');
                }
              }}
              className="hover:text-slate-800 cursor-pointer transition text-left"
            >
              About Us
            </a>
            <span>•</span>
            <a
              href="/contact.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('contact');
                }
              }}
              className="hover:text-slate-800 cursor-pointer transition text-left"
            >
              Contact Us
            </a>
            <span>•</span>
            <a
              href="/faq.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('faq');
                }
              }}
              className="text-[#18a474] font-semibold hover:underline cursor-pointer transition text-left"
            >
              FAQ
            </a>
            <span>•</span>
            <a
              href="/guides/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('guides');
                }
              }}
              className="hover:text-slate-800 cursor-pointer transition text-left"
            >
              PDF Guides
            </a>
            <span>•</span>
            <a
              href="/sitemap.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('sitemap');
                }
              }}
              className="text-[#18a474] font-semibold hover:underline cursor-pointer transition text-left"
            >
              HTML Sitemap
            </a>
            <span>•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-800 transition text-left"
            >
              sitemap.xml
            </a>
            <span>•</span>
            <a
              href="/terms.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onOpenLegal?.('terms');
                }
              }}
              className="hover:text-slate-800 cursor-pointer transition text-left"
            >
              Terms of Service
            </a>
            <span>•</span>
            <a
              href="/privacy.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onOpenLegal?.('privacy');
                }
              }}
              className="hover:text-slate-800 cursor-pointer transition text-left font-semibold text-[#18a474]"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="/cookies.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onOpenLegal?.('cookies');
                }
              }}
              className="hover:text-slate-800 cursor-pointer transition text-left"
            >
              Cookies & AdSense
            </a>
            <span>•</span>
            <span className="text-slate-400">English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
