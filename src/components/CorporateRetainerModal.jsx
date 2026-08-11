import { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Zap, Building, Crown, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    id: 'startup',
    name: 'Startup Growth Retainer',
    fee: 150000,
    period: '/ month',
    desc: 'For early-stage companies needing CAC compliance, 2 monthly contract reviews, and employment advice.',
    features: [
      'CAC Annual Returns Filing Assistance',
      '2 Comprehensive Contract Reviews / Month',
      'Dedicated Junior Associate Counsel',
      'Standard 24-hr Advice Response Time'
    ],
    recommended: false
  },
  {
    id: 'business',
    name: 'Corporate Business Retainer',
    fee: 350000,
    period: '/ month',
    desc: 'For growing businesses requiring full legal coverage, 5 monthly contracts, tax advisory, and IP registration.',
    features: [
      'Everything in Startup Plan',
      '5 Commercial Contract Reviews / Month',
      'Trademark & Intellectual Property Filing',
      'Dedicated Senior Counsel Lead',
      'Priority 4-hr Response Time'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise SAN Retainer',
    fee: 850000,
    period: '/ month',
    desc: 'For large enterprises, financial institutions, and multinationals requiring Senior Advocate of Nigeria lead counsel.',
    features: [
      'Unlimited Contract & Deal Reviews',
      'Senior Advocate of Nigeria (SAN) Advisory',
      '24/7 Emergency Police / Station Hotline',
      'High Court & Appellate Litigation Defense',
      'Dedicated Firm Legal Desk'
    ],
    recommended: false
  }
];

export function CorporateRetainerModal({ onClose, onSelectPlan }) {
  return (
    <div className="admin-page-container">
      <div className="watermark-bg"></div>

      <div className="admin-page-content" style={{ maxWidth: '1050px', width: '94vw' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close corporate retainer modal" style={{ top: '24px', right: '24px' }}>
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <span style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: 'var(--gold-primary)', padding: '4px 14px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            LawLink Corporate Legal Subscriptions
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#fff', marginTop: '6px', marginBottom: '6px' }}>
            Enterprise Legal Retainer Accounts
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto' }}>
            On-demand legal counsel for your business. Unlimited advice, contract reviews, and dedicated Senior Advocates of Nigeria.
          </p>
        </div>

        {/* Retainer Plans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'stretch' }}>
          {PLANS.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: p.recommended ? 'rgba(37, 99, 235, 0.12)' : 'rgba(17, 24, 39, 0.85)',
                border: p.recommended ? '2px solid var(--blue-accent)' : '1px solid var(--border-light)',
                borderRadius: '14px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {p.recommended && (
                <span style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: 'var(--blue-primary)', color: '#fff', padding: '2px 12px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '700' }}>
                  MOST POPULAR
                </span>
              )}

              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: '600', marginBottom: '8px' }}>{p.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '16px', height: '40px' }}>{p.desc}</p>

                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ fontSize: '1.8rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-serif)' }}>₦{p.fee.toLocaleString()}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.period}</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={14} style={{ color: '#34d399', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  onClose();
                  onSelectPlan(p);
                }}
                style={{
                  width: '100%',
                  backgroundColor: p.recommended ? 'var(--blue-primary)' : 'rgba(255, 255, 255, 0.04)',
                  borderColor: p.recommended ? 'var(--blue-accent)' : 'var(--border-light)',
                  color: '#fff',
                  fontWeight: '600',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>Subscribe Retainer</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
