import { useState } from 'react';
import { X, CreditCard, Landmark, PhoneCall, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export function PaymentCheckoutModal({ amount, lawyerName, serviceName, onClose, onPaymentSuccess }) {
  const [method, setMethod] = useState('card'); // 'card' | 'transfer' | 'ussd'
  const [cardNumber, setCardNumber] = useState('5399 •••• •••• 4821');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('831');
  const [isProcessing, setIsProcessing] = useState(false);

  const vatAmount = Math.round(amount * 0.075);
  const platformFee = 500;
  const totalAmount = amount + vatAmount + platformFee;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const txRef = 'LL-PAY-' + Math.floor(100000 + Math.random() * 900000);
      const escrowId = 'ESC-' + Math.floor(100000 + Math.random() * 900000);

      onPaymentSuccess({
        txRef,
        escrowId,
        gateway: method === 'card' ? 'Paystack Card' : method === 'transfer' ? 'Flutterwave Bank Transfer' : 'USSD Direct',
        amount: totalAmount,
        counselFee: amount,
        vatAmount,
        platformFee,
        status: 'HELD_IN_ESCROW',
        paidAt: Date.now()
      });
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" style={{ maxWidth: '520px', padding: '28px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close checkout modal"
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Secure Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '6px' }}>
          <Lock size={18} />
          <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Paystack / Flutterwave Secured Checkout</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '4px' }}>
          Complete Escrow Payment
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Funds are safely held in <strong>LawLink Escrow</strong> until your consultation is completed.
        </p>

        {/* Amount Summary */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '14px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Total Charge (incl. VAT & Escrow)</span>
            <strong style={{ fontSize: '1.2rem', color: 'var(--gold-primary)' }}>₦{totalAmount.toLocaleString()} NGN</strong>
          </div>
          <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '600' }}>
            🔒 Escrow Protected
          </span>
        </div>

        {/* Method Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {[
            { id: 'card', icon: CreditCard, label: 'Debit Card' },
            { id: 'transfer', icon: Landmark, label: 'Bank Transfer' },
            { id: 'ussd', icon: PhoneCall, label: 'USSD Code' }
          ].map((m) => {
            const IconComponent = m.icon;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: '8px',
                  border: method === m.id ? '1px solid var(--blue-accent)' : '1px solid var(--border-light)',
                  backgroundColor: method === m.id ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  color: method === m.id ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                <IconComponent size={18} style={{ marginBottom: '4px' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handlePay}>
          {method === 'card' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Card Number</label>
                <input
                  type="text"
                  className="chat-input"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  style={{ borderRadius: '6px', height: '38px', padding: '0 12px', fontSize: '0.86rem' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Expiry</label>
                  <input
                    type="text"
                    className="chat-input"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    required
                    style={{ borderRadius: '6px', height: '38px', padding: '0 12px', fontSize: '0.86rem' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>CVV</label>
                  <input
                    type="password"
                    className="chat-input"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    maxLength={4}
                    required
                    style={{ borderRadius: '6px', height: '38px', padding: '0 12px', fontSize: '0.86rem' }}
                  />
                </div>
              </div>
            </div>
          )}

          {method === 'transfer' && (
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '16px', marginBottom: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Transfer exactly ₦{totalAmount.toLocaleString()} to:</span>
              <h4 style={{ color: 'var(--gold-primary)', fontSize: '1.2rem', margin: '6px 0' }}>9018274019</h4>
              <p style={{ fontSize: '0.82rem', color: '#fff', fontWeight: '600' }}>Wema Bank • LawLink Escrow Account</p>
            </div>
          )}

          {method === 'ussd' && (
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '16px', marginBottom: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dial on your registered mobile phone:</span>
              <h4 style={{ color: 'var(--gold-primary)', fontSize: '1.25rem', margin: '6px 0' }}>*737*33*{totalAmount}#</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>GTBank / Zenith / Access USSD Payment</p>
            </div>
          )}

          <button
            type="submit"
            className="btn-secondary"
            disabled={isProcessing}
            style={{
              width: '100%',
              backgroundColor: 'var(--blue-primary)',
              borderColor: 'var(--blue-accent)',
              color: '#fff',
              height: '44px',
              fontWeight: '700',
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isProcessing ? (
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Pay ₦{totalAmount.toLocaleString()} into Escrow</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
