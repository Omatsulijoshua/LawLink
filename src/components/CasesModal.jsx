import { useState } from 'react';
import { X, Briefcase, Clock, CheckCircle2, FileText, ChevronRight, UserCheck, MapPin } from 'lucide-react';

const INITIAL_CASES = [
  {
    id: 'case-101',
    caseNumber: 'LL-MATTER-2026-081',
    title: 'Land Title perfection & Certificate of Occupancy Verification',
    category: 'Property & Land Law',
    counselName: 'Barrister (Mrs.) Folake Adebayo',
    state: 'Lagos State (Lekki)',
    status: 'IN_PROGRESS',
    progressPct: 65,
    milestones: [
      { step: 'Legal Intake & AI Classification', done: true },
      { step: 'Counsel Assigned & Consultation', done: true },
      { step: 'Title Registry Search (Alausa)', done: true },
      { step: 'Governor Consent Application', done: false },
      { step: 'Final Certificate Execution', done: false }
    ],
    updatedAt: '2 hours ago'
  },
  {
    id: 'case-102',
    caseNumber: 'LL-MATTER-2026-042',
    title: 'Commercial Debt Recovery & Pre-action Notice Service',
    category: 'Corporate & Business Law',
    counselName: 'Barrister Great Omatsuli',
    state: 'Delta State (Warri)',
    status: 'LAWYER_MATCHED',
    progressPct: 35,
    milestones: [
      { step: 'Legal Intake & AI Classification', done: true },
      { step: 'Counsel Assigned & Consultation', done: true },
      { step: 'Demand Letter Served', done: false },
      { step: 'High Court Writ Filing', done: false }
    ],
    updatedAt: 'Yesterday'
  }
];

export function CasesModal({ onClose, onOpenWorkspace }) {
  const [cases] = useState(INITIAL_CASES);
  const [selectedCase, setSelectedCase] = useState(INITIAL_CASES[0]);

  return (
    <div className="admin-page-container">
      <div className="watermark-bg"></div>

      <div className="admin-page-content" style={{ maxWidth: '1000px', width: '92vw' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close cases modal" style={{ top: '24px', right: '24px' }}>
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
            <Briefcase size={26} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff' }}>
              Legal Case Management Desk
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Track live legal matters, counsel progress timelines, filings, and milestone updates.
          </p>
        </div>

        {/* Cases Split Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', height: '60vh' }}>
          {/* Left Column: Case Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', paddingRight: '4px' }}>
            {cases.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCase(c)}
                style={{
                  textAlign: 'left',
                  padding: '14px',
                  borderRadius: '10px',
                  border: selectedCase?.id === c.id ? '1px solid var(--blue-accent)' : '1px solid var(--border-light)',
                  backgroundColor: selectedCase?.id === c.id ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: '600', display: 'block', marginBottom: '2px' }}>
                  {c.caseNumber}
                </span>
                <h4 style={{ fontSize: '0.88rem', color: '#fff', fontWeight: '600', marginBottom: '6px' }}>{c.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.category}</span>
                  <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '1px 6px', borderRadius: '8px', fontSize: '0.66rem', fontWeight: '700' }}>
                    {c.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Case File Details & Milestones */}
          {selectedCase && (
            <div style={{ backgroundColor: 'rgba(17, 24, 39, 0.85)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: '600' }}>{selectedCase.caseNumber}</span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginTop: '2px' }}>{selectedCase.title}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {selectedCase.state} • {selectedCase.category}
                    </p>
                  </div>

                  <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 12px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: '700' }}>
                    Status: {selectedCase.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    <span>Case Completion Progress</span>
                    <strong style={{ color: 'var(--gold-primary)' }}>{selectedCase.progressPct}%</strong>
                  </div>
                  <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${selectedCase.progressPct}%`, height: '100%', backgroundColor: 'var(--blue-primary)', borderRadius: '4px', transition: 'var(--transition-smooth)' }} />
                  </div>
                </div>

                {/* Counsel Card */}
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '14px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <UserCheck size={20} style={{ color: 'var(--gold-primary)' }} />
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Lead Counsel Assigned</span>
                      <strong style={{ fontSize: '0.88rem', color: '#fff' }}>{selectedCase.counselName}</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      onClose();
                      onOpenWorkspace({ lawyerName: selectedCase.counselName, channel: 'Live Chat' });
                    }}
                    style={{ backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', fontSize: '0.78rem', fontWeight: '600' }}
                  >
                    Open Workspace
                  </button>
                </div>

                {/* Milestones Tracker */}
                <h4 style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                  Milestone Workflow Timeline
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedCase.milestones.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.84rem' }}>
                      <CheckCircle2 size={16} style={{ color: m.done ? '#34d399' : 'var(--text-muted)' }} />
                      <span style={{ color: m.done ? '#fff' : 'var(--text-muted)', textDecoration: m.done ? 'none' : 'none' }}>
                        {m.step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
