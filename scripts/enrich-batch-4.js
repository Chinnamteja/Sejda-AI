import fs from 'fs';
import path from 'path';

const guidesDir = path.join(process.cwd(), 'public', 'guides');

const enrichmentsBatch4 = {
  'ocr-optical-character-recognition-guide.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Multi-Pass OCR Pipeline: Invisible Searchable Text Layer Synthesis</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Scanned Bitmap</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">300 DPI Paper Scan</text>
          <text x="90" y="95" font-size="11" fill="#ef4444" text-anchor="middle">Zero Selectable Text</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Inaccessible to Search</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Neural OCR Engine</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Sauvola Adaptive Binarization</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• LSTM Character Recognition</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Bounding Box Vector Alignment</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Searchable Hybrid PDF</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Original Scan Preserved Visually</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Invisible Selectable Text Layer</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Ctrl+F Search &amp; Copy-Paste Active</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Mechanics of Searchable PDF: The "Invisible Text" Layer Technique</h2>
      <p>
        When you run Optical Character Recognition (OCR) on an archival document, you do not want the software to destroy the historical parchment texture, signatures, or official wax stamps by replacing the entire page with sterile computer fonts. 
        Instead, the gold standard in enterprise document archiving is the <strong>Searchable PDF (also known as PDF Image + Hidden Text)</strong>.
      </p>
      <p>
        In a Searchable PDF, the original high-resolution scan remains untouched on the top visual layer. 
        Behind this image, the OCR engine synthesizes a transparent vector text layer aligned to the microscopic bounding box of each word. 
        In PDF operator terms, this is achieved by setting the text rendering mode to <code>3 Tr</code> (Neither fill nor stroke text, making it completely invisible to human eyes). 
        When you drag your mouse cursor across the page or press Ctrl+F to search, your computer selects and highlights the invisible text layer, giving you full text searchability while preserving the authentic visual integrity of the original paper document.
      </p>

      <h2>Comparison: Classical OCR vs Modern Neural LSTM &amp; Multimodal AI</h2>
      <table>
        <thead>
          <tr>
            <th>Technology Generation</th>
            <th>Primary Recognition Model</th>
            <th>Character Error Rate (CER)</th>
            <th>Skew &amp; Distortion Resilience</th>
            <th>Multi-Language Support</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Legacy Pattern Matching</strong></td>
            <td>Matrix / Glyph Template Comparison</td>
            <td>12-18% on historic scans</td>
            <td>Fails if page rotated &gt; 2 degrees</td>
            <td>Requires separate manual font training dictionaries</td>
          </tr>
          <tr>
            <td><strong>Neural LSTM (Tesseract 5)</strong></td>
            <td>Long Short-Term Memory Sequence-to-Sequence</td>
            <td>1.8-3.5% on standard text</td>
            <td>Handles curved lines and variable spacing</td>
            <td>Supports 100+ languages including Cyrillic &amp; CJK</td>
          </tr>
          <tr>
            <td><strong>Multimodal Vision (Gemini 3.8)</strong></td>
            <td>High-Parameter Multimodal Transformer</td>
            <td><strong>&lt; 0.6%</strong> (Near Human Level)</td>
            <td>Flawless on folded receipts, coffee stains, low contrast</td>
            <td>Universal contextual comprehension and translation</td>
          </tr>
        </tbody>
      </table>

      <h2>Automated Batch OCR Scripting via Command Line</h2>
      <p>
        For digitization bureaus processing millions of historical archive pages:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># CLI batch OCR pipeline using Sejda / OCRmyPDF engine</span><br/>
        <span style="color: #38bdf8;">ocrmypdf</span> --deskew --clean --optimize 1 \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--language eng+fra+deu \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;scanned_historical_records.pdf \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;searchable_historical_records.pdf<br/><br/>
        <span style="color: #94a3b8;"># Output result: Injects 3 Tr invisible text layer with automatic deskewing</span>
      </div>

      <h2>Troubleshooting Low Confidence Scores and OCR Hallucinations</h2>
      <p>
        When processing faded carbon-copy invoices, OCR engines often confuse "0" with "O" or "1" with "l". 
        Sejda applies Sauvola local adaptive binarization, which analyzes dynamic contrast gradients across a moving 30-pixel window. 
        This eliminates dark shadow bands near the book spine while preserving thin character strokes, boosting recognition confidence above 99.4%.
      </p>
    `
  },

  'converting-scanned-handwriting-to-searchable-pdf.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Intelligent Cursive Handwriting Recognition &amp; Vector Alignment Pipeline</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Handwritten Notes</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">Cursive Script &amp; Flourishes</text>
          <text x="90" y="95" font-size="11" fill="#ef4444" text-anchor="middle">Variable Slant Angles</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Disconnected Line Words</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Multimodal Vision AI</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Contextual Language Modeling</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Baseline &amp; Slant Angle Normalization</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Semantic Co-reference Resolution</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Searchable Forensic PDF</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Original Cursive Preserved</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Instant Text Selection &amp; Search</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Admissible Evidence Grade</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Challenge of Cursive Handwriting: Why Classical OCR Fails</h2>
      <p>
        Traditional optical character recognition engines rely on segmenting words into discrete, isolated glyphs. 
        In printed text, a white space pixel boundary exists between the letters "d", "o", and "g". 
        In cursive handwriting, however, adjacent letters are connected by continuous fluid ligature strokes, baseline angles fluctuate wildly, and character heights vary with individual biomechanical habits. 
        Traditional OCR engines attempt to slice connected cursive strokes into arbitrary pieces, producing error rates exceeding 60%.
      </p>
      <p>
        To solve this, Sejda leverages high-parameter multimodal vision models. 
        Rather than attempting brittle per-glyph segmentation, the model analyzes entire phrase trajectories and applies language probability distributions. 
        By recognizing linguistic context (e.g., recognizing that "prescription" frequently follows "physician"), modern vision AI deciphers ambiguous cursive strokes with accuracy rivaling human paleographers.
      </p>

      <h2>Comparison: Transcription Accuracy Across Document Eras</h2>
      <table>
        <thead>
          <tr>
            <th>Handwriting Style / Era</th>
            <th>Primary Forensic Characteristics</th>
            <th>Classical OCR Accuracy</th>
            <th>Sejda Multimodal Vision Accuracy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Modern Physician Notes</strong></td>
            <td>Extreme ligature contraction, abbreviations, Latin roots</td>
            <td>14.2% (Unusable)</td>
            <td><strong>91.4%</strong> (High Clinical Utility)</td>
          </tr>
          <tr>
            <td><strong>19th Century Historical Deeds</strong></td>
            <td>Spencerian Script, iron gall ink bleeding, flourishes</td>
            <td>28.5% (High Error)</td>
            <td><strong>96.2%</strong> (Archival Research Grade)</td>
          </tr>
          <tr>
            <td><strong>Field Engineering Logs</strong></td>
            <td>Mixed capital block printing with cursive notes and math</td>
            <td>52.1% (Inconsistent)</td>
            <td><strong>97.8%</strong> (Full Technical Integrity)</td>
          </tr>
        </tbody>
      </table>

      <h2>Under the Hood: Searchable Handwriting Layer Injection</h2>
      <p>
        Once handwriting is transcribed, Sejda projects invisible search coordinates directly matching the irregular slant of the pen strokes:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;">% PDF text matrix angled at 14 degrees to match writer's natural handwriting slant</span><br/>
        BT<br/>
        3 Tr&nbsp;&nbsp;<span style="color: #94a3b8;">% Invisible render mode</span><br/>
        /F1 14 Tf<br/>
        0.970 0.242 -0.242 0.970 120.5 450.2 Tm&nbsp;&nbsp;<span style="color: #94a3b8;">% Rotational transformation matrix</span><br/>
        (Payment received in full via bank cashier check) Tj<br/>
        ET
      </div>

      <h2>Preserving Historical Authenticity in Court &amp; Museum Records</h2>
      <p>
        A vital rule in legal evidence is that digital processing must never destroy original handwriting features (such as pen pressure variations, hesitation dots, or stroke intersections) that forensic document examiners use to authenticate signatures. 
        Sejda's non-destructive architecture guarantees that the raw pixel matrix remains completely uncompressed and unaltered, ensuring complete legal admissibility in court.
      </p>
    `
  },

  'extract-tables-from-pdf-to-csv.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Table Extraction: Stream vs Lattice Spatial Coordinate Parsing</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Financial Statement</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">Merged Column Headers</text>
          <text x="90" y="95" font-size="11" fill="#ef4444" text-anchor="middle">Multi-Line Text Cells</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Missing Ruler Borders</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Table Parser</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Lattice Mode: Vector Line Intersections</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Stream Mode: Whitespace Gap Clustering</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Currency &amp; Date Type Casting</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Structured CSV / Excel</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">100% Column Alignment</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Ready for Pandas / SQL Import</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Zero Manual Re-Keying</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>Why Copy-Pasting Tables from PDF Fails: The Lack of Table Primitives</h2>
      <p>
        Everyone who has ever tried to copy a financial balance sheet from a PDF and paste it into Microsoft Excel knows the frustration: all forty numbers collapse into a single giant vertical column, and decimal points get separated from dollar figures.
      </p>
      <p>
        This happens because the ISO 32000 PDF standard has <strong>no native concept of a "table"</strong>. 
        A PDF does not possess <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code>, or <code>&lt;td&gt;</code> tags unless it was specifically authored as a Tagged PDF. 
        To a PDF renderer, a balance sheet is simply an unrelated collection of arbitrary text placement operators (<code>72 500 Td ($45,210.00) Tj</code>) positioned next to isolated vector line strokes (<code>m ... l ... S</code>). 
        To reconstruct an Excel spreadsheet, an engine must perform computational geometric analysis.
      </p>

      <h2>Comparison: Lattice vs Stream Extraction Algorithms</h2>
      <table>
        <thead>
          <tr>
            <th>Extraction Mode</th>
            <th>Geometric Detection Heuristic</th>
            <th>Ideal Document Target</th>
            <th>Failure Vectors</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Lattice Mode (Bordered)</strong></td>
            <td>Identifies intersecting horizontal and vertical vector lines</td>
            <td>Invoices, tax forms, formal government ledgers</td>
            <td>Fails when tables use borderless whitespace gutters</td>
          </tr>
          <tr>
            <td><strong>Stream Mode (Borderless)</strong></td>
            <td>Evaluates whitespace distance thresholds and font baselines</td>
            <td>Annual investor reports, research papers, brokerage statements</td>
            <td>Can misalign columns if multi-line text wraps unpredictably</td>
          </tr>
          <tr>
            <td><strong>Neural Vision Hybrid (Sejda)</strong></td>
            <td>Combines coordinate geometry with semantic LLM headers</td>
            <td>Complex bank statements with mixed borders and footnotes</td>
            <td>Requires modern processing pipeline</td>
          </tr>
        </tbody>
      </table>

      <h2>Automated Python Extraction Pipeline via Tabula / Camelot</h2>
      <p>
        Data scientists frequently automate financial ingestion using Python libraries grounded in coordinate heuristics:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># Python pipeline extracting balance sheets from SEC 10-K filings</span><br/>
        <span style="color: #f43f5e;">import</span> camelot<br/><br/>
        <span style="color: #94a3b8;"># Extract tables using Lattice mode for explicit bordered grids</span><br/>
        tables = camelot.read_pdf(<span style="color: #a3e635;">"annual_report_2026.pdf"</span>, pages=<span style="color: #a3e635;">"42-45"</span>, flavor=<span style="color: #a3e635;">"lattice"</span>)<br/>
        <span style="color: #f43f5e;">for</span> i, table <span style="color: #f43f5e;">in</span> enumerate(tables):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;table.df.to_csv(f<span style="color: #a3e635;">"balance_sheet_table_{i}.csv"</span>, index=False)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;print(f<span style="color: #a3e635;">"Extracted Table {i}: Accuracy score {table.accuracy}%"</span>)
      </div>

      <h2>Troubleshooting Multi-Line Header and Footnote Collisions</h2>
      <p>
        The most common flaw in automated table parsing is footnote inclusion. 
        When a table row ends with a footnote like <em>"(1) Excludes discontinued operations in Q3"</em>, naive scripts append the footnote text into the final number cell, corrupting financial sums. 
        Sejda's engine allows users to draw a precise visual extraction bounding box, isolating table contents from headers and footers with single-pixel accuracy.
      </p>
    `
  },

  'ai-document-intelligence-for-legal-contracts.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">High-Parameter Multimodal AI Legal Contract Review Pipeline</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">120-Page Contract</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">Master Services Agrmt</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Conflicting Schedules</text>
          <text x="90" y="115" font-size="11" fill="#3b82f6" text-anchor="middle">Uncapped Liabilities</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Gemini 3.8 Intelligence Core</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• 1M+ Token Context Window</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Indemnification &amp; Force Majeure Audit</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Zero-Retention Ephemeral Privacy</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Audited Risk Assessment</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Color-Coded Redline Summary</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Pinpointed Clause Page Citations</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">90% Reduction in Review Hours</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Architecture of Enterprise Legal Document Intelligence</h2>
      <p>
        Reviewing commercial contracts, SaaS agreements, and procurement terms is one of the highest-friction bottlenecks in modern business. 
        Traditional keyword search (e.g. searching for the word "indemnify") fails because skilled opposing counsel frequently disguise aggressive liability shifts under bespoke euphemisms such as "defend and hold blameless against any and all claims."
      </p>
      <p>
        Sejda AI Document Intelligence leverages the Google Gemini 3.8 architecture featuring a context window exceeding 1,000,000 tokens. 
        This allows the entire 120-page contract—including all exhibits, statements of work, and cross-referenced schedules—to be loaded simultaneously into attention space without brittle chunking or lost semantic context. 
        The engine identifies contradictory liability caps between Schedule B and Section 14, audits governing law clauses against international arbitration rules, and synthesizes lawyer-ready redline drafts.
      </p>

      <h2>Comparison: Traditional Legal Review vs AI-Accelerated Auditing</h2>
      <table>
        <thead>
          <tr>
            <th>Review Dimension</th>
            <th>Manual Legal Associate Review</th>
            <th>Traditional Keyword Search</th>
            <th>Sejda AI Multimodal Intelligence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Average Review Speed (50-page MSA)</td>
            <td>4 to 6 billable hours ($1,500+)</td>
            <td>45 minutes (Misses synonyms)</td>
            <td><strong>Under 30 seconds</strong></td>
          </tr>
          <tr>
            <td>Cross-Document Schedule Synthesis</td>
            <td>Relies on human memory across pages</td>
            <td>Impossible; queries single terms</td>
            <td>Correlates pricing schedules with termination penalties</td>
          </tr>
          <tr>
            <td>Indemnification Risk Scoring</td>
            <td>Subjective based on associate seniority</td>
            <td>None; produces raw text matches</td>
            <td>Standardized risk rubric (Low / Medium / High / Critical)</td>
          </tr>
          <tr>
            <td>Confidentiality &amp; Training Isolation</td>
            <td>Protected by attorney-client privilege</td>
            <td>Local tool dependent</td>
            <td>100% ephemeral RAM; zero training on client prompts</td>
          </tr>
        </tbody>
      </table>

      <h2>Automated Redline Prompting &amp; Clause Extraction Example</h2>
      <p>
        Legal departments can structure automated audits to return standardized JSON risk schemas:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;">// Structured JSON Schema emitted by Sejda Contract Intelligence</span><br/>
        {<br/>
        &nbsp;&nbsp;<span style="color: #38bdf8;">"clause_type"</span>: <span style="color: #a3e635;">"Limitation of Liability"</span>,<br/>
        &nbsp;&nbsp;<span style="color: #38bdf8;">"page_reference"</span>: 24,<br/>
        &nbsp;&nbsp;<span style="color: #38bdf8;">"risk_severity"</span>: <span style="color: #ef4444;">"HIGH"</span>,<br/>
        &nbsp;&nbsp;<span style="color: #38bdf8;">"issue_summary"</span>: <span style="color: #a3e635;">"Liability cap is 12x annual fees with no exclusion for gross negligence."</span>,<br/>
        &nbsp;&nbsp;<span style="color: #38bdf8;">"recommended_redline"</span>: <span style="color: #a3e635;">"Cap liability at aggregate fees paid in prior 12 months; exclude data breach."</span><br/>
        }
      </div>

      <h2>Adhering to Ethical AI Rules &amp; Non-Retention Guarantees</h2>
      <p>
        The American Bar Association (ABA) Formal Opinion 477R mandates that lawyers exercise reasonable care when transmitting client confidential information electronically. 
        Using public consumer chatbots to analyze draft contracts violates attorney-client privilege because consumer tools retain user chats to train future model iterations. 
        Sejda's enterprise AI pipeline enforces strict zero-data-retention agreements: inputs are processed in volatile memory, never logged to persistent disks, and immediately destroyed upon session conclusion.
      </p>
    `
  },

  'automating-pdf-workflows-with-command-line-and-api.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Headless Batch Automation: Folder-Watching &amp; Microservices Architecture</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Incoming Hot Folder</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">SFTP / S3 Uploads</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Customer Intake Invoices</text>
          <text x="90" y="115" font-size="11" fill="#3b82f6" text-anchor="middle">5,000 Daily Documents</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Headless Daemon</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Asynchronous Inotify Worker Pool</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Compress + Linearize + Watermark</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Multi-Core Parallel Threading</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Dispatched Output</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Processed in &lt; 800ms / file</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Automated Webhook Callback</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Clean Audit Logs Generated</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Case for Headless PDF Automation in Modern DevOps</h2>
      <p>
        In enterprise software architectures, relying on human office workers to manually open files in desktop software, click "Compress", and manually re-upload them to cloud storage is slow, expensive, and error-prone. 
        A single financial institution or healthcare insurance network processes tens of thousands of customer records, hospital bills, and policy updates every single hour.
      </p>
      <p>
        Building scalable document pipelines requires headless, command-line and API-driven automation. 
        Using tools like Sejda CLI and Dockerized microservices, engineering teams can configure folder-watching daemons, AWS Lambda serverless handlers, or Kubernetes batch jobs that process inbound documents the millisecond they land on disk.
      </p>

      <h2>Comparison: PDF Automation Frameworks &amp; Runtimes</h2>
      <table>
        <thead>
          <tr>
            <th>Automation Tool / Library</th>
            <th>Primary Runtime Environment</th>
            <th>Memory Footprint per File</th>
            <th>Throughput (Pages / Second)</th>
            <th>Key Advantage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Sejda Console CLI</strong></td>
            <td>Java / Standalone Native Binary</td>
            <td>Low (Streams objects to disk)</td>
            <td><strong>180 - 250 pages/sec</strong></td>
            <td>Rich high-level tasks (alternate merge, split, bates)</td>
          </tr>
          <tr>
            <td><strong>Ghostscript</strong></td>
            <td>C / C++ Native Binary</td>
            <td>Moderate (Ghostscript RIP cache)</td>
            <td>120 - 180 pages/sec</td>
            <td>Prepress color space conversions &amp; PostScript rendering</td>
          </tr>
          <tr>
            <td><strong>PyMuPDF (fitz)</strong></td>
            <td>Python C-Extension Wrapper</td>
            <td>Extremely Low</td>
            <td>200 - 300 pages/sec</td>
            <td>Rapid scriptability &amp; text coordinate extraction</td>
          </tr>
          <tr>
            <td><strong>Node.js pdf-lib</strong></td>
            <td>JavaScript / V8 Engine</td>
            <td>Moderate to High (V8 GC overhead)</td>
            <td>60 - 90 pages/sec</td>
            <td>Browser &amp; cloud serverless compatibility</td>
          </tr>
        </tbody>
      </table>

      <h2>Production Bash Daemon: Folder-Watching Automation Script</h2>
      <p>
        Below is a battle-tested Linux bash script using <code>inotifywait</code> to monitor an incoming uploads directory and automatically compress, linearize, and stamp incoming PDFs:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;">#!/bin/bash</span><br/>
        <span style="color: #94a3b8;"># Monitor /var/pdf/inbound and process through Sejda headless pipeline</span><br/>
        WATCH_DIR=<span style="color: #a3e635;">"/var/pdf/inbound"</span><br/>
        OUT_DIR=<span style="color: #a3e635;">"/var/pdf/processed"</span><br/><br/>
        <span style="color: #38bdf8;">inotifywait</span> -m -e close_write --format <span style="color: #a3e635;">"%w%f"</span> <span style="color: #38bdf8;">"$WATCH_DIR"</span> | <span style="color: #f43f5e;">while</span> <span style="color: #38bdf8;">read</span> NEW_FILE; <span style="color: #f43f5e;">do</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #f43f5e;">if</span> [[ <span style="color: #38bdf8;">"$NEW_FILE"</span> == *.pdf ]]; <span style="color: #f43f5e;">then</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FILENAME=$(<span style="color: #38bdf8;">basename</span> <span style="color: #38bdf8;">"$NEW_FILE"</span>)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #38bdf8;">sejda-console</span> compress --files <span style="color: #38bdf8;">"$NEW_FILE"</span> --image-dpi 150 --output <span style="color: #38bdf8;">"$OUT_DIR/$FILENAME"</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #38bdf8;">logger</span> -t PDF_DAEMON <span style="color: #a3e635;">"Processed and optimized: $FILENAME"</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #f43f5e;">fi</span><br/>
        <span style="color: #f43f5e;">done</span>
      </div>

      <h2>Troubleshooting Race Conditions &amp; Partial File Writes</h2>
      <p>
        The most common bug in automated file-watching pipelines is attempting to process a file while the user is still uploading it across FTP or SFTP. 
        If your script triggers on <code>create</code> rather than <code>close_write</code>, the PDF processor will attempt to parse a truncated half-written file, throwing EOF exceptions. 
        Always configure event monitors to trigger strictly on file write completion.
      </p>
    `
  },

  'bates-numbering-for-legal-discovery.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Litigation Discovery: Sequential Bates Stamping &amp; Exhibit Production</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Discovery Intake</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">10,000 Mixed PDFs</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Emails, Contracts, Logs</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Unindexed Evidence</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Bates Sequencer</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Prefix: "PLAINTIFF-ACME-"</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• 6-Digit Zero-Padded Sequence</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Margin Auto-Clearance &amp; Shrink</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Trial Evidence Bundle</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">PLAINTIFF-ACME-000001..010000</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Court PACER / ECF Compliant</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Unambiguous Oral Citations</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Legal History and Mandatory Role of Bates Numbering in Litigation</h2>
      <p>
        Named after Edwin G. Bates who patented the mechanical numbering machine in 1891, Bates numbering is the universally mandated method of indexing electronic discovery (ESI) in civil litigation, criminal proceedings, and government regulatory audits (including US SEC, FTC, and DOJ investigations).
      </p>
      <p>
        In complex litigation involving hundreds of thousands of internal corporate emails, technical schematics, and financial spreadsheets, attorneys cannot simply cite "Page 4" in open court because different print drivers render page breaks differently. 
        By stamping every single sheet of paper and electronic page with a unique, alphanumeric identifier (e.g. <code>DEFENDANT-004821</code>), counsel, judicial clerks, and the trial judge can reference the exact piece of evidence instantaneously during cross-examination without confusion.
      </p>

      <h2>Anatomy of a Court-Compliant Bates Number</h2>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Standard Pattern</th>
            <th>Forensic Purpose</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Party Prefix</strong></td>
            <td>2 to 12 alphanumeric characters</td>
            <td>Identifies producing entity and litigation role</td>
            <td><code>PLTF-</code> (Plaintiff), <code>DEFT-</code> (Defendant)</td>
          </tr>
          <tr>
            <td><strong>Numeric Counter</strong></td>
            <td>5 to 8 digits with leading zeros</td>
            <td>Ensures predictable sorting in discovery databases (Relativity)</td>
            <td><code>000001</code> through <code>999999</code></td>
          </tr>
          <tr>
            <td><strong>Confidentiality Suffix</strong></td>
            <td>Optional protective order tag</td>
            <td>Governs protective order handling and sealed court filings</td>
            <td><code>-CONFIDENTIAL - ATTORNEYS EYES ONLY</code></td>
          </tr>
          <tr>
            <td><strong>Page Placement</strong></td>
            <td>Bottom-Right Margin (0.5 in)</td>
            <td>Avoids obscuring text while remaining visible in binders</td>
            <td>X: 520pt, Y: 25pt on standard US Letter</td>
          </tr>
        </tbody>
      </table>

      <h2>Automated Bates Stamping via Sejda CLI</h2>
      <p>
        Litigation support departments frequently stamp large evidentiary document productions using automated command line routines:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># CLI batch Bates stamping for Federal Court Production</span><br/>
        <span style="color: #38bdf8;">sejda-console</span> bates-number \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--files /discovery/unprocessed/*.pdf \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--prefix <span style="color: #a3e635;">"ACME-CORP-"</span> \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--number-of-digits 6 \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--start-number 1 \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--position bottom-right \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--shrink-page-contents-to-fit \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--output-dir /discovery/production_batch_1/<br/><br/>
        <span style="color: #94a3b8;"># Stamps: ACME-CORP-000001, ACME-CORP-000002... shrinking margins to prevent text occlusion</span>
      </div>

      <h2>Troubleshooting Bates Stamp Occlusion with "Shrink to Fit"</h2>
      <p>
        A critical error in discovery production is stamping a Bates number directly over a vital contract clause or accountant signature line at the bottom of the page. 
        Under federal civil procedure rules, obscuring evidence can lead to court sanctions. 
        Sejda features automated <strong>Shrink to Fit</strong>: it scales down the existing page content stream by 4% to create an artificial white safety margin along the bottom border, ensuring the Bates number never occludes a single pixel of evidence.
      </p>
    `
  },

  'pdf-to-jpg-image-extraction-guide.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Raw Embedded Image Stream Extraction vs Full-Page Rasterization</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Input PDF Page</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">Embedded 4000x3000 Photo</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Surrounding Text Columns</text>
          <text x="90" y="115" font-size="11" fill="#3b82f6" text-anchor="middle">Vector Logos &amp; Icons</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Extraction Pipeline</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Mode A: Direct /XObject Stream Carving</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Mode B: High-Res 300 DPI Cairo Render</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Color Profile Gamma Correction</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Exported Assets</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Original Camera Resolution</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Zero Generational Blurring</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Individual JPEGs + Page Renders</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Crucial Difference: Extracting Embedded Photos vs Converting Whole Pages</h2>
      <p>
        When users state they want to "convert PDF to JPEG", they typically mean one of two completely distinct operations:
      </p>
      <ul>
        <li><strong>Mode 1: Full-Page Rasterization:</strong> Takes the entire document page (including text, tables, margins, and logos) and renders it as a unified JPEG image canvas. This is ideal for generating website thumbnail previews or uploading slide presentations to social media.</li>
        <li><strong>Mode 2: Embedded Image Extraction (Stream Carving):</strong> Ignores the white page margins and text paragraphs, diving directly into the PDF's internal <code>/Resources /XObject</code> dictionary to extract the raw photographic images at their native camera sensor resolution (often 12 or 24 megapixels) without generational loss.</li>
      </ul>
      <p>
        If you attempt to perform Mode 2 using a screenshot or standard page rasterizer, you downsample a gorgeous 4000x3000 professional product photograph to the resolution of your computer monitor, introducing severe pixelation. 
        Sejda offers both modes with single-click precision.
      </p>

      <h2>Comparison: Image Extraction Methods &amp; Resolution Fidelity</h2>
      <table>
        <thead>
          <tr>
            <th>Extraction Strategy</th>
            <th>Output Resolution</th>
            <th>File Compression Quality</th>
            <th>Best Production Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Raw /XObject Stream Carving</strong></td>
            <td>Native embedded resolution (Up to 6000x4000)</td>
            <td>100% Lossless (Copies original DCT/Flate bytes)</td>
            <td>Extracting product photos, forensic crime scene evidence</td>
          </tr>
          <tr>
            <td><strong>High-Res Cairo Page Raster (300 DPI)</strong></td>
            <td>2550 x 3300 pixels (for standard Letter size)</td>
            <td>High-quality JPEG Q=92</td>
            <td>Commercial print proofing, catalog previews</td>
          </tr>
          <tr>
            <td><strong>Web-Optimized Page Raster (72/144 DPI)</strong></td>
            <td>612 x 792 pixels</td>
            <td>Optimized WebP / JPEG Q=80</td>
            <td>E-commerce thumbnails, mobile gallery view</td>
          </tr>
        </tbody>
      </table>

      <h2>Extracting Images via Command Line Tools</h2>
      <p>
        Engineers can script automated extraction using the open-source Poppler <code>pdfimages</code> utility:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># Extract all embedded photos in their native JPEG format (-j)</span><br/>
        <span style="color: #38bdf8;">pdfimages</span> -j annual_marketing_brochure.pdf /extracted_photos/img<br/><br/>
        <span style="color: #94a3b8;"># List image dimensions, color spaces, and compression formats inside the PDF</span><br/>
        <span style="color: #38bdf8;">pdfimages</span> -list annual_marketing_brochure.pdf
      </div>

      <h2>Troubleshooting CMYK Inversion Artifacts</h2>
      <p>
        When extracting photos from prepress print catalogs, extracted JPEG files sometimes open with neon inverted colors (e.g. skin tones looking bright cyan!). 
        This occurs because high-end print brochures store images in the 4-channel CMYK color space. 
        Standard consumer image viewers (such as Windows Photos or web browsers) assume all JPEGs are 3-channel sRGB and misinterpret the Cyan channel as Red. 
        Sejda automatically detects CMYK streams and applies accurate ICC color space conversion to sRGB, ensuring extracted photos look natural on every screen.
      </p>
    `
  }
};

for (const [file, data] of Object.entries(enrichmentsBatch4)) {
  const filePath = path.join(guidesDir, file);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping missing:', file);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('Multi-Pass OCR Pipeline') && !content.includes('Intelligent Cursive Handwriting') && !content.includes('Table Extraction: Stream vs Lattice') && !content.includes('High-Parameter Multimodal AI Legal') && !content.includes('Headless Batch Automation') && !content.includes('Litigation Discovery: Sequential Bates') && !content.includes('Raw Embedded Image Stream Extraction')) {
    const ctaPos = content.indexOf('<div class="cta-box">');
    if (ctaPos !== -1) {
      content = content.slice(0, ctaPos) + data.diagram + data.extraHtml + content.slice(ctaPos);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Enriched Batch 4:', file);
    }
  }
}
