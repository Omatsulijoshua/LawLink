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
                  <span>Verified Lawyer</span>
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--gold-primary)', fontWeight: '600', marginTop: '2px' }}>
              {lawyer.title} • {lawyer.lawFirm}
            </p>

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
