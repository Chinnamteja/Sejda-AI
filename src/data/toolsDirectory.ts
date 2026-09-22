/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToolItem } from '../types';

export const TOOLS_DIRECTORY: ToolItem[] = [
  // --- POPULAR / CORE ---
  {
    id: 'edit',
    name: 'PDF Editor',
    category: 'edit_sign',
    description: 'Edit text, add images, links, shapes, annotations, and form fields.',
    iconName: 'PenTool',
    popular: true,
  },
  {
    id: 'fill_sign',
    name: 'Fill & Sign PDF',
    category: 'edit_sign',
    description: 'Draw or type your signature, add initials, dates, and fill interactive forms.',
    iconName: 'FileSignature',
    popular: true,
  },
  {
    id: 'merge',
    name: 'Merge PDF Files',
    category: 'merge_split',
    description: 'Combine multiple PDF documents and images into a single unified file.',
    iconName: 'Files',
    popular: true,
  },
  {
    id: 'split',
    name: 'Split PDF by Pages',
    category: 'merge_split',
    description: 'Extract separate pages, split into two equal halves, or split by custom ranges.',
    iconName: 'Scissors',
    popular: true,
  },
  {
    id: 'compress',
    name: 'Compress PDF',
    category: 'popular',
    description: 'Reduce PDF file size while preserving high visual quality and text clarity.',
    iconName: 'Minimize2',
    popular: true,
  },
  {
    id: 'jpg_to_pdf',
    name: 'JPG to PDF',
    category: 'convert',
    description: 'Convert photos, scans, and PNG/JPEG images into standard PDF documents.',
    iconName: 'Image',
    popular: true,
  },

  // --- AI POWER TOOLS (NEW) ---
  {
    id: 'ai_chat',
    name: 'AI Ask PDF / Chat',
    category: 'ai_power',
    description: 'Converse with your document, ask complex questions, and receive cited answers.',
    iconName: 'Bot',
    badge: 'AI Powered',
    popular: true,
  },
  {
    id: 'ai_summary',
    name: 'AI PDF Summarizer',
    category: 'ai_power',
    description: 'Generate instant executive summaries, key bullet points, and actionable takeaways.',
    iconName: 'Sparkles',
    badge: 'AI Powered',
    popular: true,
  },
  {
    id: 'ai_translate',
    name: 'AI PDF Translator',
    category: 'ai_power',
    description: 'Translate complete documents into 20+ languages preserving legal and technical meaning.',
    iconName: 'Languages',
    badge: 'AI Powered',
    popular: true,
  },
  {
    id: 'ai_extract',
    name: 'AI Data & Table Extractor',
    category: 'ai_power',
    description: 'Automatically extract financial tables, invoices, dates, and entities into CSV & JSON.',
    iconName: 'Table',
    badge: 'AI Powered',
  },
  {
    id: 'ai_audit',
    name: 'AI Contract & Risk Auditor',
    category: 'ai_power',
    description: 'Screen agreements for liability traps, missing clauses, renewal risks, and obligations.',
    iconName: 'ShieldAlert',
    badge: 'AI Powered',
  },
  {
    id: 'ai_rewrite',
    name: 'AI Re-writer & Polish',
    category: 'ai_power',
    description: 'Rephrase contract clauses, polish tone for executive presentation, and fix phrasing.',
    iconName: 'Feather',
    badge: 'AI Powered',
  },

  // --- ORGANIZE & EDIT ---
  {
    id: 'rotate',
    name: 'Rotate PDF Pages',
    category: 'organize',
    description: 'Rotate individual or all pages clockwise or counter-clockwise permanently.',
    iconName: 'RotateCw',
    popular: true,
  },
  {
    id: 'delete_pages',
    name: 'Delete Pages',
    category: 'organize',
    description: 'Remove unwanted pages or blank sheets from your PDF in a visual thumbnail grid.',
    iconName: 'Trash2',
  },
  {
    id: 'extract_pages',
    name: 'Extract Pages',
    category: 'merge_split',
    description: 'Extract specific pages or sections into a standalone new PDF document.',
    iconName: 'FolderOutput',
  },
  {
    id: 'watermark',
    name: 'Watermark PDF',
    category: 'organize',
    description: 'Add text watermarks (e.g., CONFIDENTIAL, DRAFT) with custom angle, color, and opacity.',
    iconName: 'Stamp',
  },
  {
    id: 'pdf_to_jpg',
    name: 'PDF to JPG',
    category: 'convert',
    description: 'Extract PDF pages as individual high-resolution image files.',
    iconName: 'FileImage',
  },
  {
    id: 'crop',
    name: 'Crop PDF',
    category: 'organize',
    description: 'Trim page margins or crop specific areas of the PDF document.',
    iconName: 'Crop',
  },
  {
    id: 'protect',
    name: 'Protect & Encrypt PDF',
    category: 'organize',
    description: 'Encrypt your PDF with password security and granular permission controls.',
    iconName: 'Lock',
  },
];
