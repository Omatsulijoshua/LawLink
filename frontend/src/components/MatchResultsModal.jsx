import { useState } from 'react';
import { X, CheckCircle, Star, Phone, MessageSquare, Calendar, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import { LawyerProfileModal } from './LawyerProfileModal';

export function MatchResultsModal({ intakePayload, matchedLawyers = [], onClose, onSelectAction }) {
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  return (
    <div className="admin-page-container">
      <div className="watermark-bg"></div>

      <div className="admin-page-content" style={{ maxWidth: '1000px', width: '92vw' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close match results" style={{ top: '24px', right: '24px' }}>
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
            <Sparkles size={26} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff' }}>
              LawLink AI Lawyer Matches
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Based on your legal intake summary ({intakePayload?.category || 'General Law'}, {intakePayload?.location || 'Nigeria'}), here are verified lawyers best suited for your matter.
          </p>
        </div>

        {/* Matched Lawyers List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
          {matchedLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              style={{
                backgroundColor: 'rgba(17, 24, 39, 0.85)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: '280px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--blue-primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  border: '2px solid var(--blue-accent)',
                  flexShrink: 0
                }}>
                  {lawyer.avatar}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: '600' }}>{lawyer.name}</h3>
                    <span style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#34d399',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle size={12} />
                      <span>Verified Lawyer</span>
                    </span>
                    {lawyer.emergencyAvailable && (
                      <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '700' }}>
                        AVAILABLE NOW
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--gold-primary)', fontWeight: '500', marginTop: '2px' }}>
                    {lawyer.title} • {lawyer.lawFirm}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    <span><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{lawyer.city}, {lawyer.state}</span>
                    <span>{lawyer.experienceYears} Yrs Exp.</span>
                    <span style={{ color: '#f59e0b', fontWeight: '600' }}><Star size={12} fill="#f59e0b" style={{ display: 'inline', marginRight: '3px' }} />{lawyer.rating}</span>
                  </div>

                  {/* Match Rationale Tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {(lawyer.matchReasons || []).map((reason, rIdx) => (
                      <span key={rIdx} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>
                        ✓ {reason}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Match Percentage & Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '180px' }}>
                <div style={{
                  backgroundColor: 'rgba(37, 99, 235, 0.15)',
                  border: '1px solid var(--blue-accent)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  color: '#60a5fa',
                  fontSize: '0.92rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Sparkles size={16} />
                  <span>{lawyer.matchPercentage}% Match</span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: '600' }}>
                  ₦{lawyer.consultationFee.toLocaleString()} / session
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setSelectedLawyer(lawyer)}
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    View Profile
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      onClose();
                      onSelectAction('chat', lawyer);
                    }}
                    style={{ backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', padding: '6px 14px', fontSize: '0.78rem', fontWeight: '600' }}
                  >
                    Consult Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedLawyer && (
        <LawyerProfileModal
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
          onSelectAction={(action, l) => {
            setSelectedLawyer(null);
            onClose();
            onSelectAction(action, l);
          }}
        />
      )}
    </div>
  );
}
