import { useState } from 'react';
import { X, Calendar, Clock, Video, Phone, MessageSquare, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { InvoiceModal } from './InvoiceModal';

export function AppointmentsModal({ appointments = [], onClose, onOpenWorkspace }) {
  const [activeInvoiceApt, setActiveInvoiceApt] = useState(null);

  return (
    <div className="admin-page-container">
      <div className="watermark-bg"></div>

      <div className="admin-page-content" style={{ maxWidth: '900px', width: '92vw' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close appointments modal" style={{ top: '24px', right: '24px' }}>
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
            <Calendar size={26} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff' }}>
              My Legal Appointments
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Manage upcoming consultations, join live video/chat workspaces, and view booking history.
          </p>
        </div>

        {/* Appointments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
          {appointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px dashed var(--border-light)' }}>
              <Calendar size={36} style={{ marginBottom: '10px', opacity: '0.5' }} />
              <p style={{ fontSize: '0.9rem' }}>No consultation appointments booked yet.</p>
              <p style={{ fontSize: '0.78rem', marginTop: '4px' }}>Search verified lawyers and book an advisory session to get started.</p>
            </div>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt.id}
                style={{
                  backgroundColor: 'rgba(17, 24, 39, 0.85)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: '600' }}>{apt.lawyerName}</h4>
                    <span style={{
                      backgroundColor: apt.status === 'CONFIRMED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: apt.status === 'CONFIRMED' ? '#34d399' : '#fca5a5',
                      border: apt.status === 'CONFIRMED' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: '700'
                    }}>
                      {apt.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--gold-primary)', fontWeight: '500' }}>
                    {apt.serviceName} • {apt.channel} Session
                  </p>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    📅 {apt.date} at {apt.time} • Fee Paid: ₦{apt.fee.toLocaleString()} NGN
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setActiveInvoiceApt(apt)}
                    style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                  >
                    <FileText size={14} />
                    <span>Tax Receipt</span>
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      onClose();
                      onOpenWorkspace(apt);
                    }}
                    style={{
                      backgroundColor: 'var(--blue-primary)',
                      borderColor: 'var(--blue-accent)',
                      color: '#fff',
                      fontWeight: '600',
                      padding: '8px 16px',
                      fontSize: '0.82rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {apt.channel === 'Video' ? <Video size={14} /> : apt.channel === 'Phone' ? <Phone size={14} /> : <MessageSquare size={14} />}
                    <span>Enter Workspace</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {activeInvoiceApt && (
        <InvoiceModal
          appointment={activeInvoiceApt}
          paymentInfo={activeInvoiceApt.paymentInfo}
          onClose={() => setActiveInvoiceApt(null)}
        />
      )}
    </div>
  );
}
