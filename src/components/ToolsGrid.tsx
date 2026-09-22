/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
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
  Trash2,
  FolderOutput,
  FileImage,
  Crop,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ToolId, ToolCategory, ToolItem } from '../types';
import { TOOLS_DIRECTORY } from '../data/toolsDirectory';

interface ToolsGridProps {
  onSelectTool: (tool: ToolId) => void;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({ onSelectTool }) => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('popular');

  const categories: { id: ToolCategory | 'all'; label: string; icon?: React.ReactNode; isAi?: boolean }[] = [
    { id: 'popular', label: 'Popular Tools' },
    { id: 'ai_power', label: 'AI Power Tools', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-600" />, isAi: true },
    { id: 'edit_sign', label: 'Edit & Sign' },
    { id: 'merge_split', label: 'Merge & Split' },
    { id: 'convert', label: 'Convert' },
    { id: 'organize', label: 'Organize & Secure' },
    { id: 'all', label: 'All 30+ Tools' },
  ];

  const filteredTools = TOOLS_DIRECTORY.filter((t) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'popular') return t.popular;
    return t.category === activeCategory;
  });

  const getToolIcon = (name: string, isAi?: boolean) => {
    const props = { className: `w-6 h-6 ${isAi ? 'text-emerald-600' : 'text-[#18a474]'}` };
    switch (name) {
      case 'PenTool':
        return <PenTool {...props} />;
      case 'FileSignature':
        return <FileSignature {...props} />;
      case 'Files':
        return <Files {...props} />;
      case 'Scissors':
        return <Scissors {...props} />;
      case 'Minimize2':
        return <Minimize2 {...props} />;
      case 'Image':
        return <Image {...props} />;
      case 'RotateCw':
        return <RotateCw {...props} />;
      case 'Stamp':
        return <Stamp {...props} />;
      case 'Bot':
        return <Bot {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Languages':
        return <Languages {...props} />;
      case 'Table':
        return <Table {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'Feather':
        return <Feather {...props} />;
      case 'Lock':
        return <Lock {...props} />;
      case 'Trash2':
        return <Trash2 {...props} />;
      case 'FolderOutput':
        return <FolderOutput {...props} />;
      case 'FileImage':
        return <FileImage {...props} />;
      case 'Crop':
        return <Crop {...props} />;
      default:
        return <PenTool {...props} />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      {/* Category Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 pb-6 border-b border-slate-200">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isActive
                  ? cat.isAi
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 text-white shadow-sm'
                  : cat.isAi
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {filteredTools.map((tool) => {
          const isAi = tool.category === 'ai_power';
          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className={`text-left p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:shadow-lg ${
                isAi
                  ? 'bg-linear-to-b from-white to-emerald-50/30 border-emerald-200/80 hover:border-[#18a474]'
                  : 'bg-white border-slate-200 hover:border-[#18a474]/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isAi
                        ? 'bg-emerald-100 group-hover:bg-emerald-200/80'
                        : 'bg-emerald-50 group-hover:bg-emerald-100'
                    }`}
                  >
                    {getToolIcon(tool.iconName, isAi)}
                  </div>
                  {tool.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#18a474] transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-[#18a474] group-hover:translate-x-1 transition-transform">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
