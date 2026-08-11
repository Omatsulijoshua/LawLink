import { useState } from 'react';
import { X, Search, Filter, CheckCircle, Star, Phone, MessageSquare, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { INITIAL_LAWYERS } from '../data/mockLawyers';
import { LawyerProfileModal } from './LawyerProfileModal';

export function LawyerDirectoryModal({ onClose, onSelectAction }) {
  const [lawyers] = useState(INITIAL_LAWYERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);

  const filteredLawyers = lawyers.filter((l) => {
    if (l.verificationStatus !== 'VERIFIED') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = l.name.toLowerCase().includes(q);
      const matchesFirm = l.lawFirm.toLowerCase().includes(q);
      const matchesArea = l.practiceArea.toLowerCase().includes(q);
      const matchesCity = l.city.toLowerCase().includes(q);
      if (!matchesName && !matchesFirm && !matchesArea && !matchesCity) return false;
    }

    if (selectedPracticeArea !== 'ALL' && l.practiceArea !== selectedPracticeArea) {
      return false;
    }

    if (selectedState !== 'ALL' && l.state !== selectedState) {
      return false;
    }

    if (emergencyOnly && !l.emergencyAvailable) {
      return false;
    }

    return true;
  });

  return (
    <div className="admin-page-container">
      <div className="watermark-bg"></div>

      <div className="admin-page-content" style={{ maxWidth: '1100px', width: '92vw' }}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close directory modal" style={{ top: '24px', right: '24px' }}>
          <X size={24} />
        </button>

        {/* Directory Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
            <ShieldCheck size={28} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff' }}>
              Verified Lawyers Directory
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Search, filter, and connect directly with verified Nigerian legal practitioners.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: '10px' }}>
          {/* Search bar */}
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="chat-input"
              placeholder="Search by lawyer name, law firm, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '38px', borderRadius: '8px', height: '40px', fontSize: '0.85rem' }}
            />
          </div>

          {/* Practice Area Filter */}
          <select
            className="chat-input"
            value={selectedPracticeArea}
            onChange={(e) => setSelectedPracticeArea(e.target.value)}
            style={{ borderRadius: '8px', height: '40px', padding: '0 12px', fontSize: '0.85rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', minWidth: '180px' }}
          >
            <option value="ALL">All Practice Areas</option>
            <option value="Constitutional Rights">Constitutional Rights</option>
            <option value="Property & Land Law">Property & Land Law</option>
            <option value="Criminal Defense">Criminal Defense</option>
            <option value="Family & Matrimonial Law">Family & Matrimonial Law</option>
            <option value="Corporate & Business Law">Corporate & Business Law</option>
          </select>

          {/* Location State Filter */}
          <select
            className="chat-input"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={{ borderRadius: '8px', height: '40px', padding: '0 12px', fontSize: '0.85rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', minWidth: '150px' }}
          >
            <option value="ALL">All States</option>
            <option value="Lagos">Lagos State</option>
            <option value="Abuja (FCT)">Abuja (FCT)</option>
            <option value="Delta">Delta State</option>
            <option value="Kano">Kano State</option>
          </select>

          {/* Emergency Filter Toggle */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setEmergencyOnly(!emergencyOnly)}
            style={{
              backgroundColor: emergencyOnly ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              color: emergencyOnly ? '#fca5a5' : 'var(--text-secondary)',
              borderColor: emergencyOnly ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-light)',
              height: '40px',
              fontSize: '0.82rem',
              fontWeight: '600'
            }}
          >
            🚨 Emergency Available
          </button>
        </div>

        {/* Lawyer Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', maxHeight: '55vh', overflowY: 'auto', paddingRight: '4px' }}>
          {filteredLawyers.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No verified lawyers matched your search filters. Try adjusting your location or practice area search.
            </div>
          ) : (
            filteredLawyers.map((lawyer) => (
              <div 
                key={lawyer.id} 
                style={{
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--blue-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.1rem' }}>
                        {lawyer.avatar}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', color: '#fff', fontWeight: '600' }}>{lawyer.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: '500' }}>{lawyer.title}</span>
                      </div>
                    </div>
                    
                    {lawyer.emergencyAvailable && (
                      <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.66rem', fontWeight: '700' }}>
                        AVAILABLE NOW
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <CheckCircle size={14} style={{ color: '#34d399' }} />
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: '600' }}>✓ Verified Lawyer</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {lawyer.barNumber}</span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <strong>Practice:</strong> {lawyer.practiceArea}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {lawyer.city}, {lawyer.state} State • {lawyer.experienceYears} Yrs Exp.
                  </p>
                </div>

                <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Consultation Fee</span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--gold-primary)' }}>₦{lawyer.consultationFee.toLocaleString()}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setActiveProfile(lawyer)}
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      View Profile
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        onClose();
                        onSelectAction('chat', lawyer);
                      }}
                      style={{ backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', padding: '6px 12px', fontSize: '0.75rem', fontWeight: '600' }}
                    >
                      Consult
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {activeProfile && (
        <LawyerProfileModal
          lawyer={activeProfile}
          onClose={() => setActiveProfile(null)}
          onSelectAction={(action, lawyer) => {
            setActiveProfile(null);
            onClose();
            onSelectAction(action, lawyer);
          }}
        />
      )}
    </div>
  );
}
