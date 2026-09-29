import fs from 'fs';
import path from 'path';

const guidesDir = path.join(process.cwd(), 'public', 'guides');

const enrichmentsBatch2 = {
  'pdf-security-best-practices.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Enterprise PDF Defense-in-Depth Architecture</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Layer 1: Payload Clean</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">Strip Embedded JS</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Purge /Launch Actions</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Zero-Day Neutralization</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Layer 2: Crypto &amp; Metadata</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• AES-256 GCM Content Encryption</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Deep XMP Forensic Scrubbing</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Vector Flattened Redaction</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Layer 3: Trust &amp; Nonce</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">RFC 3161 Timestamp Token</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Tamper-Proof Audit Trail</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Ephemeral RAM Destruction</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Threat Landscape: PDF Attack Vectors and Weaponization</h2>
      <p>
        The Portable Document Format is vastly more sophisticated than a static text file. 
        Under the ISO 32000 specification, a PDF file is practically a miniature operating system environment supporting embedded Turing-complete JavaScript engines, binary attachment execution streams (<code>/Launch</code> actions), dynamic form calculations (AcroForms/XFA), and remote HTTP URI callbacks. 
        For cybersecurity teams, an uninspected PDF entering a corporate network represents a high-priority attack surface.
      </p>
      <p>
        Common threat vectors include heap spray exploits targeting buffer overflows in outdated reader software, malicious script triggers bound to page open events (<code>/OpenAction</code> or <code>/AA</code> annotations), and outbound SSRF (Server-Side Request Forgery) attacks triggered when an AcroForm attempts to fetch external XML schemas. 
        Implementing robust PDF security requires sanitizing executable streams while strictly preserving visual legibility.
      </p>

      <h2>Comprehensive PDF Security Threat Mitigation Matrix</h2>
      <table>
        <thead>
          <tr>
            <th>Attack Vector / Vulnerability</th>
            <th>PDF Object Mechanism</th>
            <th>Potential Exploitation Outcome</th>
            <th>Sejda Security Countermeasure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Embedded JavaScript Exploits</strong></td>
            <td><code>/Names &gt;&gt; /JavaScript</code> dictionary</td>
            <td>Client-side buffer overflow, malware delivery</td>
            <td>Complete excision of script dictionaries during sanitization</td>
          </tr>
          <tr>
            <td><strong>Arbitrary OS Execution</strong></td>
            <td><code>/Action &gt;&gt; /S /Launch</code> operator</td>
            <td>Spawns PowerShell, CMD, or bash shell on host</td>
            <td>Strip all <code>/Launch</code> actions; restrict to internal links</td>
          </tr>
          <tr>
            <td><strong>Outbound Phishing / Phone-Home</strong></td>
            <td><code>/URI</code> action on page render</td>
            <td>Leaked corporate IP, tracking tokens, credential capture</td>
            <td>Sanitize automated external callbacks to require user click</td>
          </tr>
          <tr>
            <td><strong>Forensic Metadata Leakage</strong></td>
            <td><code>/Metadata</code> XMP &amp; <code>/Info</code> dictionaries</td>
            <td>Exposes author usernames, internal server paths, edit logs</td>
            <td>Cryptographic strip of author names, UUIDs, and printer serials</td>
          </tr>
        </tbody>
      </table>

      <h2>Automating Corporate PDF Gateway Sanitization</h2>
      <p>
        Security operations centers (SOC) frequently deploy automated document scrubbing pipelines to neutralize risks before documents reach end-user inboxes:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># Python enterprise PDF sanitization script example using PyMuPDF / Sejda engine</span><br/>
        <span style="color: #f43f5e;">import</span> fitz  <span style="color: #94a3b8;"># PyMuPDF</span><br/><br/>
        <span style="color: #f43f5e;">def</span> <span style="color: #38bdf8;">sanitize_document</span>(input_path, output_path):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;doc = fitz.open(input_path)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;"># 1. Purge dangerous JavaScript streams</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #f43f5e;">if</span> doc.embfile_count() &gt; 0: doc.embfile_del()<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;"># 2. Defuse automatic launch triggers and embedded actions</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;doc.scrub(attached_files=True, clean_pages=True, embedded_files=True, javascript=True, metadata=True)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;"># 3. Save with garbage collection and stream deflation</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;doc.save(output_path, garbage=4, deflate=True)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;print(<span style="color: #a3e635;">"Sanitization complete: Document neutral &amp; verified safe."</span>)
      </div>

      <h2>Troubleshooting Security Inspection False Positives</h2>
      <p>
        Occasionally, rigorous corporate PDF firewalls block legitimate enterprise invoices or engineering specifications. 
        This is typically caused by complex vector CAD paths that security scanners misidentify as binary shellcode payloads due to high entropy. 
        Converting files to standardized PDF/A-2b format normalizes all graphics streams into predictable FlateDecode objects, resolving false-positive antivirus blocks permanently.
      </p>
    `
  },

  'pdf-password-protection-and-permissions.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">User (Open) vs Owner (Permissions) Cryptographic Key Derivation</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Passphrase Input</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">Salt: 32-byte Cryptographic</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">PBKDF2 / SHA-256 Iterations</text>
          <text x="90" y="115" font-size="11" fill="#3b82f6" text-anchor="middle">Hash Rounds: 100,000</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Standard Security Handler</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Encryption Filter: /Standard (R=6)</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Content Key: AES-256 CBC/GCM</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• 32-bit Permissions Flags (P-Value)</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Encrypted Document Container</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Brute-Force Infeasible</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Full Stream Confidentiality</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Granular Print/Copy Control</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Cryptographic Difference: User Passwords vs Owner Passwords</h2>
      <p>
        In the ISO 32000 PDF standard, password security is governed by two fundamentally distinct keys:
      </p>
      <ul>
        <li><strong>User Password (Document Open Password):</strong> When set, the underlying content streams, images, and text dictionaries are encrypted with a 256-bit symmetric cipher key. Without entering the exact passphrase, the bytes cannot be deciphered by any software on earth. Even supercomputers cannot brute-force a strong 16-character AES-256 password.</li>
        <li><strong>Owner Password (Permissions Password):</strong> Governs operational permissions—such as printing restrictions, copying text to clipboard, or modifying annotations. 
        Unlike User Passwords, an Owner Password does not necessarily encrypt the underlying text streams; instead, it sets a 32-bit integer bitmask known as the <code>/P</code> (Permissions) flag. Compliant viewers like Adobe Acrobat honor this flag by disabling the "Print" or "Copy" menus.</li>
      </ul>

      <h2>Evolution of PDF Encryption Standards: RC4 to Modern AES-256</h2>
      <table>
        <thead>
          <tr>
            <th>Specification Version</th>
            <th>Cipher Algorithm</th>
            <th>Key Length</th>
            <th>Security Assessment</th>
            <th>Enterprise Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PDF 1.1 - 1.3 (Rev 2)</td>
            <td>RC4 Stream Cipher</td>
            <td>40-bit Key</td>
            <td>Trivially cracked in under 2 seconds</td>
            <td>Deprecate immediately; unsafe</td>
          </tr>
          <tr>
            <td>PDF 1.4 - 1.5 (Rev 3)</td>
            <td>RC4 Stream Cipher</td>
            <td>128-bit Key</td>
            <td>Vulnerable to key schedule collisions</td>
            <td>Prohibited for financial &amp; medical records</td>
          </tr>
          <tr>
            <td>PDF 1.6 (Rev 4)</td>
            <td>AES (CBC Mode)</td>
            <td>128-bit Key</td>
            <td>Resistant to classical cryptanalysis</td>
            <td>Legacy baseline; widely compatible</td>
          </tr>
          <tr>
            <td>PDF 1.7 Extension 3 / PDF 2.0 (Rev 6)</td>
            <td>AES (CBC / GCM Mode)</td>
            <td>256-bit Key with PBKDF2</td>
            <td>Military-grade; quantum resistant</td>
            <td><strong>Current Gold Standard</strong> (Sejda Default)</td>
          </tr>
        </tbody>
      </table>

      <h2>Under the Hood: Deciphering the PDF /Encrypt Dictionary</h2>
      <p>
        When you inspect a secured PDF binary, the file header contains an <code>/Encrypt</code> dictionary defining algorithm parameters:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;">% PDF 2.0 AES-256 Encryption Dictionary Structure</span><br/>
        &lt;&lt; /Filter /Standard<br/>
        &nbsp;&nbsp;&nbsp;/V 5<br/>
        &nbsp;&nbsp;&nbsp;/R 6<br/>
        &nbsp;&nbsp;&nbsp;/Length 256<br/>
        &nbsp;&nbsp;&nbsp;/P -3904&nbsp;&nbsp;<span style="color: #94a3b8;">% Bitmask allowing high-res print, denying text extraction</span><br/>
        &nbsp;&nbsp;&nbsp;/CF &lt;&lt; /StdCF &lt;&lt; /CFM /AESV3 /Length 32 &gt;&gt; &gt;&gt;<br/>
        &nbsp;&nbsp;&nbsp;/StmF /StdCF<br/>
        &nbsp;&nbsp;&nbsp;/StrF /StdCF<br/>
        &nbsp;&nbsp;&nbsp;/U &lt;48-byte hash validation string&gt;<br/>
        &nbsp;&nbsp;&nbsp;/O &lt;48-byte owner verification token&gt;<br/>
        &gt;&gt;
      </div>

      <h2>Troubleshooting "Permission Password Bypass" Concerns</h2>
      <p>
        Organizations often ask: <em>"Can an employee bypass an Owner Password using open-source tools like pdftotext or Ghostscript?"</em>
      </p>
      <p>
        The answer is yes: because an Owner-password-only file can be opened and displayed without entering a secret code, the document stream must already be decrypted in memory so the viewer can render the characters on screen. 
        Non-compliant open-source libraries simply ignore the <code>/P</code> permission flag and extract the text. 
        If your goal is genuine data confidentiality, you must always set a <strong>User Open Password</strong>, which mathematically locks the raw stream at rest.
      </p>
    `
  },

  'redacting-sensitive-data-in-pdf.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">True Vector Redaction vs Cosmetic Black Box Overlay</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Sensitive Target</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">SSN: 123-45-6789</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Coordinates: [x, y, w, h]</text>
          <text x="90" y="115" font-size="11" fill="#64748b" text-anchor="middle">Text Matrix &amp; Bitmap</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Redaction Engine</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Excises Text Operators from Stream</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Crops Bitmap Pixels at Pixel Grid</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Draws Opaque Vector Box Replacement</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Forensically Sterile PDF</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">0% Recoverable via Hex Search</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Copy-Paste Returns Nothing</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Court Admissible Sanitization</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The High-Profile Danger of "Fake Redactions" in Legal History</h2>
      <p>
        Legal history is replete with catastrophic data leak scandals caused by attorneys and government officials drawing superficial black highlight shapes over sensitive passages. 
        In high-stakes federal litigations (including Department of Justice filings and high-profile patent disputes), recipients simply copied the entire page text into Notepad or opened the file in an ink editing app to reveal every unredacted name, undercover agent address, and proprietary financial trade secret hidden beneath the black box.
      </p>
      <p>
        True legal redaction requires permanent stream excision. 
        In the PDF specification, drawing a black rectangle is represented by vector drawing commands (<code>0 0 0 rg 72 650 200 20 re f</code>). 
        If the preceding text operators (<code>BT ... (Sensitive Trade Secret) Tj ... ET</code>) remain in the stream, they continue to exist as selectable, indexable strings. 
        Sejda's engine physically deletes the underlying character codes, resizes underlying raster image bitmaps to permanently erase blacked-out pixels, and updates the document cross-reference table.
      </p>

      <h2>Comparison: Permanent Structural Redaction vs Cosmetic Box Overlays</h2>
      <table>
        <thead>
          <tr>
            <th>Security &amp; Forensic Test</th>
            <th>Sejda Permanent Redaction</th>
            <th>Cosmetic Box (PDF Annotations)</th>
            <th>Consequences of Failure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ctrl+A &amp; Copy-Paste to Notepad</td>
            <td>Zero text copied; stream is physically void</td>
            <td>Full confidential text pasted cleanly</td>
            <td>Immediate disclosure of confidential testimony</td>
          </tr>
          <tr>
            <td>Binary Hex / Grep Search</td>
            <td>Target strings completely absent from disk file</td>
            <td>Strings clearly visible in plain ASCII / Unicode</td>
            <td>Automated web scrapers extract secret data</td>
          </tr>
          <tr>
            <td>Image Pixel Reconstruction</td>
            <td>Underlying raster pixels permanently clipped to black</td>
            <td>Pixels remain intact under semi-transparent box</td>
            <td>Adjusting brightness/contrast reveals secret images</td>
          </tr>
          <tr>
            <td>Screen Reader Accessibility (VoiceOver)</td>
            <td>Reader encounters blank redaction marker</td>
            <td>Reader vocally pronounces secret data to listeners</td>
            <td>Severe HIPAA &amp; GDPR non-compliance fines</td>
          </tr>
        </tbody>
      </table>

      <h2>Automated Redaction Patterns via Regular Expressions</h2>
      <p>
        For compliance departments processing thousands of medical intake forms or credit applications, manual highlighting is prone to human oversight. 
        Sejda supports automated pattern-matching redactions:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># CLI batch redaction targeting US Social Security Numbers and Credit Cards</span><br/>
        <span style="color: #38bdf8;">sejda-console</span> redact \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--files /legal_production/unredacted/*.pdf \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--regex-pattern "\\b\\d{3}-\\d{2}-\\d{4}\\b" \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--replacement-label "[REDACTED - SSN]" \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--output-dir /legal_production/sanitized/<br/><br/>
        <span style="color: #94a3b8;"># Output result: Every SSN is surgically removed and replaced with a compliant black badge</span>
      </div>

      <h2>Troubleshooting Optical Kerning Leaks and Word Bounding Overlap</h2>
      <p>
        In proportional fonts like Times New Roman or Garamond, character glyphs often overlap slightly due to kerning pairs (e.g. "To", "Wa", "f-i"). 
        When redacting a single word in a sentence, an imprecise bounding box calculation can leave the ascender of an "f" or the tail of a "y" protruding outside the redaction box, allowing forensic handwriting analysts to deduce letters. 
        Sejda automatically adds an anti-aliased 1.5-point bounding box padding buffer around every detected glyph to prevent visual bleed-through.
      </p>
    `
  },

  'flattening-pdf-annotations-and-layers.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Interactive Form / Annotation Flattening Pipeline</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Dynamic PDF File</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">Interactive /AcroForm</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Sticky Notes &amp; Highlights</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Modifiable in Viewers</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Flattening Compiler</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Reads Appearance Stream (/AP)</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Blends Vector Graphics into /Contents</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Excises /Annots &amp; /AcroForm Dictionaries</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Permanent Static Document</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">100% Unalterable Content</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Renders Identically Everywhere</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Ready for ECF Court Filing</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>Why Flattening Is Essential: The Instability of Interactive Layers</h2>
      <p>
        When you add comments, draw highlighter marks, or fill in interactive tax forms, modern PDF readers do not immediately bake those pixels into the base document page stream. 
        Instead, they create separate <strong>Annotation objects (ISO 32000-1 Clause 12.5)</strong> stored in the <code>/Annots</code> array. 
        These annotations float as dynamic overlays on top of the document canvas.
      </p>
      <p>
        This floating architecture presents major liabilities:
      </p>
      <ul>
        <li><strong>Court Filing Rejections:</strong> Court electronic filing systems (such as the US Federal PACER/ECF portal) reject unflattened PDFs because dynamic form fields can be altered by opposing counsel or fail to display in the judicial clerk's viewer.</li>
        <li><strong>Commercial Print Production Errors:</strong> Prepress RIP (Raster Image Processor) hardware frequently disregards annotation overlays, producing printed brochures and books completely devoid of client-approved markups.</li>
        <li><strong>Mobile Device Incompatibilities:</strong> Default PDF viewers on Apple iOS and Android frequently fail to render annotations created in third-party desktop editors, causing critical signature stamps to appear invisible on smartphones.</li>
      </ul>

      <h2>Comparing Flattened Documents vs Dynamic Form PDFs</h2>
      <table>
        <thead>
          <tr>
            <th>Functional Dimension</th>
            <th>Flattened PDF (Post-Sejda)</th>
            <th>Dynamic Interactive PDF</th>
            <th>Ideal Business Application</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Interactive Form Editing</td>
            <td>Disabled; text is part of permanent vector stream</td>
            <td>Active; user can click and modify form inputs</td>
            <td>Flatten for completed signed contracts; dynamic for blank intake forms</td>
          </tr>
          <tr>
            <td>Digital Annotation Manipulation</td>
            <td>Permanent; sticky notes cannot be dragged or deleted</td>
            <td>Editable; user can delete reviewer comments</td>
            <td>Flatten for external publication; dynamic for internal review cycles</td>
          </tr>
          <tr>
            <td>Cross-Device Visual Consistency</td>
            <td>100% identical on Chrome, iOS, Android, Linux, Acrobat</td>
            <td>Inconsistent; form inputs frequently appear blank</td>
            <td>Flatten for regulatory compliance and public distribution</td>
          </tr>
          <tr>
            <td>File Rendering Performance</td>
            <td>Fast; single unified vector render pass</td>
            <td>Slower; requires executing form validation scripts</td>
            <td>Flatten for archival storage and high-speed web delivery</td>
          </tr>
        </tbody>
      </table>

      <h2>Under the Hood: Transforming Appearance Streams (/AP) into Page Content</h2>
      <p>
        During flattening, Sejda compiles the annotation's visual representation into standard page content operators:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;">% Step 1: Extract Appearance Stream (/AP) from Widget Annotation</span><br/>
        /Widget &lt;&lt; /Subtype /Widget /Rect [100 200 300 240] /AP &lt;&lt; /N 14 0 R &gt;&gt; &gt;&gt;<br/><br/>
        <span style="color: #94a3b8;">% Step 2: Inject as Form XObject invocation into Page /Contents</span><br/>
        q<br/>
        1 0 0 1 100 200 cm&nbsp;&nbsp;<span style="color: #94a3b8;">% Translate coordinate matrix to widget position</span><br/>
        /Fm1 Do&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;">% Execute Form XObject painting text permanently</span><br/>
        Q<br/><br/>
        <span style="color: #94a3b8;">% Step 3: Remove Widget reference from page /Annots array</span>
      </div>

      <h2>Troubleshooting Flattening Failures: The "/NeedAppearances" Bug</h2>
      <p>
        When flattening forms generated by non-compliant PDF generators, engineers occasionally find form text disappearing entirely! 
        This is caused by the notorious <code>/NeedAppearances true</code> flag in the <code>/AcroForm</code> dictionary. 
        It indicates that the creator software saved raw text values without generating the visual appearance streams (<code>/AP</code>), expecting Adobe Acrobat to construct the visual pixels on the fly. 
        Sejda features automated appearance synthesis: it constructs the missing vector glyphs from embedded font metrics prior to flattening, guaranteeing zero text loss.
      </p>
    `
  },

  'pdf-metadata-and-xmp-data-cleaning.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Dual-Layer Metadata Excision: Classical /Info vs Extensible XMP XML</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Corporate Draft PDF</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">Author: "john.doe@corp"</text>
          <text x="90" y="95" font-size="11" fill="#ef4444" text-anchor="middle">Path: "C:\SecretM&amp;A\"</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Printer: Canon_IR_Office</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Forensic Deep Clean</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Excises Trailer /Info Dictionary</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Purges XML RDF /Metadata Packet</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Strips Document UUID &amp; PieceInfo</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Sanitized Public PDF</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Zero Forensic Fingerprints</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Compliant with Court ESI Rules</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Protected Against Competitive Intel</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Hidden Dangers of PDF Metadata in Competitive &amp; Legal Scenarios</h2>
      <p>
        Every time a document is authored in Microsoft Word, Google Docs, or Adobe InDesign and exported to PDF, rich historical forensic markers are embedded deep within the file. 
        These markers are invisible during ordinary reading, but easily accessed using free utilities like <code>pdfinfo</code> or ExifTool.
      </p>
      <p>
        Real-world forensic data frequently extracted by investigative journalists and opposing litigators includes:
      </p>
      <ul>
        <li><strong>Internal File Paths &amp; Username Directory Structures:</strong> Exports like <code>/Users/sarah_director/Projects/Project_Falcon_Layoffs/Severance_Matrix.docx</code> disclose internal project codenames and operating system directory hierarchies.</li>
        <li><strong>Software Licenses &amp; Computer Hostnames:</strong> Embedded Adobe XMP packets contain machine MAC addresses, Adobe Creative Cloud user IDs, and exact software build numbers.</li>
        <li><strong>Hidden Revision Increments &amp; Timestamps:</strong> Forensic timelines expose whether an alleged "original agreement" was actually hastily fabricated the night before discovery submission.</li>
      </ul>

      <h2>Comparison: Document /Info Dictionary vs Extensible Metadata Platform (XMP)</h2>
      <table>
        <thead>
          <tr>
            <th>Metadata Schema</th>
            <th>Storage Location in PDF</th>
            <th>Typical Data Contained</th>
            <th>Cleaning Complexity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Classical /Info Dictionary</strong></td>
            <td>Referenced directly in document Trailer</td>
            <td>Title, Author, Subject, Creator, Producer, CreationDate, ModDate</td>
            <td>Low; simple dictionary overwrite in XRef table</td>
          </tr>
          <tr>
            <td><strong>XMP Extensible Metadata Platform</strong></td>
            <td>XML stream embedded in Catalog <code>/Metadata</code> object</td>
            <td>Dublin Core, Photoshop edit history, printer ICC profiles, camera EXIF</td>
            <td>High; requires XML parsing and binary stream excision</td>
          </tr>
          <tr>
            <td><strong>PieceInfo &amp; Private Application Dictionaries</strong></td>
            <td>Page and Document level private dictionaries</td>
            <td>Adobe Illustrator vector artboards, QuarkXPress edit states</td>
            <td>Medium; requires recursive tree pruning across all pages</td>
          </tr>
        </tbody>
      </table>

      <h2>Automated Metadata Inspection &amp; Stripping via Terminal</h2>
      <p>
        Security teams can audit metadata exposure using command line tools before approving public releases:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># Step 1: Audit hidden metadata exposure with ExifTool</span><br/>
        <span style="color: #38bdf8;">exiftool</span> -all executive_briefing.pdf<br/><br/>
        <span style="color: #94a3b8;"># Step 2: Strip all metadata and XML packets with Sejda CLI</span><br/>
        <span style="color: #38bdf8;">sejda-console</span> set-pdf-metadata \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--files executive_briefing.pdf \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--clear-all \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--strip-xmp \\<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;--output sanitized_briefing.pdf
      </div>

      <h2>Preserving Mandatory Regulatory Metadata (PDF/A &amp; DOI Standards)</h2>
      <p>
        While stripping metadata is crucial for privacy, certain academic and legal standards require specific metadata tags to remain valid. 
        For example, academic journal submissions require a Digital Object Identifier (DOI), and PDF/A files require the <code>pdfaExtension:schemas</code> XML block to prove ISO conformance. 
        Sejda's metadata management tool allows granular surgical control: you can wipe author names, revision dates, and printer details while selectively preserving required compliance tags.
      </p>
    `
  },

  'digital-rights-management-and-pdf-licensing.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Enterprise DRM Key Escrow &amp; Dynamic Policy Enforcement</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Protected PDF</text>
          <text x="90" y="75" font-size="11" fill="#64748b" text-anchor="middle">Encrypted Content Stream</text>
          <text x="90" y="95" font-size="11" fill="#64748b" text-anchor="middle">Embedded License URI</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">No Local Password</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">License Key Server (KMS)</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Authenticates Hardware Fingerprint</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Verifies Expiration &amp; Geo-Fencing</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Issues Ephemeral Session Decryption Key</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Enforced View Environment</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">Real-Time Access Revocation</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Screenshot Blackout Protection</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Dynamic User Watermark Stamp</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Limitations of Static Passwords vs True Digital Rights Management</h2>
      <p>
        When publishing expensive financial market analysis, aerospace engineering specifications, or commercial e-books, standard PDF password protection is insufficient. 
        Once a paying customer receives a password-protected PDF and its associated password, they can trivially email the file and password to thousands of colleagues or publish it to public torrent networks. 
        Standard passwords cannot prevent redistribution, cannot expire access after a subscription terminates, and cannot remotely revoke a document once sent.
      </p>
      <p>
        Digital Rights Management (DRM) replaces static passwords with dynamic cryptographic key escrow. 
        Under a DRM architecture, the document remains encrypted at rest using an AES-256 envelope. 
        When a recipient opens the file, an embedded client plugin or secure reader contacts an authorized license server over TLS 1.3, authenticates the user's corporate identity and hardware fingerprint, verifies subscription status, and provisions a transient in-memory decryption key. 
        If the client cancels their subscription next month, the license server revokes the key, instantly locking the document even if the physical file remains on their hard drive.
      </p>

      <h2>Comparing Commercial PDF Protection Approaches</h2>
      <table>
        <thead>
          <tr>
            <th>Security Architecture</th>
            <th>Revocation Capability</th>
            <th>Screen Capture Deterrence</th>
            <th>Offline Accessibility</th>
            <th>Reader Software Dependency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Standard AES-256 Password</strong></td>
            <td>Zero; once shared, access is permanent</td>
            <td>None; OS screenshots work unimpeded</td>
            <td>100% offline access</td>
            <td>Universal across all standard PDF viewers</td>
          </tr>
          <tr>
            <td><strong>Dynamic Steganographic Watermarking</strong></td>
            <td>Deterrent; traces leak source to individual</td>
            <td>Bakes viewer IP &amp; email across page</td>
            <td>100% offline access</td>
            <td>Universal across all standard PDF viewers</td>
          </tr>
          <tr>
            <td><strong>Full Enterprise DRM (FileOpen / Seclore)</strong></td>
            <td>Instant real-time remote revocation</td>
            <td>Hooked OS graphics API blackouts screenshots</td>
            <td>Configurable lease period (e.g. 7-day cache)</td>
            <td>Requires proprietary viewer plugin or dedicated client</td>
          </tr>
        </tbody>
      </table>

      <h2>Implementing Scalable Protection: The Hybrid Watermark Approach</h2>
      <p>
        Because full enterprise DRM often requires proprietary software plugins that corporate IT firewalls block, modern document publishers frequently adopt the "Hybrid Watermark" model:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># Python workflow for automated personalized e-commerce delivery</span><br/>
        <span style="color: #f43f5e;">def</span> <span style="color: #38bdf8;">stamp_purchased_book</span>(base_pdf_path, buyer_email, transaction_id):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;audit_text = f<span style="color: #a3e635;">"Licensed to {buyer_email} | Order #{transaction_id} | Resale Prohibited"</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;"># Stamp permanent, flattened micro-kerning watermark on all page margins</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;watermark_engine.apply_footer(base_pdf_path, audit_text, opacity=0.35, flatten=True)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;"># Encrypt with owner permissions restricting modification</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;crypto_engine.apply_permissions(base_pdf_path, allow_print=True, allow_copy=False)
      </div>

      <h2>Troubleshooting Reader Compatibility &amp; DRM Friction</h2>
      <p>
        The most common failure in commercial PDF licensing is customer support friction. 
        When a medical journal requires customers to install complex kernel-level DRM drivers, over 30% of enterprise clients fail to open the document due to corporate security group policies. 
        Balancing robust legal protection with frictionless user experience is the hallmark of modern document engineering.
      </p>
    `
  },

  'repairing-corrupted-pdf-files.html': {
    diagram: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Forensic PDF XRef Reconstruction &amp; Stream Recovery Pipeline</div>
        <svg viewBox="0 0 760 160" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, sans-serif;">
          <rect x="10" y="20" width="160" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="90" y="50" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">Corrupted PDF</text>
          <text x="90" y="75" font-size="11" fill="#ef4444" text-anchor="middle">Missing EOF Marker</text>
          <text x="90" y="95" font-size="11" fill="#ef4444" text-anchor="middle">Truncated Byte Offset</text>
          <text x="90" y="115" font-size="11" fill="#ef4444" text-anchor="middle">Damaged XRef Table</text>

          <path d="M 175 80 L 215 80" stroke="#18a474" stroke-width="2"/>

          <rect x="220" y="20" width="240" height="120" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
          <text x="340" y="48" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Sejda Forensic Scanner</text>
          <text x="340" y="72" font-size="11" fill="#334155" text-anchor="middle">• Linear Binary Scan for "obj ... endobj"</text>
          <text x="340" y="92" font-size="11" fill="#334155" text-anchor="middle">• Reconstructs Page Dictionary Tree</text>
          <text x="340" y="112" font-size="11" fill="#334155" text-anchor="middle">• Compiles Fresh Validated XRef Table</text>

          <path d="M 465 80 L 505 80" stroke="#18a474" stroke-width="2"/>

          <rect x="510" y="20" width="240" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <text x="630" y="50" font-size="14" font-weight="700" fill="#0f172a" text-anchor="middle">Recovered Document</text>
          <text x="630" y="75" font-size="11" fill="#16a34a" text-anchor="middle">100% Validated ISO 32000</text>
          <text x="630" y="95" font-size="11" fill="#64748b" text-anchor="middle">Pages Render in All Viewers</text>
          <text x="630" y="115" font-size="11" fill="#64748b" text-anchor="middle">Critical Records Restored</text>
        </svg>
      </div>`,
    extraHtml: `
      <h2>The Anatomy of PDF Corruption: Why Documents Fail to Open</h2>
      <p>
        Few errors provoke as much panic in an office as double-clicking a multi-million-dollar contract or archival patent filing and seeing: 
        <em>"Adobe Acrobat could not open 'contract.pdf' because it is either not a supported file type or because the file has been damaged."</em>
      </p>
      <p>
        In the majority of corruption incidents, the actual page text and image data are 100% intact! 
        Corruption almost always stems from damage to the document's navigational index: the <strong>Cross-Reference (XRef) Table</strong> or the trailing byte pointer (<code>startxref</code>). 
        Because PDF readers start reading a document from the bottom of the file upwards to locate object byte offsets, a severed internet download that chops off the last 2 kilobytes leaves the viewer blind to the location of page 1.
      </p>

      <h2>Forensic Classification of PDF Damage &amp; Recovery Feasibility</h2>
      <table>
        <thead>
          <tr>
            <th>Corruption Category</th>
            <th>Underlying Root Cause</th>
            <th>Forensic Impact</th>
            <th>Recovery Feasibility</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Truncated EOF (Missing Trailer)</strong></td>
            <td>Interrupted network transfer or aborted upload</td>
            <td>XRef table pointer lost; body objects intact</td>
            <td><strong>99% Recoverable</strong> via linear heuristic scanning</td>
          </tr>
          <tr>
            <td><strong>Damaged FlateDecode Stream</strong></td>
            <td>Bit flips or hard drive bad sectors</td>
            <td>Zlib checksum failure; single image/page garbled</td>
            <td><strong>85% Recoverable</strong>; damaged stream isolated</td>
          </tr>
          <tr>
            <td><strong>Corrupted Font Descriptor Table</strong></td>
            <td>Substandard PDF generator bug</td>
            <td>Text renders as unreadable symbols / mojibake</td>
            <td><strong>75% Recoverable</strong> via OCR layer reconstruction</td>
          </tr>
          <tr>
            <td><strong>Overwritten Binary Header</strong></td>
            <td>Accidental text editor save as plain text</td>
            <td>Destroys magic bytes (<code>%PDF-1.x</code>)</td>
            <td><strong>90% Recoverable</strong> by repairing magic byte envelope</td>
          </tr>
        </tbody>
      </table>

      <h2>Low-Level Command Line PDF Recovery Tools</h2>
      <p>
        System engineers often use low-level command line utilities like <code>qpdf</code> and <code>pdftocairo</code> to rebuild corrupted object tables:
      </p>
      <div style="background: #0f172a; color: #f8fafc; border-radius: 10px; padding: 18px 20px; font-family: monospace; font-size: 13px; overflow-x: auto; line-height: 1.6; margin: 20px 0;">
        <span style="color: #94a3b8;"># Rebuild damaged XRef tables and salvage salvageable streams with QPDF</span><br/>
        <span style="color: #38bdf8;">qpdf</span> --repair-file corrupted_evidence.pdf recovered_evidence.pdf<br/><br/>
        <span style="color: #94a3b8;"># Alternative Ghostscript linear rebuild pass for stubborn parsing failures</span><br/>
        <span style="color: #38bdf8;">gs</span> -o rebuilt_document.pdf -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress corrupted_evidence.pdf
      </div>

      <h2>Troubleshooting Unrecoverable Zero-Byte Files</h2>
      <p>
        The only scenario where recovery is mathematically impossible is when a software malfunction writes a 0-byte file or overwrites the file cluster with repetitive null bytes (<code>0x00</code>). 
        In all other cases, Sejda's forensic parser can traverse the raw binary disk sectors, salvage undamaged page streams, and synthesize a fresh, fully compliant PDF.
      </p>
    `
  }
};

for (const [file, data] of Object.entries(enrichmentsBatch2)) {
  const filePath = path.join(guidesDir, file);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping missing:', file);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('Enterprise PDF Defense-in-Depth Architecture') && !content.includes('User (Open) vs Owner (Permissions)') && !content.includes('True Vector Redaction vs Cosmetic') && !content.includes('Interactive Form / Annotation Flattening') && !content.includes('Dual-Layer Metadata Excision') && !content.includes('Enterprise DRM Key Escrow') && !content.includes('Forensic PDF XRef Reconstruction')) {
    const ctaPos = content.indexOf('<div class="cta-box">');
    if (ctaPos !== -1) {
      content = content.slice(0, ctaPos) + data.diagram + data.extraHtml + content.slice(ctaPos);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Enriched Batch 2:', file);
    }
  }
}
