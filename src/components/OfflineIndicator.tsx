import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, ShieldCheck } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="sejda-offline-indicator"
      className="fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-xl bg-slate-900/95 text-white px-4 py-2.5 shadow-2xl border border-slate-700/80 backdrop-blur-md animate-fade-in"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
        <WifiOff className="h-4 w-4 animate-pulse" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
          Offline Desktop Mode Active
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-300">
            <ShieldCheck className="h-3 w-3 mr-0.5" /> 100% Local
          </span>
        </p>
        <p className="text-[11px] text-slate-400">
          All PDF editing, merging & conversion operate locally on your device.
        </p>
      </div>
    </div>
  );
};
