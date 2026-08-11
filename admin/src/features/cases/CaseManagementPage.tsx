import React, { useState } from 'react';
import { Briefcase, Eye, Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

interface CaseRecord {
  id: string;
  title: string;
  clientName: string;
  lawyerName: string;
  lawFirm: string;
  category: string;
  status: 'INTAKE_SUBMITTED' | 'LAWYER_MATCHED' | 'IN_PROGRESS' | 'RESOLVED';
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  createdAt: string;
  updatedAt: string;
}

const MOCK_CASES: CaseRecord[] = [
  { id: 'CASE-9021', title: 'Commercial Land Title Dispute', clientName: 'Chidi Nwosu', lawyerName: 'Barrister Nnamdi Bello (SAN)', lawFirm: 'Bello & Associates SAN', category: 'Property & Land Law', status: 'IN_PROGRESS', priority: 'HIGH', createdAt: '2026-08-01', updatedAt: '2026-08-10' },
  { id: 'CASE-9022', title: 'CAC Share Capital Restructuring', clientName: 'Innovate Tech Ltd', lawyerName: 'Barrister Emeka Okafor', lawFirm: 'Okafor & Partners', category: 'Corporate & Business Law', status: 'LAWYER_MATCHED', priority: 'NORMAL', createdAt: '2026-08-08', updatedAt: '2026-08-09' },
  { id: 'CASE-9023', title: 'Emergency Arrest & Bail Petition', clientName: 'Tunde Bakare', lawyerName: 'Barrister Folake Adebayo', lawFirm: 'Adebayo Chambers', category: 'Criminal Defense Law', status: 'IN_PROGRESS', priority: 'URGENT', createdAt: '2026-08-11', updatedAt: '2026-08-11' }
];

export const CaseManagementPage: React.FC = () => {
  const [cases, setCases] = useState<CaseRecord[]>(MOCK_CASES);
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);

  const columns: Column<CaseRecord>[] = [
    {
      key: 'id',
      header: 'Case ID & Matter Title',
      render: (row) => (
        <div>
          <span className="font-mono text-xs font-bold text-amber-400">{row.id}</span>
          <p className="font-semibold text-white">{row.title}</p>
        </div>
      )
    },
    {
      key: 'clientName',
      header: 'Client & Lead Counsel',
      render: (row) => (
        <div>
          <p className="text-xs text-gray-200">Client: {row.clientName}</p>
          <span className="text-[11px] text-gray-400">Counsel: {row.lawyerName}</span>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Practice Category',
      render: (row) => <span className="text-xs text-gray-300">{row.category}</span>
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (row) => (
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
          row.priority === 'URGENT' ? 'bg-red-950 text-red-400 border-red-500/40' :
          row.priority === 'HIGH' ? 'bg-amber-950 text-amber-400 border-amber-500/40' :
          'bg-gray-800 text-gray-300 border-gray-700'
        }`}>
          {row.priority}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Case Status',
      render: (row) => (
        <span className="text-xs font-semibold text-blue-400 bg-blue-950 border border-blue-500/30 px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
          <Clock size={12} /> {row.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Case Audit',
      render: (row) => (
        <button
          onClick={() => setSelectedCase(row)}
          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs flex items-center gap-1"
        >
          <Eye size={14} /> Audit Timeline
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Briefcase className="text-blue-500" size={24} />
            Legal Case Management & Audit Desk
          </h2>
          <p className="text-xs text-gray-400">Monitor active legal matters, counsel assignments, and progress milestones across LawLink.</p>
        </div>
      </div>

      <DataTable columns={columns} data={cases} searchPlaceholder="Search by Case ID, Matter Title, Client, or Lawyer..." />

      {selectedCase && (
        <Modal isOpen={!!selectedCase} onClose={() => setSelectedCase(null)} title={`Case File — ${selectedCase.id}`}>
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 bg-[#0b0f19] p-4 rounded-xl border border-gray-800">
              <div><span className="text-gray-500 block">Matter Title:</span><strong className="text-white text-sm">{selectedCase.title}</strong></div>
              <div><span className="text-gray-500 block">Lead Counsel:</span><strong className="text-blue-400 text-sm">{selectedCase.lawyerName}</strong></div>
              <div><span className="text-gray-500 block">Client Identity:</span><span className="text-gray-300">{selectedCase.clientName}</span></div>
              <div><span className="text-gray-500 block">Law Firm:</span><span className="text-gray-300">{selectedCase.lawFirm}</span></div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
