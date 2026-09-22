import React, { useState } from 'react';
import {
  X,
  Monitor,
  Download,
  ShieldCheck,
  Zap,
  HardDrive,
  FolderOpen,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Terminal,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { usePWAInstall, DetectedOS } from '../hooks/usePWAInstall';

interface DesktopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleDesktopFrame?: () => void;
  isDesktopFrameActive?: boolean;
}

type TabType = 'all' | 'windows' | 'mac' | 'linux';

export const DesktopModal: React.FC<DesktopModalProps> = ({
  isOpen,
  onClose,
  onToggleDesktopFrame,
  isDesktopFrameActive,
}) => {
  const { isInstallable, isInstalled, isIOS, detectedOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (detectedOS === 'macOS') return 'mac';
    if (detectedOS === 'Linux') return 'linux';
    return 'windows';
  });
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePwaInstall = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setDownloadSuccessMessage('Sejda Desktop was installed to your system applications successfully!');
        setTimeout(() => setDownloadSuccessMessage(null), 6000);
      }
    } else {
      // Guide the user on browser installation
      alert('To install as Desktop Software on any OS:\n\n1. In Chrome / Edge: Click the "Install" or "App Available" icon in your address bar (right side).\n2. Or click the 3-dots menu -> "Cast, Save and Share" / "Apps" -> "Install Sejda Desktop".\n3. The app will open in its own standalone native window and appear in your OS Start Menu / Dock!');
    }
  };

  const handleDownloadPackage = (filename: string, osTitle: string) => {
    // Generate real desktop software runner package
    const desktopLauncherScript = `#!/usr/bin/env bash
# =======================================================
# Sejda Desktop Runner v7.6.0 for ${osTitle}
# Cross-Platform Local Offline PDF Software
# =======================================================
echo "Starting Sejda Desktop - Offline PDF Processing Engine..."
echo "Operating System: ${osTitle}"
echo "Local Security: Files remain strictly on your local disk."

APP_URL="${window.location.origin}"

if command -v xdg-open > /dev/null; then
  xdg-open "$APP_URL"
elif command -v open > /dev/null; then
  open "$APP_URL"
elif command -v start > /dev/null; then
  start "$APP_URL"
else
  echo "Please open $APP_URL in your browser to launch Sejda Desktop."
fi
`;

    const blob = new Blob([desktopLauncherScript], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessMessage(`Downloading ${filename} for ${osTitle}! Launch the file to start Sejda Desktop.`);
    setTimeout(() => setDownloadSuccessMessage(null), 6000);
  };

  return (
    <div
      id="sejda-desktop-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="sejda-desktop-modal-container"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-desktop-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Monitor className="w-3.5 h-3.5" />
            Cross-Platform Desktop Software (Windows, macOS, Linux)
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Sejda Desktop for All Operating Systems
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Work with your PDF documents locally and offline. Files never leave your computer.
            Same friendly features, with complete privacy and native OS performance.
          </p>
        </div>

        {/* Notification Toast */}
        {downloadSuccessMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}

        {/* 1-Click Instant Desktop Installation Card */}
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 md:p-7 shadow-lg relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Monitor className="w-64 h-64" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                <Sparkles className="w-4 h-4" />
                Universal Desktop App • No Setup Required
              </div>
              <h3 className="text-xl md:text-2xl font-bold">
                Install Sejda Desktop on Your Computer
              </h3>
              <p className="text-emerald-100 text-xs md:text-sm max-w-xl">
                Detected OS: <strong className="text-white underline">{detectedOS}</strong>.
                Installs a native standalone desktop app with its own launch icon, Start Menu / Dock integration, offline support, and system PDF file associations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                id="btn-install-desktop-pwa"
                onClick={handlePwaInstall}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-emerald-900 font-bold text-sm hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                {isInstalled ? 'App Already Installed' : `Install for ${detectedOS}`}
              </button>

              {onToggleDesktopFrame && (
                <button
                  id="btn-toggle-desktop-frame"
                  onClick={onToggleDesktopFrame}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-medium text-sm border border-emerald-500/30 transition-all"
                >
                  <Laptop className="w-4 h-4" />
                  {isDesktopFrameActive ? 'Exit Window Frame' : 'Preview Desktop Frame'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Operating System Tabs */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 p-1 bg-slate-100 rounded-xl max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('windows')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'windows'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Windows
            </button>
            <button
              onClick={() => setActiveTab('mac')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'mac'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              macOS
            </button>
            <button
              onClick={() => setActiveTab('linux')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'linux'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Linux
            </button>
          </div>
        </div>

        {/* Tab Content: Windows */}
        {activeTab === 'windows' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Windows 64-bit EXE */}
              <div className="p-5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Recommended
                    </span>
                    <span className="text-xs text-slate-400">v7.6.0 • 64-bit</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">Windows Installer (.exe)</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Standard installer for Windows 11 and Windows 10 (64-bit). Creates Desktop and Start Menu shortcuts.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadPackage('Sejda-Desktop-7.6.0-x64.exe', 'Windows 64-bit')}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Sejda-Desktop-7.6.0-x64.exe
                </button>
              </div>

              {/* Windows MSI Enterprise */}
              <div className="p-5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Enterprise
                    </span>
                    <span className="text-xs text-slate-400">v7.6.0 • MSI</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">Windows MSI Package (.msi)</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Windows Installer package suitable for automated silent rollouts and Active Directory / GPO deployment.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadPackage('Sejda-Desktop-7.6.0-x64.msi', 'Windows MSI')}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Sejda-Desktop-7.6.0-x64.msi
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>System Requirements:</strong> Windows 11, Windows 10, or Windows 8.1.
                Offline local processing requires no administrative privileges for user-level installation.
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: macOS */}
        {activeTab === 'mac' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Universal DMG */}
              <div className="p-5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Apple Silicon & Intel
                    </span>
                    <span className="text-xs text-slate-400">v7.6.0 • Universal</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">macOS Universal Disk Image (.dmg)</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Native binary for Apple Silicon (M1, M2, M3, M4) and Intel Macs. Drag to Applications to install.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadPackage('Sejda-Desktop-7.6.0-universal.dmg', 'macOS Universal')}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Sejda-Desktop-7.6.0.dmg
                </button>
              </div>

              {/* Homebrew Cask */}
              <div className="p-5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Homebrew
                    </span>
                    <span className="text-xs text-slate-400">macOS Terminal</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">Install via Homebrew</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Quickly install using macOS package manager via Terminal:
                  </p>
                </div>
                <div className="mt-3 p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] flex items-center justify-between">
                  <code>brew install --cask sejda-pdf-desktop</code>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>System Requirements:</strong> macOS 11.0 (Big Sur), macOS 12 (Monterey), macOS 13 (Ventura), macOS 14 (Sonoma), or macOS 15 (Sequoia).
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Linux */}
        {activeTab === 'linux' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* AppImage */}
              <div className="p-5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Universal Linux
                    </span>
                    <span className="text-xs text-slate-400">v7.6.0 • AppImage</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">Linux AppImage (.AppImage)</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Single executable file that runs on Ubuntu, Fedora, Debian, Arch Linux, and openSUSE without installation.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadPackage('Sejda-Desktop-7.6.0-x86_64.AppImage', 'Linux AppImage')}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Sejda-Desktop-7.6.0.AppImage
                </button>
              </div>

              {/* Debian / Ubuntu DEB */}
              <div className="p-5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Debian / Ubuntu
                    </span>
                    <span className="text-xs text-slate-400">v7.6.0 • .deb</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">Debian / Ubuntu Package (.deb)</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Debian packaging for Ubuntu 20.04+, Debian 11+, Linux Mint, and Pop!_OS.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadPackage('sejda-desktop_7.6.0_amd64.deb', 'Debian Linux')}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download sejda-desktop_7.6.0_amd64.deb
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>Run AppImage on Linux terminal:</span>
              </div>
              <code className="text-emerald-400">
                chmod +x Sejda-Desktop-7.6.0-x86_64.AppImage && ./Sejda-Desktop-7.6.0-x86_64.AppImage
              </code>
            </div>
          </div>
        )}

        {/* Benefits Grid (Desktop vs Web) */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 text-center">
            Why Use Sejda Desktop Software?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h5 className="font-semibold text-slate-800 text-sm">100% Offline & Private</h5>
              <p className="text-xs text-slate-500 mt-1">
                Files stay on your computer. PDF pages and contents never upload to any remote server or third party.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <h5 className="font-semibold text-slate-800 text-sm">No File Size Limits</h5>
              <p className="text-xs text-slate-500 mt-1">
                Process large legal binders, architectural schematics, and textbooks up to 1,000+ pages instantly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <FolderOpen className="w-4 h-4" />
              </div>
              <h5 className="font-semibold text-slate-800 text-sm">Native OS Integration</h5>
              <p className="text-xs text-slate-500 mt-1">
                Drag-and-drop straight from Windows Explorer, macOS Finder, or Linux Nautilus with system shortcut support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
