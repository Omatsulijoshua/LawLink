import { useState } from 'react';
import { X, Star, CheckCircle2, Send } from 'lucide-react';

export function ReviewModal({ lawyer, onClose, onSubmitReview }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onSubmitReview({
      lawyerId: lawyer.id,
      rating,
      comment,
      createdAt: Date.now()
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" style={{ maxWidth: '480px', padding: '28px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close review modal"
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '4px' }}>
          Leave Client Review
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Rate your consultation session with <strong>{lawyer?.name || 'Counsel'}</strong>.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Star Rating Selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(rating)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <Star
                  size={28}
                  fill={star <= (hoverRating || rating) ? '#f59e0b' : 'transparent'}
                  color={star <= (hoverRating || rating) ? '#f59e0b' : 'var(--text-muted)'}
                />
              </button>
            ))}
          </div>

          <textarea
            className="chat-input"
            rows={4}
            placeholder="Share your experience regarding legal advice quality, responsiveness, and counsel professionalism..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            style={{ width: '100%', borderRadius: '8px', padding: '12px', fontSize: '0.85rem', marginBottom: '20px', resize: 'none' }}
          />

          <button
            type="submit"
            className="btn-secondary"
            disabled={!comment.trim()}
            style={{ width: '100%', backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', fontWeight: '600', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Send size={16} />
            <span>Submit Verified Review</span>
          </button>
        </form>
      </div>
    </div>
  );
}
