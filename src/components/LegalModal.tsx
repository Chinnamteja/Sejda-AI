/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Cookie, ExternalLink, CheckCircle } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div
      id="legal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="legal-modal-container"
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#18a474]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Legal, Privacy & Compliance</h3>
              <p className="text-xs text-slate-500">Google AdSense Publisher Compliant & GDPR Ready</p>
            </div>
          </div>
          <button
            id="legal-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-6 pt-2">
          <button
            id="legal-tab-privacy"
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'privacy'
                ? 'border-[#18a474] text-[#18a474]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            id="legal-tab-cookies"
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'cookies'
                ? 'border-[#18a474] text-[#18a474]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Cookies & AdSense Disclosure</span>
          </button>

          <button
            id="legal-tab-terms"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'terms'
                ? 'border-[#18a474] text-[#18a474]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-600 leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold text-slate-900">Privacy Policy</h4>
              <p className="text-xs text-slate-400">Last updated: September 2026</p>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wide">
                  <CheckCircle className="w-4 h-4 text-[#18a474]" />
                  <span>Document Confidentiality Guarantee</span>
                </div>
                <p className="text-xs text-emerald-950">
                  Your PDF files, signatures, and document contents remain strictly your private property.
                  Document processing runs client-side in your browser or through ephemeral, encrypted memory
                  pipelines that permanently purge files after 2 hours. We never sell, index, or use your files
                  to train public AI models.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">1. Information We Collect</h5>
                <p>
                  We collect minimal technical data necessary to provide service functionality, including browser
                  type, device operating system, language preferences, and diagnostic error logs. When you edit
                  or manipulate PDFs, file data stays local in memory unless you explicitly use server-backed AI
                  functions.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">2. Third-Party Services & Google Advertising</h5>
                <p>
                  We partner with third-party vendors, including Google, which may use cookies, web beacons, or
                  similar tracking technologies to serve advertisements based on prior visits to this and other
                  websites on the internet.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">3. Data Security & Encryption</h5>
                <p>
                  All network transmissions are secured via TLS 1.3 encryption. We comply with GDPR (EU General
                  Data Protection Regulation) and California Consumer Privacy Act (CCPA) standards.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold text-slate-900">Cookie & Google AdSense Policy</h4>
              <p className="text-xs text-slate-400">AdSense Publisher ID: pub-9341732423335241</p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <p className="font-bold text-slate-800">
                  Google AdSense Compliance Notice (AdSense Partner Policy Requirement):
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>
                    Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits
                    to your website or other websites.
                  </li>
                  <li>
                    Google's use of advertising cookies enables it and its partners to serve ads to users based on
                    their visit to your sites and/or other sites on the Internet.
                  </li>
                  <li>
                    Users may opt out of personalized advertising by visiting{' '}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#18a474] font-semibold underline inline-flex items-center gap-1"
                    >
                      Google Ads Settings <ExternalLink className="w-3 h-3" />
                    </a>{' '}
                    or by visiting{' '}
                    <a
                      href="https://www.aboutads.info/choices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#18a474] font-semibold underline inline-flex items-center gap-1"
                    >
                      aboutads.info <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">What are Cookies?</h5>
                <p>
                  Cookies are small text files placed on your computer or mobile device when you browse websites.
                  They are widely used to make websites work efficiently and provide operational reporting.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">Types of Cookies Used</h5>
                <p>
                  <strong>Essential Cookies:</strong> Required to preserve user session preferences, offline PWA
                  cache states, and tool configurations.
                </p>
                <p className="mt-1">
                  <strong>Analytics & Publisher Cookies:</strong> Used by Google services to verify publisher domain
                  status (Publisher: pub-9341732423335241) and measure site health.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold text-slate-900">Terms of Service</h4>
              <p className="text-xs text-slate-400">Effective Date: September 2026</p>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">1. Acceptance of Terms</h5>
                <p>
                  By accessing or using this web application and desktop software, you agree to be bound by these
                  Terms of Service and all applicable laws and regulations.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">2. Permitted Use</h5>
                <p>
                  You are permitted to upload, view, edit, sign, convert, compress, and process PDF documents for
                  personal and business purposes. You agree not to upload malicious software, corrupted exploits,
                  or files that infringe upon any third party intellectual property rights.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">3. Service Availability & Disclaimers</h5>
                <p>
                  The services are provided "as is" without warranty of any kind. While high reliability and
                  encryption standards are maintained, you are responsible for maintaining independent backups of
                  your primary documents.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Publisher Account: <code className="font-mono text-slate-600">pub-9341732423335241</code>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#18a474] hover:bg-[#159167] text-white text-xs font-bold rounded-lg transition shadow-xs"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
