/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Type,
  PenTool,
  FileSignature,
  Square,
  Eraser,
  Image as ImageIcon,
  Check,
  X,
  Sparkles,
  Download,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Trash2,
  Maximize2,
  RotateCw,
  Plus,
  ArrowLeft,
  Move,
  Copy,
  Bold,
  HardDrive,
  UploadCloud,
  ShieldCheck,
  FolderOpen,
  FilePlus,
  FileText,
} from 'lucide-react';
import { LoadedDocument, AnnotationItem } from '../types';
import { SignatureModal } from './SignatureModal';
import { AiCopilotDrawer } from './AiCopilotDrawer';
import { exportDocumentToPdf, downloadPdfBytes, parsePdfFileToDocument } from '../utils/pdfHelpers';
import { createSampleDocument } from '../data/sampleDocuments';

interface PdfEditorProps {
  document?: LoadedDocument | null;
  onUpdateDocument: (doc: LoadedDocument) => void;
  onBackToHome: () => void;
  mode?: 'edit' | 'fill_sign';
  initialAiTab?: 'chat' | 'summary' | 'translate' | 'extract' | 'audit' | 'rewrite';
  autoOpenAi?: boolean;
  onShowNotification?: (message: string) => void;
}

export const PdfEditor: React.FC<PdfEditorProps> = ({
  document: doc,
  onUpdateDocument,
  onBackToHome,
  mode = 'edit',
  initialAiTab,
  autoOpenAi = false,
  onShowNotification,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTool, setActiveTool] = useState<
    'select' | 'text' | 'signature' | 'whiteout' | 'shape_rect' | 'shape_check' | 'shape_cross'
  >(mode === 'fill_sign' ? 'signature' : 'select');

  // Modals & Panels
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(autoOpenAi);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedAnnoId, setSelectedAnnoId] = useState<string | null>(null);

  // File Picker & Drag State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Dragging Annotation State
  const [isDraggingAnno, setIsDraggingAnno] = useState(false);
  const dragStartRef = useRef<{ annoId: string; startX: number; startY: number; initAnnoX: number; initAnnoY: number } | null>(null);

  // Styling palette for text
  const [textFontSize, setTextFontSize] = useState(14);
  const [textColor, setTextColor] = useState('#1e293b');
  const [textFontFamily, setTextFontFamily] = useState<'sans' | 'serif' | 'Caveat'>('sans');
  const [isBold, setIsBold] = useState(false);

  const pageContainerRef = useRef<HTMLDivElement>(null);

  const activePage = doc?.pages ? (doc.pages[currentPageIndex] || doc.pages[0]) : null;

  // Helper for user feedback
  const notify = (msg: string) => {
    if (onShowNotification) {
      onShowNotification(msg);
    }
  };

  const handleDeviceFile = async (file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setFileError('Please select a valid PDF file (.pdf)');
      return;
    }
    setFileError(null);
    try {
      const parsedDoc = await parsePdfFileToDocument(file);
      onUpdateDocument(parsedDoc);
      notify(`Loaded "${file.name}" (${parsedDoc.pageCount} pages)`);
    } catch (err: any) {
      setFileError(`Failed to load PDF: ${err?.message || 'Unknown error'}`);
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
        await handleDeviceFile(file);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    fileInputRef.current?.click();
  };

  // Keyboard shortcut: Delete or Backspace removes selected annotation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedAnnoId) {
        // Only if active element is not an input or contentEditable
        const tag = (document.activeElement?.tagName || '').toLowerCase();
        const isEditable = document.activeElement?.getAttribute('contenteditable') === 'true';
        if (tag !== 'input' && tag !== 'textarea' && !isEditable) {
          e.preventDefault();
          handleDeleteAnnotation(selectedAnnoId);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAnnoId, doc]);

  // Update selected annotation when styling changes
  const applyStyleToSelected = (updates: Partial<AnnotationItem>) => {
    if (!doc || !selectedAnnoId) return;
    onUpdateDocument({
      ...doc,
      annotations: doc.annotations.map((a) => (a.id === selectedAnnoId ? { ...a, ...updates } : a)),
    });
  };

  // Drag listeners on window for smooth repositioning
  const handleAnnoMouseDown = (e: React.MouseEvent, anno: AnnotationItem) => {
    if (!doc || activeTool !== 'select') return;
    e.stopPropagation();
    setSelectedAnnoId(anno.id);
    setIsDraggingAnno(true);
    dragStartRef.current = {
      annoId: anno.id,
      startX: e.clientX,
      startY: e.clientY,
      initAnnoX: anno.x,
      initAnnoY: anno.y,
    };
  };

  const handleAnnoMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!doc || !isDraggingAnno || !dragStartRef.current || !pageContainerRef.current) return;
      const rect = pageContainerRef.current.getBoundingClientRect();
      const scale = zoomLevel / 100;
      const deltaX = (e.clientX - dragStartRef.current.startX) / scale;
      const deltaY = (e.clientY - dragStartRef.current.startY) / scale;

      const deltaXPct = (deltaX / (rect.width / scale)) * 100;
      const deltaYPct = (deltaY / (rect.height / scale)) * 100;

      const newX = Math.max(0, Math.min(95, dragStartRef.current.initAnnoX + deltaXPct));
      const newY = Math.max(0, Math.min(95, dragStartRef.current.initAnnoY + deltaYPct));

      onUpdateDocument({
        ...doc,
        annotations: doc.annotations.map((a) =>
          a.id === dragStartRef.current?.annoId ? { ...a, x: newX, y: newY } : a
        ),
      });
    },
    [isDraggingAnno, zoomLevel, doc, onUpdateDocument]
  );

  const handleAnnoMouseUp = useCallback(() => {
    setIsDraggingAnno(false);
    dragStartRef.current = null;
  }, []);

  useEffect(() => {
    if (isDraggingAnno) {
      window.addEventListener('mousemove', handleAnnoMouseMove);
      window.addEventListener('mouseup', handleAnnoMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleAnnoMouseMove);
        window.removeEventListener('mouseup', handleAnnoMouseUp);
      };
    }
  }, [isDraggingAnno, handleAnnoMouseMove, handleAnnoMouseUp]);

  // Click on page canvas to add annotation
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!doc || !activePage || !pageContainerRef.current) return;
    const rect = pageContainerRef.current.getBoundingClientRect();
    const scale = zoomLevel / 100;
    const clickX = (e.clientX - rect.left) / scale;
    const clickY = (e.clientY - rect.top) / scale;

    const unscaledWidth = rect.width / scale;
    const unscaledHeight = rect.height / scale;

    // Convert to percentage
    const xPct = Math.max(2, Math.min(95, (clickX / unscaledWidth) * 100));
    const yPct = Math.max(2, Math.min(95, (clickY / unscaledHeight) * 100));

    if (activeTool === 'select') {
      setSelectedAnnoId(null);
      return;
    }

    if (activeTool === 'text') {
      const newAnno: AnnotationItem = {
        id: 'anno-text-' + Date.now(),
        pageNumber: activePage.pageNumber,
        type: 'text',
        x: xPct,
        y: yPct,
        content: 'Type your text here...',
        fontSize: textFontSize,
        fontFamily: textFontFamily,
        color: textColor,
        isBold,
      };
      onUpdateDocument({
        ...doc,
        annotations: [...doc.annotations, newAnno],
      });
      setSelectedAnnoId(newAnno.id);
      setActiveTool('select');
      notify('Text placed. Click and drag to reposition.');
    } else if (activeTool === 'whiteout') {
      const newAnno: AnnotationItem = {
        id: 'anno-whiteout-' + Date.now(),
        pageNumber: activePage.pageNumber,
        type: 'whiteout',
        x: xPct,
        y: yPct,
        width: 120,
        height: 28,
      };
      onUpdateDocument({
        ...doc,
        annotations: [...doc.annotations, newAnno],
      });
      setSelectedAnnoId(newAnno.id);
      setActiveTool('select');
      notify('Whiteout applied.');
    } else if (activeTool === 'shape_rect') {
      const newAnno: AnnotationItem = {
        id: 'anno-shape-' + Date.now(),
        pageNumber: activePage.pageNumber,
        type: 'shape',
        shapeType: 'rectangle',
        x: xPct,
        y: yPct,
        width: 140,
        height: 60,
        color: '#18a474',
      };
      onUpdateDocument({
        ...doc,
        annotations: [...doc.annotations, newAnno],
      });
      setSelectedAnnoId(newAnno.id);
      setActiveTool('select');
      notify('Rectangle shape placed.');
    } else if (activeTool === 'shape_check') {
      const newAnno: AnnotationItem = {
        id: 'anno-check-' + Date.now(),
        pageNumber: activePage.pageNumber,
        type: 'shape',
        shapeType: 'checkmark',
        x: xPct,
        y: yPct,
      };
      onUpdateDocument({
        ...doc,
        annotations: [...doc.annotations, newAnno],
      });
      setSelectedAnnoId(newAnno.id);
      setActiveTool('select');
      notify('Checkmark placed.');
    } else if (activeTool === 'shape_cross') {
      const newAnno: AnnotationItem = {
        id: 'anno-cross-' + Date.now(),
        pageNumber: activePage.pageNumber,
        type: 'shape',
        shapeType: 'cross',
        x: xPct,
        y: yPct,
      };
      onUpdateDocument({
        ...doc,
        annotations: [...doc.annotations, newAnno],
      });
      setSelectedAnnoId(newAnno.id);
      setActiveTool('select');
      notify('Crossmark placed.');
    }
  };

  const handleSaveSignature = (dataUrl: string) => {
    if (!doc || !activePage) return;
    const newAnno: AnnotationItem = {
      id: 'anno-sig-' + Date.now(),
      pageNumber: activePage.pageNumber,
      type: 'signature',
      x: 35,
      y: 75,
      width: 150,
      height: 60,
      dataUrl,
    };
    onUpdateDocument({
      ...doc,
      annotations: [...doc.annotations, newAnno],
    });
    setSelectedAnnoId(newAnno.id);
    setActiveTool('select');
    notify('Signature inserted. Drag to position anywhere on the page.');
  };

  const handleAddAiTextAnnotation = (text: string) => {
    if (!doc || !activePage) return;
    const newAnno: AnnotationItem = {
      id: 'anno-ai-' + Date.now(),
      pageNumber: activePage.pageNumber,
      type: 'text',
      x: 10,
      y: 20,
      content: text,
      fontSize: 12,
      color: '#047857',
    };
    onUpdateDocument({
      ...doc,
      annotations: [...doc.annotations, newAnno],
    });
    setSelectedAnnoId(newAnno.id);
    notify('AI text inserted into PDF.');
  };

  const handleDeleteAnnotation = (id: string) => {
    if (!doc) return;
    onUpdateDocument({
      ...doc,
      annotations: doc.annotations.filter((a) => a.id !== id),
    });
    if (selectedAnnoId === id) setSelectedAnnoId(null);
  };

  const handleDuplicateAnnotation = (anno: AnnotationItem) => {
    if (!doc) return;
    const duplicated: AnnotationItem = {
      ...anno,
      id: 'anno-dup-' + Date.now(),
      x: Math.min(90, anno.x + 4),
      y: Math.min(90, anno.y + 4),
    };
    onUpdateDocument({
      ...doc,
      annotations: [...doc.annotations, duplicated],
    });
    setSelectedAnnoId(duplicated.id);
    notify('Annotation duplicated.');
  };

  const handleUpdateAnnotationText = (id: string, newText: string) => {
    if (!doc) return;
    onUpdateDocument({
      ...doc,
      annotations: doc.annotations.map((a) => (a.id === id ? { ...a, content: newText } : a)),
    });
  };

  const handleExportAndDownload = async () => {
    if (!doc) return;
    setIsExporting(true);
    try {
      const pdfBytes = await exportDocumentToPdf(doc);
      downloadPdfBytes(pdfBytes, `${doc.name.replace('.pdf', '')}_edited.pdf`);
      notify(`Downloaded "${doc.name.replace('.pdf', '')}_edited.pdf"`);
    } catch (e: any) {
      notify(`Export notice: ${e?.message || 'Failed to generate PDF'}`);
    } finally {
      setIsExporting(false);
    }
  };

  if (!doc || !activePage) {
    const modeTitle =
      mode === 'fill_sign'
        ? 'Fill & Sign PDF'
        : initialAiTab
        ? 'AI PDF Intelligence & Copilot'
        : 'Edit & Annotate PDF';

    const modeSubtitle =
      mode === 'fill_sign'
        ? 'Select a PDF from your device to add digital signatures, initials, and text fields.'
        : initialAiTab
        ? 'Select a PDF from your device to ask questions, summarize, translate, or audit with Gemini 3.8 AI.'
        : 'Select a PDF from your device to add text, signatures, whiteout, and annotations.';

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleDeviceFile(e.target.files[0]);
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
            <h2 className="text-2xl font-extrabold text-slate-900">{modeTitle}</h2>
            <p className="text-xs text-slate-500 mt-1">{modeSubtitle}</p>
          </div>

          <div className="w-24" />
        </div>

        {/* Device Select Card */}
        <div
          id="editor-select-device-card"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingFile(true);
          }}
          onDragLeave={() => setIsDraggingFile(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingFile(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleDeviceFile(e.dataTransfer.files[0]);
            }
          }}
          className={`mt-8 bg-white p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all text-center ${
            isDraggingFile
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
                Choose a PDF file from your computer or drag & drop it here to begin.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="editor-choose-file-btn"
                type="button"
                onClick={handleOpenLocalFilePicker}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#18a474] hover:bg-[#159167] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2"
              >
                <HardDrive className="w-4 h-4" />
                <span>Choose PDF from device</span>
              </button>
            </div>

            {fileError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {fileError}
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Private local processing
              </span>
              <span>•</span>
              <span>Direct in-browser editing</span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const blankDoc = createSampleDocument('blank');
                  onUpdateDocument(blankDoc);
                  notify('Started with a blank document');
                }}
                className="text-xs text-slate-400 hover:text-[#18a474] transition inline-flex items-center space-x-1"
              >
                <FilePlus className="w-3.5 h-3.5" />
                <span>or start with a blank document</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pageAnnotations = doc.annotations.filter((a) => a.pageNumber === activePage.pageNumber);
  const selectedAnno = doc.annotations.find((a) => a.id === selectedAnnoId);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#eef2f5]">
      {/* Hidden File Input for Change File */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleDeviceFile(e.target.files[0]);
          }
        }}
      />

      {/* Top Editor Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-2xs z-20 flex-wrap gap-2">
        {/* Left: Back & Document info */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Tools</span>
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <span className="text-sm font-bold text-slate-800 truncate max-w-[180px] sm:max-w-xs" title={doc.name}>
            {doc.name}
          </span>
          <button
            type="button"
            onClick={handleOpenLocalFilePicker}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition"
            title="Change file from device"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Change file</span>
          </button>
        </div>

        {/* Center: Interactive Annotation Tools */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl space-x-1">
          <button
            id="tool-select-btn"
            onClick={() => setActiveTool('select')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTool === 'select'
                ? 'bg-white text-[#18a474] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Select & Move Annotations"
          >
            <Move className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Select</span>
          </button>

          <button
            id="tool-text-btn"
            onClick={() => setActiveTool('text')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTool === 'text'
                ? 'bg-white text-[#18a474] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Text</span>
          </button>

          <button
            id="tool-sign-btn"
            onClick={() => setSignatureModalOpen(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTool === 'signature'
                ? 'bg-white text-[#18a474] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSignature className="w-4 h-4" />
            <span>Sign</span>
          </button>

          <button
            id="tool-whiteout-btn"
            onClick={() => setActiveTool('whiteout')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTool === 'whiteout'
                ? 'bg-white text-[#18a474] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Whiteout / Redact"
          >
            <Eraser className="w-4 h-4" />
            <span>Whiteout</span>
          </button>

          <button
            id="tool-rect-btn"
            onClick={() => setActiveTool('shape_rect')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTool === 'shape_rect'
                ? 'bg-white text-[#18a474] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Rectangle"
          >
            <Square className="w-4 h-4" />
            <span className="hidden md:inline">Shape</span>
          </button>

          <button
            id="tool-check-btn"
            onClick={() => setActiveTool('shape_check')}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'shape_check'
                ? 'bg-white text-[#18a474] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Checkmark"
          >
            <Check className="w-4 h-4" />
          </button>

          <button
            id="tool-cross-btn"
            onClick={() => setActiveTool('shape_cross')}
            className={`p-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'shape_cross'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Crossmark"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Right: AI Copilot Toggle & Apply Changes */}
        <div className="flex items-center space-x-2">
          <button
            id="editor-ai-copilot-toggle-btn"
            onClick={() => setAiDrawerOpen(!aiDrawerOpen)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition border ${
              aiDrawerOpen
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Copilot</span>
          </button>

          <button
            id="editor-apply-changes-btn"
            onClick={handleExportAndDownload}
            disabled={isExporting}
            className="px-4 py-1.5 bg-[#18a474] hover:bg-[#159167] disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-xs transition"
          >
            {isExporting ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Apply Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Bar: Active Tool Sub-Controls + Page Navigator */}
      <div className="bg-[#f8fafc] border-b border-slate-200 px-6 py-2 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
        {/* Page Switcher */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentPageIndex === 0}
            className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-slate-700">
            Page {currentPageIndex + 1} of {doc.pages.length}
          </span>
          <button
            onClick={() => setCurrentPageIndex((prev) => Math.min(doc.pages.length - 1, prev + 1))}
            disabled={currentPageIndex === doc.pages.length - 1}
            className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Text Tool Options (shown if text tool is active OR a text annotation is selected) */}
        {(activeTool === 'text' || (selectedAnno && selectedAnno.type === 'text')) && (
          <div className="flex items-center space-x-3 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
            <span className="font-semibold text-slate-700">
              {selectedAnno ? 'Text Style:' : 'Click on page to place text:'}
            </span>
            <div className="flex items-center space-x-1">
              {[12, 14, 18, 24].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setTextFontSize(size);
                    applyStyleToSelected({ fontSize: size });
                  }}
                  className={`px-2 py-0.5 rounded-sm font-semibold transition ${
                    (selectedAnno?.fontSize || textFontSize) === size
                      ? 'bg-[#18a474] text-white'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const nextBold = !isBold;
                setIsBold(nextBold);
                applyStyleToSelected({ isBold: nextBold });
              }}
              className={`p-1 rounded-md border transition ${
                (selectedAnno?.isBold ?? isBold)
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center space-x-1">
              {['#1e293b', '#18a474', '#1e40af', '#b91c1c'].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setTextColor(c);
                    applyStyleToSelected({ color: c });
                  }}
                  className={`w-4 h-4 rounded-full border transition ${
                    (selectedAnno?.color || textColor) === c ? 'ring-2 ring-slate-800 scale-110' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Selected Annotation Actions Bar */}
        {selectedAnno && (
          <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            <span className="font-bold text-emerald-800 text-[11px] uppercase tracking-wider">
              {selectedAnno.type}
            </span>
            <button
              onClick={() => handleDuplicateAnnotation(selectedAnno)}
              className="p-1 text-slate-600 hover:text-emerald-700 rounded-md hover:bg-emerald-100 transition"
              title="Duplicate"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDeleteAnnotation(selectedAnno.id)}
              className="p-1 text-slate-600 hover:text-rose-600 rounded-md hover:bg-rose-100 transition"
              title="Delete (or press Delete key)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
            className="p-1 rounded-md hover:bg-slate-200 text-slate-600 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium font-mono">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
            className="p-1 rounded-md hover:bg-slate-200 text-slate-600 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Document Canvas Viewport */}
      <div className="flex-1 overflow-auto p-8 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            marginBottom: zoomLevel > 100 ? `${(880 * (zoomLevel - 100)) / 100}px` : 0,
          }}
          className="transition-transform duration-150"
        >
          <div
            ref={pageContainerRef}
            onClick={handlePageClick}
            style={{
              width: '680px',
              minHeight: '880px',
            }}
            className={`relative bg-white rounded-lg shadow-xl border border-slate-300 p-12 select-none ${
              activeTool !== 'select' ? 'cursor-crosshair' : 'cursor-default'
            }`}
          >
            {/* Header watermark/metadata preview */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-100 pb-2 mb-6">
              <span>{doc.name}</span>
              <span>Page {activePage.pageNumber}</span>
            </div>

            {/* Underlying text representation */}
            <div className="text-[12px] leading-relaxed text-slate-800 space-y-3 font-serif whitespace-pre-wrap">
              {activePage.textContent}
            </div>

            {/* Render All Annotations on this Page */}
            {pageAnnotations.map((anno) => {
              const isSelected = selectedAnnoId === anno.id;

              return (
                <div
                  key={anno.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAnnoId(anno.id);
                  }}
                  onMouseDown={(e) => handleAnnoMouseDown(e, anno)}
                  style={{
                    position: 'absolute',
                    left: `${anno.x}%`,
                    top: `${anno.y}%`,
                    cursor: activeTool === 'select' ? 'grab' : 'default',
                  }}
                  className={`group transition-all ${
                    isSelected ? 'ring-2 ring-[#18a474] ring-offset-2 z-30' : 'z-20'
                  }`}
                >
                  {/* Floating Action Controls for selected annotation */}
                  <div
                    className={`absolute -top-7 left-0 flex items-center space-x-1 bg-slate-800 text-white rounded-md px-1.5 py-0.5 text-[10px] shadow-md transition-opacity z-40 ${
                      isSelected ? 'opacity-100' : 'opacity-0 pointer-events-none group-hover:opacity-100'
                    }`}
                  >
                    <Move className="w-3 h-3 text-slate-400" />
                    <span className="text-[9px] text-slate-300">Drag to move</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAnnotation(anno.id);
                      }}
                      className="ml-1 hover:text-rose-400 transition"
                      title="Delete"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Annotation Type 1: Text */}
                  {anno.type === 'text' && (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleUpdateAnnotationText(anno.id, e.currentTarget.textContent || '')}
                      style={{
                        fontSize: `${anno.fontSize || 14}px`,
                        color: anno.color || '#1e293b',
                        fontFamily: anno.fontFamily === 'Caveat' ? 'Caveat, cursive' : 'inherit',
                        fontWeight: anno.isBold ? 'bold' : 'normal',
                      }}
                      className="p-1 min-w-[70px] bg-emerald-50/40 border border-dashed border-[#18a474]/60 rounded-sm outline-hidden cursor-text hover:bg-emerald-50/80"
                    >
                      {anno.content}
                    </div>
                  )}

                  {/* Annotation Type 2: Signature */}
                  {anno.type === 'signature' && anno.dataUrl && (
                    <div className="bg-transparent border border-transparent hover:border-dashed hover:border-[#18a474] rounded-sm p-1">
                      <img
                        src={anno.dataUrl}
                        alt="Signature"
                        style={{
                          width: `${anno.width || 140}px`,
                          height: 'auto',
                        }}
                        className="object-contain pointer-events-none"
                      />
                    </div>
                  )}

                  {/* Annotation Type 3: Whiteout */}
                  {anno.type === 'whiteout' && (
                    <div
                      style={{
                        width: `${anno.width || 120}px`,
                        height: `${anno.height || 26}px`,
                      }}
                      className="bg-white border border-slate-200 shadow-2xs rounded-xs flex items-center justify-center text-[10px] text-slate-300 select-none"
                    >
                      Whiteout
                    </div>
                  )}

                  {/* Annotation Type 4: Shape */}
                  {anno.type === 'shape' && (
                    <>
                      {anno.shapeType === 'checkmark' && (
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#18a474] flex items-center justify-center font-bold text-base shadow-xs select-none">
                          ✓
                        </div>
                      )}
                      {anno.shapeType === 'cross' && (
                        <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-base shadow-xs select-none">
                          ✗
                        </div>
                      )}
                      {anno.shapeType === 'rectangle' && (
                        <div
                          style={{
                            width: `${anno.width || 140}px`,
                            height: `${anno.height || 60}px`,
                          }}
                          className="border-2 border-[#18a474] bg-emerald-50/20 rounded-md"
                        />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      <SignatureModal
        isOpen={signatureModalOpen}
        onClose={() => setSignatureModalOpen(false)}
        onSaveSignature={handleSaveSignature}
      />

      {/* AI Copilot Drawer */}
      <AiCopilotDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        document={doc}
        onAddAnnotation={handleAddAiTextAnnotation}
        initialTab={initialAiTab || 'chat'}
      />
    </div>
  );
};
