import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, FileText, AlertCircle, Eye, ExternalLink, Download, ArrowRight, UserCheck } from 'lucide-react';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { LawyerApplication, VerificationStatus } from '../../types';

const MOCK_APPLICATIONS: LawyerApplication[] = [
  {
    id: 'app-001',
    name: 'Barrister Emeka Okafor',
    email: 'emeka.okafor@lawlink.ng',
    phone: '+234 803 999 0011',
    barNumber: 'SCN/109283',
    lawFirm: 'Okafor & Partners',
    practiceArea: 'Corporate & Business Law',
    state: 'Lagos, NG',
    experienceYears: 11,
    consultationFee: 45000,
    status: 'PENDING',
    submittedAt: '2026-08-10 14:22',
    documents: [
      { name: 'Supreme Court Enrollment Certificate', type: 'PDF', url: '#' },
      { name: 'NBA Practicing License 2026', type: 'PDF', url: '#' },
      { name: 'National Identity Slip (NIN)', type: 'JPG', url: '#' }
    ]
  },
  {
    id: 'app-002',
    name: 'Barrister Amina Yusuf',
    email: 'amina.yusuf@juris.ng',
    phone: '+234 802 888 2233',
    barNumber: 'SCN/087124',
    lawFirm: 'Yusuf Legal Chambers',
    practiceArea: 'Property & Real Estate Law',
    state: 'Abuja, FCT',
    experienceYears: 8,
    consultationFee: 35000,
    status: 'PENDING',
    submittedAt: '2026-08-11 09:15',
    documents: [
      { name: 'Call to Bar Certificate', type: 'PDF', url: '#' },
      { name: 'International Passport Bio Data', type: 'PDF', url: '#' }
    ]
  },
  {
    id: 'app-003',
    name: 'Barrister Nnamdi Bello (SAN)',
    email: 'bello@bellolaw.ng',
    phone: '+234 802 444 5566',
    barNumber: 'SCN/048291',
    lawFirm: 'Bello & Associates SAN',
    practiceArea: 'Constitutional Rights & Criminal Defense',
    state: 'Abuja, FCT',
    experienceYears: 24,
    consultationFee: 75000,
    status: 'VERIFIED',
    submittedAt: '2025-11-20 10:00',
    documents: [
      { name: 'SAN Conferment Rank Certificate', type: 'PDF', url: '#' }
    ]
  }
];

