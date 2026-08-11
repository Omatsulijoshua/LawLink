import React, { useState } from 'react';
import { Bell, Crown, BarChart3, FileText, Settings, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { DataTable, Column } from '../../components/ui/DataTable';
import { useToast } from '../../components/ui/Toast';

interface AuditRecord {
  id: string;
  admin: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
}

const MOCK_AUDITS: AuditRecord[] = [
  { id: 'aud-901', admin: 'Super Admin (lawlinkllp01@gmail.com)', action: 'VERIFIED_LAWYER', target: 'Barrister Emeka Okafor (SCN/109283)', timestamp: '2026-08-11 10:14:02', ipAddress: '102.89.23.41' },
  { id: 'aud-902', admin: 'Super Admin (lawlinkllp01@gmail.com)', action: 'APPROVED_WITHDRAWAL', target: 'WDR-401 (₦3,240,000 NGN)', timestamp: '2026-08-11 09:30:18', ipAddress: '102.89.23.41' }
];

export const SystemAuditLogsPage: React.FC = () => {
  const columns: Column<AuditRecord>[] = [
    { key: 'id', header: 'Audit Ref', render: (row) => <span className="font-mono text-xs text-amber-400 font-bold">{row.id}</span> },
    { key: 'admin', header: 'Admin Identity', render: (row) => <span className="text-xs text-white font-semibold">{row.admin}</span> },
    { key: 'action', header: 'Mutation Event', render: (row) => <span className="text-xs font-mono text-blue-400 font-bold">{row.action}</span> },
    { key: 'target', header: 'Target Entity', render: (row) => <span className="text-xs text-gray-300">{row.target}</span> },
    { key: 'timestamp', header: 'Timestamp & IP', render: (row) => <span className="text-xs text-gray-400">{row.timestamp} ({row.ipAddress})</span> }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <FileText className="text-amber-500" size={24} />
          Immutable System Audit Logs
        </h2>
        <p className="text-xs text-gray-400">Cryptographically recorded trail of all administrative actions, lawyer verifications, and financial approvals.</p>
      </div>

      <DataTable columns={columns} data={MOCK_AUDITS} searchPlaceholder="Search audit trail by admin, action, or target..." />
    </div>
  );
};

export const PlatformSettingsPage: React.FC = () => {
  const [flags, setFlags] = useState({
    aiIntake: true,
    aiDocuments: true,
    emergencyMatching: true,
    videoConsultation: true,
    lawFirmAccounts: true,
    subscriptions: true
  });
  const { showToast } = useToast();

  const toggleFlag = (key: keyof typeof flags) => {
    const updated = { ...flags, [key]: !flags[key] };
    setFlags(updated);
    showToast(`Feature flag [${key}] updated to ${updated[key] ? 'ENABLED' : 'DISABLED'}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <Settings className="text-blue-500" size={24} />
          Platform Configuration & Feature Flags
        </h2>
        <p className="text-xs text-gray-400">Enable or disable core LawLink marketplace modules globally.</p>
      </div>

      <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl space-y-4 max-w-2xl text-xs">
        {Object.entries(flags).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-[#0b0f19] border border-gray-800">
            <div>
              <p className="font-semibold text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              <span className="text-gray-400 text-[11px]">Global Production Feature Flag</span>
            </div>
            <button onClick={() => toggleFlag(key as any)} className="text-blue-400 font-bold text-sm">
              {val ? <ToggleRight size={28} className="text-emerald-400" /> : <ToggleLeft size={28} className="text-gray-500" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
