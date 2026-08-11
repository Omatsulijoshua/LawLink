import { useState } from 'react';
import { X, Calendar, Clock, Video, Phone, MessageSquare, MapPin, CheckCircle, ShieldCheck, CreditCard } from 'lucide-react';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

const SERVICES = [
  { id: 'advisory_30', name: '30-Min Legal Advisory', duration: '30 mins', fee: 15000, desc: 'Quick legal guidance and rights assessment' },
  { id: 'consult_60', name: '60-Min Full Legal Consultation', duration: '60 mins', fee: 25000, desc: 'Comprehensive case review and strategic counsel' },
  { id: 'doc_review', name: 'Legal Document Review', duration: '24-48 hrs', fee: 35000, desc: 'Contract, lease, or court process document analysis' },
  { id: 'court_rep', name: 'Court Representation / Appearance', duration: 'Per Hearing', fee: 75000, desc: 'Litigation advocacy in High Court / Magistrate Court' }
];

const DATES = [
  'Today, Aug 11', 'Tomorrow, Aug 12', 'Thu, Aug 13', 'Fri, Aug 14', 'Mon, Aug 17'
];

export function ConsultationBookingModal({ lawyer, onClose, onBookingComplete }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES[1]);
  const [selectedChannel, setSelectedChannel] = useState('Video');
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedTime, setSelectedTime] = useState(lawyer?.availableSlots?.[0] || '10:00 AM');
  const [caseNotes, setCaseNotes] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setShowCheckout(true);
  };

  const handleEscrowPaymentSuccess = (paymentInfo) => {
    const newAppointment = {
      id: 'apt-' + Date.now(),
      lawyerId: lawyer.id,
      lawyerName: lawyer.name,
      lawyerTitle: lawyer.title,
      lawFirm: lawyer.lawFirm,
      practiceArea: lawyer.practiceArea,
      serviceName: selectedService.name,
      channel: selectedChannel,
      date: selectedDate,
      time: selectedTime,
      fee: selectedService.fee,
      currency: 'NGN',
      status: 'CONFIRMED',
      createdAt: Date.now(),
      notes: caseNotes,
      txRef: paymentInfo.txRef,
      escrowId: paymentInfo.escrowId,
      paymentInfo
    };

    onBookingComplete(newAppointment);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" style={{ maxWidth: '580px', padding: '32px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close booking modal"
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--blue-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.1rem' }}>
            {lawyer.avatar}
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: '600' }}>Book Consultation with {lawyer.name}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: '500' }}>{lawyer.title} • {lawyer.practiceArea}</span>
          </div>
        </div>

        {/* STEP 1: SERVICE */}
        {step === 1 && (
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              Select Legal Consultation Service
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {SERVICES.map((srv) => (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedService(srv)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: selectedService.id === srv.id ? '1px solid var(--blue-accent)' : '1px solid var(--border-light)',
                    backgroundColor: selectedService.id === srv.id ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: selectedService.id === srv.id ? '#fff' : 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem' }}>{srv.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>{srv.desc}</div>
                  </div>
                  <strong style={{ color: 'var(--gold-primary)', fontSize: '0.92rem' }}>₦{srv.fee.toLocaleString()}</strong>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => setStep(2)}
              style={{ width: '100%', backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', height: '42px', fontWeight: '600' }}
            >
              Next: Select Channel & Date
            </button>
          </div>
        )}

        {/* STEP 2: CHANNEL & TIME */}
        {step === 2 && (
          <div>
            <h4 style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Choose Communication Channel
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
              {[
                { id: 'Video', icon: Video, label: 'Video Call' },
                { id: 'Phone', icon: Phone, label: 'Phone Call' },
                { id: 'Chat', icon: MessageSquare, label: 'Live Chat' },
                { id: 'In-Person', icon: MapPin, label: 'In-Office' }
              ].map((ch) => {
                const IconComp = ch.icon;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChannel(ch.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '12px 6px',
                      borderRadius: '8px',
                      border: selectedChannel === ch.id ? '1px solid var(--blue-accent)' : '1px solid var(--border-light)',
                      backgroundColor: selectedChannel === ch.id ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      color: selectedChannel === ch.id ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    <IconComp size={18} style={{ marginBottom: '4px' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{ch.label}</span>
                  </button>
                );
              })}
            </div>

            <h4 style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Select Date & Slot
            </h4>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '14px', paddingBottom: '4px' }}>
              {DATES.map((dt) => (
                <button
                  key={dt}
                  type="button"
                  onClick={() => setSelectedDate(dt)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: selectedDate === dt ? '1px solid var(--gold-primary)' : '1px solid var(--border-light)',
                    backgroundColor: selectedDate === dt ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    color: selectedDate === dt ? '#fff' : 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {dt}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {(lawyer.availableSlots || ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']).map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    border: selectedTime === slot ? '1px solid var(--blue-accent)' : '1px solid var(--border-light)',
                    backgroundColor: selectedTime === slot ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                    color: selectedTime === slot ? '#fff' : 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="btn-secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</button>
              <button type="button" className="btn-secondary" onClick={() => setStep(3)} style={{ flex: 2, backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', fontWeight: '600' }}>Confirm Details</button>
            </div>
          </div>
        )}

        {/* STEP 3: SUMMARY & CONFIRMATION */}
        {step === 3 && (
          <form onSubmit={handleProceedToPayment}>
            <h4 style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Consultation Summary
            </h4>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Counsel:</span>
                <strong style={{ color: '#fff' }}>{lawyer.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Service:</span>
                <strong style={{ color: '#fff' }}>{selectedService.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Channel & Time:</span>
                <strong style={{ color: 'var(--gold-primary)' }}>{selectedChannel} • {selectedDate} at {selectedTime}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ color: '#fff', fontWeight: '600' }}>Counsel Fee:</span>
                <strong style={{ color: 'var(--gold-primary)', fontSize: '1.05rem' }}>₦{selectedService.fee.toLocaleString()} NGN</strong>
              </div>
            </div>

            <textarea
              className="chat-input"
              rows={3}
              placeholder="Add brief case notes or specific questions for counsel..."
              value={caseNotes}
              onChange={(e) => setCaseNotes(e.target.value)}
              style={{ width: '100%', borderRadius: '8px', padding: '12px', fontSize: '0.84rem', marginBottom: '16px', resize: 'none' }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="btn-secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>Back</button>
              <button type="submit" className="btn-secondary" style={{ flex: 2, backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', fontWeight: '700', height: '42px' }}>
                Proceed to Escrow Checkout
              </button>
            </div>
          </form>
        )}
      </div>

      {showCheckout && (
        <PaymentCheckoutModal
          amount={selectedService.fee}
          lawyerName={lawyer.name}
          serviceName={selectedService.name}
          onClose={() => setShowCheckout(false)}
          onPaymentSuccess={handleEscrowPaymentSuccess}
        />
      )}
    </div>
  );
}
