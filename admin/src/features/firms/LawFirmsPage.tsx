import React, { useState } from 'react';
import { Building2, Users, Briefcase, DollarSign, CheckCircle2, Eye, ShieldCheck } from 'lucide-react';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

interface LawFirmRecord {
  id: string;
  name: string;
  managingPartner: string;
  location: string;
  lawyerCount: number;
  activeCases: number;
  totalRevenue: number;
  status: 'VERIFIED' | 'PENDING' | 'SUSPENDED';
  cacRegistration: string;
}

const MOCK_FIRMS: LawFirmRecord[] = [
  { id: 'firm-01', name: 'Bello & Associates SAN', managingPartner: 'Barrister Nnamdi Bello (SAN)', location: 'Abuja, FCT', lawyerCount: 14, activeCases: 42, totalRevenue: 18500000, status: 'VERIFIED', cacRegistration: 'RC-1049281' },
  { id: 'firm-02', name: 'Okafor & Legal Partners', managingPartner: 'Barrister Emeka Okafor', location: 'Lagos, NG', lawyerCount: 8, activeCases: 21, totalRevenue: 9200000, status: 'VERIFIED', cacRegistration: 'RC-8819204' },
  { id: 'firm-03', name: 'Adebayo Chambers LLP', managingPartner: 'Barrister Folake Adebayo', location: 'Ikeja, Lagos', lawyerCount: 6, activeCases: 15, totalRevenue: 6400000, status: 'VERIFIED', cacRegistration: 'RC-7729103' }
];

export const LawFirmsPage: React.FC = () => {
  const [firms, setFirms] = useState<LawFirmRecord[]>(MOCK_FIRMS);
  const [selectedFirm, setSelectedFirm] = useState<LawFirmRecord | null>(null);
  const { showToast } = useToast();

  const columns: Column<LawFirmRecord>[] = [
    {
      key: 'name',
      header: 'Law Firm Entity',
      render: (row) => (
        <div>
          <p className="font-semibold text-white">{row.name}</p>
          <span className="text-xs text-gray-400">Partner: {row.managingPartner} • CAC: {row.cacRegistration}</span>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Headquarters',
      render: (row) => <span className="text-xs text-gray-300">{row.location}</span>
    },
    {
      key: 'lawyerCount',
      header: 'Associate Attorneys',
      render: (row) => <span className="text-xs font-semibold text-blue-400">{row.lawyerCount} Lawyers</span>
    },
    {
      key: 'totalRevenue',
      header: 'Firm Escrow Revenue',
      render: (row) => <span className="text-xs font-semibold text-emerald-400">₦{row.totalRevenue.toLocaleString()}</span>
    },
    {
      key: 'status',
      header: 'Firm Status',
      render: (row) => (
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
          <CheckCircle2 size={12} /> {row.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Admin Actions',
      render: (row) => (
        <button
          onClick={() => setSelectedFirm(row)}
          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs flex items-center gap-1"
        >
          <Eye size={14} /> View Firm Desk
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Building2 className="text-blue-500" size={24} />
            Law Firm Accounts & Management Desk
          </h2>
          <p className="text-xs text-gray-400">Monitor law firm partnership profiles, associate rosters, pooled revenue, and legal cases.</p>
        </div>
      </div>

      <DataTable columns={columns} data={firms} searchPlaceholder="Search firm by name, managing partner, CAC number..." />

      {selectedFirm && (
        <Modal isOpen={!!selectedFirm} onClose={() => setSelectedFirm(null)} title={`Firm Profile — ${selectedFirm.name}`}>
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 bg-[#0b0f19] p-4 rounded-xl border border-gray-800">
              <div><span className="text-gray-500 block">Managing Partner:</span><strong className="text-white text-sm">{selectedFirm.managingPartner}</strong></div>
              <div><span className="text-gray-500 block">CAC Registration:</span><strong className="text-amber-400 font-mono text-sm">{selectedFirm.cacRegistration}</strong></div>
              <div><span className="text-gray-500 block">Associate Counsel:</span><span className="text-blue-400 font-semibold">{selectedFirm.lawyerCount} Attorneys</span></div>
              <div><span className="text-gray-500 block">Total Escrow Volume:</span><span className="text-emerald-400 font-semibold">₦{selectedFirm.totalRevenue.toLocaleString()} NGN</span></div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
