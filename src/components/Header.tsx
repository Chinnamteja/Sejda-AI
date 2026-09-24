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
}

export const Header: React.FC<HeaderProps> = ({
  currentTool,
  onSelectTool,
  documentLoaded,
  documentName,
  onOpenPricingModal,
  onShowDesktopInfo,
}) => {
  const [allToolsOpen, setAllToolsOpen] = useState(false);
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
            <button
              id="header-logo-btn"
              onClick={() => onSelectTool('home')}
              className="flex items-center space-x-2.5 text-left group focus:outline-hidden cursor-pointer"
              title="Sejda Home"
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
                <span className="text-2xl font-extrabold tracking-tight text-[#18a474]">
                  sejda
                </span>
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-[#18a474] rounded-md border border-emerald-200/80">
                  AI
                </span>
              </div>
            </button>

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

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Quick and simple online service, no installation required!</span>
                    <button
                      onClick={() => {
                        onSelectTool('home');
                        setAllToolsOpen(false);
                      }}
                      className="text-[#18a474] font-semibold hover:underline"
                    >
                      View Home Overview →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Header Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                id="nav-edit-btn"
                onClick={() => onSelectTool('edit')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'edit'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Edit
              </button>
              <button
                id="nav-fill-sign-btn"
                onClick={() => onSelectTool('fill_sign')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'fill_sign'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Fill & Sign
              </button>
              <button
                id="nav-merge-btn"
                onClick={() => onSelectTool('merge')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'merge'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Merge
              </button>
              <button
                id="nav-split-btn"
                onClick={() => onSelectTool('split')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'split'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Split
              </button>
              <button
                id="nav-compress-btn"
                onClick={() => onSelectTool('compress')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTool === 'compress'
                    ? 'text-[#18a474] bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Compress
              </button>
              <button
                id="nav-ai-suite-btn"
                onClick={() => onSelectTool('ai_chat')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  currentTool.startsWith('ai_')
                    ? 'text-emerald-800 bg-emerald-100/70'
                    : 'text-emerald-700 hover:bg-emerald-50/80'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI Tools</span>
              </button>
            </nav>
          </div>

          {/* Right Header Options: Pricing / Desktop App / Free Account - Exactly the same on all pages */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
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
              className="text-xs font-bold px-3 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-lg border border-slate-200/60 transition cursor-pointer whitespace-nowrap shadow-2xs"
            >
              Free Account (3 tasks/hr)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
