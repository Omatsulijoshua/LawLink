import { useState } from 'react';
import { X, FileText, Sparkles, Copy, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

const TEMPLATES = [
  { id: 'tenancy', name: 'Residential Tenancy Agreement', desc: 'Standard Nigerian Landlord & Tenant Agreement under Tenancy Laws' },
  { id: 'nda', name: 'Non-Disclosure Agreement (NDA)', desc: 'Mutual or One-way Confidentiality Legal Agreement' },
  { id: 'poa', name: 'General Power of Attorney', desc: 'Authorizes donee to execute legal & financial acts on behalf of donor' },
  { id: 'affidavit', name: 'Statutory Affidavit of Loss / Age', desc: 'Sworn affidavit before High Court Commissioner for Oaths' },
  { id: 'demand', name: 'Pre-Action Notice & Demand Letter', desc: 'Formal legal demand letter prior to court litigation' }
];

export function LegalDocGeneratorModal({ onClose }) {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [partyA, setPartyA] = useState('Chief Olumide Adeleke (Landlord)');
  const [partyB, setPartyB] = useState('Mr. Emeka Chukwu (Tenant)');
  const [propertyAddress, setPropertyAddress] = useState('Plot 14, Admiralty Way, Lekki Phase 1, Lagos State');
  const [rentAmount, setRentAmount] = useState('2,500,000');
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      if (selectedTemplate.id === 'tenancy') {
        setGeneratedDraft(`MEMORANDUM OF TENANCY AGREEMENT

THIS TENANCY AGREEMENT is made this 11th day of August, 2026

BETWEEN:
${partyA} (hereinafter referred to as the "LANDLORD") of the one part;

AND
${partyB} (hereinafter referred to as the "TENANT") of the other part.

WHEREBY IT IS AGREED AS FOLLOWS:
1. DEMISE AND RENT:
The Landlord demises unto the Tenant ALL THAT residential property situated at:
${propertyAddress}

TO HOLD the same for a term of 1 (ONE) YEAR commencing on 1st September 2026 at the annual rent of ₦${rentAmount} (Two Million Five Hundred Thousand Naira) paid in advance.

2. TENANT COVENANTS:
(a) To pay all electric power (EKEDC/IKEDC) and waste disposal utility bills promptly.
(b) Not to assign, sublet, or part with possession of the demised premises without prior written consent of the Landlord under Lagos State Tenancy Law.
(c) To keep the interior of the premises in good and tenantable repair.

IN WITNESS WHEREOF the parties have executed this Agreement the day and year first above written.

____________________                      ____________________
${partyA} (LANDLORD)                       ${partyB} (TENANT)
In the presence of counsel / witness.`);
      } else if (selectedTemplate.id === 'nda') {
        setGeneratedDraft(`MUTUAL NON-DISCLOSURE AGREEMENT (NDA)

THIS AGREEMENT is entered into on 11th August 2026 between:
Disclosing Party: ${partyA}
Receiving Party: ${partyB}

1. CONFIDENTIAL INFORMATION:
All technical, business, financial, or legal secrets shared between the parties shall remain strictly confidential.

2. NON-USE AND OBLIGATION:
The Receiving Party shall not disclose, duplicate, or commercialize any confidential information for a period of 3 (Three) years under Nigerian Contract Law.

IN WITNESS WHEREOF:
Signed: ____________________ (${partyA})
Signed: ____________________ (${partyB})`);
      } else {
        setGeneratedDraft(`GENERAL LEGAL INSTRUMENT: ${selectedTemplate.name.toUpperCase()}

PARTIES:
First Party: ${partyA}
Second Party: ${partyB}
Location / Subject: ${propertyAddress}

This legal document is drafted under the laws of the Federal Republic of Nigeria. All terms and covenants contained herein shall bind heirs, executors, and assigns.

EXECUTED THIS 11TH DAY OF AUGUST 2026.
Signatures: ____________________ / ____________________`);
      }
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="admin-page-container">
      <div className="watermark-bg"></div>

      <div className="admin-page-content" style={{ maxWidth: '1000px', width: '92vw' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close generator modal" style={{ top: '24px', right: '24px' }}>
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
            <Sparkles size={26} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff' }}>
              LawLink AI Legal Document Generator
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Instantly draft statutory Nigerian legal instruments, tenancy agreements, NDAs, and affidavits.
          </p>
        </div>

        {/* Split Generator View */}
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '20px', height: '62vh' }}>
          {/* Form Column */}
          <form onSubmit={handleGenerate} style={{ backgroundColor: 'rgba(17, 24, 39, 0.85)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Select Instrument Template</label>
              <select
                className="chat-input"
                value={selectedTemplate.id}
                onChange={(e) => setSelectedTemplate(TEMPLATES.find(t => t.id === e.target.value) || TEMPLATES[0])}
                style={{ width: '100%', borderRadius: '6px', height: '38px', padding: '0 10px', fontSize: '0.84rem', backgroundColor: 'var(--bg-secondary)' }}
              >
                {TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>First Party / Landlord / Donor</label>
              <input
                type="text"
                className="chat-input"
                value={partyA}
                onChange={(e) => setPartyA(e.target.value)}
                required
                style={{ width: '100%', borderRadius: '6px', height: '36px', padding: '0 10px', fontSize: '0.84rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Second Party / Tenant / Donee</label>
              <input
                type="text"
                className="chat-input"
                value={partyB}
                onChange={(e) => setPartyB(e.target.value)}
                required
                style={{ width: '100%', borderRadius: '6px', height: '36px', padding: '0 10px', fontSize: '0.84rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Property Address / Subject Location</label>
              <input
                type="text"
                className="chat-input"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                required
                style={{ width: '100%', borderRadius: '6px', height: '36px', padding: '0 10px', fontSize: '0.84rem' }}
              />
            </div>

            {selectedTemplate.id === 'tenancy' && (
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Rent Amount (NGN)</label>
                <input
                  type="text"
                  className="chat-input"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(e.target.value)}
                  style={{ width: '100%', borderRadius: '6px', height: '36px', padding: '0 10px', fontSize: '0.84rem' }}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn-secondary"
              disabled={isGenerating}
              style={{
                width: '100%',
                backgroundColor: 'var(--blue-primary)',
                borderColor: 'var(--blue-accent)',
                color: '#fff',
                height: '40px',
                fontWeight: '600',
                fontSize: '0.88rem',
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              {isGenerating ? (
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Generate Legal Draft</span>
                </>
              )}
            </button>
          </form>

          {/* Draft Preview Column */}
          <div style={{ backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {!generatedDraft ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <FileText size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
                <p style={{ fontSize: '0.9rem' }}>Fill parameters on the left and click <strong>Generate Legal Draft</strong>.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>
                    Preview: {selectedTemplate.name}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={handleCopy}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Copy size={12} />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Printer size={12} />
                      <span>Print Document</span>
                    </button>
                  </div>
                </div>

                <textarea
                  readOnly
                  value={generatedDraft}
                  style={{
                    flex: 1,
                    width: '100%',
                    fontFamily: 'serif',
                    fontSize: '0.92rem',
                    lineHeight: '1.6',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    backgroundColor: 'transparent',
                    color: '#1e293b'
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
