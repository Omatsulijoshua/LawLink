import { useState } from 'react';
import { X, Bell, Calendar, ShieldCheck, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const INITIAL_NOTIFS = [
  { id: 'n-1', title: 'Consultation Appointment Confirmed', desc: 'Your 60-min Video session with Barrister Nnamdi Bello (SAN) is set for Today at 11:30 AM.', time: '10 mins ago', type: 'appointment', read: false },
  { id: 'n-2', title: 'Escrow Funds Protected', desc: '₦27,375 NGN safely locked in LawLink Escrow (ESC-918234) for land title consultation.', time: '1 hour ago', type: 'escrow', read: false },
  { id: 'n-3', title: 'Document Vault Shared', desc: 'Barrister Folake Adebayo shared Executed Tenancy Agreement to your Vault.', time: 'Yesterday', type: 'vault', read: true }
];

export function NotificationsModal({ onClose }) {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" style={{ maxWidth: '520px', padding: '28px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close notifications modal"
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)' }}>
            <Bell size={22} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>Notifications</h3>
          </div>
          <button type="button" onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--blue-accent)', fontSize: '0.78rem', cursor: 'pointer' }}>
            Mark all read
          </button>
        </div>

        {/* Notification List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
          {notifs.map((n) => (
            <div
              key={n.id}
              style={{
                backgroundColor: n.read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(59, 130, 246, 0.12)',
                border: n.read ? '1px solid var(--border-light)' : '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{ color: 'var(--gold-primary)', marginTop: '2px' }}>
                {n.type === 'appointment' ? <Calendar size={18} /> : n.type === 'escrow' ? <ShieldCheck size={18} /> : <MessageSquare size={18} />}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.88rem', color: '#fff', fontWeight: '600', marginBottom: '2px' }}>{n.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{n.desc}</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
