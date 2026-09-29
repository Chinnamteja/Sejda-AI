/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
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
  Sparkles,
  Compass,
} from 'lucide-react';
import { ToolId } from '../types';
import { TOOLS_DIRECTORY } from '../data/toolsDirectory';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: ToolId) => void;
  onOpenPricing?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  onOpenPricing,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keydown for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search items list
  const allNavItems = [
    ...TOOLS_DIRECTORY.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      category: t.category === 'ai_power' ? 'AI Document Suite' : 'PDF Tools',
      action: () => {
        onSelectTool(t.id);
        onClose();
      },
    })),
    {
      id: 'privacy' as ToolId,
      name: 'Privacy Policy & Data Protection',
      description: '2-hour automatic purge guarantee, ephemeral RAM, zero AI training.',
      category: 'Legal & Compliance',
      action: () => {
        onSelectTool('privacy');
        onClose();
      },
    },
    {
      id: 'cookies' as ToolId,
      name: 'Google AdSense & Cookie Disclosures',
      description: 'Publisher ID pub-9341732423335241 disclosures & cookie preferences.',
      category: 'Legal & Compliance',
      action: () => {
        onSelectTool('cookies');
        onClose();
      },
    },
    {
      id: 'terms' as ToolId,
      name: 'Terms of Service',
      description: 'Usage terms, allowable task limits, and service specifications.',
      category: 'Legal & Compliance',
      action: () => {
        onSelectTool('terms');
        onClose();
      },
    },
    {
      id: 'sitemap' as ToolId,
      name: 'HTML & XML Sitemap Index',
      description: 'Complete directory of all 30+ tools and crawlable resources.',
      category: 'Navigation',
      action: () => {
        onSelectTool('sitemap');
        onClose();
      },
    },
    {
      id: 'guides' as ToolId,
      name: 'PDF Guides & Knowledge Base',
      description: '800+ word technical articles, compression benchmarks, and legal guides.',
      category: 'Guides',
      action: () => {
        onSelectTool('guides');
        onClose();
      },
    },
    {
      id: 'about' as ToolId,
      name: 'About Sejda & Engineering Team',
      description: 'Mission, values, E-E-A-T credentials, and headquarters information.',
      category: 'About',
      action: () => {
        onSelectTool('about');
        onClose();
      },
    },
    {
      id: 'faq' as ToolId,
      name: 'Frequently Asked Questions (FAQ)',
      description: 'Answers on 2-hour auto-purge, e-signatures, Gemini 3.8 AI, and offline desktop apps.',
      category: 'Support',
      action: () => {
        onSelectTool('faq');
        onClose();
      },
    },
    {
      id: 'contact' as ToolId,
      name: 'Contact Support & Helpdesk',
      description: '24-hour support desk, verified email, phone, and physical address.',
      category: 'Support',
      action: () => {
        onSelectTool('contact');
        onClose();
      },
    },
  ];

  const filtered = allNavItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a tool name, action, or policy (e.g. compress, merge, privacy, ai)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="ml-2 text-[10px] font-mono text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 max-h-[60vh]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">No matching tools or pages found</p>
              <p>Try searching for &quot;edit&quot;, &quot;merge&quot;, &quot;split&quot;, &quot;compress&quot;, or &quot;privacy&quot;.</p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id + idx}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer ${
                  selectedIndex === idx
                    ? 'bg-emerald-50/80 text-emerald-900'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>
                </div>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 transition-opacity ${
                    selectedIndex === idx ? 'text-[#18a474] opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&bull;</span>
            <span>&crarr; Select</span>
            <span>&bull;</span>
            <span>ESC Close</span>
          </div>
          <span className="text-emerald-700 font-semibold">Sejda PDF &amp; AI Tools</span>
        </div>
      </div>
    </div>
  );
};
