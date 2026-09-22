/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContractAuditResult, ExtractedDataResult } from '../types';

export const aiService = {
  async askQuestion(
    question: string,
    documentText: string,
    documentName: string
  ): Promise<string> {
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, documentText, documentName }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server responded with ${res.status}`);
    }

    const data = await res.json();
    return data.answer || 'No response returned from AI.';
  },

  async summarize(
    documentText: string,
    documentName: string,
    summaryType: 'executive' | 'bullet_points' | 'action_items' | 'key_clauses' = 'executive'
  ): Promise<string> {
    const res = await fetch('/api/ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText, documentName, summaryType }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server responded with ${res.status}`);
    }

    const data = await res.json();
    return data.summary || 'Summary unavailable.';
  },

  async translate(text: string, targetLanguage: string): Promise<string> {
    const res = await fetch('/api/ai/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLanguage }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server responded with ${res.status}`);
    }

    const data = await res.json();
    return data.translatedText || '';
  },

  async extractData(documentText: string): Promise<ExtractedDataResult> {
    const res = await fetch('/api/ai/extract-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server responded with ${res.status}`);
    }

    return await res.json();
  },

  async auditContract(documentText: string): Promise<ContractAuditResult> {
    const res = await fetch('/api/ai/analyze-contract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server responded with ${res.status}`);
    }

    return await res.json();
  },

  async rewriteText(text: string, tone: string): Promise<string> {
    const res = await fetch('/api/ai/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, tone }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server responded with ${res.status}`);
    }

    const data = await res.json();
    return data.rewrittenText || text;
  },
};
