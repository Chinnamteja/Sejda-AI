import { useEffect, useState } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export type DetectedOS = 'Windows' | 'macOS' | 'Linux' | 'ChromeOS' | 'Android' | 'iOS' | 'Unknown';

export function detectUserOS(): DetectedOS {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = window.navigator.userAgent.toLowerCase();
  const platform = (window.navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase() || '';

  if (platform.includes('win') || ua.includes('windows') || ua.includes('win32') || ua.includes('win64')) {
    return 'Windows';
  }
  if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os x')) {
    return 'macOS';
  }
  if (ua.includes('cros')) {
    return 'ChromeOS';
  }
  if (platform.includes('linux') || ua.includes('linux') || ua.includes('x11')) {
    return 'Linux';
  }
  if (/iphone|ipad|ipod/.test(ua)) {
    return 'iOS';
  }
  if (ua.includes('android')) {
    return 'Android';
  }
  return 'Unknown';
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [detectedOS, setDetectedOS] = useState<DetectedOS>('Unknown');

  useEffect(() => {
    // Detect OS
    setDetectedOS(detectUserOS());

    // Detect standalone mode (already installed desktop or mobile app)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    setIsInstalled(isStandalone);

    // Detect iOS devices
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false;
    }
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      }
    } catch (err) {
      console.error('Install prompt error:', err);
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    detectedOS,
    install,
  };
}
