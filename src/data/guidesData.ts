export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  wordCount: string;
  url: string;
  toolId: string;
}

export const ALL_GUIDES: GuideArticle[] = [
  {
    "slug": "ai-document-intelligence-for-legal-contracts.html",
    "title": "AI Document Intelligence for Legal Contracts",
    "description": "Learn how Gemini 3.8 AI document intelligence accelerates legal reviews, automates indemnification auditing, flags liabilities, and queries 100-page contracts.",
    "category": "Signatures & Forms",
    "wordCount": "1167 Words",
    "url": "/guides/ai-document-intelligence-for-legal-contracts.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "automating-pdf-workflows-with-command-line-and-api.html",
    "title": "Automating PDF Workflows with CLI and REST API",
    "description": "Guide to automating repetitive PDF tasks at scale: batch merging, folder-watching scripts, command-line execution with Sejda Desktop, and architecture patterns.",
    "category": "AI Intelligence & OCR",
    "wordCount": "1009 Words",
    "url": "/guides/automating-pdf-workflows-with-command-line-and-api.html",
    "toolId": "ai_chat"
  },
  {
    "slug": "bates-numbering-for-legal-discovery.html",
    "title": "Bates Numbering for Legal Discovery and Courts",
    "description": "Guide to Bates numbering for litigation discovery and courtroom evidence bundles: alphanumeric prefixes, digit padding, margin placement, and court compliance.",
    "category": "Signatures & Forms",
    "wordCount": "1024 Words",
    "url": "/guides/bates-numbering-for-legal-discovery.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "converting-scanned-handwriting-to-searchable-pdf.html",
    "title": "Convert Scanned Handwriting to Searchable PDF",
    "description": "Techniques for digitizing cursive handwriting, historical archives, medical notes, and field logs into searchable, indexable PDF documents with Gemini 3.8 AI vision.",
    "category": "AI Intelligence & OCR",
    "wordCount": "984 Words",
    "url": "/guides/converting-scanned-handwriting-to-searchable-pdf.html",
    "toolId": "ai_chat"
  },
  {
    "slug": "digital-rights-management-and-pdf-licensing.html",
    "title": "Enterprise PDF DRM & Document Licensing PDF",
    "description": "Protect intellectual property with enterprise PDF DRM. Restrict printing, prevent screen capture, enforce geolocation and dynamic watermarks, and set automated document expiration.",
    "category": "Optimization & Standards",
    "wordCount": "916 Words",
    "url": "/guides/digital-rights-management-and-pdf-licensing.html",
    "toolId": "compress"
  },
  {
    "slug": "extract-tables-from-pdf-to-csv.html",
    "title": "Extract Tables from PDF to CSV and Excel PDF",
    "description": "In-depth engineering guide and comprehensive technical analysis from the Sejda document processing team.",
    "category": "AI Intelligence & OCR",
    "wordCount": "1025 Words",
    "url": "/guides/extract-tables-from-pdf-to-csv.html",
    "toolId": "ai_chat"
  },
  {
    "slug": "flattening-pdf-annotations-and-layers.html",
    "title": "Flattening PDF Annotations and Form Layers",
    "description": "Learn why flattening PDF form fields, annotations, markup layers, and vector graphics is essential for printing, legal permanence, and device compatibility.",
    "category": "Optimization & Archival",
    "wordCount": "1054 Words",
    "url": "/guides/flattening-pdf-annotations-and-layers.html",
    "toolId": "compress"
  },
  {
    "slug": "how-to-compress-pdf.html",
    "title": "How to Compress PDF Files Without Quality Loss",
    "description": "In-depth engineering guide and comprehensive technical analysis from the Sejda document processing team.",
    "category": "Optimization & Archival",
    "wordCount": "1124 Words",
    "url": "/guides/how-to-compress-pdf.html",
    "toolId": "compress"
  },
  {
    "slug": "how-to-edit-pdf-online.html",
    "title": "How to Edit PDF Files Online for Free Editor",
    "description": "Learn the technical mechanics of PDF content stream editing, font matching, text reflow, and modifying existing PDF text online with Sejda.",
    "category": "Editing & Assembly",
    "wordCount": "1258 Words",
    "url": "/guides/how-to-edit-pdf-online.html",
    "toolId": "edit"
  },
  {
    "slug": "how-to-merge-pdf.html",
    "title": "How to Merge Multiple PDF Files into One PDF",
    "description": "Deep dive into PDF document assembly, page-tree reconstruction, bookmark normalization, font conflict resolution, and combining multiple files with Sejda.",
    "category": "Editing & Assembly",
    "wordCount": "1302 Words",
    "url": "/guides/how-to-merge-pdf.html",
    "toolId": "merge"
  },
  {
    "slug": "how-to-rotate-and-reorder-pdf-pages.html",
    "title": "How to Rotate and Reorder PDF Pages Easily",
    "description": "Learn how to fix upside-down and sideways PDF pages permanently, reorder multi-page documents, and understand Rotate parameter flags in PDF page trees.",
    "category": "Editing & Assembly",
    "wordCount": "1072 Words",
    "url": "/guides/how-to-rotate-and-reorder-pdf-pages.html",
    "toolId": "edit"
  },
  {
    "slug": "how-to-sign-pdf-legally.html",
    "title": "How to Legally Sign PDF Documents Online PDF",
    "description": "In-depth engineering guide and comprehensive technical analysis from the Sejda document processing team.",
    "category": "Signatures & Forms",
    "wordCount": "1263 Words",
    "url": "/guides/how-to-sign-pdf-legally.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "how-to-split-pdf-pages.html",
    "title": "How to Split PDF Pages into Separate Files PDF",
    "description": "Technical walkthrough of PDF splitting methods: page range extraction, splitting by bookmark chapters, bursting into individual sheets, and size-based splitting.",
    "category": "Editing & Assembly",
    "wordCount": "1019 Words",
    "url": "/guides/how-to-split-pdf-pages.html",
    "toolId": "split"
  },
  {
    "slug": "how-to-watermark-pdf-documents.html",
    "title": "How to Watermark PDF Documents Securely PDF",
    "description": "Learn how to apply secure text and image watermarks, configure opacity, rotation angles, and positioning to protect confidential documents with Sejda.",
    "category": "Security & Encryption",
    "wordCount": "1082 Words",
    "url": "/guides/how-to-watermark-pdf-documents.html",
    "toolId": "protect"
  },
  {
    "slug": "jpg-to-pdf-conversion-standards.html",
    "title": "JPG to PDF Conversion Standards & DPI Guide",
    "description": "Technical guide to converting camera snapshots, receipts, and scans into standardized, printable ISO 32000 PDF documents with custom margins and page sizes.",
    "category": "Optimization & Archival",
    "wordCount": "1097 Words",
    "url": "/guides/jpg-to-pdf-conversion-standards.html",
    "toolId": "compress"
  },
  {
    "slug": "ocr-optical-character-recognition-guide.html",
    "title": "OCR Optical Character Recognition Guide PDF",
    "description": "Comprehensive guide to PDF OCR technology: neural font recognition, hidden text layers, multi-language dictionary matching, and making scanned PDFs searchable.",
    "category": "AI Intelligence & OCR",
    "wordCount": "1090 Words",
    "url": "/guides/ocr-optical-character-recognition-guide.html",
    "toolId": "ai_chat"
  },
  {
    "slug": "optimizing-pdf-for-web-fast-web-view.html",
    "title": "Optimizing PDF for Fast Web View Streaming",
    "description": "Learn how PDF linearization (Fast Web View) enables page-at-a-time downloading, eliminates browser lag, and accelerates PDF viewing on mobile networks.",
    "category": "Optimization & Archival",
    "wordCount": "1163 Words",
    "url": "/guides/optimizing-pdf-for-web-fast-web-view.html",
    "toolId": "compress"
  },
  {
    "slug": "optimizing-pdf-forms-for-mobile-devices.html",
    "title": "Optimizing PDF Forms for Mobile Touchscreens",
    "description": "Learn how to create responsive, touch-friendly AcroForms. Configure virtual keyboard triggers, field validation scripts, calculation formulas, and touch signature fields on iOS and Android.",
    "category": "Signatures & Forms",
    "wordCount": "939 Words",
    "url": "/guides/optimizing-pdf-forms-for-mobile-devices.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "pdf-a-archival-compliance-guide.html",
    "title": "PDF/A Archival Compliance Standards Guide",
    "description": "Technical breakdown of PDF/A standards for long-term digital preservation. Learn differences between PDF/A-1b, PDF/A-2b, and PDF/A-3b, and how to ensure archival compliance.",
    "category": "Optimization & Archival",
    "wordCount": "1056 Words",
    "url": "/guides/pdf-a-archival-compliance-guide.html",
    "toolId": "compress"
  },
  {
    "slug": "pdf-accessibility-and-section-508-compliance.html",
    "title": "PDF Accessibility & Section 508 Compliance",
    "description": "Master the technical requirements for accessible PDF/UA documents. Tagging structures, reading order, alternative text for figures, and screen reader verification.",
    "category": "Optimization & Archival",
    "wordCount": "1077 Words",
    "url": "/guides/pdf-accessibility-and-section-508-compliance.html",
    "toolId": "compress"
  },
  {
    "slug": "pdf-color-management-cmyk-vs-rgb-for-print.html",
    "title": "PDF Color Management: CMYK vs RGB Prepress",
    "description": "Technical prepress guide: understand device-dependent color spaces, converting RGB to CMYK without muddy darks, Total Area Coverage (TAC) limits, and PDF/X-1a prepress standards.",
    "category": "Optimization & Archival",
    "wordCount": "1130 Words",
    "url": "/guides/pdf-color-management-cmyk-vs-rgb-for-print.html",
    "toolId": "compress"
  },
  {
    "slug": "pdf-form-filling-and-interactive-acroforms.html",
    "title": "Interactive PDF Form Filling & AcroForms",
    "description": "Master interactive PDF AcroForms, digital form filling, field validation, XFA limitations, and flattening form widgets for secure submission.",
    "category": "Signatures & Forms",
    "wordCount": "1084 Words",
    "url": "/guides/pdf-form-filling-and-interactive-acroforms.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "pdf-metadata-and-xmp-data-cleaning.html",
    "title": "PDF Metadata and XMP Privacy Data Cleaning",
    "description": "Learn how to detect, view, and purge hidden PDF metadata, author names, GPS geolocation coordinates, software build numbers, and editing revision timestamps.",
    "category": "Security & Encryption",
    "wordCount": "1093 Words",
    "url": "/guides/pdf-metadata-and-xmp-data-cleaning.html",
    "toolId": "protect"
  },
  {
    "slug": "pdf-password-protection-and-permissions.html",
    "title": "PDF Password Protection and Permissions PDF",
    "description": "Technical guide to securing PDF files with passwords: User vs Owner passwords, AES-256 encryption, restricting printing/copying, and cryptographic attack resistance.",
    "category": "Security & Encryption",
    "wordCount": "1059 Words",
    "url": "/guides/pdf-password-protection-and-permissions.html",
    "toolId": "protect"
  },
  {
    "slug": "pdf-security-best-practices.html",
    "title": "PDF Security Best Practices for Enterprise",
    "description": "In-depth engineering guide and comprehensive technical analysis from the Sejda document processing team.",
    "category": "Security & Encryption",
    "wordCount": "1061 Words",
    "url": "/guides/pdf-security-best-practices.html",
    "toolId": "protect"
  },
  {
    "slug": "pdf-to-jpg-image-extraction-guide.html",
    "title": "Extract Images from PDF to JPG and PNG PDF",
    "description": "Complete guide to converting PDF pages into crisp JPG and PNG image files. Covers DPI benchmarks, CMYK to sRGB color matrices, and batch extraction.",
    "category": "Optimization & Archival",
    "wordCount": "948 Words",
    "url": "/guides/pdf-to-jpg-image-extraction-guide.html",
    "toolId": "compress"
  },
  {
    "slug": "redacting-sensitive-data-in-pdf.html",
    "title": "Redacting Sensitive Data in PDF Documents",
    "description": "Learn why drawing black boxes over PDF text fails redaction audits, how true cryptographic redaction purges underlying text objects, and how to protect sensitive data.",
    "category": "Security & Encryption",
    "wordCount": "1144 Words",
    "url": "/guides/redacting-sensitive-data-in-pdf.html",
    "toolId": "protect"
  },
  {
    "slug": "repairing-corrupted-pdf-files.html",
    "title": "Repairing Corrupted and Damaged PDF Files",
    "description": "Technical troubleshooting guide for repairing damaged or unreadable PDF files: rebuilding missing XREF tables, reconstructing truncated streams, and salvaging data.",
    "category": "AI Intelligence & OCR",
    "wordCount": "1030 Words",
    "url": "/guides/repairing-corrupted-pdf-files.html",
    "toolId": "ai_chat"
  }
];
