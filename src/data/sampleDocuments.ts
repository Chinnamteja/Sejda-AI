/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LoadedDocument } from '../types';

export const SAMPLE_NDA_TEXT = `MUTUAL NON-DISCLOSURE AGREEMENT (NDA)

This Mutual Non-Disclosure Agreement ("Agreement") is made and entered into as of October 12, 2026 ("Effective Date"), by and between:

Party A: Apex Digital Solutions LLC, a Delaware limited liability company having its principal office at 450 Lexington Avenue, New York, NY 10017 ("Apex"), and
Party B: Horizon Cloud Dynamics Inc., a California corporation having its principal place of business at 700 Montgomery St, San Francisco, CA 94111 ("Horizon").

RECITALS
WHEREAS, the parties desire to explore a potential business partnership regarding enterprise AI document orchestration ("Purpose"); and
WHEREAS, in connection with the Purpose, each party may disclose to the other confidential and proprietary technical, commercial, financial, and strategic information;

NOW, THEREFORE, in consideration of the mutual covenants herein contained, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means all non-public information disclosed by one party ("Disclosing Party") to the other party ("Receiving Party"), whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information. Confidential Information includes source code, product roadmaps, algorithms, customer lists, API architectures, pricing models, and trade secrets.

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
(a) Protect and safeguard the Disclosing Party's Confidential Information with the same degree of care it uses for its own confidential information, but in no event less than a reasonable standard of care;
(b) Not use the Confidential Information for any purpose outside the scope of the stated Purpose;
(c) Disclose Confidential Information only to its employees, contractors, and legal advisors who have a strict need-to-know and are bound by confidentiality obligations at least as restrictive as this Agreement.

3. EXCLUSIONS FROM CONFIDENTIAL INFORMATION
Confidential Information does not include information that:
(a) is or becomes publicly known through no breach of this Agreement;
(b) was already known to the Receiving Party prior to disclosure;
(c) is independently developed by the Receiving Party without reference to Disclosing Party's information;
(d) is rightfully obtained from a third party without duty of confidentiality.

4. TERM AND TERMINATION
This Agreement shall remain in effect for a period of two (2) years from the Effective Date. The confidentiality obligations under this Agreement shall survive termination for a period of five (5) years, except that trade secrets shall remain confidential indefinitely.

5. REMEDIES AND GOVERNING LAW
Any breach of this Agreement may cause irreparable harm for which monetary damages alone would be inadequate. The Disclosing Party shall be entitled to seek injunctive relief in addition to any other remedies available at law.
This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.

IN WITNESS WHEREOF, the parties hereto have executed this Mutual Non-Disclosure Agreement by their duly authorized representatives.

APEX DIGITAL SOLUTIONS LLC
By: ___________________________
Name: Eleanor Vance
Title: VP of Strategic Partnerships
Date: October 12, 2026

HORIZON CLOUD DYNAMICS INC.
By: ___________________________
Name: Marcus Sterling
Title: Chief Technology Officer
Date: October 12, 2026`;

export const SAMPLE_INVOICE_TEXT = `INVOICE #INV-2026-8841

Vanguard Software Engineering & Cloud Consulting
800 Bellevue Way NE, Suite 400
Bellevue, WA 98004
Email: billing@vanguardconsulting.io | Tax ID: 82-4910284

BILL TO:
Sejda Global Enterprise Services
140 2nd Street, Floor 3
San Francisco, CA 94105
Attn: Accounts Payable (ap@sejda.com)

Invoice Date: September 15, 2026
Payment Terms: Net 30
Due Date: October 15, 2026
Currency: USD ($)

LINE ITEMS & DELIVERABLES:
------------------------------------------------------------------------------------------------------------------------
Item  Description                                                 Hours / Qty   Unit Rate ($)    Total Amount ($)
------------------------------------------------------------------------------------------------------------------------
01    Enterprise PDF Pipeline Architecture Optimization            40 hrs        $225.00          $9,000.00
02    Gemini 3.8 Document Intelligence Integration & Streaming     60 hrs        $240.00          $14,400.00
03    High-Throughput WebAssembly Canvas Rendering Engine          35 hrs        $210.00          $7,350.00
04    Full-Fidelity Form Signature & Fillable Field Components      25 hrs        $195.00          $4,875.00
05    Automated End-to-End Test Suite & Security Compliance Audit   20 hrs        $200.00          $4,000.00
------------------------------------------------------------------------------------------------------------------------
Subtotal:                                                                                        $39,625.00
Early Completion Discount (5%):                                                                 -$1,981.25
Taxes (0% - B2B Technology Service Exemption):                                                   $0.00
------------------------------------------------------------------------------------------------------------------------
TOTAL AMOUNT DUE:                                                                                $37,643.75
------------------------------------------------------------------------------------------------------------------------

PAYMENT INSTRUCTIONS (ACH / WIRE):
Bank: Silicon Valley Corporate Trust
Routing (ABA): 121000358
Account Number: 849201938501
SWIFT/BIC: SVCTUS33XXX
Beneficiary: Vanguard Software Consulting LLC

Note: Late payments are subject to a 1.5% monthly compounding service fee. Thank you for your business!`;

