/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  slot?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slot,
  className = '',
  style = { display: 'block' },
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Ignore adsbygoogle errors (e.g., during development or if already pushed)
    }
  }, []);

  return (
    <div className={`ad-unit-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-9341732423335241"
        data-ad-format="auto"
        data-full-width-responsive="true"
        {...(slot ? { 'data-ad-slot': slot } : {})}
      />
    </div>
  );
};

export default AdUnit;
