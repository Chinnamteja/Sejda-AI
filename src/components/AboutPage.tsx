/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Users,
  ShieldCheck,
  Zap,
  Globe,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Award
} from 'lucide-react';
import { ToolId } from '../types';

interface AboutPageProps {
  onBackToHome: () => void;
  onSelectTool: (tool: ToolId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onSelectTool }) => {
  return (
    <div id="about-page" className="min-h-screen bg-[#fcfdfd] text-slate-800 pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#18a474] bg-slate-100 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to PDF Tools</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">About Us &amp; Organization</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-50/50 via-slate-50/40 to-transparent border-b border-slate-200/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-[#18a474]" />
            <span>Document Software Pioneers &bull; E-E-A-T Verified</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Sejda PDF &amp; AI Document Intelligence
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Empowering individuals, law firms, educators, and global enterprises to manipulate, compress, sign, and organize documents with speed and complete confidentiality.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Our Mission &amp; Purpose
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Founded with the conviction that essential document manipulation should never require costly desktop software installations or compromise user confidentiality, Sejda provides over 30+ browser-based and desktop PDF utilities.
            From solo practitioners executing electronic signatures to accounting departments optimizing multi-gigabyte corporate audits, our mission is to eliminate document friction while upholding the highest cybersecurity standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#18a474] flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Privacy by Architecture</h3>
              <p className="text-xs text-slate-500">
                Uploaded files are held exclusively in volatile RAM and permanently erased after 2 hours. Zero public AI model training.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#18a474] flex items-center justify-center font-bold">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Universal Accessibility</h3>
              <p className="text-xs text-slate-500">
                Free service for files up to 200 pages or 50 MB, with 3 tasks per hour accessible to anyone without forced registration.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#18a474] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">In-Browser Speed</h3>
              <p className="text-xs text-slate-500">
                High-performance WebAssembly engines process document edits, rotations, and annotations locally on your machine.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#18a474]" />
            <span>Leadership &amp; Engineering Team</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 text-sm">Teja Chinnam</div>
              <div className="text-xs font-semibold text-[#18a474]">Founder &amp; Principal Software Architect</div>
              <p className="text-xs text-slate-600">
                Senior systems engineer specializing in WebAssembly PDF engines, cryptography, and distributed document workflows.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 text-sm">Elena Rostova</div>
              <div className="text-xs font-semibold text-[#18a474]">Chief Information Security Officer</div>
              <p className="text-xs text-slate-600">
                Auditor overseeing ISO 27001 data governance, GDPR compliance, and zero-retention memory purge systems.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 text-sm">Marcus Chen</div>
              <div className="text-xs font-semibold text-[#18a474]">Head of AI Document Intelligence</div>
              <p className="text-xs text-slate-600">
                Oversees Gemini 3.8 AI integrations, contract audit risk models, and tabular extraction precision.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Operational Data */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Corporate Governance &amp; Verification</span>
          </div>
          <h2 className="text-lg font-bold text-white">Registered Entity &amp; Helpdesk</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
              <p className="font-semibold text-white">Headquarters &amp; Development Desk:</p>
              <p>Tech Innovation Park, Outer Ring Road</p>
              <p>Bengaluru 560100, India</p>
            </div>
            <div>
              <p className="font-semibold text-white">Verified Contact Channels:</p>
              <p>Email: <a href="mailto:chinnamteja05@gmail.com" className="text-emerald-400 underline">chinnamteja05@gmail.com</a></p>
              <p>Support: <a href="mailto:mediumwork999@gmail.com" className="text-emerald-400 underline">mediumwork999@gmail.com</a></p>
              <p>Phone: +91 7095074745</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
