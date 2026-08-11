import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, Clock, FileText } from 'lucide-react';

const CATEGORIES = [
  'Criminal Law', 'Family Law', 'Property & Land', 'Business Law', 
  'Employment', 'Debt Recovery', 'Contracts', 'Immigration', 
  'Human Rights', 'Accident/Injury', 'Intellectual Property', 
  'Tax', 'Corporate Law', 'Civil Litigation', 'Other'
];

const NIGERIAN_STATES = [
  'Lagos', 'Abuja (FCT)', 'Delta', 'Rivers', 'Kano', 'Oyo', 'Enugu', 
  'Anambra', 'Edo', 'Kaduna', 'Akwa Ibom', 'Ogun', 'Ondo', 'Imo', 'Other State'
];

const URGENCY_LEVELS = [
  { id: 'NORMAL', label: 'Normal', desc: 'Seeking general advice or planning ahead' },
  { id: 'SOON', label: 'Soon', desc: 'Need legal assistance within a few days' },
  { id: 'URGENT', label: 'Urgent', desc: 'Court date or contract deadline approaching' },
  { id: 'EMERGENCY', label: 'Emergency 🚨', desc: 'Arrest, police detention, or immediate eviction' }
];

export function ClientOnboardingModal({ onClose, onSubmitIntake }) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Property & Land');
  const [stateLocation, setStateLocation] = useState('Lagos');
  const [cityLocation, setCityLocation] = useState('');
  const [urgency, setUrgency] = useState('NORMAL');
  const [description, setDescription] = useState('');

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const intakePayload = {
      category: selectedCategory,
      location: `${cityLocation ? cityLocation + ', ' : ''}${stateLocation}, Nigeria`,
      urgency,
      description,
      summaryPrompt: `[LEGAL MATTER INTAKE]\nCategory: ${selectedCategory}\nLocation: ${stateLocation}, Nigeria\nUrgency: ${urgency}\nDetails: ${description}\n\nPlease classify this legal matter, state key rights under Nigerian law, and recommend suitable verified lawyer specializations.`
    };

    onSubmitIntake(intakePayload);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" style={{ maxWidth: '580px', padding: '32px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close onboarding modal"
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              style={{ 
                flex: 1, 
                height: '4px', 
                borderRadius: '2px', 
                backgroundColor: i <= step ? 'var(--blue-primary)' : 'rgba(255, 255, 255, 0.1)',
                transition: 'var(--transition-smooth)'
              }} 
            />
          ))}
        </div>

        {/* STEP 1: CATEGORY */}
        {step === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', marginBottom: '8px' }}>
              <ShieldCheck size={20} />
              <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Step 1 of 4</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px' }}>
              What can we help you with?
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Select the area of law that best matches your situation.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: selectedCategory === cat ? '1px solid var(--blue-accent)' : '1px solid var(--border-light)',
                    backgroundColor: selectedCategory === cat ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                    fontWeight: selectedCategory === cat ? '600' : '400',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', marginBottom: '8px' }}>
              <MapPin size={20} />
              <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Step 2 of 4</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px' }}>
              Where is your legal matter located?
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              We match you with verified lawyers licensed in your jurisdiction.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '500' }}>State / Federal Territory</label>
                <select 
                  className="chat-input"
                  value={stateLocation}
                  onChange={(e) => setStateLocation(e.target.value)}
                  style={{ borderRadius: '8px', height: '42px', padding: '0 14px', fontSize: '0.88rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st} State</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '500' }}>City or LGA (Optional)</label>
                <input 
                  type="text" 
                  className="chat-input"
                  placeholder="e.g. Ikeja, Lekki, Asaba, Wuse II"
                  value={cityLocation}
                  onChange={(e) => setCityLocation(e.target.value)}
                  style={{ borderRadius: '8px', height: '42px', padding: '0 14px', fontSize: '0.88rem' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: URGENCY */}
        {step === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', marginBottom: '8px' }}>
              <Clock size={20} />
              <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Step 3 of 4</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px' }}>
              How urgent is this matter?
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Emergency requests trigger rapid lawyer matching.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {URGENCY_LEVELS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUrgency(u.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: urgency === u.id ? '1px solid var(--blue-accent)' : '1px solid var(--border-light)',
                    backgroundColor: urgency === u.id ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <span style={{ color: urgency === u.id ? '#fff' : 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem' }}>{u.label}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>{u.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: DESCRIPTION & SUBMIT */}
        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', marginBottom: '8px' }}>
              <FileText size={20} />
              <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Step 4 of 4</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px' }}>
              Tell us what happened.
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Describe the situation clearly. LawLink AI will analyze your information and classify your legal matter.
            </p>

            <textarea
              className="chat-input"
              rows={5}
              placeholder="Provide key facts: dates, parties involved, location, contracts, or court notices..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ width: '100%', borderRadius: '8px', padding: '14px', fontSize: '0.88rem', lineHeight: '1.5', resize: 'none' }}
            />

            <button
              type="submit"
              className="btn-secondary"
              disabled={!description.trim()}
              style={{
                width: '100%',
                backgroundColor: 'var(--blue-primary)',
                borderColor: 'var(--blue-accent)',
                color: '#fff',
                height: '44px',
                fontWeight: '600',
                marginTop: '16px',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Analyze & Match Lawyers</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
          {step > 1 ? (
            <button
              type="button"
              className="btn-secondary"
              onClick={handleBack}
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 4 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={handleNext}
              style={{ backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', padding: '8px 20px', fontSize: '0.82rem', fontWeight: '600' }}
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
