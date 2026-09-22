/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Stamp,
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
import { applyWatermarkToDocument, downloadPdfBytes, parsePdfFileToDocument } from '../utils/pdfHelpers';

interface WatermarkToolProps {
  document?: LoadedDocument | null;
  onBackToHome: () => void;
  onShowNotification?: (msg: string) => void;
  onUpdateDocument?: (doc: LoadedDocument) => void;
}

export const WatermarkTool: React.FC<WatermarkToolProps> = ({
  document: initialDoc,
  onBackToHome,
  onShowNotification,
  onUpdateDocument,
}) => {
  // Only use initialDoc if uploaded by user from device
  const [selectedDoc, setSelectedDoc] = useState<LoadedDocument | null>(() => {
    if (initialDoc && initialDoc.id?.startsWith('doc-uploaded-')) {
      return initialDoc;
    }
    return null;
  });

  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(25);
  const [angle, setAngle] = useState<number>(45);
  const [color, setColor] = useState('#64748b');
  const [isApplying, setIsApplying] = useState(false);
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

  const handleApplyWatermark = async () => {
    if (!selectedDoc || !watermarkText.trim()) return;
    setIsApplying(true);
    setStatusMessage(null);
    try {
      const pdfBytes = await applyWatermarkToDocument(
        selectedDoc,
        watermarkText,
        opacity / 100,
        color,
        angle
      );
      const outName = `${selectedDoc.name.replace(/\.pdf$/i, '')}_watermarked.pdf`;
      downloadPdfBytes(pdfBytes, outName);
      setSuccess(true);
      if (onShowNotification) {
        onShowNotification(`Downloaded watermarked PDF "${outName}"`);
      }
      setTimeout(() => setSuccess(false), 5000);
    } catch (e: any) {
      setStatusMessage(`Watermark notice: ${e?.message || 'Failed to apply watermark'}`);
    } finally {
      setIsApplying(false);
    }
  };

  const previewPage = selectedDoc?.pages[0];

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
          <h2 className="text-2xl font-extrabold text-slate-900">Watermark PDF</h2>
          <p className="text-xs text-slate-500 mt-1">
            Apply stamp or text watermark across your document pages.
          </p>
        </div>

        <div className="w-24" />
      </div>

      {!selectedDoc ? (
        <div
          id="watermark-select-device-card"
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
                Choose a PDF file from your computer or drag & drop it here to watermark.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="watermark-choose-file-btn"
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
              <span>Stamps & text watermarks</span>
              <span>•</span>
              <span>Custom angle & opacity</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Controls */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="e.g. CONFIDENTIAL, DRAFT, SAMPLE"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#18a474]"
                />
              </div>

              {/* Quick presets */}
              <div className="flex flex-wrap gap-2">
                {['CONFIDENTIAL', 'DRAFT', 'COPY', 'APPROVED', 'DO NOT SHARE'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setWatermarkText(preset)}
                    className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-md font-medium transition"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Angle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Orientation
                </label>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setAngle(45)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                      angle === 45
                        ? 'bg-[#18a474] text-white border-[#18a474]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Diagonal (45°)
                  </button>
                  <button
                    onClick={() => setAngle(0)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                      angle === 0
                        ? 'bg-[#18a474] text-white border-[#18a474]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Horizontal (0°)
                  </button>
                </div>
              </div>

              {/* Opacity slider */}
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  <span>Opacity</span>
                  <span className="text-emerald-700">{opacity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full accent-[#18a474]"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Color
                </label>
                <div className="flex space-x-2">
                  {[
                    { hex: '#64748b', name: 'Slate Gray' },
                    { hex: '#b91c1c', name: 'Crimson Red' },
                    { hex: '#18a474', name: 'Emerald' },
                    { hex: '#1d4ed8', name: 'Royal Blue' },
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setColor(c.hex)}
                      className={`w-8 h-8 rounded-full border-2 transition ${
                        color === c.hex ? 'ring-2 ring-slate-800 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {statusMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
                  {statusMessage}
                </div>
              )}

              {/* Action button */}
              <div className="pt-3">
                <button
                  id="apply-watermark-btn"
                  onClick={handleApplyWatermark}
                  disabled={isApplying || !watermarkText.trim()}
                  className="w-full py-3.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
                >
                  {isApplying ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Stamping watermark...</span>
                    </>
                  ) : (
                    <>
                      <Stamp className="w-4 h-4" />
                      <span>Watermark PDF & Download</span>
                    </>
                  )}
                </button>

                {success && (
                  <div className="mt-3 text-center text-xs font-semibold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Watermarked PDF downloaded successfully!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Live Page Preview */}
            <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Live Watermark Preview
              </span>

              <div className="relative bg-white w-72 h-96 rounded-lg shadow-lg border border-slate-300 p-5 overflow-hidden select-none">
                <div className="text-[8px] text-slate-400 font-serif leading-relaxed line-clamp-15 opacity-60">
                  {previewPage?.textContent.slice(0, 500)}
                </div>

                {/* Watermark Overlay */}
                <div
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle === 45 ? '-45deg' : '0deg'})`,
                    color,
                    opacity: opacity / 100,
                  }}
                  className="absolute left-1/2 top-1/2 font-extrabold text-2xl tracking-widest pointer-events-none uppercase text-center border-4 px-4 py-1"
                >
                  {watermarkText || 'WATERMARK'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
