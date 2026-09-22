/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { X, Check, RotateCcw, Pen, Type, Upload, Trash2, Image as ImageIcon } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSignature: (dataUrl: string) => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onSaveSignature,
}) => {
  const [tab, setTab] = useState<'draw' | 'type' | 'upload'>('draw');
  const [typedName, setTypedName] = useState('Eleanor Vance');
  const [selectedFont, setSelectedFont] = useState<'Caveat' | 'cursive' | 'serif'>('Caveat');
  const [penColor, setPenColor] = useState('#0f172a');
  const [uploadedSignatureUrl, setUploadedSignatureUrl] = useState<string | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (isOpen && tab === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.strokeStyle = penColor;
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
      }
    }
  }, [isOpen, tab, penColor]);

  if (!isOpen) return null;

  const getCanvasCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const { x, y } = getCanvasCoords(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSave = () => {
    if (tab === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (!hasDrawn) {
        // Draw standard subtle placeholder if blank
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.font = '24px cursive';
          ctx.fillStyle = penColor;
          ctx.fillText('Signature', 140, 90);
        }
      }
      const dataUrl = canvas.toDataURL('image/png');
      onSaveSignature(dataUrl);
    } else if (tab === 'type') {
      const offscreen = document.createElement('canvas');
      offscreen.width = 440;
      offscreen.height = 160;
      const ctx = offscreen.getContext('2d');
      if (ctx) {
        ctx.fillStyle = penColor;
        ctx.font =
          selectedFont === 'Caveat'
            ? '44px "Brush Script MT", "Caveat", cursive'
            : selectedFont === 'cursive'
            ? 'italic 38px "Georgia", serif'
            : '40px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(typedName.trim() || 'Signature', 220, 80);
      }
      onSaveSignature(offscreen.toDataURL('image/png'));
    } else if (tab === 'upload') {
      if (uploadedSignatureUrl) {
        onSaveSignature(uploadedSignatureUrl);
      }
    }
    onClose();
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setUploadedSignatureUrl(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#18a474]">
              <Pen className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Add Signature</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="px-6 pt-4 flex space-x-2 border-b border-slate-100">
          <button
            onClick={() => setTab('draw')}
            className={`pb-3 px-3 text-sm font-semibold flex items-center space-x-1.5 border-b-2 transition ${
              tab === 'draw'
                ? 'border-[#18a474] text-[#18a474]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Pen className="w-4 h-4" />
            <span>Draw</span>
          </button>
          <button
            onClick={() => setTab('type')}
            className={`pb-3 px-3 text-sm font-semibold flex items-center space-x-1.5 border-b-2 transition ${
              tab === 'type'
                ? 'border-[#18a474] text-[#18a474]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Type</span>
          </button>
          <button
            onClick={() => setTab('upload')}
            className={`pb-3 px-3 text-sm font-semibold flex items-center space-x-1.5 border-b-2 transition ${
              tab === 'upload'
                ? 'border-[#18a474] text-[#18a474]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>

        {/* Body content based on tab */}
        <div className="p-6">
          {tab === 'draw' && (
            <div>
              <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 overflow-hidden cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={440}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-44 touch-none"
                />
                <div className="absolute bottom-3 left-6 pointer-events-none text-xs text-slate-400 font-serif italic border-b border-slate-300 w-3/4">
                  Sign above this line
                </div>
              </div>

              {/* Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 font-medium">Ink:</span>
                  {[
                    { color: '#0f172a', name: 'Black' },
                    { color: '#1e40af', name: 'Blue' },
                    { color: '#047857', name: 'Emerald' },
                  ].map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setPenColor(c.color)}
                      className={`w-6 h-6 rounded-full border-2 transition ${
                        penColor === c.color ? 'ring-2 ring-slate-800 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={c.name}
                    />
                  ))}
                </div>
                <button
                  onClick={clearCanvas}
                  className="text-xs text-slate-500 hover:text-rose-600 flex items-center space-x-1 px-2.5 py-1 rounded-md hover:bg-slate-100 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Canvas</span>
                </button>
              </div>
            </div>
          )}

          {tab === 'type' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#18a474]"
                />
              </div>

              {/* Font previews */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Select Calligraphy Style
                </label>
                <div
                  onClick={() => setSelectedFont('Caveat')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition text-center ${
                    selectedFont === 'Caveat'
                      ? 'border-[#18a474] bg-emerald-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-3xl text-slate-800 font-serif italic">
                    {typedName || 'Signature Preview'}
                  </span>
                </div>
                <div
                  onClick={() => setSelectedFont('cursive')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition text-center ${
                    selectedFont === 'cursive'
                      ? 'border-[#18a474] bg-emerald-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl text-slate-800 font-serif">
                    {typedName || 'Signature Preview'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {tab === 'upload' && (
            <div>
              {uploadedSignatureUrl ? (
                <div className="border-2 border-slate-200 rounded-xl p-4 bg-slate-50 text-center space-y-3">
                  <div className="h-32 bg-white rounded-lg flex items-center justify-center p-2 border border-slate-200">
                    <img
                      src={uploadedSignatureUrl}
                      alt="Uploaded Signature"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => setUploadedSignatureUrl(null)}
                      className="px-3 py-1.5 bg-white border border-slate-300 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove & Replace</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100/70 transition">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">
                    Upload image of signature
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, or GIF with transparent background</p>
                  <label className="mt-4 inline-block px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 shadow-2xs">
                    <span>Browse files</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition"
          >
            Cancel
          </button>
          <button
            id="apply-signature-modal-btn"
            onClick={handleSave}
            disabled={tab === 'upload' && !uploadedSignatureUrl}
            className="px-5 py-2 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-lg text-sm font-bold shadow-xs transition flex items-center space-x-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Apply Signature</span>
          </button>
        </div>
      </div>
    </div>
  );
};
