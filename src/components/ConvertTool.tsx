/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Image,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  ArrowLeft,
  RotateCw,
  Plus,
  HardDrive,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import { convertImagesToPdf, downloadPdfBytes } from '../utils/pdfHelpers';

interface ConvertToolProps {
  onBackToHome: () => void;
  onShowNotification?: (msg: string) => void;
}

export const ConvertTool: React.FC<ConvertToolProps> = ({ onBackToHome, onShowNotification }) => {
  // Start with empty images list so user selects files from device
  const [images, setImages] = useState<{ id: string; name: string; dataUrl: string }[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setStatusMessage(null);
    setSuccess(false);

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImages((prev) => [
            ...prev,
            {
              id: 'img-' + Date.now() + Math.random().toString(36).substring(2, 7),
              name: file.name,
              dataUrl: ev.target!.result as string,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleOpenLocalFilePicker = async () => {
    if (typeof window !== 'undefined' && 'showOpenFilePicker' in window) {
      try {
        const fileHandles = await (window as unknown as {
          showOpenFilePicker: (opts: object) => Promise<{ getFile: () => Promise<File> }[]>;
        }).showOpenFilePicker({
          types: [
            {
              description: 'Images (PNG, JPG, JPEG, WEBP)',
              accept: {
                'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
              },
            },
          ],
          multiple: true,
        });
        const files: File[] = [];
        for (const handle of fileHandles) {
          files.push(await handle.getFile());
        }
        handleFiles(files);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    fileInputRef.current?.click();
  };

  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleExecuteConvert = async () => {
    if (images.length === 0) return;
    setIsConverting(true);
    setStatusMessage(null);
    try {
      const pdfBytes = await convertImagesToPdf(images);
      downloadPdfBytes(pdfBytes, 'Converted_Images_Document.pdf');
      setSuccess(true);
      if (onShowNotification) {
        onShowNotification(`Downloaded "Converted_Images_Document.pdf" (${images.length} images converted)`);
      }
      setTimeout(() => setSuccess(false), 5000);
    } catch (e: any) {
      setStatusMessage(`Conversion notice: ${e?.message || 'Failed to convert images'}`);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
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
          <h2 className="text-2xl font-extrabold text-slate-900">JPG to PDF Online</h2>
          <p className="text-xs text-slate-500 mt-1">
            Convert JPG, PNG, and photos from your device into a clean multi-page PDF document.
          </p>
        </div>

        <div className="w-24" />
      </div>

      {images.length === 0 ? (
        <div
          id="convert-select-device-card"
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
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Select images from your device
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Choose JPG, PNG, or photo files from your computer to assemble into a PDF.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="convert-choose-images-btn"
                type="button"
                onClick={handleOpenLocalFilePicker}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#18a474] hover:bg-[#159167] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2"
              >
                <HardDrive className="w-4 h-4" />
                <span>Choose images from device</span>
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
              <span>JPG, PNG, WEBP</span>
              <span>•</span>
              <span>Multiple photos supported</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {images.length} {images.length === 1 ? 'image' : 'images'} selected
            </span>
            <button
              type="button"
              onClick={handleOpenLocalFilePicker}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#18a474] hover:text-[#159167] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add more images from device</span>
            </button>
          </div>

          {statusMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
              {statusMessage}
            </div>
          )}

          {/* Image Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="group relative bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <button
                  onClick={() => handleRemove(img.id)}
                  className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-md shadow-xs opacity-0 group-hover:opacity-100 transition"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="h-40 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="max-h-full max-w-full object-contain rounded-md"
                  />
                </div>

                <div className="mt-2 text-center">
                  <span className="text-xs font-bold text-slate-700 block truncate">
                    {idx + 1}. {img.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Upload Card */}
            <div
              onClick={handleOpenLocalFilePicker}
              className="border-2 border-dashed border-slate-300 hover:border-[#18a474] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-emerald-50/30 transition text-center min-h-[190px]"
            >
              <Upload className="w-6 h-6 text-[#18a474] mb-2" />
              <span className="text-xs font-bold text-slate-700">Add more images</span>
              <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WEBP</span>
            </div>
          </div>

          {/* Convert Action */}
          <div className="pt-4 text-center">
            <button
              onClick={handleExecuteConvert}
              disabled={isConverting || images.length === 0}
              className="px-8 py-3.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-xl text-base font-bold shadow-md hover:shadow-lg transition inline-flex items-center space-x-2"
            >
              {isConverting ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  <span>Compiling PDF document...</span>
                </>
              ) : (
                <>
                  <Image className="w-5 h-5" />
                  <span>Convert {images.length} {images.length === 1 ? 'Image' : 'Images'} to PDF</span>
                </>
              )}
            </button>

            {success && (
              <div className="mt-4 inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Success! Converted PDF has been downloaded to your computer.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
