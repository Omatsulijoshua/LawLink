import { X, Printer, ShieldCheck, Download, CheckCircle } from 'lucide-react';

export function InvoiceModal({ appointment, paymentInfo, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const counselName = appointment?.lawyerName || 'Barrister Counsel';
  const serviceName = appointment?.serviceName || 'Legal Consultation';
  const txRef = paymentInfo?.txRef || appointment?.txRef || 'LL-PAY-849120';
  const escrowId = paymentInfo?.escrowId || appointment?.escrowId || 'ESC-710492';
  const fee = paymentInfo?.counselFee || appointment?.fee || 25000;
  const vat = paymentInfo?.vatAmount || Math.round(fee * 0.075);
  const platformFee = paymentInfo?.platformFee || 500;
  const total = fee + vat + platformFee;
  const paidAt = paymentInfo?.paidAt ? new Date(paymentInfo.paidAt).toLocaleDateString() : 'Aug 11, 2026';

  return (
    <div className="admin-page-container">
      <div className="watermark-bg"></div>

      <div className="admin-page-content" style={{ maxWidth: '680px', width: '92vw', backgroundColor: '#ffffff', color: '#0f172a', padding: '36px', borderRadius: '12px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close invoice modal" style={{ top: '24px', right: '24px', color: '#64748b' }}>
          <X size={20} />
        </button>

        {/* Receipt Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '20px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <img src="/lawlink_logo.png" alt="LawLink Logo" style={{ width: '36px', height: '36px' }} />
              <h2 style={{ fontFamily: 'serif', fontSize: '1.6rem', color: '#0f172a', margin: 0 }}>LawLink Legal Services</h2>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>The Right Lawyer. Right When You Need One.</p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700', display: 'inline-block', marginBottom: '6px' }}>
              ✓ TAX RECEIPT & ESCROW RECEIPT
            </span>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Date: {paidAt}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Ref: <strong>{txRef}</strong></div>
          </div>
        </div>

        {/* Escrow Badge */}
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#1e40af', textTransform: 'uppercase', fontWeight: '700' }}>Escrow Protection Status</span>
            <div style={{ fontSize: '0.88rem', color: '#1e3a8a', fontWeight: '600' }}>Funds Held in LawLink Escrow ({escrowId})</div>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '600' }}>Auto-Release on Session Completion</span>
        </div>

        {/* Details Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '0.86rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '10px', color: '#475569' }}>Description</th>
              <th style={{ textAlign: 'right', padding: '10px', color: '#475569' }}>Amount (NGN)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px 10px', color: '#1e293b' }}>
                <strong>{serviceName}</strong>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Counsel: {counselName}</div>
              </td>
              <td style={{ textAlign: 'right', padding: '12px 10px', fontWeight: '600' }}>₦{fee.toLocaleString()}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '10px', color: '#475569' }}>VAT (7.5% Nigerian Statutory Tax)</td>
              <td style={{ textAlign: 'right', padding: '10px' }}>₦{vat.toLocaleString()}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '10px', color: '#475569' }}>LawLink Platform Technology Fee</td>
              <td style={{ textAlign: 'right', padding: '10px' }}>₦{platformFee.toLocaleString()}</td>
            </tr>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <td style={{ padding: '14px 10px', fontWeight: '700', fontSize: '0.95rem' }}>Total Paid</td>
              <td style={{ textAlign: 'right', padding: '14px 10px', fontWeight: '700', fontSize: '1.1rem', color: '#2563eb' }}>₦{total.toLocaleString()} NGN</td>
            </tr>
          </tbody>
        </table>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={handlePrint}
            style={{ backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            <Printer size={16} />
            <span>Print Tax Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
