/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ToolId =
  | 'home'
  | 'edit'
  | 'pdf_editor'
  | 'fill_sign'
  | 'merge'
  | 'split'
  | 'split_in_half'
  | 'compress'
  | 'rotate'
  | 'rotate_pages'
  | 'watermark'
  | 'jpg_to_pdf'
  | 'pdf_to_jpg'
  | 'extract_pages'
  | 'delete_pages'
  | 'crop'
  | 'protect'
  | 'ai_chat'
  | 'ai_ask'
  | 'ai_summary'
  | 'ai_summarize'
  | 'ai_translate'
  | 'ai_extract'
  | 'ai_audit'
  | 'ai_rewrite';

export type ToolCategory =
  | 'popular'
  | 'edit_sign'
  | 'merge_split'
  | 'convert'
  | 'organize'
  | 'ai_power';

export interface ToolItem {
  id: ToolId;
  name: string;
  category: ToolCategory;
  description: string;
  badge?: string;
  iconName: string;
  popular?: boolean;
}

export interface AnnotationItem {
  id: string;
  pageNumber: number;
  type: 'text' | 'signature' | 'shape' | 'whiteout' | 'image' | 'stamp';
  x: number; // percentage (0-100) or pixel
  y: number; // percentage (0-100) or pixel
  width?: number;
  height?: number;
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  isBold?: boolean;
  shapeType?: 'rectangle' | 'circle' | 'checkmark' | 'cross' | 'line';
  dataUrl?: string; // for signature / image
}

export interface DocumentPage {
  pageNumber: number;
  rotation: number; // 0, 90, 180, 270
  width: number;
  height: number;
  textContent: string;
  isDeleted?: boolean;
}

export interface LoadedDocument {
  id: string;
  name: string;
  sizeBytes: number;
  pageCount: number;
  pages: DocumentPage[];
  annotations: AnnotationItem[];
  pdfBytes?: Uint8Array;
  fullText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: string[];
}

export interface ContractAuditResult {
  riskScore: 'Low' | 'Medium' | 'High';
  rationale: string;
  riskyClauses: {
    clause: string;
    risk: string;
    severity: 'low' | 'medium' | 'high';
    recommendation: string;
  }[];
  keyObligations: string[];
  missingProtections: string[];
  summaryRating: string;
}

export interface ExtractedDataResult {
  documentType?: string;
  parties?: string[];
  dates?: string[];
  keyMetrics?: { label: string; value: string }[];
  tables?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
  actionableDeadlines?: string[];
}
