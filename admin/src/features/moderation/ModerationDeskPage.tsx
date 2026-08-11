import React, { useState } from 'react';
import { Star, AlertTriangle, ShieldAlert, CheckCircle2, Eye, MessageSquare } from 'lucide-react';
import { DataTable, Column } from '../../components/ui/DataTable';
import { useToast } from '../../components/ui/Toast';

interface ReviewRecord {
  id: string;
  rating: number;
  clientName: string;
  lawyerName: string;
  comment: string;
  date: string;
  status: 'PUBLISHED' | 'HIDDEN';
}

interface DisputeRecord {
  id: string;
  complainant: string;
  respondent: string;
  type: 'Payment Dispute' | 'Counsel Conduct' | 'Service No-Show';
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED';
  createdAt: string;
}

const MOCK_REVIEWS: ReviewRecord[] = [
  { id: 'rev-01', rating: 5, clientName: 'Chidi Nwosu', lawyerName: 'Barrister Nnamdi Bello (SAN)', comment: 'Exceptional guidance on land title search. Highly recommend senior advocate counsel.', date: '2026-08-10', status: 'PUBLISHED' }
];

const MOCK_DISPUTES: DisputeRecord[] = [
  { id: 'dsp-801', complainant: 'Tunde Bakare', respondent: 'Barrister Emeka Okafor', type: 'Payment Dispute', status: 'OPEN', createdAt: '2026-08-11 09:30' }
];

export const ModerationDeskPage: React.FC<{ mode?: 'reviews' | 'disputes' }> = ({ mode = 'reviews' }) => {
  const [reviews, setReviews] = useState<ReviewRecord[]>(MOCK_REVIEWS);
  const [disputes, setDisputes] = useState<DisputeRecord[]>(MOCK_DISPUTES);
  const { showToast } = useToast();

  const handleToggleHideReview = (rev: ReviewRecord) => {
    const nextStatus = rev.status === 'PUBLISHED' ? 'HIDDEN' : 'PUBLISHED';
    setReviews(reviews.map(r => r.id === rev.id ? { ...r, status: nextStatus } : r));
    showToast(`Review by ${rev.clientName} status updated to ${nextStatus}`, 'info');
  };

  const handleResolveDispute = (dsp: DisputeRecord) => {
    setDisputes(disputes.map(d => d.id === dsp.id ? { ...d, status: 'RESOLVED' } : d));
    showToast(`Dispute ${dsp.id} marked as RESOLVED by Super Admin.`, 'success');
  };

  const revColumns: Column<ReviewRecord>[] = [
    { key: 'rating', header: 'Star Rating', render: (row) => <span className="font-bold text-amber-400 font-mono">⭐ {row.rating}.0 / 5.0</span> },
    { key: 'clientName', header: 'Client & Lawyer', render: (row) => <div><p className="font-semibold text-white">{row.clientName}</p><span className="text-xs text-gray-400">Counsel: {row.lawyerName}</span></div> },
    { key: 'comment', header: 'Verified Review Comment', render: (row) => <p className="text-xs text-gray-300 italic max-w-md">"{row.comment}"</p> },
    {
      key: 'actions',
      header: 'Moderation Action',
      render: (row) => (
        <button onClick={() => handleToggleHideReview(row)} className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 rounded">
          {row.status === 'PUBLISHED' ? 'Hide Review' : 'Publish Review'}
        </button>
      )
    }
  ];

  const dspColumns: Column<DisputeRecord>[] = [
    { key: 'id', header: 'Ticket ID', render: (row) => <span className="font-mono text-xs font-bold text-red-400">{row.id}</span> },
    { key: 'complainant', header: 'Complainant & Respondent', render: (row) => <div><p className="font-semibold text-white">{row.complainant}</p><span className="text-xs text-gray-400">Target: {row.respondent}</span></div> },
    { key: 'type', header: 'Dispute Category', render: (row) => <span className="text-xs text-amber-400 font-medium">{row.type}</span> },
    {
      key: 'actions',
      header: 'Arbitration Action',
      render: (row) => (
        row.status !== 'RESOLVED' ? (
          <button onClick={() => handleResolveDispute(row)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg">
            Resolve Dispute
          </button>
        ) : <span className="text-xs text-emerald-400 font-semibold">✓ Resolved</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          {mode === 'reviews' ? <Star className="text-amber-500" size={24} /> : <AlertTriangle className="text-red-400" size={24} />}
          {mode === 'reviews' ? 'Client Review Moderation Desk' : 'Marketplace Dispute & Arbitration Center'}
        </h2>
        <p className="text-xs text-gray-400">
          {mode === 'reviews' ? 'Moderate verified client reviews and rating feedback.' : 'Investigate client conduct, payment refund claims, and lawyer conduct complaints.'}
        </p>
      </div>

      {mode === 'reviews' ? (
        <DataTable columns={revColumns} data={reviews} searchPlaceholder="Search reviews by client or lawyer..." />
      ) : (
        <DataTable columns={dspColumns} data={disputes} searchPlaceholder="Search disputes by ticket ID, complainant, or respondent..." />
      )}
    </div>
  );
};
