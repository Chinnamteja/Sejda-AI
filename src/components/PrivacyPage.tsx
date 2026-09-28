/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  Cookie,
  ExternalLink,
  CheckCircle2,
  Clock,
  HardDrive,
  CreditCard,
  EyeOff,
  UserCheck,
  Printer,
  ArrowLeft,
  Sliders,
  Sparkles,
  HelpCircle,
  Mail,
  ChevronRight,
  Info,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { ToolId } from '../types';

export type PrivacyTab = 'privacy' | 'terms' | 'cookies' | 'security';

interface PrivacyPageProps {
  onBackToHome: () => void;
  onSelectTool?: (tool: ToolId) => void;
  onOpenPricing?: () => void;
  initialTab?: PrivacyTab;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  onBackToHome,
  onSelectTool,
  onOpenPricing,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<PrivacyTab>(initialTab);
  
  // Cookie Preferences state
  const [cookiePreferences, setCookiePreferences] = useState<{
    essential: boolean;
    analytics: boolean;
    advertising: boolean;
  }>({
    essential: true,
    analytics: true,
    advertising: true,
  });
  const [consentSaved, setConsentSaved] = useState(false);

  // Load saved preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sejda_cookie_preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCookiePreferences((prev) => ({ ...prev, ...parsed, essential: true }));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSaveCookiePreferences = () => {
    try {
      localStorage.setItem('sejda_cookie_preferences', JSON.stringify(cookiePreferences));
      setConsentSaved(true);
      setTimeout(() => setConsentSaved(false), 3000);
    } catch {
      // Ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="privacy-page" className="min-h-screen bg-[#fcfdfd] text-slate-800 pb-20">
      {/* Top Banner / Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#18a474] bg-slate-100 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to PDF Tools</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500">Legal & Transparency</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">
              {activeTab === 'privacy' && 'Privacy Policy'}
              {activeTab === 'terms' && 'Terms of Service'}
              {activeTab === 'cookies' && 'Google AdSense & Cookie Disclosures'}
              {activeTab === 'security' && 'Security Architecture'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 shadow-2xs transition cursor-pointer"
              title="Print policy documentation"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Policy</span>
            </button>
            {onOpenPricing && (
              <button
                onClick={onOpenPricing}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#18a474] bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/70 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Pro & Payment Safeguards</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50/60 via-slate-50/40 to-transparent border-b border-slate-200/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#18a474]" />
            <span>Document Confidentiality & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your files belong entirely to you. Sejda is engineered from the ground up for strict confidentiality,
            ephemeral in-memory document processing, and transparent Google AdSense and payment practices.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-slate-600">
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#18a474]" />
              <span>Automatic 2-Hour Document Purge</span>
            </span>
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-[#18a474]" />
              <span>TLS 1.3 End-to-End Encryption</span>
            </span>
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#18a474]" />
              <span>AdSense ca-pub-9341732423335241 Verified</span>
            </span>
            <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-[#18a474]" />
              <span>GDPR & CCPA Compliant</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs sticky top-36">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Legal Documents
              </div>
              <nav className="space-y-1">
                <button
                  id="tab-btn-privacy"
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    activeTab === 'privacy'
                      ? 'bg-emerald-50 text-[#18a474] font-extrabold border border-emerald-200/80 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  id="tab-btn-cookies"
                  onClick={() => setActiveTab('cookies')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    activeTab === 'cookies'
                      ? 'bg-emerald-50 text-[#18a474] font-extrabold border border-emerald-200/80 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Cookie className="w-4 h-4" />
                    <span>Cookies & AdSense</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  id="tab-btn-security"
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    activeTab === 'security'
                      ? 'bg-emerald-50 text-[#18a474] font-extrabold border border-emerald-200/80 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Lock className="w-4 h-4" />
                    <span>Security & Storage</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  id="tab-btn-terms"
                  onClick={() => setActiveTab('terms')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    activeTab === 'terms'
                      ? 'bg-emerald-50 text-[#18a474] font-extrabold border border-emerald-200/80 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4" />
                    <span>Terms of Service</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </nav>

              <hr className="my-3 border-slate-100" />

              {/* Quick Summary Box */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-[11px] text-slate-500">
                <div className="font-bold text-slate-700 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 text-[#18a474]" />
                  <span>Key Commitments</span>
                </div>
                <p>
                  Files are permanently purged after 2 hours. Documents are never used to train public AI models.
                </p>
                <div className="text-[10px] text-slate-400">
                  Last revision: September 2026
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-9 space-y-8">
            {/* TAB 1: PRIVACY POLICY */}
            {activeTab === 'privacy' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8">
                {/* Header info */}
                <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Sejda Privacy Policy</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Effective Date: September 28, 2026 &bull; Publisher ID: pub-9341732423335241
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-semibold bg-emerald-50 text-[#18a474] px-3 py-1.5 rounded-lg border border-emerald-200/70 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Zero Data Resale Guarantee</span>
                  </div>
                </div>

                {/* Document Confidentiality Callout */}
                <div className="p-5 bg-gradient-to-r from-emerald-50/90 to-teal-50/60 border border-emerald-200 rounded-xl space-y-2.5">
                  <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-sm uppercase tracking-wide">
                    <ShieldCheck className="w-5 h-5 text-[#18a474]" />
                    <span>Our Golden Rule: Document Confidentiality</span>
                  </div>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    Your PDF files, signatures, annotations, and document contents remain strictly your private property.
                    Files uploaded to Sejda are processed in memory and permanently deleted from our servers automatically
                    after <strong>2 hours</strong>. Whenever possible, tasks run 100% locally in your browser memory without ever leaving your device.
                    We never read, index, sell, or use your files to train artificial intelligence models.
                  </p>
                </div>

                {/* Section 1 */}
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-extrabold">1</span>
                    <span>What Information We Collect</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We adhere to data minimization principles. We only collect the technical information necessary to deliver and maintain high-performance document tools:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2 text-xs text-slate-600">
                      <h4 className="font-bold text-slate-800 flex items-center space-x-1.5">
                        <HardDrive className="w-4 h-4 text-emerald-600" />
                        <span>Document Data (Ephemeral Only)</span>
                      </h4>
                      <p>
                        Uploaded files are kept in volatile storage strictly during processing and auto-deleted within 2 hours.
                        Client-side tools (like offline mode or in-browser editors) execute locally without upload.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2 text-xs text-slate-600">
                      <h4 className="font-bold text-slate-800 flex items-center space-x-1.5">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>Technical & Diagnostic Logs</span>
                      </h4>
                      <p>
                        Non-identifying metadata such as browser type, operating system (for PWA / desktop app tailoring),
                        language preferences, and anonymous error logs to detect failed PDF rendering.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-extrabold">2</span>
                    <span>Payments & Billing Information</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    When upgrading to Sejda Web Pro, Web Week Pass, or Desktop Unlimited, payments are handled through bank-grade, PCI-DSS compliant direct merchant gateways:
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start space-x-3.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        GPay
                      </div>
                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="font-bold text-slate-900 flex items-center space-x-2">
                          <span>Google Pay & UPI Payment Security</span>
                          <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-mono">
                            7095074745@jio
                          </span>
                        </div>
                        <p>
                          Payments via Google Pay UPI (linked to official merchant handle <code className="text-emerald-700 font-mono font-bold">7095074745@jio</code>) execute directly through your bank's UPI protocol. We never receive or store your UPI PIN, banking passwords, or card numbers. We only verify the 12-digit UPI Transaction ID (UTR) to activate your account.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start space-x-3.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        PP
                      </div>
                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="font-bold text-slate-900 flex items-center space-x-2">
                          <span>PayPal Gateway Protection</span>
                          <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-mono">
                            chinnamteja05@gmail.com
                          </span>
                        </div>
                        <p>
                          PayPal transactions (authorized for account <code className="text-emerald-700 font-mono font-bold">chinnamteja05@gmail.com</code>) run entirely on PayPal's secure encrypted platform. We do not store your PayPal password, funding sources, or credit card details.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-extrabold">3</span>
                    <span>AI Copilot & Document Intelligence Safety</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Sejda incorporates Gemini 3.8 AI capabilities (document summarization, translation into 10+ languages, contract auditing, table extraction).
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-1">
                    <li>
                      <strong>Zero Model Training:</strong> Your documents, extracted text, and AI prompt requests are processed under strict enterprise data protection agreements. Google GenAI APIs do not use customer data submitted via our enterprise API to train Gemini models.
                    </li>
                    <li>
                      <strong>Ephemeral Transmission:</strong> Text sent for AI analysis is evaluated in transient memory and purged immediately after response delivery.
                    </li>
                    <li>
                      <strong>Opt-in Interaction:</strong> AI tools only touch documents when you explicitly click an AI feature (such as &quot;AI Summarize&quot; or &quot;Audit Contract&quot;).
                    </li>
                  </ul>
                </section>

                {/* Section 4 */}
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-extrabold">4</span>
                    <span>Your Rights (GDPR & CCPA)</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain the following enforceable rights:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-slate-800">Right to Erasure (Forgotten)</div>
                      <p className="text-slate-500">
                        Files are automatically destroyed after 2 hours. You can also manually delete files instantly from your browser session at any time.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-slate-800">Right to Object & Restrict</div>
                      <p className="text-slate-500">
                        You can disable personalized advertising cookies and analytics tracking at any time using our Cookie Preferences tool below.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-slate-800">No Sale of Personal Data</div>
                      <p className="text-slate-500">
                        We have never sold, rented, or bartered user information to third-party data brokers, and never will.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-slate-800">Data Portability</div>
                      <p className="text-slate-500">
                        All processed PDF documents can be exported, downloaded, or transferred to your local hard drive at any moment.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 5: Cookie Preferences Interactive Center */}
                <section id="cookie-preferences-box" className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                      <Sliders className="w-5 h-5 text-[#18a474]" />
                      <span>Cookie & Tracking Preference Center</span>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Interactive Settings
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Manage your preferences regarding cookies and third-party advertising partners (including Google AdSense). Changes are saved to your browser immediately.
                  </p>

                  <div className="space-y-3 pt-2">
                    {/* Essential Cookies */}
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                          <span>Essential System Cookies</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">Required</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Necessary for security, offline storage, session persistence, and PDF rendering.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="w-4 h-4 text-[#18a474] rounded accent-[#18a474] cursor-not-allowed opacity-75"
                      />
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-bold text-slate-800">Performance & Analytics</div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Helps us measure tool usage, detect crashes, and benchmark conversion speeds.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={cookiePreferences.analytics}
                        onChange={(e) =>
                          setCookiePreferences({ ...cookiePreferences, analytics: e.target.checked })
                        }
                        className="w-4 h-4 text-[#18a474] rounded accent-[#18a474] cursor-pointer"
                      />
                    </div>

                    {/* AdSense Cookies */}
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Personalized Ads (Google AdSense)
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Allows Google AdSense partners to serve relevant advertising based on your interests.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={cookiePreferences.advertising}
                        onChange={(e) =>
                          setCookiePreferences({ ...cookiePreferences, advertising: e.target.checked })
                        }
                        className="w-4 h-4 text-[#18a474] rounded accent-[#18a474] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">
                      {consentSaved ? (
                        <span className="text-[#18a474] font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Preferences saved successfully!</span>
                        </span>
                      ) : (
                        'Preferences apply to this device.'
                      )}
                    </span>
                    <button
                      onClick={handleSaveCookiePreferences}
                      className="px-4 py-2 bg-[#18a474] hover:bg-[#159167] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                    >
                      Save Preferences
                    </button>
                  </div>
                </section>

                {/* Section 6: Contact */}
                <section className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                      <Mail className="w-4 h-4 text-[#18a474]" />
                      <span>Data Protection Officer & Privacy Inquiries</span>
                    </div>
                    <p className="text-slate-500">
                      For GDPR erasure requests, data queries, or compliance auditing, contact our team at{' '}
                      <a href="mailto:chinnamteja05@gmail.com" className="text-[#18a474] font-semibold underline">
                        chinnamteja05@gmail.com
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={onBackToHome}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Return to Sejda Home
                  </button>
                </section>
              </div>
            )}

            {/* TAB 2: COOKIES & GOOGLE ADSENSE DISCLOSURE */}
            {activeTab === 'cookies' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8">
                <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      Google AdSense & Cookie Compliance
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Partner Policy Notice & Disclosure &bull; Publisher ID: ca-pub-9341732423335241
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200/70 shrink-0">
                    <Cookie className="w-4 h-4" />
                    <span>AdSense Policy Compliant</span>
                  </div>
                </div>

                {/* Official Google AdSense Disclosure Box */}
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs leading-relaxed text-slate-700">
                  <div className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                    <Info className="w-4 h-4 text-[#18a474]" />
                    <span>Required Google AdSense Partner Disclosures</span>
                  </div>
                  <p>
                    In accordance with Google AdSense program policies, websites displaying Google advertisements are required to disclose third-party cookie usage to visitors:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 pl-1">
                    <li>
                      <strong>Third-party vendors, including Google, use cookies</strong> to serve ads based on a user&apos;s prior visits to your website or other websites.
                    </li>
                    <li>
                      <strong>Google&apos;s use of advertising cookies</strong> enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
                    </li>
                    <li>
                      <strong>Users may opt out of personalized advertising</strong> by visiting{' '}
                      <a
                        href="https://www.google.com/settings/ads"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#18a474] font-bold underline inline-flex items-center space-x-0.5"
                      >
                        <span>Google Ads Settings</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 inline" />
                      </a>
                      , or opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
                      <a
                        href="https://www.aboutads.info/choices/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#18a474] font-bold underline inline-flex items-center space-x-0.5"
                      >
                        <span>www.aboutads.info</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 inline" />
                      </a>.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">What is a Cookie?</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A cookie is a small piece of data stored on your computer or mobile device by your web browser.
                    We use cookies to maintain your session state, keep track of task allowances (such as the 3 tasks per hour free limit), remember tool settings, and support Google AdSense advertising that keeps Sejda accessible for free users.
                  </p>

                  <h3 className="text-base font-bold text-slate-900 pt-2">Types of Cookies Used</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <Lock className="w-4 h-4 text-[#18a474]" />
                        <span>1. Strictly Necessary</span>
                      </div>
                      <p className="text-slate-500">
                        Essential for application navigation, authentication state, and offline document cache integrity.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>2. Performance</span>
                      </div>
                      <p className="text-slate-500">
                        Tracks conversion success rates, PDF rendering bottlenecks, and error telemetry.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <Cookie className="w-4 h-4 text-blue-600" />
                        <span>3. Google AdSense</span>
                      </div>
                      <p className="text-slate-500">
                        Utilized by Google to display contextual and personalized advertising matching user interests.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opt Out Directions */}
                <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                  <div className="font-bold text-emerald-950 text-xs flex items-center space-x-2 uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-[#18a474]" />
                    <span>How to Control or Disable Cookies in Your Browser</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Most web browsers automatically accept cookies, but you can configure your browser settings to refuse cookies or alert you when a cookie is sent. If you disable cookies, certain interactive tools (like task rate tracking and cloud sync) may operate in a limited capacity.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs">
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white text-slate-700 rounded-lg border border-emerald-300 font-semibold hover:bg-emerald-100/50 transition"
                    >
                      Chrome Cookie Settings →
                    </a>
                    <a
                      href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white text-slate-700 rounded-lg border border-emerald-300 font-semibold hover:bg-emerald-100/50 transition"
                    >
                      Firefox Cookie Settings →
                    </a>
                    <a
                      href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white text-slate-700 rounded-lg border border-emerald-300 font-semibold hover:bg-emerald-100/50 transition"
                    >
                      Safari Cookie Settings →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SECURITY ARCHITECTURE */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8">
                <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      Security & Data Retention Architecture
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Technical safeguards, encryption standards, and automated file destruction
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-semibold bg-emerald-50 text-[#18a474] px-3 py-1.5 rounded-lg border border-emerald-200/70 shrink-0">
                    <Lock className="w-4 h-4" />
                    <span>TLS 1.3 Certified</span>
                  </div>
                </div>

                {/* Visual Lifecycle Pipeline */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Document Lifecycle Pipeline
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#18a474] flex items-center justify-center font-bold">
                        1
                      </div>
                      <div className="font-bold text-slate-900">Encrypted Ingestion</div>
                      <p className="text-slate-500 text-[11px]">
                        Files travel over TLS 1.3 encryption. Upload integrity verified via cryptographic hashing.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#18a474] flex items-center justify-center font-bold">
                        2
                      </div>
                      <div className="font-bold text-slate-900">In-Memory Execution</div>
                      <p className="text-slate-500 text-[11px]">
                        Processing occurs in sandboxed RAM pipelines without persistent hard disk storage.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#18a474] flex items-center justify-center font-bold">
                        3
                      </div>
                      <div className="font-bold text-slate-900">2-Hour Expiration</div>
                      <p className="text-slate-500 text-[11px]">
                        Server memory allocation automatically expires with a strict Time-to-Live (TTL).
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                        4
                      </div>
                      <div className="font-bold text-slate-900">Permanent Purge</div>
                      <p className="text-slate-500 text-[11px]">
                        Cryptographic shredding permanently erases all buffer fragments and temporary metadata.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <h3 className="text-base font-bold text-slate-900">Infrastructure Controls</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <h4 className="font-bold text-slate-800 flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#18a474]" />
                        <span>Zero Human Access</span>
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        Engineers and automated support personnel cannot view or inspect customer PDF contents. File access tokens are strictly tied to ephemeral user session credentials.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <h4 className="font-bold text-slate-800 flex items-center space-x-1.5">
                        <EyeOff className="w-4 h-4 text-[#18a474]" />
                        <span>No AI Training on Private Files</span>
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        Uploaded contracts, signatures, taxes, and legal forms are excluded from AI training sets. Gemini models operate in zero-retention mode.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TERMS OF SERVICE */}
            {activeTab === 'terms' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8">
                <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Terms of Service</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Agreement for Web Service, Desktop Application & AI Document Copilot
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
                    <FileText className="w-4 h-4" />
                    <span>Standard Terms</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">1. Acceptance of Terms</h4>
                    <p>
                      By accessing or using the Sejda website, progressive web app, desktop software, or AI Copilot services, you agree to be bound by these terms. If you do not agree to all terms, do not access or use the services.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">2. Service Scope & Free Usage Limits</h4>
                    <p>
                      Sejda provides online PDF manipulation, compression, conversion, optical character recognition (OCR), signing, and AI document capabilities. Free tier users are permitted up to 3 tasks per hour for files up to 200 pages or 50 MB. Unlimited tasks, batch processing, and offline desktop access require an active Pro subscription or Week Pass.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">3. Ownership of Content</h4>
                    <p>
                      You retain all intellectual property rights and full ownership in any document you upload to Sejda. We claim no ownership, license, or copyright over your documents.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">4. Prohibited Uses</h4>
                    <p>
                      You agree not to use the service to process unlawful content, violate copyright laws, distribute malware, or attempt unauthorized reverse engineering of the platform.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">5. Payments, Renewals & Refunds</h4>
                    <p>
                      Payments completed via Google Pay (UPI <code className="font-mono text-emerald-800">7095074745@jio</code>) or PayPal (<code className="font-mono text-emerald-800">chinnamteja05@gmail.com</code>) provide instant license entitlement. If you encounter any technical difficulty or billing discrepancy, contact support for immediate remediation or refund within 14 days.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">6. Disclaimer of Warranties</h4>
                    <p>
                      The services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. While we strive for high precision and 99.9% uptime, we do not warrant that output PDFs will be entirely error-free for every unusual legacy format.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
