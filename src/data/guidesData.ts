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
    "title": "AI Document Intelligence for Legal Contracts: Clause Auditing, Indemnification & Extraction",
    "description": "Learn how Gemini 3.8 AI document intelligence accelerates legal reviews, automates indemnification auditing, flags liabilities, and queries 100-page contracts.",
    "category": "Signatures & Forms",
    "wordCount": "1222 Words",
    "url": "/guides/ai-document-intelligence-for-legal-contracts.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "automating-pdf-workflows-with-command-line-and-api.html",
    "title": "Automating PDF Workflows: Desktop Batch Processing, CLI Tools & Architecture",
    "description": "Guide to automating repetitive PDF tasks at scale: batch merging, folder-watching scripts, command-line execution with Sejda Desktop, and architecture patterns.",
    "category": "AI Intelligence & OCR",
    "wordCount": "1126 Words",
    "url": "/guides/automating-pdf-workflows-with-command-line-and-api.html",
    "toolId": "ai_chat"
  },
  {
    "slug": "bates-numbering-for-legal-discovery.html",
    "title": "Bates Numbering for Legal Discovery: Formatting, Prefixing & Court Bundle Production",
    "description": "Guide to Bates numbering for litigation discovery and courtroom evidence bundles: alphanumeric prefixes, digit padding, margin placement, and court compliance.",
    "category": "Signatures & Forms",
    "wordCount": "1159 Words",
    "url": "/guides/bates-numbering-for-legal-discovery.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "converting-scanned-handwriting-to-searchable-pdf.html",
    "title": "Converting Scanned Handwriting & Historical Documents to Searchable PDF via AI OCR PDF &amp; Document Intelligence",
    "description": "Techniques for digitizing cursive handwriting, historical archives, medical notes, and field logs into searchable, indexable PDF documents with Gemini 3.8 AI vision.",
    "category": "AI Intelligence & OCR",
    "wordCount": "1051 Words",
    "url": "/guides/converting-scanned-handwriting-to-searchable-pdf.html",
    "toolId": "ai_chat"
  },
  {
    "slug": "digital-rights-management-and-pdf-licensing.html",
    "title": "Enterprise Digital Rights Management (DRM) & Document Expiry in PDF PDF &amp; Document Intelligence",
    "description": "Protect intellectual property with enterprise PDF DRM. Restrict printing, prevent screen capture, enforce geolocation and dynamic watermarks, and set automated document expiration.",
    "category": "Optimization & Standards",
    "wordCount": "905 Words",
    "url": "/guides/digital-rights-management-and-pdf-licensing.html",
    "toolId": "compress"
  },
  {
    "slug": "extract-tables-from-pdf-to-csv.html",
    "title": "Extracting Tabular Financial Data from PDF to CSV - Technical Guide",
    "description": "Technical guide for accountants, financial analysts, and developers on extracting tables, invoices, and bank statements from PDF into structured CSV with Sejda.",
    "category": "AI Intelligence & OCR",
    "wordCount": "1010 Words",
    "url": "/guides/extract-tables-from-pdf-to-csv.html",
    "toolId": "ai_chat"
  },
  {
    "slug": "flattening-pdf-annotations-and-layers.html",
    "title": "Flattening PDF Annotations & Layers: Why and How to Lock Vector Elements Permanently",
    "description": "Learn why flattening PDF form fields, annotations, markup layers, and vector graphics is essential for printing, legal permanence, and device compatibility.",
    "category": "Optimization & Archival",
    "wordCount": "1111 Words",
    "url": "/guides/flattening-pdf-annotations-and-layers.html",
    "toolId": "compress"
  },
  {
    "slug": "how-to-compress-pdf.html",
    "title": "How to Compress PDF Files Without Quality Loss - Technical Guide",
    "description": "Comprehensive guide to PDF compression algorithms, DPI downsampling, font subsetting, and achieving file size reduction up to 85% for email with Sejda.",
    "category": "Optimization & Archival",
    "wordCount": "932 Words",
    "url": "/guides/how-to-compress-pdf.html",
    "toolId": "compress"
  },
  {
    "slug": "how-to-edit-pdf-online.html",
    "title": "How to Edit Existing PDF Text Directly in Your Browser Without Conversion",
    "description": "Learn the technical mechanics of PDF content stream editing, font matching, text reflow, and modifying existing PDF text online with Sejda.",
    "category": "Editing & Assembly",
    "wordCount": "1114 Words",
    "url": "/guides/how-to-edit-pdf-online.html",
    "toolId": "edit"
  },
  {
    "slug": "how-to-merge-pdf.html",
    "title": "How to Merge Multiple PDF Documents Without Corrupting Bookmarks or Outlines",
    "description": "Deep dive into PDF document assembly, page-tree reconstruction, bookmark normalization, font conflict resolution, and combining multiple files with Sejda.",
    "category": "Editing & Assembly",
    "wordCount": "1168 Words",
    "url": "/guides/how-to-merge-pdf.html",
    "toolId": "merge"
  },
  {
    "slug": "how-to-rotate-and-reorder-pdf-pages.html",
    "title": "How to Rotate & Reorder PDF Pages: Permanent Orientation Fixes & Visual Page Grids",
    "description": "Learn how to fix upside-down and sideways PDF pages permanently, reorder multi-page documents, and understand Rotate parameter flags in PDF page trees.",
    "category": "Editing & Assembly",
    "wordCount": "1166 Words",
    "url": "/guides/how-to-rotate-and-reorder-pdf-pages.html",
    "toolId": "edit"
  },
  {
    "slug": "how-to-sign-pdf-legally.html",
    "title": "Legally Binding Electronic Signatures (ESIGN &amp; eIDAS) - Legal Guide",
    "description": "In-depth legal guide to electronic signatures on PDF files. Understand ESIGN Act, UETA, eIDAS compliance, audit trails, and legal enforceability in contracts.",
    "category": "Signatures & Forms",
    "wordCount": "1248 Words",
    "url": "/guides/how-to-sign-pdf-legally.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "how-to-split-pdf-pages.html",
    "title": "How to Split PDF Pages: Extracting Chapters, Splitting in Half, and Bursting Files",
    "description": "Technical walkthrough of PDF splitting methods: page range extraction, splitting by bookmark chapters, bursting into individual sheets, and size-based splitting.",
    "category": "Editing & Assembly",
    "wordCount": "938 Words",
    "url": "/guides/how-to-split-pdf-pages.html",
    "toolId": "split"
  },
  {
    "slug": "how-to-watermark-pdf-documents.html",
    "title": "How to Watermark PDF Documents: Protecting Intellectual Property & Marking Drafts",
    "description": "Learn how to apply secure text and image watermarks, configure opacity, rotation angles, and positioning to protect confidential documents with Sejda.",
    "category": "Security & Encryption",
    "wordCount": "1200 Words",
    "url": "/guides/how-to-watermark-pdf-documents.html",
    "toolId": "protect"
  },
  {
    "slug": "jpg-to-pdf-conversion-standards.html",
    "title": "JPG to PDF Conversion Standards: Aspect Ratio, Page Margins & ISO PDF Compliance",
    "description": "Technical guide to converting camera snapshots, receipts, and scans into standardized, printable ISO 32000 PDF documents with custom margins and page sizes.",
    "category": "Optimization & Archival",
    "wordCount": "1212 Words",
    "url": "/guides/jpg-to-pdf-conversion-standards.html",
    "toolId": "compress"
  },
  {
    "slug": "ocr-optical-character-recognition-guide.html",
    "title": "OCR (Optical Character Recognition) Guide: Converting Scanned PDFs into Searchable Text",
    "description": "Comprehensive guide to PDF OCR technology: neural font recognition, hidden text layers, multi-language dictionary matching, and making scanned PDFs searchable.",
    "category": "AI Intelligence & OCR",
    "wordCount": "1236 Words",
    "url": "/guides/ocr-optical-character-recognition-guide.html",
    "toolId": "ai_chat"
  },
  {
    "slug": "optimizing-pdf-for-web-fast-web-view.html",
    "title": "Optimizing PDF for Web & Fast Web View: Byte-Serving and Linearization Explained",
    "description": "Learn how PDF linearization (Fast Web View) enables page-at-a-time downloading, eliminates browser lag, and accelerates PDF viewing on mobile networks.",
    "category": "Optimization & Archival",
    "wordCount": "1239 Words",
    "url": "/guides/optimizing-pdf-for-web-fast-web-view.html",
    "toolId": "compress"
  },
  {
    "slug": "optimizing-pdf-forms-for-mobile-devices.html",
    "title": "Designing & Optimizing Interactive PDF Forms for Mobile Smartphones & Tablets PDF &amp; Document Intelligence",
    "description": "Learn how to create responsive, touch-friendly AcroForms. Configure virtual keyboard triggers, field validation scripts, calculation formulas, and touch signature fields on iOS and Android.",
    "category": "Signatures & Forms",
    "wordCount": "961 Words",
    "url": "/guides/optimizing-pdf-forms-for-mobile-devices.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "pdf-a-archival-compliance-guide.html",
    "title": "PDF/A Archival Compliance Guide: Standards (1b, 2b, 3b) for 50-Year Document Preservation",
    "description": "Technical breakdown of PDF/A standards for long-term digital preservation. Learn differences between PDF/A-1b, PDF/A-2b, and PDF/A-3b, and how to ensure archival compliance.",
    "category": "Optimization & Archival",
    "wordCount": "1233 Words",
    "url": "/guides/pdf-a-archival-compliance-guide.html",
    "toolId": "compress"
  },
  {
    "slug": "pdf-accessibility-and-section-508-compliance.html",
    "title": "The Complete Guide to PDF Accessibility & Section 508 / WCAG 2.1 AA Compliance PDF &amp; Document Intelligence",
    "description": "Master the technical requirements for accessible PDF/UA documents. Tagging structures, reading order, alternative text for figures, and screen reader verification.",
    "category": "Optimization & Archival",
    "wordCount": "1062 Words",
    "url": "/guides/pdf-accessibility-and-section-508-compliance.html",
    "toolId": "compress"
  },
  {
    "slug": "pdf-color-management-cmyk-vs-rgb-for-print.html",
    "title": "PDF Color Management for Commercial Printing: CMYK vs. RGB & ICC Profiles PDF &amp; Document Intelligence",
    "description": "Technical prepress guide: understand device-dependent color spaces, converting RGB to CMYK without muddy darks, Total Area Coverage (TAC) limits, and PDF/X-1a prepress standards.",
    "category": "Optimization & Archival",
    "wordCount": "1046 Words",
    "url": "/guides/pdf-color-management-cmyk-vs-rgb-for-print.html",
    "toolId": "compress"
  },
  {
    "slug": "pdf-form-filling-and-interactive-acroforms.html",
    "title": "PDF Form Filling & Interactive AcroForms: Text Fields, Checkboxes & Field Flattening",
    "description": "Master interactive PDF AcroForms, digital form filling, field validation, XFA limitations, and flattening form widgets for secure submission.",
    "category": "Signatures & Forms",
    "wordCount": "1229 Words",
    "url": "/guides/pdf-form-filling-and-interactive-acroforms.html",
    "toolId": "fill_sign"
  },
  {
    "slug": "pdf-metadata-and-xmp-data-cleaning.html",
    "title": "How to Sanitize and Clean Hidden PDF Metadata (XMP & Info Dictionary) PDF &amp; Document Intelligence",
    "description": "Learn how to detect, view, and purge hidden PDF metadata, author names, GPS geolocation coordinates, software build numbers, and editing revision timestamps.",
    "category": "Security & Encryption",
    "wordCount": "1129 Words",
    "url": "/guides/pdf-metadata-and-xmp-data-cleaning.html",
    "toolId": "protect"
  },
  {
    "slug": "pdf-password-protection-and-permissions.html",
    "title": "PDF Password Protection & Permissions: 128-bit vs 256-bit AES Encryption Standards",
    "description": "Technical guide to securing PDF files with passwords: User vs Owner passwords, AES-256 encryption, restricting printing/copying, and cryptographic attack resistance.",
    "category": "Security & Encryption",
    "wordCount": "1218 Words",
    "url": "/guides/pdf-password-protection-and-permissions.html",
    "toolId": "protect"
  },
  {
    "slug": "pdf-security-best-practices.html",
    "title": "PDF Security &amp; Encryption Best Practices - Cybersecurity Guide",
    "description": "Cybersecurity guide on securing confidential PDFs: AES-256 password encryption, proper true redaction vs black rectangles, metadata sanitization, and ephemeral storage.",
    "category": "Security & Encryption",
    "wordCount": "1078 Words",
    "url": "/guides/pdf-security-best-practices.html",
    "toolId": "protect"
  },
  {
    "slug": "pdf-to-jpg-image-extraction-guide.html",
    "title": "PDF to JPG & PNG Conversion: Rasterization Resolution, DPI Settings & Color Profiles",
    "description": "Complete guide to converting PDF pages into crisp JPG and PNG image files. Covers DPI benchmarks, CMYK to sRGB color matrices, and batch extraction.",
    "category": "Optimization & Archival",
    "wordCount": "900 Words",
    "url": "/guides/pdf-to-jpg-image-extraction-guide.html",
    "toolId": "compress"
  },
  {
    "slug": "redacting-sensitive-data-in-pdf.html",
    "title": "Redacting Sensitive Data in PDF: True Cryptographic Redaction vs Black Box Overlays",
    "description": "Learn why drawing black boxes over PDF text fails redaction audits, how true cryptographic redaction purges underlying text objects, and how to protect sensitive data.",
    "category": "Security & Encryption",
    "wordCount": "1230 Words",
    "url": "/guides/redacting-sensitive-data-in-pdf.html",
    "toolId": "protect"
  },
  {
    "slug": "repairing-corrupted-pdf-files.html",
    "title": "Repairing Corrupted PDF Files: Rebuilding XREF Tables, Stream Recovery & Data Salvage",
    "description": "Technical troubleshooting guide for repairing damaged or unreadable PDF files: rebuilding missing XREF tables, reconstructing truncated streams, and salvaging data.",
    "category": "AI Intelligence & OCR",
    "wordCount": "1187 Words",
    "url": "/guides/repairing-corrupted-pdf-files.html",
    "toolId": "ai_chat"
  }
];
