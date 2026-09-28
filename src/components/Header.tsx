/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Sparkles,
  PenTool,
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
  ShieldAlert,
  Feather,
  Lock,
  ArrowLeft,
  Search,
  Menu,
  X,
} from 'lucide-react';
import { ToolId } from '../types';
import { TOOLS_DIRECTORY } from '../data/toolsDirectory';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentTool: ToolId;
  onSelectTool: (tool: ToolId) => void;
  documentLoaded: boolean;
  documentName?: string;
  onOpenPricingModal: () => void;
  onShowDesktopInfo?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTool,
  onSelectTool,
  documentLoaded,
  documentName,
  onOpenPricingModal,
  onShowDesktopInfo,
  onOpenSearch,
}) => {
  const [allToolsOpen, setAllToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAllToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTools = TOOLS_DIRECTORY.filter(
    (t) =>
      t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo & All Tools dropdown */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a
              id="header-logo-btn"
              href="/"
              rel="home"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('home');
                }
              }}
              className="logo site-logo flex items-center space-x-2.5 text-left group focus:outline-hidden cursor-pointer"
              title="Sejda: Free Online PDF Editor &amp; Tools"
              aria-label="Sejda Homepage"
            >
              {/* Sejda Icon */}
              <div className="w-8 h-8 rounded-lg bg-[#18a474] flex items-center justify-center shadow-xs text-white group-hover:bg-[#159167] transition-all">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <div className="flex items-baseline">
                <span className="site-title text-2xl font-extrabold tracking-tight text-[#18a474]">
                  sejda
                </span>
                <span className="logo-badge ml-1.5 px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-[#18a474] rounded-md border border-emerald-200/80">
                  AI
                </span>
              </div>
            </a>

            {/* "All Tools" Mega Menu Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="header-all-tools-dropdown-btn"
                onClick={() => setAllToolsOpen(!allToolsOpen)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  allToolsOpen
                    ? 'bg-slate-100 text-[#18a474]'
                    : 'text-slate-700 hover:bg-slate-100/70 hover:text-slate-900'
                }`}
              >
                <span>All Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    allToolsOpen ? 'rotate-180 text-[#18a474]' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              {allToolsOpen && (
                <div className="absolute left-0 mt-2 w-[760px] max-w-[95vw] bg-white rounded-xl shadow-2xl border border-slate-200 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Search bar inside menu */}
                  <div className="relative mb-4">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      id="tools-search-input"
                      type="text"
                      placeholder="Search across all 30+ PDF & AI tools..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#18a474] focus:bg-white transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[480px] overflow-y-auto pr-1">
                    {/* Column 1: AI Power Tools */}
                    <div>
                      <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2.5 pb-1 border-b border-emerald-100">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Document Intelligence</span>
                      </div>
                      <div className="space-y-1">
                        {filteredTools
                          .filter((t) => t.category === 'ai_power')
                          .map((tool) => (
                            <button
                              key={tool.id}
                              onClick={() => {
                                onSelectTool(tool.id);
                                setAllToolsOpen(false);
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-50/70 flex items-center justify-between group transition-colors"
                            >
                              <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-800">
                                {tool.name}
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-semibold">
                                AI
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Column 2: Edit & Sign */}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 pb-1 border-b border-slate-100">
                        Edit & Sign
                      </div>
                      <div className="space-y-1">
                        {filteredTools
                          .filter((t) => t.category === 'edit_sign')
                          .map((tool) => (
                            <button
                              key={tool.id}
                              onClick={() => {
                                onSelectTool(tool.id);
                                setAllToolsOpen(false);
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-between group transition-colors"
                            >
                              <span className="text-sm font-medium text-slate-700 group-hover:text-[#18a474]">
                                {tool.name}
                              </span>
                            </button>
                          ))}

                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-4 mb-2.5 pb-1 border-b border-slate-100">
                          Merge & Split
                        </div>
                        {filteredTools
                          .filter((t) => t.category === 'merge_split')
                          .map((tool) => (
                            <button
                              key={tool.id}
                              onClick={() => {
                                onSelectTool(tool.id);
                                setAllToolsOpen(false);
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-between group transition-colors"
                            >
                              <span className="text-sm font-medium text-slate-700 group-hover:text-[#18a474]">
                                {tool.name}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Column 3: Convert & Organize */}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 pb-1 border-b border-slate-100">
                        Convert & Organize
                      </div>
                      <div className="space-y-1">
                        {filteredTools
                          .filter((t) => t.category === 'convert' || t.category === 'organize' || t.category === 'popular')
                          .map((tool) => (
                            <button
                              key={tool.id}
                              onClick={() => {
                                onSelectTool(tool.id);
                                setAllToolsOpen(false);
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-between group transition-colors"
                            >
                              <span className="text-sm font-medium text-slate-700 group-hover:text-[#18a474]">
                                {tool.name}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href="/guides/"
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey) {
                            e.preventDefault();
                            onSelectTool('guides');
                            setAllToolsOpen(false);
                          }
                        }}
                        className="text-slate-600 hover:text-[#18a474] font-medium transition cursor-pointer hover:underline"
                      >
                        PDF Guides
                      </a>
                      <span>&bull;</span>
                      <a
                        href="/about.html"
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey) {
                            e.preventDefault();
                            onSelectTool('about');
                            setAllToolsOpen(false);
                          }
                        }}
                        className="text-slate-600 hover:text-[#18a474] font-medium transition cursor-pointer hover:underline"
                      >
                        About Us
                      </a>
                      <span>&bull;</span>
                      <a
                        href="/contact.html"
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey) {
                            e.preventDefault();
                            onSelectTool('contact');
                            setAllToolsOpen(false);
                          }
                        }}
                        className="text-slate-600 hover:text-[#18a474] font-medium transition cursor-pointer hover:underline"
                      >
                        Contact
                      </a>
                      <span>&bull;</span>
                      <a
                        id="header-dropdown-privacy-btn"
                        href="/privacy.html"
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey) {
                            e.preventDefault();
                            onSelectTool('privacy');
                            setAllToolsOpen(false);
                          }
                        }}
                        className="text-slate-600 hover:text-[#18a474] font-medium transition cursor-pointer hover:underline"
                      >
                        Privacy Policy
                      </a>
                      <span>&bull;</span>
                      <a
                        id="header-dropdown-sitemap-btn"
                        href="/sitemap.html"
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey) {
                            e.preventDefault();
                            onSelectTool('sitemap');
                            setAllToolsOpen(false);
                          }
                        }}
                        className="text-slate-600 hover:text-[#18a474] font-medium transition cursor-pointer hover:underline"
                      >
                        Sitemap Index
                      </a>
                    </div>
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectTool('home');
                        setAllToolsOpen(false);
                      }}
                      className="text-[#18a474] font-semibold hover:underline cursor-pointer"
                    >
                      View Home Overview →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Main Navigation Menu (Visible on Desktop/Tablet with real <a> tags for SEO) */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1">
              <a
                id="nav-edit-btn"
                href="/#edit"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTool('edit');
                }}
                className={`px-2.5 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'edit'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Edit
              </a>
              <a
                id="nav-fill-sign-btn"
                href="/#fill_sign"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTool('fill_sign');
                }}
                className={`px-2.5 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'fill_sign'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Fill & Sign
              </a>
              <a
                id="nav-merge-btn"
                href="/#merge"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTool('merge');
                }}
                className={`px-2.5 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'merge'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Merge
              </a>
              <a
                id="nav-split-btn"
                href="/#split"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTool('split');
                }}
                className={`px-2.5 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'split'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Split
              </a>
              <a
                id="nav-compress-btn"
                href="/#compress"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTool('compress');
                }}
                className={`px-2.5 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'compress'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Compress
              </a>
              <a
                id="nav-ai-suite-btn"
                href="/#ai_chat"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTool('ai_chat');
                }}
                className={`px-2.5 py-1.5 text-sm font-semibold rounded-lg flex items-center space-x-1 transition-colors cursor-pointer ${
                  currentTool.startsWith('ai_')
                    ? 'text-emerald-800 bg-emerald-100/70'
                    : 'text-emerald-700 hover:bg-emerald-50/80'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI Tools</span>
              </a>
              <a
                id="nav-guides-btn"
                href="/guides/"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onSelectTool('guides');
                  }
                }}
                className={`px-2.5 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'guides'
                    ? 'text-[#18a474] bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Guides
              </a>
              <a
                id="nav-about-btn"
                href="/about.html"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onSelectTool('about');
                  }
                }}
                className={`px-2.5 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'about'
                    ? 'text-[#18a474] bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                About
              </a>
              <a
                id="nav-contact-btn"
                href="/contact.html"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onSelectTool('contact');
                  }
                }}
                className={`px-2.5 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'contact'
                    ? 'text-[#18a474] bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Right Header Options: Search / Pricing / Desktop App / Free Account / Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {onOpenSearch && (
              <button
                id="header-search-palette-btn"
                onClick={onOpenSearch}
                className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg border border-slate-200/80 text-xs transition cursor-pointer"
                title="Search all tools and guides (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">Quick Search</span>
                <kbd className="text-[10px] font-mono bg-white text-slate-400 px-1 py-0.2 rounded border border-slate-200 shadow-2xs">
                  ⌘K
                </kbd>
              </button>
            )}

            <button
              id="header-pricing-btn"
              onClick={onOpenPricingModal}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100/70 transition cursor-pointer"
            >
              Pricing
            </button>

            <PWAInstallButton onOpenDesktopModal={onShowDesktopInfo} />

            <button
              id="header-account-btn"
              onClick={onOpenPricingModal}
              className="hidden sm:inline-flex text-xs font-bold px-3 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-lg border border-slate-200/60 transition cursor-pointer whitespace-nowrap shadow-2xs"
            >
              Free Account (3 tasks/hr)
            </button>

            {/* Mobile Menu Button (Accessible on Mobile & Tablet) */}
            <button
              id="header-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Small Screen Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden border-t border-slate-200 bg-white/98 shadow-md">
          <nav aria-label="Mobile Navigation" className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
            <a
              href="/#edit"
              onClick={(e) => {
                e.preventDefault();
                onSelectTool('edit');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-slate-700"
            >
              <span>PDF Editor</span>
            </a>
            <a
              href="/#fill_sign"
              onClick={(e) => {
                e.preventDefault();
                onSelectTool('fill_sign');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-slate-700"
            >
              <span>Fill & Sign</span>
            </a>
            <a
              href="/#merge"
              onClick={(e) => {
                e.preventDefault();
                onSelectTool('merge');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-slate-700"
            >
              <span>Merge PDF</span>
            </a>
            <a
              href="/#split"
              onClick={(e) => {
                e.preventDefault();
                onSelectTool('split');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-slate-700"
            >
              <span>Split PDF</span>
            </a>
            <a
              href="/#compress"
              onClick={(e) => {
                e.preventDefault();
                onSelectTool('compress');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-slate-700"
            >
              <span>Compress PDF</span>
            </a>
            <a
              href="/#ai_chat"
              onClick={(e) => {
                e.preventDefault();
                onSelectTool('ai_chat');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 flex items-center space-x-2 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Document Suite</span>
            </a>
            <a
              href="/guides/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('guides');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-slate-700"
            >
              <span>PDF Guides (25+)</span>
            </a>
            <a
              href="/about.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('about');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-slate-700"
            >
              <span>About Us</span>
            </a>
            <a
              href="/contact.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('contact');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-slate-700"
            >
              <span>Contact Us</span>
            </a>
            <a
              href="/privacy.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('privacy');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-[#18a474] font-bold"
            >
              <span>Privacy Policy</span>
            </a>
            <a
              href="/sitemap.html"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectTool('sitemap');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-[#18a474] flex items-center space-x-2 text-slate-700"
            >
              <span>HTML Sitemap</span>
            </a>
            <button
              type="button"
              onClick={() => {
                onOpenPricingModal();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-emerald-600 text-white font-bold text-center"
            >
              <span>Upgrade to Pro</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
