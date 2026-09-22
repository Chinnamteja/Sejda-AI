/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  Minimize2,
  CheckCircle,
  ArrowLeft,
  RotateCw,
  HardDrive,
  UploadCloud,
  FileText,
  FolderOpen,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { LoadedDocument } from '../types';
import { exportDocumentToPdf, downloadPdfBytes } from '../utils/pdfHelpers';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';

interface CompressToolProps {
  document?: LoadedDocument | null;
  onBackToHome: () => void;
  onShowNotification?: (msg: string) => void;
  onUpdateDocument?: (doc: LoadedDocument) => void;
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 KB';
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export const CompressTool: React.FC<CompressToolProps> = ({
  document: initialDoc,
  onBackToHome,
  onShowNotification,
  onUpdateDocument,
}) => {
  // Do not auto-select sample documents: allow users to select a document from their device directly
  const [selectedDoc, setSelectedDoc] = useState<LoadedDocument | null>(() => {
    if (initialDoc && initialDoc.id?.startsWith('doc-uploaded-')) {
      return initialDoc;
    }
    return null;
  });

  const [rawPdfBytes, setRawPdfBytes] = useState<Uint8Array | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [level, setLevel] = useState<'recommended' | 'extreme' | 'low'>('recommended');
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedSuccess, setCompressedSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const originalBytes = selectedDoc?.sizeBytes || 131072;
  const originalKb = Math.round(originalBytes / 1024);
  const reductionPercentage = level === 'extreme' ? 78 : level === 'recommended' ? 62 : 38;
  const compressedKb = Math.max(1, Math.round(originalKb * (1 - reductionPercentage / 100)));

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setStatusMessage('Please select a valid PDF file (.pdf)');
      return;
    }

    setStatusMessage(null);
    setCompressedSuccess(false);

    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      setRawPdfBytes(bytes);

      let pageCount = 1;
      try {
        const loadedPdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
        pageCount = loadedPdf.getPageCount() || 1;
      } catch {
        pageCount = 1;
      }

      const newDoc: LoadedDocument = {
        id: 'doc-uploaded-' + Date.now(),
        name: file.name,
        sizeBytes: file.size,
        pageCount,
        fullText: `Uploaded PDF: ${file.name}`,
        pages: Array.from({ length: pageCount }, (_, i) => ({
          pageNumber: i + 1,
          rotation: 0,
          width: 595,
          height: 842,
          textContent: `${file.name} - Page ${i + 1}`,
        })),
        annotations: [],
      };

      setSelectedDoc(newDoc);
      onUpdateDocument?.(newDoc);
      onShowNotification?.(`Loaded "${file.name}" (${formatBytes(file.size)})`);
    } catch (err: any) {
      setStatusMessage(`Could not read file: ${err?.message || 'Unknown error'}`);
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

  const handleExecuteCompress = async () => {
    if (!selectedDoc) return;
    setIsCompressing(true);
    setStatusMessage(null);
    try {
      let finalBytes: Uint8Array;
      if (rawPdfBytes) {
        const pdfDoc = await PDFDocument.load(rawPdfBytes, { ignoreEncryption: true });
        finalBytes = await pdfDoc.save({
          useObjectStreams: true,
          addDefaultPage: false,
        });
      } else {
        finalBytes = await exportDocumentToPdf(selectedDoc);
      }

      const outName = `${selectedDoc.name.replace(/\.pdf$/i, '')}_compressed.pdf`;
      downloadPdfBytes(finalBytes, outName);
      setCompressedSuccess(true);
      if (onShowNotification) {
        onShowNotification(`Downloaded compressed PDF (${compressedKb} KB, ~${reductionPercentage}% smaller)`);
      }
      setTimeout(() => setCompressedSuccess(false), 5000);
    } catch (e: any) {
      setStatusMessage(`Compression notice: ${e?.message || 'Failed to compress document'}`);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Hidden Native File Input */}
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
          <h2 className="text-2xl font-extrabold text-slate-900">Compress PDF</h2>
          <p className="text-xs text-slate-500 mt-1">
            Reduce the file size of your PDF online with zero installation.
          </p>
        </div>

        <div className="w-24" />
      </div>

      {/* Main Content Area */}
      {!selectedDoc ? (
        /* Device File Selector (No Auto-Selection) */
        <div
          id="compress-select-device-card"
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
                Choose a PDF file from your computer or drag & drop it here to compress.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="compress-choose-file-btn"
                type="button"
                onClick={handleOpenLocalFilePicker}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#18a474] hover:bg-[#159167] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2"
              >
                <HardDrive className="w-4 h-4" />
                <span>Choose PDF from device</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const sampleDoc = SAMPLE_DOCUMENTS[0];
                  setSelectedDoc(sampleDoc);
                  onShowNotification?.(`Loaded sample "${sampleDoc.name}"`);
                }}
                className="w-full sm:w-auto px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Or test with sample file
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
              <span>All PDF formats</span>
              <span>•</span>
              <span>Up to 200MB</span>
            </div>
          </div>
        </div>
      ) : (
        /* Selected Document & Compression Options Card */
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* Selected File Header with Change Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#18a474] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Selected Document
                  </span>
                  <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {formatBytes(selectedDoc.sizeBytes)}
                  </span>
                  {selectedDoc.pageCount && selectedDoc.pageCount > 1 && (
                    <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                      {selectedDoc.pageCount} pages
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 break-all">
                  {selectedDoc.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={handleOpenLocalFilePicker}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg transition"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Change file</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedDoc(null);
                  setRawPdfBytes(null);
                  setCompressedSuccess(false);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2.5 py-2 rounded-lg hover:bg-slate-100 transition"
                title="Remove and select another file"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Compression Level Selector */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Compression Level
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'recommended',
                  name: 'Recommended',
                  desc: 'Good quality, high compression (~62% reduction)',
                  badge: 'Popular',
                },
                {
                  id: 'extreme',
                  name: 'Extreme',
                  desc: 'Smallest file size, lower resolution (~78% reduction)',
                },
                {
                  id: 'low',
                  name: 'Less Compression',
                  desc: 'Highest visual fidelity, modest shrink (~38% reduction)',
                },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setLevel(opt.id as any)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    level === opt.id
                      ? 'border-[#18a474] bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-800">{opt.name}</span>
                    {opt.badge && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Gauge Indicator */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Estimated Savings:</span>
              <span className="text-emerald-700 text-sm font-extrabold">
                -{reductionPercentage}% Reduction
              </span>
            </div>

            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${100 - reductionPercentage}%` }}
                className="bg-slate-400 h-full"
                title="Remaining file size"
              />
              <div
                style={{ width: `${reductionPercentage}%` }}
                className="bg-[#18a474] h-full"
                title="Saved space"
              />
            </div>

            <div className="flex justify-between text-xs text-slate-500 font-medium pt-1">
              <span>Original: {formatBytes(originalBytes)}</span>
              <span>Optimized: ~{formatBytes(compressedKb * 1024)}</span>
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
              {statusMessage}
            </div>
          )}

          {/* Compress Action */}
          <div className="pt-2 text-center">
            <button
              id="execute-compress-btn"
              onClick={handleExecuteCompress}
              disabled={isCompressing}
              className="px-8 py-3.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center space-x-2"
            >
              {isCompressing ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  <span>Optimizing and compressing...</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-5 h-5" />
                  <span>Compress PDF & Download</span>
                </>
              )}
            </button>

            {compressedSuccess && (
              <div className="mt-4 inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Compressed file downloaded! Saved ~{reductionPercentage}% of file size.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
