import { X, CheckCircle, Star, Phone, MessageSquare, Video, Calendar, ShieldCheck, MapPin, Briefcase } from 'lucide-react';

export function LawyerProfileModal({ lawyer, onClose, onSelectAction }) {
  if (!lawyer) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" style={{ maxWidth: '640px', padding: '32px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close lawyer profile"
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Profile Header */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--blue-primary)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            fontWeight: '700',
            border: '2px solid var(--blue-accent)',
            flexShrink: 0
          }}>
            {lawyer.avatar || 'L'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                {lawyer.name}
              </h2>
              {lawyer.verificationStatus === 'VERIFIED' && (
                <span style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#34d399',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle size={12} />
                  <span>Verified Counsel</span>
                </span>
              )}

              {/* Entity Type Badge */}
              <span style={{
                backgroundColor: lawyer.entityType === 'LAW_FIRM' ? 'rgba(217, 119, 6, 0.18)' : 'rgba(59, 130, 246, 0.18)',
                color: lawyer.entityType === 'LAW_FIRM' ? '#fbbf24' : '#60a5fa',
                border: `1px solid ${lawyer.entityType === 'LAW_FIRM' ? 'rgba(217, 119, 6, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`,
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {lawyer.entityType === 'LAW_FIRM' ? '🏢 Law Firm Partnership' : '⚖️ Solo Practitioner'}
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--gold-primary)', fontWeight: '600', marginTop: '2px' }}>
              {lawyer.title} • {lawyer.lawFirm}
            </p>

            {/* Linked Social Media Accounts */}
            {lawyer.socialLinks && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                {lawyer.socialLinks.linkedin && (
                  <a href={lawyer.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', color: '#60a5fa', padding: '4px 8px', borderRadius: '6px', fontSize: '0.72rem', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    💼 LinkedIn
                  </a>
                )}
                {lawyer.socialLinks.twitter && (
                  <a href={lawyer.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', color: '#38bdf8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.72rem', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    🐦 X / Twitter
                  </a>
                )}
                {lawyer.socialLinks.website && (
                  <a href={lawyer.socialLinks.website} target="_blank" rel="noreferrer" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', color: '#34d399', padding: '4px 8px', borderRadius: '6px', fontSize: '0.72rem', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    🌐 Official Website
                  </a>
                )}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} />
                {lawyer.city}, {lawyer.state} State
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={14} />
                {lawyer.experienceYears} Years Exp.
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: '600' }}>
                <Star size={14} fill="#f59e0b" />
                {lawyer.rating} ({lawyer.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Optional Law Firm Associate Roster Display */}
        {lawyer.entityType === 'LAW_FIRM' && lawyer.showAssociateRoster !== false && (
          <div style={{ marginBottom: '20px', backgroundColor: 'rgba(217, 119, 6, 0.06)', border: '1px solid rgba(217, 119, 6, 0.25)', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '0.82rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px', margin: 0 }}>
                🏢 Law Firm Associate Lawyers Roster
              </h4>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Optional Firm Showcase Enabled</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(lawyer.associateRoster || [
                { id: 'a1', name: 'Barrister Tunde Bakare', title: 'Senior Litigation Associate', barNumber: 'SCN/099128' },
                { id: 'a2', name: 'Barrister Ngozi Eze', title: 'Junior Associate Counsel', barNumber: 'SCN/114920' }
              ]).map((assoc) => (
                <div key={assoc.id || assoc.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '6px' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#fff', display: 'block' }}>{assoc.name}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{assoc.title}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--blue-accent)', fontFamily: 'monospace', fontWeight: '600' }}>{assoc.barNumber}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Public Case Track Record Banner */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '10px', padding: '14px', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>Total Cases Taken</span>
            <strong style={{ fontSize: '1.25rem', color: '#fff', display: 'block', marginTop: '2px' }}>
              {lawyer.casesTaken || 148} Legal Matters
            </strong>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>Cases Successfully Resolved</span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--gold-primary)', display: 'block', marginTop: '2px' }}>
              {lawyer.casesCompleted || 142} Resolved ({Math.round(((lawyer.casesCompleted || 142) / (lawyer.casesTaken || 148)) * 100)}% Rate)
            </strong>
          </div>
        </div>

        {/* Credentials & Details Card */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '16px', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Primary Specialization</span>
            <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{lawyer.practiceArea}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Call to Bar / Enrollment No.</span>
            <strong style={{ fontSize: '0.88rem', color: 'var(--blue-accent)' }}>{lawyer.barNumber}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Consultation Fee</span>
            <strong style={{ fontSize: '0.88rem', color: 'var(--gold-primary)' }}>₦{lawyer.consultationFee.toLocaleString()} / session</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Languages</span>
            <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{lawyer.languages.join(', ')}</strong>
          </div>
        </div>

        {/* Biography */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
            Professional Biography
          </h4>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
            {lawyer.bio}
          </p>
        </div>

        {/* Availability Slots */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Available Slots Today
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {lawyer.availableSlots.map((slot) => (
              <span key={slot} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', color: '#60a5fa', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '500' }}>
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* Public Reviews & Rating Breakdown */}
        <div style={{ marginBottom: '24px', backgroundColor: 'rgba(0, 0, 0, 0.25)', borderRadius: '10px', padding: '16px', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Public Ratings & Client Feedback
            </h4>
            <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={14} fill="#f59e0b" />
              {lawyer.rating} / 5.0 Rating Aggregate
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '10px 12px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Verified Business Client</span>
                <span style={{ fontSize: '0.7rem', color: '#f59e0b', display: 'flex', gap: '2px' }}>★★★★★</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                "Counsel provided exceptional legal advisory on our land title acquisition and perfected the Governor's consent seamlessly."
              </p>
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Verified Retainer Client</span>
                <span style={{ fontSize: '0.7rem', color: '#f59e0b', display: 'flex', gap: '2px' }}>★★★★★</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                "Top class responsiveness during court filings. Solved our CAC partnership corporate dispute with high professionalism."
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onSelectAction('book', lawyer)}
            style={{ backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', fontWeight: '600', padding: '10px' }}
          >
            <Calendar size={16} />
            <span>Book Consultation</span>
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onSelectAction('chat', lawyer)}
            style={{ fontWeight: '600', padding: '10px' }}
          >
            <MessageSquare size={16} />
            <span>Chat Now</span>
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onSelectAction('call', lawyer)}
            style={{ fontWeight: '600', padding: '10px' }}
          >
            <Phone size={16} />
            <span>Call Counsel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
