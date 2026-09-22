/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Scissors,
  CheckCircle,
  ArrowLeft,
  RotateCw,
  FileText,
  UploadCloud,
  HardDrive,
  ShieldCheck,
  FolderOpen,
} from 'lucide-react';
import { LoadedDocument } from '../types';
import { splitDocument, downloadPdfBytes, parsePdfFileToDocument } from '../utils/pdfHelpers';

interface SplitToolProps {
  document?: LoadedDocument | null;
  onBackToHome: () => void;
  onShowNotification?: (msg: string) => void;
  onUpdateDocument?: (doc: LoadedDocument) => void;
}

export const SplitTool: React.FC<SplitToolProps> = ({
  document: initialDoc,
  onBackToHome,
  onShowNotification,
  onUpdateDocument,
}) => {
  // Only use initialDoc if user explicitly uploaded it from device
  const [selectedDoc, setSelectedDoc] = useState<LoadedDocument | null>(() => {
    if (initialDoc && initialDoc.id?.startsWith('doc-uploaded-')) {
      return initialDoc;
    }
    return null;
  });

  const [selectedPages, setSelectedPages] = useState<number[]>([1]);
  const [splitMode, setSplitMode] = useState<'selected' | 'all' | 'half' | 'range'>('selected');
  const [customRangeText, setCustomRangeText] = useState('1');
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitSuccess, setSplitSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setStatusMessage('Please select a valid PDF file (.pdf)');
      return;
    }
    setStatusMessage(null);
    setSplitSuccess(false);

    try {
      const parsedDoc = await parsePdfFileToDocument(file);
      setSelectedDoc(parsedDoc);
      setSelectedPages([1]);
      setCustomRangeText('1');
      onUpdateDocument?.(parsedDoc);
      onShowNotification?.(`Loaded "${file.name}" (${parsedDoc.pageCount} pages)`);
    } catch (err: any) {
      setStatusMessage(`Error loading PDF: ${err?.message || 'Unknown error'}`);
    }
  };

  const handleOpenLocalFilePicker = async () => {
    if (typeof window !== 'undefined' && 'showOpenFilePicker' in window) {
      try {
        const [fileHandle] = await (window as unknown as {
          showOpenFilePicker: (opts: object) => Promise<{ getFile: () => Promise<File> }[]>;
        }).showOpenFilePicker({
          types: [
            {
              description: 'PDF Documents',
              accept: { 'application/pdf': ['.pdf'] },
            },
          ],
          multiple: false,
        });
        const file = await fileHandle.getFile();
        await handleFile(file);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    fileInputRef.current?.click();
  };

  const togglePage = (pageNumber: number) => {
    if (selectedPages.includes(pageNumber)) {
      if (selectedPages.length === 1) return; // Keep at least one page
      setSelectedPages(selectedPages.filter((p) => p !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber].sort((a, b) => a - b));
    }
  };

  const handleSelectAll = () => {
    if (!selectedDoc) return;
    setSelectedPages(selectedDoc.pages.map((p) => p.pageNumber));
  };

  const handleRangeChange = (val: string) => {
    if (!selectedDoc) return;
    setCustomRangeText(val);
    const parsed: number[] = [];
    const parts = val.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [startStr, endStr] = trimmed.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
            if (i >= 1 && i <= selectedDoc.pages.length && !parsed.includes(i)) {
              parsed.push(i);
            }
          }
        }
      } else {
        const num = parseInt(trimmed, 10);
        if (!isNaN(num) && num >= 1 && num <= selectedDoc.pages.length && !parsed.includes(num)) {
          parsed.push(num);
        }
      }
    }
    if (parsed.length > 0) {
      setSelectedPages(parsed.sort((a, b) => a - b));
    }
  };

  const handleExecuteSplit = async () => {
    if (!selectedDoc) return;
    setIsSplitting(true);
    setStatusMessage(null);
    try {
      let pagesToExtract = selectedPages;
      if (splitMode === 'half') {
        const halfCount = Math.ceil(selectedDoc.pages.length / 2);
        pagesToExtract = selectedDoc.pages.slice(0, halfCount).map((p) => p.pageNumber);
      } else if (splitMode === 'all') {
        pagesToExtract = selectedDoc.pages.map((p) => p.pageNumber);
      }

      if (pagesToExtract.length === 0) {
        pagesToExtract = [1];
      }

      const splitBytes = await splitDocument(selectedDoc, pagesToExtract);
      const outName = `${selectedDoc.name.replace(/\.pdf$/i, '')}_split_extracted.pdf`;
      downloadPdfBytes(splitBytes, outName);
      setSplitSuccess(true);
      if (onShowNotification) {
        onShowNotification(`Downloaded "${outName}" (${pagesToExtract.length} pages)`);
      }
      setTimeout(() => setSplitSuccess(false), 5000);
    } catch (e: any) {
      setStatusMessage(`Split notice: ${e?.message || 'Failed to split document'}`);
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tools</span>
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">Split PDF by Pages</h2>
          <p className="text-xs text-slate-500 mt-1">
            Extract separate pages, split into halves, or extract custom ranges.
          </p>
        </div>

        <div className="w-24" />
      </div>

      {/* Main Content Area: Device File Selector OR Split Controls */}
      {!selectedDoc ? (
        <div
          id="split-select-device-card"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          className={`mt-8 bg-white p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all text-center ${
            isDragging
              ? 'border-[#18a474] bg-emerald-50/50 ring-4 ring-emerald-500/10'
              : 'border-slate-300 hover:border-slate-400 bg-white shadow-xs'
          }`}
        >
          <div className="max-w-md mx-auto space-y-5">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#18a474]">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Select PDF from your device
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Choose a PDF file from your computer or drag & drop it here to split.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="split-choose-file-btn"
                type="button"
                onClick={handleOpenLocalFilePicker}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#18a474] hover:bg-[#159167] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2"
              >
                <HardDrive className="w-4 h-4" />
                <span>Choose PDF from device</span>
              </button>
            </div>

            {statusMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {statusMessage}
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Private local processing
              </span>
              <span>•</span>
              <span>Extract any pages</span>
              <span>•</span>
              <span>No file uploads to external servers</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {/* Active File Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18a474] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 break-all">{selectedDoc.name}</h4>
                <p className="text-xs text-slate-500">
                  {selectedDoc.pages.length} {selectedDoc.pages.length === 1 ? 'page' : 'pages'} •{' '}
                  {Math.round((selectedDoc.sizeBytes || 65536) / 1024)} KB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenLocalFilePicker}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Change file</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Split Mode Options */}
          <div className="flex justify-center flex-wrap gap-2.5">
            {[
              { id: 'selected', label: 'Extract Selected Pages' },
              { id: 'half', label: 'Split in Half' },
              { id: 'all', label: 'Extract All Pages' },
              { id: 'range', label: 'Custom Range' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSplitMode(opt.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                  splitMode === opt.id
                    ? 'bg-[#18a474] text-white border-[#18a474] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Custom Range input if selected */}
          {splitMode === 'range' && (
            <div className="max-w-md mx-auto bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Enter Page Numbers or Ranges (e.g. 1-2 or 1, 3):
              </label>
              <input
                type="text"
                value={customRangeText}
                onChange={(e) => handleRangeChange(e.target.value)}
                placeholder="e.g. 1, 2-3"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-center font-mono focus:ring-2 focus:ring-[#18a474]"
              />
              <p className="text-[11px] text-slate-400">
                Selected {selectedPages.length} {selectedPages.length === 1 ? 'page' : 'pages'}:{' '}
                {selectedPages.join(', ')}
              </p>
            </div>
          )}

          {/* Visual Page Thumbnails Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Document Pages ({selectedDoc.pages.length} total) • Click to select
              </span>
              <button
                onClick={handleSelectAll}
                className="text-xs text-[#18a474] hover:underline font-semibold"
              >
                Select All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedDoc.pages.map((p) => {
                const isSelected = selectedPages.includes(p.pageNumber);
                return (
                  <div
                    key={p.pageNumber}
                    onClick={() => togglePage(p.pageNumber)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#18a474] bg-emerald-50/40 shadow-sm scale-[1.02]'
                        : 'border-slate-200 bg-white hover:border-slate-300 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">Page {p.pageNumber}</span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white transition ${
                          isSelected ? 'bg-[#18a474]' : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {isSelected ? '✓' : ''}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-md h-28 overflow-hidden text-[9px] text-slate-500 font-serif leading-tight">
                      {p.textContent.slice(0, 180)}...
                    </div>

                    <span className="mt-2 text-[10px] text-center font-medium text-slate-400">
                      {isSelected ? 'Selected for extraction' : 'Excluded'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
              {statusMessage}
            </div>
          )}

          {/* Primary Split Action */}
          <div className="pt-4 text-center">
            <button
              id="execute-split-btn"
              onClick={handleExecuteSplit}
              disabled={isSplitting || selectedPages.length === 0}
              className="px-8 py-3.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center space-x-2"
            >
              {isSplitting ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  <span>Extracting pages...</span>
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  <span>
                    Split & Download (
                    {splitMode === 'half'
                      ? 'First Half'
                      : splitMode === 'all'
                      ? 'All Pages'
                      : `${selectedPages.length} Pages`}
                    )
                  </span>
                </>
              )}
            </button>

            {splitSuccess && (
              <div className="mt-4 inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Success! Extracted PDF has been downloaded.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
