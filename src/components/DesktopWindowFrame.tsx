import React from 'react';
import { Minus, Square, X, HardDrive, Shield, Sparkles, FolderOpen } from 'lucide-react';
import { DetectedOS } from '../hooks/usePWAInstall';

interface DesktopWindowFrameProps {
  children: React.ReactNode;
  detectedOS: DetectedOS;
  onExitFrame: () => void;
  onOpenLocalFile?: () => void;
}

export const DesktopWindowFrame: React.FC<DesktopWindowFrameProps> = ({
  children,
  detectedOS,
  onExitFrame,
  onOpenLocalFile,
}) => {
  const isMac = detectedOS === 'macOS';

  return (
    <div className="min-h-screen bg-slate-900 p-2 md:p-4 flex flex-col justify-start">
      {/* Native Desktop Window Container */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-slate-700/80 bg-white">
        {/* Title Bar */}
        <div className="h-10 bg-slate-800 text-slate-200 select-none flex items-center justify-between px-3 border-b border-slate-700 text-xs">
          {/* Left Controls */}
          {isMac ? (
            <div className="flex items-center gap-2 w-28">
              <button
                onClick={onExitFrame}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
                title="Exit Desktop Window Frame"
              />
              <button
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-sm"
                title="Minimize"
              />
              <button
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-sm"
                title="Zoom / Fullscreen"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white tracking-wide">Sejda Desktop</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-700 text-[10px] text-emerald-400 font-mono">
                {detectedOS}
              </span>
            </div>
          )}

          {/* Center Title & Local Security Badge */}
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-slate-300 hidden sm:inline">
              Sejda PDF Desktop v7.6.0
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-[10px] font-medium">
              <Shield className="w-3 h-3 text-emerald-400" />
              Offline Local Mode
            </span>
          </div>

          {/* Right Controls */}
          {isMac ? (
            <div className="flex items-center gap-2">
              {onOpenLocalFile && (
                <button
                  onClick={onOpenLocalFile}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] transition-colors"
                  title="Open file directly from local drive"
                >
                  <FolderOpen className="w-3 h-3" />
                  <span>Open Local</span>
                </button>
              )}
              <button
                onClick={onExitFrame}
                className="text-[11px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-slate-700 transition"
              >
                Exit Frame
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              {onOpenLocalFile && (
                <button
                  onClick={onOpenLocalFile}
                  className="mr-2 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] transition-colors"
                  title="Open file from local drive"
                >
                  <FolderOpen className="w-3 h-3" />
                  <span>Open Local</span>
                </button>
              )}
              <button
                className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                title="Minimize"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                title="Maximize"
              >
                <Square className="w-3 h-3" />
              </button>
              <button
                onClick={onExitFrame}
                className="p-1 hover:bg-red-600 rounded text-slate-400 hover:text-white transition-colors"
                title="Exit Frame"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Desktop App Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
