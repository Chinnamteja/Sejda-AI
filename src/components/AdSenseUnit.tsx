/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

interface AdSenseUnitProps {
  slot?: string;
  client?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
  minWidth?: number;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slot,
  client = 'ca-pub-9341732423335241',
  format = 'auto',
  className = '',
  minWidth = 250,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasSpace, setHasSpace] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAdSensePreview, setIsAdSensePreview] = useState<boolean>(false);
  const adPushedRef = useRef<boolean>(false);

  useEffect(() => {
    // Detect if running inside Google AdSense previewer / console to prevent iframe collision
    try {
      const isPreview = Boolean(
        window.location.search.includes('google_preview') ||
        window.location.search.includes('google_ad_preview') ||
        window.location.search.includes('google_adsense') ||
        window.location.hash.includes('google_preview') ||
        (document.referrer && document.referrer.includes('google.com/adsense'))
      );
      setIsAdSensePreview(isPreview);
    } catch (e) {}
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check available container dimensions using ResizeObserver
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // If container width is less than minWidth, collapse and hide to prevent AdSense errors
        if (width > 0 && width < minWidth) {
          setHasSpace(false);
        } else if (width >= minWidth) {
          setHasSpace(true);
        }
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [minWidth]);

  useEffect(() => {
    // Only push when space is available, hasn't been pushed yet, and not in AdSense preview tool
    if (!hasSpace || adPushedRef.current || isAdSensePreview) return;

    // Small delay to ensure the container is fully rendered and has calculated layout width
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
          adPushedRef.current = true;
          setIsLoaded(true);
        }
      } catch (err) {
        // Silently catch duplicate push or iframe sandbox restrictions
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [hasSpace, isAdSensePreview]);

  // If no space is available in the viewport/container, keep it completely hidden
  if (!hasSpace) {
    return <div ref={containerRef} className="w-full h-0 overflow-hidden" aria-hidden="true" />;
  }

  // During Google AdSense site preview, render a clean native container so AdSense Auto Ads can preview without iframe collisions
  if (isAdSensePreview) {
    return (
      <div
        ref={containerRef}
        className={`adsense-responsive-container w-full max-w-2xl mx-auto my-6 ${className}`}
      >
        <div className="relative overflow-hidden rounded-xl border border-dashed border-slate-300/80 bg-slate-50/70 p-3 text-center">
          <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
            AdSense Placement Area
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`adsense-responsive-container w-full max-w-2xl mx-auto my-6 transition-all duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      <div className="relative overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/50 p-2 sm:p-3 text-center">
        <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-1">
          Advertisement
        </span>
        <div className="min-h-[60px] sm:min-h-[90px] flex items-center justify-center overflow-hidden">
          <ins
            className="adsbygoogle w-full block"
            style={{ display: 'block', minHeight: '60px' }}
            data-ad-client={client}
            data-ad-format={format}
            data-full-width-responsive="true"
            {...(slot && slot !== '1234567890' ? { 'data-ad-slot': slot } : {})}
          />
        </div>
      </div>
    </div>
  );
};
