/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  RotateCw,
  Trash2,
  CheckCircle,
  ArrowLeft,
  Download,
  RotateCcw,
  ArrowLeft as MoveLeft,
  ArrowRight as MoveRight,
  FileText,
  UploadCloud,
  HardDrive,
  ShieldCheck,
  FolderOpen,
} from 'lucide-react';
import { LoadedDocument, DocumentPage } from '../types';
import { exportDocumentToPdf, downloadPdfBytes, parsePdfFileToDocument } from '../utils/pdfHelpers';

interface OrganizeToolProps {
  document?: LoadedDocument | null;
  onUpdateDocument?: (doc: LoadedDocument) => void;
  onBackToHome: () => void;
  onShowNotification?: (msg: string) => void;
}

export const OrganizeTool: React.FC<OrganizeToolProps> = ({
  document: initialDoc,
  onUpdateDocument,
  onBackToHome,
  onShowNotification,
}) => {
  // Only use initialDoc if uploaded by user from device
  const [selectedDoc, setSelectedDoc] = useState<LoadedDocument | null>(() => {
    if (initialDoc && initialDoc.id?.startsWith('doc-uploaded-')) {
      return initialDoc;
    }
    return null;
  });

  const [pages, setPages] = useState<DocumentPage[]>(() => {
    if (initialDoc && initialDoc.id?.startsWith('doc-uploaded-')) {
      return initialDoc.pages;
    }
    return [];
  });

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);

    try {
      const parsedDoc = await parsePdfFileToDocument(file);
      setSelectedDoc(parsedDoc);
      setPages(parsedDoc.pages);
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

  const rotatePage = (pageNumber: number) => {
    setPages((prev) =>
      prev.map((p) =>
        p.pageNumber === pageNumber
          ? { ...p, rotation: (p.rotation + 90) % 360 }
          : p
      )
    );
  };

  const rotateAllPages = () => {
    setPages((prev) =>
      prev.map((p) => ({ ...p, rotation: (p.rotation + 90) % 360 }))
    );
  };

  const movePage = (index: number, delta: number) => {
    const targetIdx = index + delta;
    if (targetIdx < 0 || targetIdx >= pages.length) return;
    const copy = [...pages];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    setPages(copy);
  };

  const deletePage = (pageNumber: number) => {
    const remaining = pages.filter((p) => !p.isDeleted);
    if (remaining.length <= 1) {
      setStatusMessage('A document must have at least one active page.');
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }
    setPages((prev) =>
      prev.map((p) =>
        p.pageNumber === pageNumber ? { ...p, isDeleted: true } : p
      )
    );
  };

  const handleApplyChanges = async () => {
    if (!selectedDoc) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const activePages = pages.filter((p) => !p.isDeleted);
      const updatedDoc = {
        ...selectedDoc,
        pages: activePages.map((p, idx) => ({ ...p, pageNumber: idx + 1 })),
        pageCount: activePages.length,
      };
      onUpdateDocument?.(updatedDoc);
      const pdfBytes = await exportDocumentToPdf(updatedDoc);
      const outName = `${selectedDoc.name.replace(/\.pdf$/i, '')}_organized.pdf`;
      downloadPdfBytes(pdfBytes, outName);
      setSuccess(true);
      if (onShowNotification) {
        onShowNotification(`Downloaded organized PDF "${outName}" (${activePages.length} pages)`);
      }
      setTimeout(() => setSuccess(false), 5000);
    } catch (e: any) {
      setStatusMessage(`Error saving changes: ${e?.message || 'Failed'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const activePages = pages.filter((p) => !p.isDeleted);

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
          <h2 className="text-2xl font-extrabold text-slate-900">Rotate & Organize PDF Pages</h2>
          <p className="text-xs text-slate-500 mt-1">
            Rotate individual pages, reorder sheets, or delete unwanted pages.
          </p>
        </div>

        {selectedDoc && activePages.length > 0 ? (
          <button
            onClick={rotateAllPages}
            className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition flex items-center space-x-1"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Rotate All 90°</span>
          </button>
        ) : (
          <div className="w-24" />
        )}
      </div>

      {!selectedDoc ? (
        <div
          id="organize-select-device-card"
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
                Choose a PDF file from your computer or drag & drop it here to rotate, reorder, or organize pages.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="organize-choose-file-btn"
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
              <span>Reorder & rotate</span>
              <span>•</span>
              <span>Delete unwanted sheets</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {/* Selected File Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18a474] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 break-all">{selectedDoc.name}</h4>
                <p className="text-xs text-slate-500">
                  {activePages.length} active {activePages.length === 1 ? 'page' : 'pages'} •{' '}
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
                onClick={() => {
                  setSelectedDoc(null);
                  setPages([]);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition"
              >
                Clear
              </button>
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
              {statusMessage}
            </div>
          )}

          {/* Pages Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {activePages.map((p, idx) => (
              <div
                key={p.pageNumber}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">Sheet #{idx + 1}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{p.rotation}°</span>
                </div>

                {/* Simulated Page Thumbnail with dynamic rotation */}
                <div className="h-44 bg-slate-50 rounded-lg border border-slate-200 p-2 overflow-hidden flex items-center justify-center">
                  <div
                    style={{
                      transform: `rotate(${p.rotation}deg)`,
                      transition: 'transform 0.2s ease',
                    }}
                    className="w-28 h-36 bg-white shadow-2xs border border-slate-200 p-2 text-[7px] text-slate-400 font-serif overflow-hidden select-none"
                  >
                    {p.textContent.slice(0, 160)}...
                  </div>
                </div>

                {/* Reorder and Individual Actions */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => movePage(idx, -1)}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-md hover:bg-slate-100 transition"
                      title="Move page left"
                    >
                      <MoveLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => movePage(idx, 1)}
                      disabled={idx === activePages.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-md hover:bg-slate-100 transition"
                      title="Move page right"
                    >
                      <MoveRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => rotatePage(p.pageNumber)}
                      className="p-1.5 text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition flex items-center space-x-0.5"
                      title="Rotate 90°"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deletePage(p.pageNumber)}
                      className="p-1.5 text-xs text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
                      title="Delete page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Save Action */}
          <div className="pt-4 text-center">
            <button
              onClick={handleApplyChanges}
              disabled={isSaving}
              className="px-8 py-3.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-xl text-base font-bold shadow-md hover:shadow-lg transition inline-flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  <span>Applying reorganizations...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Save & Download Organized PDF</span>
                </>
              )}
            </button>

            {success && (
              <div className="mt-4 inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Success! Downloaded updated PDF with requested page modifications.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
