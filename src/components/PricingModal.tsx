/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Check, Sparkles, Shield, Zap, Laptop, ArrowRight } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planName: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free Web',
      price: '$0',
      period: 'forever',
      description: 'Quick document tasks with zero installation or credit card required.',
      features: [
        '3 tasks per hour',
        'Up to 200 pages per document',
        'Files up to 50 MB',
        'All standard PDF editor & split tools',
        'Documents deleted after 2 hours',
      ],
      cta: 'Current Plan',
      isCurrent: true,
      popular: false,
    },
    {
      name: 'Web Week Pass',
      price: '$5',
      period: 'for 7 days',
      description: 'One-time payment for intensive short-term project deadlines.',
      features: [
        'Unlimited tasks & conversions',
        'Up to 500 pages per task',
        'Files up to 100 MB',
        'Gemini AI Document Copilot',
        'Priority queue processing',
      ],
      cta: 'Get Week Pass',
      isCurrent: false,
      popular: false,
    },
    {
      name: 'Web Pro Monthly',
      price: '$7.50',
      period: 'per month',
      description: 'Unlimited access for busy professionals and growing teams.',
      features: [
        'Unlimited tasks & documents',
        'Files up to 500 MB',
        'Full AI Document Intelligence Suite',
        'Batch PDF conversion & merge',
        'Encrypted cloud storage option',
      ],
      cta: 'Upgrade to Pro',
      isCurrent: false,
      popular: true,
    },
    {
      name: 'Desktop + Web',
      price: '$63',
      period: 'per year ($5.25/mo)',
      description: 'Offline privacy desktop software + full web cloud capabilities.',
      features: [
        'Sejda Desktop (Mac, Windows, Linux)',
        '100% offline local processing',
        'All Web Pro features included',
        'Batch processing unlimited files',
        'Premium customer support',
      ],
      cta: 'Get Desktop + Web',
      isCurrent: false,
      popular: false,
    },
  ];

  const handleChoose = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold text-[#18a474]">sejda</span>
              <span className="text-xs uppercase tracking-wider font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Plans & Pricing
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Choose the perfect tier for your PDF workflows and AI document intelligence.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                p.popular
                  ? 'border-[#18a474] ring-2 ring-[#18a474]/20 bg-emerald-50/20 shadow-md relative'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#18a474] text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  Most Popular
                </div>
              )}

              <div>
                <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                <div className="mt-3 flex items-baseline space-x-1">
                  <span className="text-3xl font-extrabold text-slate-900">{p.price}</span>
                  <span className="text-xs text-slate-500 font-medium">/{p.period}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 min-h-[32px] leading-relaxed">
                  {p.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start space-x-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-[#18a474] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  onClick={() => handleChoose(p.name)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
                    p.isCurrent
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : p.popular
                      ? 'bg-[#18a474] hover:bg-[#159167] text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{p.cta}</span>
                  {!p.isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 256-bit encryption</span>
            </span>
            <span className="flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cancel subscription anytime</span>
            </span>
          </div>
          <span>Free service available forever without registration.</span>
        </div>
      </div>
    </div>
  );
};
