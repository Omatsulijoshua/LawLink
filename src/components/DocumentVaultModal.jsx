import { useState } from 'react';
import { X, Folder, Lock, FileText, Download, Upload, ShieldCheck, Search } from 'lucide-react';

const INITIAL_DOCS = [
  { id: 'doc-1', title: 'Residential Tenancy Agreement (Executed).pdf', type: 'Tenancy Contract', size: '2.4 MB', date: 'Aug 05, 2026', encrypted: true },
  { id: 'doc-2', title: 'Governor Consent Certificate of Occupancy (Copy).pdf', type: 'Land Title Deed', size: '4.8 MB', date: 'Jul 28, 2026', encrypted: true },
  { id: 'doc-3', title: 'Statutory Affidavit of Loss & Declaration.pdf', type: 'Court Affidavit', size: '1.1 MB', date: 'Jul 14, 2026', encrypted: true },
  { id: 'doc-4', title: 'Commercial Supply Contract Non-Disclosure Agreement.pdf', type: 'Corporate NDA', size: '1.8 MB', date: 'Jun 10, 2026', encrypted: true }
];

export function DocumentVaultModal({ onClose }) {
  const [docs, setDocs] = useState(INITIAL_DOCS);
  const [search, setSearch] = useState('');

  const filteredDocs = docs.filter(d => d.title.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-page-container">
      <div className="watermark-bg"></div>

      <div className="admin-page-content" style={{ maxWidth: '900px', width: '92vw' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close vault modal" style={{ top: '24px', right: '24px' }}>
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
            <Lock size={26} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff' }}>
              Encrypted Document Vault
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            AES-256 encrypted storage for legal contracts, land title deeds, court processes, and executed affidavits.
          </p>
        </div>

        {/* Actions Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="chat-input"
              placeholder="Search vault documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '38px', borderRadius: '8px', height: '40px', fontSize: '0.85rem' }}
            />
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => alert("Document uploaded to encrypted vault.")}
            style={{ backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', fontWeight: '600', height: '40px', padding: '0 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Upload size={16} />
            <span>Upload Document</span>
          </button>
        </div>

        {/* Documents Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', maxHeight: '55vh', overflowY: 'auto', paddingRight: '4px' }}>
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              style={{
                backgroundColor: 'rgba(17, 24, 39, 0.85)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <FileText size={24} style={{ color: 'var(--gold-primary)' }} />
                  <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '2px 6px', borderRadius: '8px', fontWeight: '600' }}>
                    🔒 AES-256
                  </span>
                </div>
                <h4 style={{ fontSize: '0.88rem', color: '#fff', fontWeight: '600', lineHeight: '1.3', marginBottom: '4px' }}>{doc.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.type} • {doc.size}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.date}</span>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => alert(`Downloading ${doc.title}`)}
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
