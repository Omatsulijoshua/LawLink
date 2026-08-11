import { useState } from 'react';
import { X, AlertTriangle, Phone, MessageSquare, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { INITIAL_LAWYERS } from '../data/mockLawyers';

const EMERGENCY_TYPES = [
  { id: 'police', title: '🚨 Police Arrest / Custody Detention', desc: 'Lawyer dispatch for station bail & rights enforcement' },
  { id: 'eviction', title: '🏠 Imminent Landlord Eviction / Lockout', desc: 'Emergency legal injunction against unlawful ejection' },
  { id: 'court', title: '⚖️ Urgent Court Order / Restraining Notice', desc: 'Same-day representation for emergency motion ex parte' },
  { id: 'business', title: '🏢 Business Asset Seizure / Lockout', desc: 'Legal relief against illegal government or agency closure' }
];

export function EmergencyHelpModal({ onClose, onSelectAction }) {
  const [selectedEmergency, setSelectedEmergency] = useState('police');
  const emergencyLawyers = INITIAL_LAWYERS.filter(l => l.verificationStatus === 'VERIFIED' && l.emergencyAvailable);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" style={{ maxWidth: '640px', padding: '32px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close emergency modal"
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Emergency Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', marginBottom: '8px' }}>
          <AlertTriangle size={32} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#fff' }}>
            🚨 GET EMERGENCY LEGAL HELP NOW
          </h2>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          On-call verified lawyers available now for immediate response across Nigeria.
        </p>

        {/* Emergency Type Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {EMERGENCY_TYPES.map((et) => (
            <button
              key={et.id}
              type="button"
              onClick={() => setSelectedEmergency(et.id)}
              style={{
                textAlign: 'left',
                padding: '12px 14px',
                borderRadius: '8px',
                border: selectedEmergency === et.id ? '1px solid #ef4444' : '1px solid var(--border-light)',
                backgroundColor: selectedEmergency === et.id ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ color: selectedEmergency === et.id ? '#fff' : 'var(--text-primary)', fontWeight: '600', fontSize: '0.85rem' }}>
                {et.title}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '3px' }}>
                {et.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Available Emergency Lawyers */}
        <h4 style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={16} />
          <span>ON-CALL VERIFIED LAWYERS (AVAILABLE NOW)</span>
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
          {emergencyLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '10px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--blue-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                  {lawyer.avatar}
                </div>
                <div>
                  <h5 style={{ fontSize: '0.95rem', color: '#fff', fontWeight: '600' }}>{lawyer.name}</h5>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                    {lawyer.city}, {lawyer.state} • {lawyer.practiceArea}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    onClose();
                    onSelectAction('call', lawyer);
                  }}
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '6px 12px', fontSize: '0.78rem', fontWeight: '600' }}
                >
                  <Phone size={14} />
                  <span>Direct Call</span>
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    onClose();
                    onSelectAction('chat', lawyer);
                  }}
                  style={{ backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', padding: '6px 12px', fontSize: '0.78rem', fontWeight: '600' }}
                >
                  <MessageSquare size={14} />
                  <span>Emergency Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
