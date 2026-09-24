/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { ToolId } from '../types';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  slot?: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackToolTitle?: string;
  fallbackToolDesc?: string;
  fallbackToolId?: ToolId;
  onSelectTool?: (toolId: ToolId) => void;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slot,
  className = '',
  style = { display: 'block' },
  fallbackToolTitle = 'AI PDF Summarize & Extract',
  fallbackToolDesc = 'Instant document intelligence: summarize lengthy reports, extract key clauses, and translate in seconds.',
  fallbackToolId = 'ai_summarize',
  onSelectTool,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const pushAttempted = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!pushAttempted.current) {
      try {
        pushAttempted.current = true;
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Iframe security error or AdSense push failure
        setHasError(true);
      }
    }

    // Monitor the <ins> element for AdSense status updates (data-ad-status="unfilled")
    const insElement = insRef.current;
    let observer: MutationObserver | null = null;

    if (insElement && typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'attributes') {
            const status = insElement.getAttribute('data-ad-status');
            if (status === 'unfilled') {
              setHasError(true);
            }
          }
        }
      });

      observer.observe(insElement, {
        attributes: true,
        attributeFilter: ['data-ad-status'],
      });
    }

    // Only switch to fallback if AdSense explicitly sets unfilled or after generous network timeout (7s) on mobile
    const fallbackTimer = setTimeout(() => {
      const status = insElement?.getAttribute('data-ad-status');
      if (status === 'unfilled') {
        setHasError(true);
      }
    }, 7000);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleFallbackClick = () => {
    if (onSelectTool && fallbackToolId) {
      onSelectTool(fallbackToolId);
    } else {
      // Scroll to tools catalog if no direct handler provided
      const toolsSection = document.getElementById('all-tools') || document.getElementById('tools');
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={containerRef} className={`ad-unit-container w-full transition-all duration-300 ${className}`}>
      {hasError ? (
        /* Fallback UI: Recommended Tool Card */
        <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#107569] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Sparkles className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-[#107569] uppercase tracking-wide">
                    <Zap className="w-2.5 h-2.5 mr-0.5" />
                    Recommended Tool
                  </span>
                  <span className="flex items-center text-[10px] text-slate-500 font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 mr-1" />
                    100% Free & Secure
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                  {fallbackToolTitle}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 max-w-xl line-clamp-2 leading-relaxed">
                  {fallbackToolDesc}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-end sm:justify-center">
              <button
                type="button"
                onClick={handleFallbackClick}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#107569] hover:bg-[#0d6056] text-white text-xs font-semibold shadow-sm hover:shadow transition-all group cursor-pointer"
              >
                <span>Try Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Regular AdSense Unit */
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={style}
          data-ad-client="ca-pub-9341732423335241"
          data-ad-format="auto"
          data-full-width-responsive="true"
          {...(slot ? { 'data-ad-slot': slot } : {})}
        />
      )}
    </div>
  );
};

export default AdUnit;
