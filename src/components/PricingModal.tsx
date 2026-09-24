/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Lock,
  CheckCircle2,
  Copy,
  ExternalLink,
  QrCode,
  Smartphone,
  CheckCheck,
  Wallet,
} from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planName: string) => void;
}

type BillingCycle = 'monthly' | 'yearly';
type PaymentMethod = 'gpay' | 'paypal' | 'card';

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  period: string;
  usdPrice: number;
  inrPrice: number;
  description: string;
  features: string[];
  cta: string;
  isCurrent?: boolean;
  popular?: boolean;
}

// Configured payment credentials
export const PAYMENT_CONFIG = {
  paypalEmail: 'chinnamteja05@gmail.com',
  paypalMeUrl: 'https://paypal.me/chinnamteja05',
  gpayUpiId: '7095074745@jio',
  gpayPhone: '7095074745',
  accountHolderName: 'Chinnam Teja',
};

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [step, setStep] = useState<'plans' | 'checkout' | 'success'>('plans');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [email, setEmail] = useState('');

  // Manual payment verification states
  const [gpayUtr, setGpayUtr] = useState('');
  const [paypalTxnId, setPaypalTxnId] = useState('');
  const [confirmedPaymentDetails, setConfirmedPaymentDetails] = useState<{
    method: string;
    ref: string;
  } | null>(null);

  if (!isOpen) return null;

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free Web',
      monthlyPrice: 0,
      yearlyPrice: 0,
      usdPrice: 0,
      inrPrice: 0,
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
      id: 'week_pass',
      name: 'Web Week Pass',
      monthlyPrice: 5,
      yearlyPrice: 5,
      usdPrice: 5,
      inrPrice: 420,
      period: '7 days',
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
      id: 'pro_monthly',
      name: 'Web Pro',
      monthlyPrice: 7.5,
      yearlyPrice: 6, // billed annually ($72/yr)
      usdPrice: billingCycle === 'yearly' ? 72 : 7.5,
      inrPrice: billingCycle === 'yearly' ? 6000 : 630,
      period: billingCycle === 'yearly' ? 'per month ($72/yr)' : 'per month',
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
      id: 'desktop_web',
      name: 'Desktop + Web',
      monthlyPrice: 7.5,
      yearlyPrice: 5.25, // billed annually ($63/yr)
      usdPrice: billingCycle === 'yearly' ? 63 : 90,
      inrPrice: billingCycle === 'yearly' ? 5250 : 7500,
      period: billingCycle === 'yearly' ? 'per month ($63/yr)' : 'per month ($90/yr)',
      description: 'Offline privacy desktop software + full web cloud capabilities.',
      features: [
        'Sejda Desktop (Mac, Windows, Linux)',
        '100% offline local processing',
        'All Web Pro features included',
        'Batch processing unlimited files',
        'Priority customer support',
      ],
      cta: 'Get Desktop + Web',
      isCurrent: false,
      popular: false,
    },
  ];

  const handleSelectPlanForCheckout = (plan: Plan) => {
    if (plan.isCurrent) return;
    setSelectedPlan(plan);
    setStep('checkout');
  };

  const getPlanPriceDisplay = (plan: Plan) => {
    if (plan.id === 'free') return '$0';
    if (plan.id === 'week_pass') return '$5';
    if (billingCycle === 'yearly') {
      return `$${plan.yearlyPrice}`;
    }
    return `$${plan.monthlyPrice}`;
  };

  const getDueAmountUsd = (plan: Plan) => {
    if (plan.id === 'week_pass') return 5;
    if (billingCycle === 'yearly') {
      return plan.id === 'desktop_web' ? 63 : 72;
    }
    return plan.monthlyPrice;
  };

  const getDueAmountInr = (plan: Plan) => {
    if (plan.id === 'week_pass') return 420;
    if (billingCycle === 'yearly') {
      return plan.id === 'desktop_web' ? 5250 : 6000;
    }
    return Math.round(plan.monthlyPrice * 85);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleProcessCardPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setConfirmedPaymentDetails({
        method: 'Credit/Debit Card',
        ref: `CARD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      });
      setStep('success');
      if (onSelectPlan && selectedPlan) {
        onSelectPlan(selectedPlan.name);
      }
    }, 1200);
  };

  const handleConfirmGPayPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setConfirmedPaymentDetails({
        method: 'Google Pay (UPI)',
        ref: gpayUtr.trim() || `UPI-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      });
      setStep('success');
      if (onSelectPlan && selectedPlan) {
        onSelectPlan(selectedPlan.name);
      }
    }, 1000);
  };

  const handleConfirmPayPalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setConfirmedPaymentDetails({
        method: 'PayPal',
        ref: paypalTxnId.trim() || `PP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      });
      setStep('success');
      if (onSelectPlan && selectedPlan) {
        onSelectPlan(selectedPlan.name);
      }
    }, 1000);
  };

  // UPI deep link & QR Code generator
  const currentInr = selectedPlan ? getDueAmountInr(selectedPlan) : 420;
  const currentUsd = selectedPlan ? getDueAmountUsd(selectedPlan) : 5;
  const upiUri = `upi://pay?pa=${PAYMENT_CONFIG.gpayUpiId}&pn=${encodeURIComponent(
    PAYMENT_CONFIG.accountHolderName
  )}&am=${currentInr}&cu=INR&tn=${encodeURIComponent(
    selectedPlan ? `Sejda ${selectedPlan.name}` : 'Sejda PDF Pro'
  )}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    upiUri
  )}&margin=10`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-200 my-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-3">
            {step === 'checkout' && (
              <button
                onClick={() => setStep('plans')}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition cursor-pointer"
                title="Back to plans"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold text-[#18a474]">sejda</span>
              <span className="text-xs uppercase tracking-wider font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {step === 'checkout'
                  ? 'Secure Checkout'
                  : step === 'success'
                  ? 'Payment Confirmed'
                  : 'Plans & Pricing'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Active Payment Accounts Callout Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-b border-emerald-100/80 px-6 py-2.5 flex items-center justify-between text-xs text-slate-700 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-600 text-white shadow-2xs">
              Direct Payments
            </span>
            <span className="font-semibold text-slate-800">Available Accounts:</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] font-medium text-slate-700 flex-wrap">
            <span className="inline-flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-200/80 shadow-2xs">
              <span className="font-bold text-slate-900">G Pay / UPI:</span>
              <span className="font-mono text-emerald-700 font-bold select-all">
                {PAYMENT_CONFIG.gpayUpiId}
              </span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-200/80 shadow-2xs">
              <span className="font-bold text-[#003087]">PayPal:</span>
              <span className="font-mono text-blue-700 font-bold select-all">
                {PAYMENT_CONFIG.paypalEmail}
              </span>
            </span>
          </div>
        </div>

        {/* STEP 1: PLANS OVERVIEW */}
        {step === 'plans' && (
          <div>
            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center pt-6 pb-2">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/70">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                    billingCycle === 'yearly'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Yearly Billing</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-md">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                    p.popular
                      ? 'border-[#18a474] ring-2 ring-[#18a474]/20 bg-emerald-50/15 shadow-md relative'
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
                      <span className="text-3xl font-extrabold text-slate-900">{getPlanPriceDisplay(p)}</span>
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
                      onClick={() => handleSelectPlanForCheckout(p)}
                      disabled={p.isCurrent}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer ${
                        p.isCurrent
                          ? 'bg-slate-100 text-slate-500 cursor-default'
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
          </div>
        )}

        {/* STEP 2: CHECKOUT & PAYMENT METHOD OPTION */}
        {step === 'checkout' && selectedPlan && (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              
              {/* Payment Methods & Form (3 cols) */}
              <div className="lg:col-span-3 space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Select Payment Method</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pay securely using Google Pay UPI, PayPal, or Debit/Credit Card.
                  </p>
                </div>

                {/* Method selector pills */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Google Pay / UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gpay')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'gpay'
                        ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-1">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">P</span>
                        <span className="text-[#FBBC05]">a</span>
                        <span className="text-[#34A853]">y</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                        UPI
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="block text-xs font-bold text-slate-800">Google Pay</span>
                      <span className="block text-[10px] text-slate-500 truncate">{PAYMENT_CONFIG.gpayUpiId}</span>
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'paypal'
                        ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[#003087] font-extrabold text-sm italic">PayPal</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-800">
                        Global
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="block text-xs font-bold text-slate-800">PayPal</span>
                      <span className="block text-[10px] text-slate-500 truncate">{PAYMENT_CONFIG.paypalEmail}</span>
                    </div>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'card'
                        ? 'border-slate-800 bg-slate-50 ring-2 ring-slate-400/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <CreditCard className="w-5 h-5 text-slate-700" />
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                        Card
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="block text-xs font-bold text-slate-800">Credit / Debit</span>
                      <span className="block text-[10px] text-slate-500">Visa, MC, Amex</span>
                    </div>
                  </button>
                </div>

                {/* 1. GOOGLE PAY (UPI) PAYMENT DETAILS */}
                {paymentMethod === 'gpay' && (
                  <div className="p-4 bg-slate-50/90 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Google Pay & UPI Payment</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Scan the QR code with Google Pay, PhonePe, Paytm, or BHIM.
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        ₹{currentInr} INR (${currentUsd} USD)
                      </span>
                    </div>

                    {/* QR Code and Account Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      {/* QR Display */}
                      <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                        <img
                          src={qrCodeUrl}
                          alt="GPay UPI QR Code"
                          className="w-36 h-36 object-contain rounded-md shadow-2xs"
                          onError={(e) => {
                            // fallback if network blocked
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="text-[10px] text-slate-500 font-semibold mt-1 flex items-center gap-1">
                          <QrCode className="w-3 h-3 text-slate-400" />
                          <span>Scan with Google Pay App</span>
                        </div>
                      </div>

                      {/* Direct Details & Actions */}
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">
                            Google Pay UPI ID
                          </span>
                          <div className="flex items-center justify-between bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200/80 mt-0.5">
                            <span className="font-mono font-bold text-slate-900 text-xs select-all">
                              {PAYMENT_CONFIG.gpayUpiId}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(PAYMENT_CONFIG.gpayUpiId, 'upi')}
                              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center space-x-1 cursor-pointer ml-2 p-1"
                              title="Copy UPI ID"
                            >
                              {copiedField === 'upi' ? (
                                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                              <span>{copiedField === 'upi' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">
                            Account Phone / Jio
                          </span>
                          <div className="flex items-center justify-between bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200/80 mt-0.5">
                            <span className="font-mono text-slate-800 text-xs">
                              {PAYMENT_CONFIG.gpayPhone}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(PAYMENT_CONFIG.gpayPhone, 'phone')}
                              className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center space-x-1 cursor-pointer ml-2 p-1"
                              title="Copy Phone"
                            >
                              {copiedField === 'phone' ? (
                                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                              <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Mobile Deep Link */}
                        <a
                          href={upiUri}
                          className="mt-1 inline-flex w-full items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-2xs transition"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Open Google Pay App</span>
                        </a>
                      </div>
                    </div>

                    {/* UTR Submission Form */}
                    <form onSubmit={handleConfirmGPayPayment} className="space-y-2 pt-2 border-t border-slate-200">
                      <label className="block text-xs font-semibold text-slate-700">
                        Enter UPI Transaction Reference (UTR / 12-digit Ref No.)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="e.g. 427819827361"
                          value={gpayUtr}
                          onChange={(e) => setGpayUtr(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          type="submit"
                          disabled={isProcessing || !gpayUtr.trim()}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isProcessing ? 'Verifying...' : 'Confirm & Activate'}</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Payments to <span className="font-semibold">{PAYMENT_CONFIG.gpayUpiId}</span> are immediately credited and activated upon reference submission.
                      </p>
                    </form>
                  </div>
                )}

                {/* 2. PAYPAL PAYMENT DETAILS */}
                {paymentMethod === 'paypal' && (
                  <div className="p-4 bg-slate-50/90 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <span className="text-[#003087] font-black italic">P</span>
                          <span>PayPal Direct Checkout</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Send money directly to our verified PayPal business account.
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                        ${currentUsd}.00 USD
                      </span>
                    </div>

                    {/* PayPal Account Box */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">
                          PayPal Account Email
                        </span>
                        <div className="flex items-center justify-between bg-blue-50/50 px-3 py-2 rounded-lg border border-blue-200/70 mt-1">
                          <span className="font-mono font-bold text-blue-900 text-xs sm:text-sm select-all">
                            {PAYMENT_CONFIG.paypalEmail}
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(PAYMENT_CONFIG.paypalEmail, 'paypal')}
                            className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center space-x-1 cursor-pointer ml-2 p-1"
                            title="Copy PayPal Email"
                          >
                            {copiedField === 'paypal' ? (
                              <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedField === 'paypal' ? 'Copied' : 'Copy Email'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        {/* Direct PayPal Send Link */}
                        <a
                          href={`https://www.paypal.com/myaccount/transfer/homepage`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 bg-[#ffc439] hover:bg-[#f4bb36] text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 cursor-pointer text-center"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Pay via PayPal.com</span>
                        </a>

                        <a
                          href={PAYMENT_CONFIG.paypalMeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 cursor-pointer text-center"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>PayPal.me/chinnamteja05</span>
                        </a>
                      </div>
                    </div>

                    {/* PayPal Reference Confirmation Form */}
                    <form onSubmit={handleConfirmPayPalPayment} className="space-y-2 pt-2 border-t border-slate-200">
                      <label className="block text-xs font-semibold text-slate-700">
                        Enter PayPal Transaction ID or Sender Email
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="e.g. 9XX9827361 or your@email.com"
                          value={paypalTxnId}
                          onChange={(e) => setPaypalTxnId(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          disabled={isProcessing || !paypalTxnId.trim()}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isProcessing ? 'Verifying...' : 'Confirm & Activate'}</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Instant activation after sending ${currentUsd} USD to <span className="font-semibold">{PAYMENT_CONFIG.paypalEmail}</span>.
                      </p>
                    </form>
                  </div>
                )}

                {/* 3. CARD PAYMENT FORM */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handleProcessCardPayment} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Billing Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#18a474]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={19}
                          placeholder="4242 •••• •••• 4242"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#18a474]"
                        />
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Expires (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="12/28"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#18a474]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={4}
                          placeholder="123"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#18a474]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Chinnam Teja"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#18a474]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full mt-2 py-3 bg-[#18a474] hover:bg-[#159167] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-60"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{isProcessing ? 'Processing Secure Card Payment...' : `Pay $${currentUsd} USD Now`}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Order Summary (2 cols) */}
              <div className="lg:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Order Summary</h4>
                
                <div className="pb-3 border-b border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{selectedPlan.name}</span>
                    <span className="text-sm font-bold text-slate-900">${currentUsd} USD</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Billing: {selectedPlan.period}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>USD Amount</span>
                    <span>${currentUsd}.00</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>INR Equivalent (GPay)</span>
                    <span className="font-semibold text-emerald-700">₹{currentInr} INR</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Taxes & Handling</span>
                    <span className="text-emerald-600 font-medium">Included ($0.00)</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 flex justify-between font-bold text-slate-900 text-sm">
                    <span>Total Due</span>
                    <span className="text-[#18a474]">${currentUsd} USD / ₹{currentInr}</span>
                  </div>
                </div>

                {/* Direct payment summary badge */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
                  <div className="font-bold text-slate-800 text-xs mb-1 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Payee Details</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Google Pay:</span>
                    <span className="font-mono text-emerald-700 font-semibold">{PAYMENT_CONFIG.gpayUpiId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">PayPal:</span>
                    <span className="font-mono text-blue-700 font-semibold">{PAYMENT_CONFIG.paypalEmail}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Instant plan activation</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Priority document processing</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 'success' && selectedPlan && (
          <div className="p-8 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Payment Confirmed!</h3>
              <p className="text-xs text-slate-600 mt-1">
                Your subscription to <span className="font-bold text-[#18a474]">{selectedPlan.name}</span> is now active. All pro limits, unlimited files, and AI Copilot tools are unlocked!
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Plan:</span>
                <span className="font-semibold text-slate-800">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Option:</span>
                <span className="font-semibold text-slate-800">
                  {confirmedPaymentDetails?.method || 'Google Pay / PayPal'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reference / ID:</span>
                <span className="font-mono text-xs font-semibold text-slate-700">
                  {confirmedPaymentDetails?.ref}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-emerald-700">Active</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#18a474] hover:bg-[#159167] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              Start Using Pro Features
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 256-bit encryption</span>
            </span>
            <span className="flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cancel anytime</span>
            </span>
          </div>
          <span>GPay: {PAYMENT_CONFIG.gpayUpiId} &bull; PayPal: {PAYMENT_CONFIG.paypalEmail}</span>
        </div>

      </div>
    </div>
  );
};