export const VerificationCenterPage: React.FC = () => {
  const [applications, setApplications] = useState<LawyerApplication[]>(MOCK_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<LawyerApplication | null>(null);
  const [activeTab, setActiveTab] = useState<VerificationStatus>('PENDING');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const { showToast } = useToast();

  const handleApprove = (app: LawyerApplication) => {
    setApplications(applications.map(a => a.id === app.id ? { ...a, status: 'VERIFIED' } : a));
    showToast(`Approved ${app.name}. Lawyer is now publicly searchable on LawLink.`, 'success');
    setSelectedApp(null);
  };

  const handleReject = (app: LawyerApplication) => {
    if (!rejectReason.trim()) {
      showToast('Please provide a reason for rejecting the application.', 'warning');
      return;
    }
    setApplications(applications.map(a => a.id === app.id ? { ...a, status: 'REJECTED' } : a));
    showToast(`Rejected verification for ${app.name}. Reason notification sent.`, 'error');
    setSelectedApp(null);
    setShowRejectForm(false);
    setRejectReason('');
  };

  const filteredApps = applications.filter(a => a.status === activeTab);

  const columns: Column<LawyerApplication>[] = [
    {
      key: 'lawyer',
      header: 'Lawyer Applicant',
      render: (row) => (
        <div>
          <p className="font-semibold text-white">{row.name}</p>
          <span className="text-xs text-gray-400">{row.email} • {row.phone}</span>
        </div>
      )
    },
    {
      key: 'barNumber',
      header: 'Supreme Court Bar No.',
      render: (row) => <span className="font-mono text-xs text-amber-400 font-semibold">{row.barNumber}</span>
    },
    {
      key: 'practiceArea',
      header: 'Specialization & Practice',
      render: (row) => (
        <div>
          <p className="text-xs text-gray-200">{row.practiceArea}</p>
          <span className="text-[11px] text-gray-400">{row.experienceYears} Years Exp • {row.lawFirm}</span>
        </div>
      )
    },
    {
      key: 'consultationFee',
      header: 'Hourly Rate',
      render: (row) => <span className="text-xs font-semibold text-emerald-400">₦{row.consultationFee.toLocaleString()}</span>
    },
    {
      key: 'actions',
      header: 'Verification Review',
      render: (row) => (
        <button
          onClick={() => { setSelectedApp(row); setShowRejectForm(false); }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
        >
          <Eye size={14} />
          <span>Review Credentials</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <ShieldCheck className="text-amber-500" size={24} />
            Lawyer & Law Firm Verification Desk
          </h2>
          <p className="text-xs text-gray-400">Review Supreme Court Call to Bar credentials, NBA practicing licenses, and identity documents.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 text-xs font-medium gap-2">
        {(['PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 border-b-2 font-semibold transition-colors ${
              activeTab === tab
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab} ({applications.filter(a => a.status === tab).length})
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filteredApps} searchPlaceholder="Search by Lawyer Name, Bar Number, or Specialization..." />

      {/* Verification Review Modal */}
      {selectedApp && (
        <Modal isOpen={!!selectedApp} onClose={() => setSelectedApp(null)} title={`Verification Review — ${selectedApp.name}`} maxWidth="max-w-3xl">
          <div className="space-y-6 text-xs">
            {/* Applicant Meta */}
            <div className="grid grid-cols-3 gap-4 bg-[#0b0f19] p-4 rounded-xl border border-gray-800">
              <div><span className="text-gray-500 block">Supreme Court Bar No:</span><strong className="text-amber-400 font-mono text-sm">{selectedApp.barNumber}</strong></div>
              <div><span className="text-gray-500 block">Practice Area:</span><strong className="text-white text-sm">{selectedApp.practiceArea}</strong></div>
              <div><span className="text-gray-500 block">Consultation Rate:</span><strong className="text-emerald-400 text-sm">₦{selectedApp.consultationFee.toLocaleString()} NGN</strong></div>
              <div><span className="text-gray-500 block">Law Firm:</span><span className="text-gray-300">{selectedApp.lawFirm}</span></div>
              <div><span className="text-gray-500 block">Years of Experience:</span><span className="text-gray-300">{selectedApp.experienceYears} Years</span></div>
              <div><span className="text-gray-500 block">Jurisdiction:</span><span className="text-gray-300">{selectedApp.state}</span></div>
            </div>

            {/* Uploaded Documents List */}
            <div>
              <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">Submitted Legal Credentials & ID Proofs</h4>
              <div className="space-y-2">
                {selectedApp.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/60 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-blue-400" />
                      <div>
                        <p className="font-medium text-white">{doc.name}</p>
                        <span className="text-[10px] text-gray-400">Verified TLS Encrypted Document</span>
                      </div>
                    </div>
                    <button onClick={() => showToast(`Opening signed document preview for ${doc.name}`, 'info')} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs flex items-center gap-1">
                      <Eye size={12} /> Preview
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Actions */}
            {selectedApp.status === 'PENDING' && (
              <div className="pt-4 border-t border-gray-800 space-y-4">
                {!showRejectForm ? (
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setShowRejectForm(true)}
                      className="px-4 py-2.5 rounded-xl border border-red-500/40 bg-red-950/60 hover:bg-red-900 text-red-300 font-semibold text-xs transition-colors"
                    >
                      Reject Application
                    </button>
                    <button
                      onClick={() => handleApprove(selectedApp)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
                    >
                      <CheckCircle2 size={16} />
                      <span>Approve & Verify Lawyer</span>
                    </button>
                  </div>
                ) : (
                  <div className="bg-red-950/40 border border-red-500/40 p-4 rounded-xl space-y-3">
                    <h5 className="font-semibold text-red-300">Rejection Reason Required</h5>
                    <textarea
                      rows={3}
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Specify missing documents or unverified Supreme Court enrollment details..."
                      className="w-full bg-[#0b0f19] border border-gray-700 rounded-lg p-2.5 text-xs text-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowRejectForm(false)} className="px-3 py-1.5 text-gray-400 hover:text-white">Cancel</button>
                      <button onClick={() => handleReject(selectedApp)} className="px-4 py-1.5 bg-red-600 text-white font-semibold rounded-lg">Confirm Rejection</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
