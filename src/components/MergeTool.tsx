/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Files,
  Upload,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  ArrowLeft,
  RotateCw,
  CheckCircle,
  HardDrive,
  ShieldCheck,
  FolderOpen,
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { LoadedDocument } from '../types';
import { mergeDocuments, downloadPdfBytes } from '../utils/pdfHelpers';

interface MergeToolProps {
  initialDocument?: LoadedDocument | null;
  onBackToHome: () => void;
  onShowNotification?: (msg: string) => void;
}

interface MergeDocItem {
  id: string;
  name: string;
  fullText: string;
  pageCount: number;
  sizeKb: number;
  rawBytes?: Uint8Array;
}

export const MergeTool: React.FC<MergeToolProps> = ({
  initialDocument,
  onBackToHome,
  onShowNotification,
}) => {
  // Only use initialDocument if user explicitly uploaded it from their device
  const [documents, setDocuments] = useState<MergeDocItem[]>(() => {
    if (initialDocument && initialDocument.id?.startsWith('doc-uploaded-')) {
      return [
        {
          id: initialDocument.id,
          name: initialDocument.name,
          fullText: initialDocument.fullText,
          pageCount: initialDocument.pageCount || 1,
          sizeKb: Math.max(1, Math.round((initialDocument.sizeBytes || 65536) / 1024)),
        },
      ];
    }
    return [];
  });

  const [isMerging, setIsMerging] = useState(false);
  const [mergedSuccess, setMergedSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setStatusMessage(null);
    setMergedSuccess(false);

    const newItems: MergeDocItem[] = [];

    for (const file of Array.from(files)) {
      if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
        continue;
      }
      try {
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let pageCount = 1;
        try {
          const loaded = await PDFDocument.load(bytes, { ignoreEncryption: true });
          pageCount = loaded.getPageCount() || 1;
        } catch {
          pageCount = 1;
        }

        newItems.push({
          id: 'doc-upload-' + Date.now() + Math.random().toString(36).substring(2, 7),
          name: file.name,
          fullText: `Uploaded PDF File: ${file.name}\nPages: ${pageCount}`,
          pageCount,
          sizeKb: Math.max(1, Math.round(file.size / 1024)),
          rawBytes: bytes,
        });
      } catch (err: any) {
        console.error('Failed reading file for merge:', err);
      }
    }

    if (newItems.length > 0) {
      setDocuments((prev) => [...prev, ...newItems]);
      onShowNotification?.(`Added ${newItems.length} PDF file(s) from device`);
    } else {
      setStatusMessage('Please select valid PDF documents (.pdf)');
    }
  };

  const handleOpenLocalFilePicker = async () => {
    if (typeof window !== 'undefined' && 'showOpenFilePicker' in window) {
      try {
        const fileHandles = await (window as unknown as {
          showOpenFilePicker: (opts: object) => Promise<{ getFile: () => Promise<File> }[]>;
        }).showOpenFilePicker({
          types: [
            {
              description: 'PDF Documents',
              accept: { 'application/pdf': ['.pdf'] },
            },
          ],
          multiple: true,
        });

        const files: File[] = [];
        for (const handle of fileHandles) {
          files.push(await handle.getFile());
        }
        await handleFiles(files);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    fileInputRef.current?.click();
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const copy = [...documents];
    const item = copy.splice(index, 1)[0];
    copy.splice(index - 1, 0, item);
    setDocuments(copy);
  };

  const handleMoveDown = (index: number) => {
    if (index === documents.length - 1) return;
    const copy = [...documents];
    const item = copy.splice(index, 1)[0];
    copy.splice(index + 1, 0, item);
    setDocuments(copy);
  };

  const handleRemove = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleExecuteMerge = async () => {
    if (documents.length === 0) return;
    setIsMerging(true);
    setStatusMessage(null);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of documents) {
        if (item.rawBytes) {
          const doc = await PDFDocument.load(item.rawBytes, { ignoreEncryption: true });
          const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
          copiedPages.forEach((p) => mergedPdf.addPage(p));
        } else {
          // Fallback document merger
          const dummyDoc = await PDFDocument.load(await mergeDocuments([item]));
          const copiedPages = await mergedPdf.copyPages(dummyDoc, dummyDoc.getPageIndices());
          copiedPages.forEach((p) => mergedPdf.addPage(p));
        }
      }

      const finalBytes = await mergedPdf.save();
      downloadPdfBytes(finalBytes, 'Sejda_Merged_Document.pdf');
      setMergedSuccess(true);
      if (onShowNotification) {
        onShowNotification(`Successfully merged ${documents.length} PDF files!`);
      }
      setTimeout(() => setMergedSuccess(false), 5000);
    } catch (e: any) {
      setStatusMessage(`Merge notice: ${e?.message || 'Failed to merge documents'}`);
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files);
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
          <h2 className="text-2xl font-extrabold text-slate-900">Merge PDF Files</h2>
          <p className="text-xs text-slate-500 mt-1">
            Combine multiple PDFs from your device into a single unified file.
          </p>
        </div>

        <div className="w-24" />
      </div>

      {/* Main Content: If no files selected yet, show Device Drop Zone */}
      {documents.length === 0 ? (
        <div
          id="merge-select-device-card"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files) {
              handleFiles(e.dataTransfer.files);
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
              <Files className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Select PDF files from your device
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Choose multiple PDF documents from your computer or drag & drop them here to combine.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="merge-choose-files-btn"
                type="button"
                onClick={handleOpenLocalFilePicker}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#18a474] hover:bg-[#159167] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2"
              >
                <HardDrive className="w-4 h-4" />
                <span>Choose PDF files from device</span>
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
              <span>Select multiple files at once</span>
              <span>•</span>
              <span>Reorder anytime</span>
            </div>
          </div>
        </div>
      ) : (
        /* Files Selected: Display Reorderable List */
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {documents.length} PDF {documents.length === 1 ? 'file' : 'files'} selected (drag or use arrows to reorder)
            </span>
            <button
              type="button"
              onClick={handleOpenLocalFilePicker}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#18a474] hover:text-[#159167] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add more files from device</span>
            </button>
          </div>

          {/* Document List */}
          <div className="space-y-3">
            {documents.map((doc, idx) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-[#18a474]/60 transition"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#18a474] flex items-center justify-center">
                    <Files className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 break-all">{doc.name}</h4>
                    <p className="text-xs text-slate-400">
                      {doc.pageCount} {doc.pageCount === 1 ? 'page' : 'pages'} • {doc.sizeKb} KB
                    </p>
                  </div>
                </div>

                {/* Reorder and Delete controls */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 transition"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === documents.length - 1}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 transition"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Remove from merge"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {statusMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
              {statusMessage}
            </div>
          )}

          {/* Primary Merge Action */}
          <div className="pt-4 text-center">
            <button
              id="execute-merge-btn"
              onClick={handleExecuteMerge}
              disabled={isMerging || documents.length < 2}
              className="px-8 py-3.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center space-x-2"
            >
              {isMerging ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  <span>Merging PDF files...</span>
                </>
              ) : (
                <>
                  <Files className="w-5 h-5" />
                  <span>
                    {documents.length < 2
                      ? 'Add at least 2 files to merge'
                      : `Merge ${documents.length} PDF Files`}
                  </span>
                </>
              )}
            </button>

            {mergedSuccess && (
              <div className="mt-4 inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Success! Combined PDF downloaded to your computer.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
