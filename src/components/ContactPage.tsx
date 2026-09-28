/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Building2,
  Send,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ToolId } from '../types';

interface ContactPageProps {
  onBackToHome: () => void;
  onSelectTool: (tool: ToolId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome, onSelectTool }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    }, 4000);
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#fcfdfd] text-slate-800 pb-20">
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
            <span className="text-xs font-bold text-slate-900">Contact Support Desk</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-50/50 via-slate-50/40 to-transparent border-b border-slate-200/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-[#18a474]" />
            <span>24-Hour Helpdesk &bull; Verified Contacts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Sejda Support &amp; Operations
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Need assistance with document tools, have a question regarding Google Pay or PayPal plan activation, or need to contact our Data Protection Officer? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Form */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Send a Message to Support
            </h2>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-[#18a474] mx-auto" />
                <h3 className="text-sm font-bold text-emerald-900">Message Received!</h3>
                <p className="text-xs text-emerald-800">
                  Thank you. Our technical helpdesk has received your ticket and will reply to your email within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#18a474]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#18a474]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department / Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#18a474] bg-white"
                  >
                    <option value="general">General Inquiries &amp; Tool Feedback</option>
                    <option value="billing">Billing &amp; Payment Support (GPay 7095074745@jio / PayPal)</option>
                    <option value="privacy">Privacy &amp; Data Protection Officer (GDPR/CCPA)</option>
                    <option value="enterprise">Enterprise Team &amp; Desktop Offline Licensing</option>
                    <option value="bug">Bug Report or Document Rendering Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, document issue, or payment transaction UTR details..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#18a474]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#18a474] hover:bg-[#159167] text-white font-bold rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Support Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#18a474]" />
                <span>Direct Support Desk</span>
              </h3>
              <p className="text-slate-600">
                Primary Helpdesk:<br />
                <a href="mailto:chinnamteja05@gmail.com" className="font-bold text-[#18a474] underline">
                  chinnamteja05@gmail.com
                </a>
              </p>
              <p className="text-slate-600">
                Administrative Desk:<br />
                <a href="mailto:mediumwork999@gmail.com" className="font-bold text-[#18a474] underline">
                  mediumwork999@gmail.com
                </a>
              </p>
              <p className="text-slate-600">
                Phone / WhatsApp Help:<br />
                <span className="font-bold text-slate-800">+91 7095074745</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-[#18a474]" />
                <span>Physical Office Address</span>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Sejda Digital Software Desk<br />
                Tech Innovation Park, Outer Ring Road<br />
                Bengaluru 560100, India
              </p>
              <div className="pt-1 text-[11px] text-slate-400">
                Official entity registered under Sejda BV governance.
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 font-bold text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-[#18a474]" />
                <span>24-Hour SLA Commitment</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">
                All inquiries submitted through this portal are prioritized. We guarantee a human response to billing queries within 24 business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