export const SAMPLE_PROPOSAL_TEXT = `EXECUTIVE PROJECT PROPOSAL: NEXT-GEN CLOUD DOCUMENT PLATFORM

Prepared for: Executive Leadership Team
Author: Dr. Julian Hayes, Head of Document Architecture
Date: Autumn 2026
Status: Final Review

1. EXECUTIVE SUMMARY
Organizations worldwide generate over 3.2 trillion PDF documents annually. However, legacy PDF workflows remain clunky, siloed, and disconnected from modern artificial intelligence. This initiative transforms static PDF documents into dynamic, conversational, and instantly actionable assets through client-side WebAssembly execution and server-side Gemini 3.8 multimodal intelligence.

2. TARGET OBJECTIVES & KPIS
- Sub-50ms visual page rendering and editing feedback across mobile and desktop browsers.
- 100% private document processing guarantee with automated ephemeral storage purge after 2 hours.
- 94% accuracy in automated table extraction, financial entity recognition, and multi-language translation.
- 60% reduction in average contract review turnaround time for legal and procurement teams.

3. ARCHITECTURAL PILLARS
Pillar I: Pure Client-Side Rendering with pdf-lib manipulation for zero latency merge, split, watermark, and signing.
Pillar II: AI Copilot for immediate Q&A, clause explanation, grammar rewriting, and automated executive summarization.
Pillar III: Enterprise-Grade Privacy - zero retention of sensitive customer documents after processing cycles.

4. MILESTONES & IMPLEMENTATION TIMELINE
- Phase 1 (Q1): Core visual editor, shape annotations, multi-pen signature pad, and merge engine.
- Phase 2 (Q2): Gemini 3.8 document reasoning integration, contract auditor, and tabular data exporter.
- Phase 3 (Q3): Production launch and global edge acceleration.`;

export function createSampleDocument(type: 'nda' | 'invoice' | 'proposal' | 'blank'): LoadedDocument {
  if (type === 'blank') {
    return {
      id: 'doc-blank-' + Date.now(),
      name: 'Blank Document.pdf',
      sizeBytes: 15420,
      pageCount: 1,
      fullText: 'Blank Document - Click the Text tool above to write or draw your signature.',
      pages: [
        {
          pageNumber: 1,
          rotation: 0,
          width: 595,
          height: 842,
          textContent: 'Blank Document - Start writing or drawing below.',
        },
      ],
      annotations: [
        {
          id: 'anno-welcome',
          pageNumber: 1,
          type: 'text',
          x: 10,
          y: 8,
          content: 'Sejda PDF Editor - Blank Document Ready',
          fontSize: 18,
          color: '#18a474',
          isBold: true,
        },
      ],
    };
  }

  if (type === 'invoice') {
    return {
      id: 'doc-invoice-8841',
      name: 'Invoice_INV-2026-8841.pdf',
      sizeBytes: 84200,
      pageCount: 1,
      fullText: SAMPLE_INVOICE_TEXT,
      pages: [
        {
          pageNumber: 1,
          rotation: 0,
          width: 595,
          height: 842,
          textContent: SAMPLE_INVOICE_TEXT,
        },
      ],
      annotations: [],
    };
  }

  if (type === 'proposal') {
    return {
      id: 'doc-proposal-2026',
      name: 'Executive_Project_Proposal.pdf',
      sizeBytes: 145000,
      pageCount: 2,
      fullText: SAMPLE_PROPOSAL_TEXT,
      pages: [
        {
          pageNumber: 1,
          rotation: 0,
          width: 595,
          height: 842,
          textContent: SAMPLE_PROPOSAL_TEXT.slice(0, 750),
        },
        {
          pageNumber: 2,
          rotation: 0,
          width: 595,
          height: 842,
          textContent: SAMPLE_PROPOSAL_TEXT.slice(750),
        },
      ],
      annotations: [],
    };
  }

  // default NDA
  return {
    id: 'doc-nda-2026',
    name: 'Mutual_NDA_Apex_Horizon.pdf',
    sizeBytes: 128400,
    pageCount: 2,
    fullText: SAMPLE_NDA_TEXT,
    pages: [
      {
        pageNumber: 1,
        rotation: 0,
        width: 595,
        height: 842,
        textContent: SAMPLE_NDA_TEXT.slice(0, 1600),
      },
      {
        pageNumber: 2,
        rotation: 0,
        width: 595,
        height: 842,
        textContent: SAMPLE_NDA_TEXT.slice(1600),
      },
    ],
    annotations: [],
  };
}

export const SAMPLE_DOCUMENTS: LoadedDocument[] = [
  createSampleDocument('nda'),
  createSampleDocument('invoice'),
  createSampleDocument('proposal'),
];

