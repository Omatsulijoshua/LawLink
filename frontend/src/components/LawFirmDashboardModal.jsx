import { useState } from 'react';
import { X, Building2, Users, DollarSign, Calendar, ShieldCheck, CheckCircle } from 'lucide-react';
import { INITIAL_LAWYERS } from '../data/mockLawyers';

export function LawFirmDashboardModal({ onClose }) {
  const firmLawyers = INITIAL_LAWYERS;

  return (
    <div className="admin-page-container">
      <div className="watermark-bg"></div>

      <div className="admin-page-content" style={{ maxWidth: '1000px', width: '92vw' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close firm dashboard" style={{ top: '24px', right: '24px' }}>
          <X size={24} />
        </button>

        {/* Firm Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
            <Building2 size={28} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff' }}>
              Law Firm Administration Desk
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Bello &amp; Associates Legal Practitioners • Law Firm Partner Portal
          </p>
        </div>

        {/* Firm Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Associate Lawyers</span>
            <strong style={{ fontSize: '1.5rem', color: '#fff' }}>{firmLawyers.length} Attorneys</strong>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Monthly Firm Consultations</span>
            <strong style={{ fontSize: '1.5rem', color: 'var(--gold-primary)' }}>142 Sessions</strong>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total Revenue (Escrow Paid)</span>
            <strong style={{ fontSize: '1.5rem', color: '#34d399' }}>₦3,850,000 NGN</strong>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Firm Reputation Score</span>
            <strong style={{ fontSize: '1.5rem', color: '#60a5fa' }}>4.95 / 5.0 ⭐</strong>
          </div>
        </div>

        {/* Firm Settings & Public Profile Showcase Controls */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
            ⚙️ Public Profile & Showcase Settings
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Social Media Links */}
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                Linked Social Media & Web Profiles
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input type="text" className="chat-input" placeholder="LinkedIn: https://linkedin.com/in/..." defaultValue="https://linkedin.com/in/bellopartners" style={{ borderRadius: '6px', height: '34px', padding: '0 10px', fontSize: '0.8rem' }} />
                <input type="text" className="chat-input" placeholder="Twitter/X: https://x.com/..." defaultValue="https://x.com/bellopartners" style={{ borderRadius: '6px', height: '34px', padding: '0 10px', fontSize: '0.8rem' }} />
                <input type="text" className="chat-input" placeholder="Website: https://..." defaultValue="https://bellopartners.law.ng" style={{ borderRadius: '6px', height: '34px', padding: '0 10px', fontSize: '0.8rem' }} />
              </div>
            </div>

            {/* Optional Roster Showcase Toggle */}
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                Optional Public Profile Features
              </label>
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.82rem', color: '#fff', display: 'block' }}>Show Associate Lawyers List on Public Profile</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Allow public visitors to see all active attorneys in your law firm roster.</span>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Firm Associate Lawyers Roster */}
        <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
          Firm Counsel Roster & Availability
        </h4>

        <div style={{ backgroundColor: 'rgba(17, 24, 39, 0.85)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '16px', overflowX: 'auto', maxHeight: '40vh' }}>
          <table className="clients-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Attorney Name</th>
                <th>Call to Bar No.</th>
                <th>Practice Specialization</th>
                <th>Hourly Fee</th>
                <th>Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {firmLawyers.map((l) => (
                <tr key={l.id}>
                  <td className="email-cell">{l.name} ({l.title})</td>
                  <td className="time-cell">{l.barNumber}</td>
                  <td className="time-cell">{l.practiceArea}</td>
                  <td className="time-cell">₦{l.consultationFee.toLocaleString()}</td>
                  <td>
                    <span style={{ color: '#34d399', fontWeight: '600', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={12} /> VERIFIED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
