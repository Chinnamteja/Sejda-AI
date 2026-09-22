/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  FileText,
  Languages,
  Table,
  ShieldAlert,
  Feather,
  Send,
  X,
  Copy,
  Check,
  Download,
  AlertTriangle,
  RotateCcw,
  Plus,
} from 'lucide-react';
import { LoadedDocument, ChatMessage, ContractAuditResult, ExtractedDataResult } from '../types';
import { aiService } from '../services/aiService';

interface AiCopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  document: LoadedDocument;
  onAddAnnotation?: (text: string) => void;
  initialTab?: 'chat' | 'summary' | 'translate' | 'extract' | 'audit' | 'rewrite';
}

export const AiCopilotDrawer: React.FC<AiCopilotDrawerProps> = ({
  isOpen,
  onClose,
  document,
  onAddAnnotation,
  initialTab = 'chat',
}) => {
  const [activeTab, setActiveTab] = useState<
    'chat' | 'summary' | 'translate' | 'extract' | 'audit' | 'rewrite'
  >(initialTab);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg',
      sender: 'ai',
      text: `Hello! I am Sejda AI. I've analyzed **${document.name}** (${document.pageCount} ${
        document.pageCount === 1 ? 'page' : 'pages'
      }). What would you like to know or accomplish with this document?`,
      timestamp: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Summary State
  const [summaryType, setSummaryType] = useState<
    'executive' | 'bullet_points' | 'action_items' | 'key_clauses'
  >('executive');
  const [summaryResult, setSummaryResult] = useState<string>('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  // Translate State
  const [targetLang, setTargetLang] = useState('Spanish');
  const [translatedResult, setTranslatedResult] = useState<string>('');
  const [isTranslateLoading, setIsTranslateLoading] = useState(false);

  // Extract State
  const [extractedData, setExtractedData] = useState<ExtractedDataResult | null>(null);
  const [isExtractLoading, setIsExtractLoading] = useState(false);

  // Audit State
  const [auditResult, setAuditResult] = useState<ContractAuditResult | null>(null);
  const [isAuditLoading, setIsAuditLoading] = useState(false);

  // Rewrite State
  const [rewriteInput, setRewriteInput] = useState(document.fullText.slice(0, 500));
  const [rewriteTone, setRewriteTone] = useState('professional legal style');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isRewriteLoading, setIsRewriteLoading] = useState(false);

  // Copied alert helper
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // --- Handlers ---
  const handleSendMessage = async (textToSend?: string) => {
    const q = textToSend || chatInput;
    if (!q.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const answer = await aiService.askQuestion(q, document.fullText, document.name);
      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e: any) {
      const errMsg: ChatMessage = {
        id: 'ai-err-' + Date.now(),
        sender: 'ai',
        text: `Error processing request: ${e?.message || 'Unknown error'}. Please try again.`,
        timestamp: 'Error',
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    setIsSummaryLoading(true);
    try {
      const res = await aiService.summarize(document.fullText, document.name, summaryType);
      setSummaryResult(res);
    } catch (e: any) {
      setSummaryResult(`Error generating summary: ${e?.message || 'Unknown error'}`);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleTranslate = async () => {
    setIsTranslateLoading(true);
    try {
      const res = await aiService.translate(document.fullText, targetLang);
      setTranslatedResult(res);
    } catch (e: any) {
      setTranslatedResult(`Translation error: ${e?.message || 'Unknown error'}`);
    } finally {
      setIsTranslateLoading(false);
    }
  };

  const handleExtractData = async () => {
    setIsExtractLoading(true);
    try {
      const data = await aiService.extractData(document.fullText);
      setExtractedData(data);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsExtractLoading(false);
    }
  };

  const handleAuditContract = async () => {
    setIsAuditLoading(true);
    try {
      const res = await aiService.auditContract(document.fullText);
      setAuditResult(res);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsAuditLoading(false);
    }
  };

  const handleRewrite = async () => {
    setIsRewriteLoading(true);
    try {
      const res = await aiService.rewriteText(rewriteInput, rewriteTone);
      setRewrittenText(res);
    } catch (e: any) {
      setRewrittenText(`Rewrite error: ${e?.message || 'Unknown error'}`);
    } finally {
      setIsRewriteLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] lg:w-[520px] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-[#f8faf9]">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-bold text-slate-800 text-sm">Sejda AI Copilot</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-sm">
                Gemini 3.8
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate max-w-[240px]">
              Document: {document.name}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 px-3 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition shrink-0 ${
            activeTab === 'chat'
              ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Ask PDF</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            if (!summaryResult) handleGenerateSummary();
          }}
          className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition shrink-0 ${
            activeTab === 'summary'
              ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Summary</span>
        </button>
        <button
          onClick={() => setActiveTab('translate')}
          className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition shrink-0 ${
            activeTab === 'translate'
              ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>Translate</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('extract');
            if (!extractedData) handleExtractData();
          }}
          className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition shrink-0 ${
            activeTab === 'extract'
              ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Extract Data</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('audit');
            if (!auditResult) handleAuditContract();
          }}
          className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition shrink-0 ${
            activeTab === 'audit'
              ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Audit Risk</span>
        </button>
        <button
          onClick={() => setActiveTab('rewrite')}
          className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition shrink-0 ${
            activeTab === 'rewrite'
              ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Feather className="w-3.5 h-3.5" />
          <span>Rewrite</span>
        </button>
      </div>

      {/* Main Tab Content Viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 1. CHAT / ASK PDF */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full space-y-3">
            {/* Suggested Prompts */}
            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
              {[
                'What are the main obligations?',
                'What are the key dates and deadlines?',
                'Summarize the key financial terms',
                'Is there any termination clause?',
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-2.5 py-1 rounded-full transition"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#18a474] text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/60'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  </div>

                  <div className="flex items-center space-x-2 mt-1 px-1 text-[11px] text-slate-400">
                    <span>{m.timestamp}</span>
                    {m.sender === 'ai' && (
                      <>
                        <button
                          onClick={() => triggerCopy(m.text, m.id)}
                          className="hover:text-slate-700 transition"
                          title="Copy response"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                        {onAddAnnotation && (
                          <button
                            onClick={() => onAddAnnotation(m.text.slice(0, 100))}
                            className="hover:text-emerald-700 transition flex items-center space-x-0.5 text-emerald-600 font-medium"
                            title="Insert as PDF note"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add to PDF</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-center space-x-2 p-3 bg-slate-100 rounded-xl max-w-[70%] text-xs text-slate-600 animate-pulse">
                  <Sparkles className="w-4 h-4 text-[#18a474] animate-spin" />
                  <span>Sejda AI is analyzing document...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="pt-2 border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask any question about this PDF..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#18a474] focus:bg-white transition"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="p-2.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-40 text-white rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 2. SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
              <span className="font-semibold text-slate-600">Summary Format:</span>
              <div className="flex space-x-1">
                {(
                  [
                    { id: 'executive', label: 'Executive' },
                    { id: 'bullet_points', label: 'Bullets' },
                    { id: 'action_items', label: 'Action Items' },
                    { id: 'key_clauses', label: 'Key Clauses' },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSummaryType(s.id);
                      setTimeout(handleGenerateSummary, 50);
                    }}
                    className={`px-2 py-1 rounded-md transition ${
                      summaryType === s.id
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {isSummaryLoading ? (
              <div className="p-8 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#18a474] mx-auto animate-spin" />
                <p className="text-sm font-semibold text-slate-700">
                  Synthesizing document intelligence...
                </p>
                <p className="text-xs text-slate-400">
                  Analyzing key findings, obligations, and takeaways
                </p>
              </div>
            ) : summaryResult ? (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase text-slate-500">
                    Generated Summary
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => triggerCopy(summaryResult, 'summary')}
                      className="text-xs text-slate-600 hover:text-emerald-700 flex items-center space-x-1 px-2 py-1 bg-white rounded-md border border-slate-200"
                    >
                      {copiedId === 'summary' ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>Copy</span>
                    </button>
                    {onAddAnnotation && (
                      <button
                        onClick={() => onAddAnnotation(summaryResult.slice(0, 140))}
                        className="text-xs text-emerald-700 hover:bg-emerald-50 flex items-center space-x-1 px-2 py-1 bg-white rounded-md border border-emerald-300 font-semibold"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Note to PDF</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {summaryResult}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <button
                  onClick={handleGenerateSummary}
                  className="px-5 py-2.5 bg-[#18a474] hover:bg-[#159167] text-white rounded-xl text-sm font-bold shadow-xs transition"
                >
                  Generate Executive Summary
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. TRANSLATE */}
        {activeTab === 'translate' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="text-xs font-semibold text-slate-700">Target Language:</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#18a474]"
              >
                {[
                  'Spanish',
                  'French',
                  'German',
                  'Japanese',
                  'Chinese (Simplified)',
                  'Arabic',
                  'Portuguese',
                  'Italian',
                  'Hindi',
                  'Korean',
                  'Dutch',
                  'Polish',
                  'Russian',
                ].map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTranslate}
                disabled={isTranslateLoading}
                className="ml-auto px-4 py-1.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>Translate PDF</span>
              </button>
            </div>

            {isTranslateLoading ? (
              <div className="p-8 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#18a474] mx-auto animate-spin" />
                <p className="text-sm font-semibold text-slate-700">Translating to {targetLang}...</p>
                <p className="text-xs text-slate-400">Preserving legal context and formatting</p>
              </div>
            ) : translatedResult ? (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase text-slate-500">
                    Translated Content ({targetLang})
                  </span>
                  <button
                    onClick={() => triggerCopy(translatedResult, 'translate')}
                    className="text-xs text-slate-600 hover:text-emerald-700 flex items-center space-x-1 px-2.5 py-1 bg-white rounded-md border border-slate-200"
                  >
                    {copiedId === 'translate' ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>Copy Translation</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {translatedResult}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                Click "Translate PDF" above to convert the full document into {targetLang}.
              </div>
            )}
          </div>
        )}

        {/* 4. EXTRACT DATA & TABLES */}
        {activeTab === 'extract' && (
          <div className="space-y-4">
            {isExtractLoading ? (
              <div className="p-8 text-center space-y-3">
                <Table className="w-8 h-8 text-[#18a474] mx-auto animate-pulse" />
                <p className="text-sm font-semibold text-slate-700">
                  Extracting tabular records, line items, and entities...
                </p>
              </div>
            ) : extractedData ? (
              <div className="space-y-4">
                {/* Key Metrics Grid */}
                {extractedData.keyMetrics && extractedData.keyMetrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {extractedData.keyMetrics.map((m, i) => (
                      <div key={i} className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                          {m.label}
                        </span>
                        <span className="text-sm font-extrabold text-slate-900 mt-0.5 block truncate">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Parties & Dates */}
                {(extractedData.parties || extractedData.dates) && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
                    {extractedData.documentType && (
                      <p>
                        <strong className="text-slate-700">Doc Type:</strong>{' '}
                        {extractedData.documentType}
                      </p>
                    )}
                    {extractedData.parties && extractedData.parties.length > 0 && (
                      <p>
                        <strong className="text-slate-700">Parties:</strong>{' '}
                        {extractedData.parties.join(', ')}
                      </p>
                    )}
                    {extractedData.dates && extractedData.dates.length > 0 && (
                      <p>
                        <strong className="text-slate-700">Key Dates:</strong>{' '}
                        {extractedData.dates.join(', ')}
                      </p>
                    )}
                  </div>
                )}

                {/* Tables */}
                {extractedData.tables && extractedData.tables.length > 0 ? (
                  extractedData.tables.map((table, tIdx) => (
                    <div key={tIdx} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                      <div className="px-3 py-2 bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>{table.title || `Table #${tIdx + 1}`}</span>
                        <button
                          onClick={() => {
                            const csv = [
                              table.headers.join(','),
                              ...table.rows.map((r) => r.join(',')),
                            ].join('\n');
                            const blob = new Blob([csv], { type: 'text/csv' });
                            const url = URL.createObjectURL(blob);
                            const a = window.document.createElement('a');
                            a.href = url;
                            a.download = `${document.name.replace('.pdf', '')}_table_${tIdx + 1}.csv`;
                            a.click();
                          }}
                          className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center space-x-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Export CSV</span>
                        </button>
                      </div>
                      <div className="overflow-x-auto max-h-56">
                        <table className="w-full text-[11px] text-left">
                          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                            <tr>
                              {table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-2 font-semibold whitespace-nowrap">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2 text-slate-800 whitespace-nowrap">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">No structured multi-column tables identified.</p>
                )}

                <button
                  onClick={() => triggerCopy(JSON.stringify(extractedData, null, 2), 'raw-json')}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
                >
                  {copiedId === 'raw-json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Complete JSON</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <button
                  onClick={handleExtractData}
                  className="px-4 py-2 bg-[#18a474] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#159167] transition"
                >
                  Extract Tables & Data
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. AUDIT RISK */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            {isAuditLoading ? (
              <div className="p-8 text-center space-y-3">
                <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto animate-pulse" />
                <p className="text-sm font-semibold text-slate-700">
                  Scanning for legal risk, liabilities, and missing clauses...
                </p>
              </div>
            ) : auditResult ? (
              <div className="space-y-4">
                {/* Risk Gauge Header */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    auditResult.riskScore === 'High'
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : auditResult.riskScore === 'Medium'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider block">
                      Overall Risk Score
                    </span>
                    <span className="text-xl font-extrabold">{auditResult.riskScore} Risk</span>
                    <p className="text-xs mt-1 opacity-90">{auditResult.rationale}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-xs ${
                      auditResult.riskScore === 'High'
                        ? 'bg-rose-600'
                        : auditResult.riskScore === 'Medium'
                        ? 'bg-amber-500'
                        : 'bg-[#18a474]'
                    }`}
                  >
                    {auditResult.riskScore === 'High' ? '!' : '✓'}
                  </div>
                </div>

                {/* Risky Clauses */}
                {auditResult.riskyClauses && auditResult.riskyClauses.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-slate-500">
                      Highlighted Clauses & Recommendations
                    </span>
                    {auditResult.riskyClauses.map((c, i) => (
                      <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{c.clause}</span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                              c.severity === 'high'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {c.severity}
                          </span>
                        </div>
                        <p className="text-slate-600">
                          <strong className="text-slate-700">Risk:</strong> {c.risk}
                        </p>
                        <p className="text-emerald-800 bg-emerald-50 p-1.5 rounded-md font-medium">
                          <strong>Redline:</strong> {c.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Missing Protections */}
                {auditResult.missingProtections && auditResult.missingProtections.length > 0 && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-slate-700 block">Missing Standard Protections:</span>
                    <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                      {auditResult.missingProtections.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <button
                  onClick={handleAuditContract}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-slate-800 transition"
                >
                  Run Compliance & Risk Audit
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. REWRITE & POLISH */}
        {activeTab === 'rewrite' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Text to Polish or Rephrase:
              </label>
              <textarea
                value={rewriteInput}
                onChange={(e) => setRewriteInput(e.target.value)}
                rows={4}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#18a474] focus:bg-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-xs font-semibold text-slate-700">Tone:</label>
              <select
                value={rewriteTone}
                onChange={(e) => setRewriteTone(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800"
              >
                <option value="professional legal style">Professional Legal</option>
                <option value="clear concise plain english">Plain English (Simple)</option>
                <option value="executive boardroom tone">Executive Brief</option>
                <option value="diplomatic business friendly">Diplomatic / Friendly</option>
              </select>
              <button
                onClick={handleRewrite}
                disabled={isRewriteLoading || !rewriteInput.trim()}
                className="ml-auto px-4 py-1.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Polish Text</span>
              </button>
            </div>

            {isRewriteLoading ? (
              <div className="p-6 text-center text-xs text-slate-500 animate-pulse">
                Refining text syntax and tone...
              </div>
            ) : rewrittenText ? (
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Rewritten Result:</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => triggerCopy(rewrittenText, 'rewrite')}
                      className="text-emerald-700 hover:underline flex items-center space-x-1"
                    >
                      {copiedId === 'rewrite' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                    {onAddAnnotation && (
                      <button
                        onClick={() => onAddAnnotation(rewrittenText)}
                        className="text-emerald-700 hover:underline font-bold"
                      >
                        Insert into PDF
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {rewrittenText}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
