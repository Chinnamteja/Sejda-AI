/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { ToolsGrid } from './components/ToolsGrid';
import { Footer } from './components/Footer';
import { PdfEditor } from './components/PdfEditor';
import { MergeTool } from './components/MergeTool';
import { SplitTool } from './components/SplitTool';
import { CompressTool } from './components/CompressTool';
import { WatermarkTool } from './components/WatermarkTool';
import { OrganizeTool } from './components/OrganizeTool';
import { ConvertTool } from './components/ConvertTool';
import { PricingModal } from './components/PricingModal';
import { DesktopModal } from './components/DesktopModal';
import { DesktopWindowFrame } from './components/DesktopWindowFrame';
import { LegalModal, LegalTab } from './components/LegalModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { usePWAInstall } from './hooks/usePWAInstall';
import { ToolId, LoadedDocument } from './types';
import { createSampleDocument, SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import { parsePdfFileToDocument } from './utils/pdfHelpers';
import { ShieldCheck, Zap, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  // Default to null so tools prompt user to select document from their device instead of auto-selecting sample
  const [currentDocument, setCurrentDocument] = useState<LoadedDocument | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  const [isDesktopFrameActive, setIsDesktopFrameActive] = useState(false);
  const { detectedOS } = usePWAInstall();
  const localFileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenLocalFile = async () => {
    if (typeof window !== 'undefined' && 'showOpenFilePicker' in window) {
      try {
        const [fileHandle] = await (window as unknown as {
          showOpenFilePicker: (options: object) => Promise<{ getFile: () => Promise<File> }[]>;
        }).showOpenFilePicker({
          types: [
            {
              description: 'PDF Documents & Images',
              accept: {
                'application/pdf': ['.pdf'],
                'image/*': ['.png', '.jpg', '.jpeg'],
              },
            },
          ],
          multiple: false,
        });
        const file = await fileHandle.getFile();
        handleFileUpload(file);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    localFileInputRef.current?.click();
  };

  const handleSelectTool = (toolId: ToolId) => {
    if (toolId === 'home') {
      setActiveTool(null);
    } else {
      setActiveTool(toolId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = async (file: File) => {
    try {
      const parsedDoc = await parsePdfFileToDocument(file);
      setCurrentDocument(parsedDoc);
      setActiveTool('edit');
      showNotification(`Loaded "${file.name}" (${parsedDoc.pageCount} pages)`);
    } catch {
      const newDoc: LoadedDocument = {
        id: 'doc-uploaded-' + Date.now(),
        name: file.name,
        sizeBytes: file.size,
        pageCount: 1,
        fullText: `Uploaded Document: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB`,
        pages: [
          {
            pageNumber: 1,
            rotation: 0,
            width: 595,
            height: 842,
            textContent: `Uploaded Document: ${file.name}\n\nDocument loaded successfully. Ready for editing and signing.`,
          },
        ],
        annotations: [],
      };
      setCurrentDocument(newDoc);
      setActiveTool('edit');
      showNotification(`Loaded "${file.name}"`);
    }
  };

  const handleLoadSample = (type: 'nda' | 'invoice' | 'proposal' | 'blank') => {
    const sampleDoc = createSampleDocument(type);
    setCurrentDocument(sampleDoc);
    setActiveTool('edit');
    showNotification(`Loaded sample "${sampleDoc.name}"`);
  };

  const handleBackToHome = () => {
    setActiveTool(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine which component to display based on activeTool
  const renderActiveView = () => {
    if (!activeTool) {
      return (
        <div className="space-y-12 pb-16">
          {/* Main Sejda Landing Hero */}
          <HomeHero
            onFileUpload={handleFileUpload}
            onLoadSample={handleLoadSample}
            onSelectTool={handleSelectTool}
            onOpenDesktopModal={() => setIsDesktopModalOpen(true)}
          />

          {/* Full Tools Directory with Categories */}
          <ToolsGrid onSelectTool={handleSelectTool} />

          {/* Value Props & Trust Badges Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Why Millions Trust Sejda with Their Documents
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Fast, secure, and powered by modern artificial intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18a474] flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Privacy & Security First</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Files stay strictly private. Uploaded documents are processed in memory and automatically deleted after 2 hours. We never sell or train on your private files.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18a474] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">AI Document Intelligence</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ask questions, summarize key terms, extract tabular data to CSV, audit legal liabilities, and translate into 10+ languages with Gemini AI.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18a474] flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Zero Installation</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Works seamlessly in any browser across Mac, Windows, Linux, Chromebook, and mobile devices. Fast PDF generation right in your browser.
                </p>
              </div>
            </div>
          </section>
        </div>
      );
    }

    // Specific Tool Routes
    switch (activeTool) {
      case 'merge':
        return (
          <MergeTool
            initialDocument={currentDocument}
            onBackToHome={handleBackToHome}
            onShowNotification={showNotification}
          />
        );

      case 'split':
      case 'split_in_half':
      case 'extract_pages':
        return (
          <SplitTool
            document={currentDocument}
            onBackToHome={handleBackToHome}
            onShowNotification={showNotification}
            onUpdateDocument={setCurrentDocument}
          />
        );

      case 'compress':
        return (
          <CompressTool
            document={currentDocument}
            onBackToHome={handleBackToHome}
            onShowNotification={showNotification}
            onUpdateDocument={setCurrentDocument}
          />
        );

      case 'watermark':
        return (
          <WatermarkTool
            document={currentDocument}
            onBackToHome={handleBackToHome}
            onShowNotification={showNotification}
            onUpdateDocument={setCurrentDocument}
          />
        );

      case 'rotate':
      case 'rotate_pages':
      case 'delete_pages':
        return (
          <OrganizeTool
            document={currentDocument}
            onUpdateDocument={setCurrentDocument}
            onBackToHome={handleBackToHome}
            onShowNotification={showNotification}
          />
        );

      case 'jpg_to_pdf':
      case 'pdf_to_jpg':
        return (
          <ConvertTool
            onBackToHome={handleBackToHome}
            onShowNotification={showNotification}
          />
        );

      // Fill & Sign Mode
      case 'fill_sign':
        return (
          <PdfEditor
            document={currentDocument}
            onUpdateDocument={setCurrentDocument}
            onBackToHome={handleBackToHome}
            mode="fill_sign"
            onShowNotification={showNotification}
          />
        );

      // AI Power Tools
      case 'ai_ask':
      case 'ai_chat':
        return (
          <PdfEditor
            document={currentDocument}
            onUpdateDocument={setCurrentDocument}
            onBackToHome={handleBackToHome}
            autoOpenAi={true}
            initialAiTab="chat"
            onShowNotification={showNotification}
          />
        );

      case 'ai_summarize':
      case 'ai_summary':
        return (
          <PdfEditor
            document={currentDocument}
            onUpdateDocument={setCurrentDocument}
            onBackToHome={handleBackToHome}
            autoOpenAi={true}
            initialAiTab="summary"
            onShowNotification={showNotification}
          />
        );

      case 'ai_translate':
        return (
          <PdfEditor
            document={currentDocument}
            onUpdateDocument={setCurrentDocument}
            onBackToHome={handleBackToHome}
            autoOpenAi={true}
            initialAiTab="translate"
            onShowNotification={showNotification}
          />
        );

      case 'ai_extract':
        return (
          <PdfEditor
            document={currentDocument}
            onUpdateDocument={setCurrentDocument}
            onBackToHome={handleBackToHome}
            autoOpenAi={true}
            initialAiTab="extract"
            onShowNotification={showNotification}
          />
        );

      case 'ai_audit':
        return (
          <PdfEditor
            document={currentDocument}
            onUpdateDocument={setCurrentDocument}
            onBackToHome={handleBackToHome}
            autoOpenAi={true}
            initialAiTab="audit"
            onShowNotification={showNotification}
          />
        );

      case 'ai_rewrite':
        return (
          <PdfEditor
            document={currentDocument}
            onUpdateDocument={setCurrentDocument}
            onBackToHome={handleBackToHome}
            autoOpenAi={true}
            initialAiTab="rewrite"
            onShowNotification={showNotification}
          />
        );

      // Default to full PDF Editor
      case 'pdf_editor':
      case 'edit':
      default:
        return (
          <PdfEditor
            document={currentDocument}
            onUpdateDocument={setCurrentDocument}
            onBackToHome={handleBackToHome}
            mode="edit"
            onShowNotification={showNotification}
          />
        );
    }
  };

  const mainContent = (
    <div className="min-h-screen flex flex-col bg-[#fcfdfd] text-slate-800 antialiased font-sans">
      {/* Hidden file input for native local drive selection */}
      <input
        ref={localFileInputRef}
        type="file"
        accept=".pdf,image/png,image/jpeg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {/* Global Header */}
      <Header
        currentTool={activeTool || 'home'}
        onSelectTool={handleSelectTool}
        documentLoaded={!!currentDocument}
        documentName={currentDocument?.name}
        onOpenPricingModal={() => setIsPricingModalOpen(true)}
        onShowDesktopInfo={() => setIsDesktopModalOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">{renderActiveView()}</main>

      {/* Global Footer (shown on landing page) */}
      {!activeTool && (
        <Footer
          onSelectTool={handleSelectTool}
          onOpenPricing={() => setIsPricingModalOpen(true)}
          onOpenLegal={(tab) => {
            setLegalTab(tab);
            setIsLegalModalOpen(true);
          }}
        />
      )}

      {/* Desktop Software Hub Modal */}
      <DesktopModal
        isOpen={isDesktopModalOpen}
        onClose={() => setIsDesktopModalOpen(false)}
        onToggleDesktopFrame={() => setIsDesktopFrameActive(!isDesktopFrameActive)}
        isDesktopFrameActive={isDesktopFrameActive}
      />

      {/* Legal & Compliance Modal (Privacy, Cookies/AdSense, Terms) */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalTab}
      />

      {/* Offline Mode Indicator */}
      <OfflineIndicator />

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSelectPlan={(plan) =>
          showNotification(`Subscribed to ${plan}! Unlimited tasks & AI Copilot unlocked.`)
        }
      />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#18a474]" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );

  if (isDesktopFrameActive) {
    return (
      <DesktopWindowFrame
        detectedOS={detectedOS}
        onExitFrame={() => setIsDesktopFrameActive(false)}
        onOpenLocalFile={handleOpenLocalFile}
      >
        {mainContent}
      </DesktopWindowFrame>
    );
  }

  return mainContent;
}
