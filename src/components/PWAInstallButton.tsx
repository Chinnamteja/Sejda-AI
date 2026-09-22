import React, { useState } from 'react';
import { Download, Monitor, CheckCircle, Apple, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenDesktopModal?: () => void;
  className?: string;
  variant?: 'header' | 'hero' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenDesktopModal,
  className = '',
  variant = 'header',
}) => {
  const { isInstallable, isInstalled, isIOS, detectedOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  // If already running in standalone desktop mode, show desktop status badge
  if (isInstalled) {
    if (variant === 'header') {
      return (
        <div
          id="badge-desktop-installed"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium"
          title="Sejda Desktop is active and running natively on your system"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop App</span>
        </div>
      );
    }
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstalledSuccess(true);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else if (onOpenDesktopModal) {
      onOpenDesktopModal();
    } else {
      alert(
        `Install Sejda Desktop for ${detectedOS}:\n\nUse your browser's Install icon in the address bar (Chrome, Edge, Brave, or Safari) to add Sejda Desktop directly to your computer.`
      );
    }
  };

  return (
    <>
      <button
        id="btn-install-sejda-desktop"
        onClick={handleInstallClick}
        className={
          className ||
          (variant === 'hero'
            ? 'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95'
            : 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs font-semibold transition-all')
        }
        title={`Download & install Sejda Desktop for ${detectedOS}`}
      >
        <Monitor className="w-3.5 h-3.5 text-emerald-600" />
        <span>Desktop Software</span>
        <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-emerald-200/70 text-[10px] text-emerald-900 font-bold uppercase tracking-wider">
          {detectedOS === 'Unknown' ? 'All OS' : detectedOS}
        </span>
      </button>

      {/* iOS Safari Guided Install Sheet */}
      {showIOSGuide && (
        <div
          id="ios-install-guide-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            id="ios-install-guide-modal"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Apple className="w-5 h-5" />
                <span>Install on Apple iOS</span>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              To install Sejda as a standalone app on your iPhone or iPad:
            </p>
            <ol className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Tap the <strong>Share</strong> icon (box with upward arrow) in the Safari toolbar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Scroll down and tap <strong>Add to Home Screen</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Tap <strong>Add</strong> in the top right to complete installation.</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
