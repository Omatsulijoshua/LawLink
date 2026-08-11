import React, { useState } from 'react';
import { Users, Search, Filter, ShieldAlert, CheckCircle, Ban, Eye, UserCheck, Lock } from 'lucide-react';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CLIENT' | 'LAWYER' | 'LAW_FIRM_ADMIN' | 'SUPER_ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'DISABLED';
  joinedAt: string;
  lastActive: string;
  location: string;
}

const MOCK_USERS: UserRecord[] = [
  { id: 'u-101', name: 'Chidi Nwosu', email: 'chidi.nwosu@example.com', phone: '+234 803 111 2233', role: 'CLIENT', status: 'ACTIVE', joinedAt: '2026-01-15', lastActive: '10 mins ago', location: 'Lagos, NG' },
  { id: 'u-102', name: 'Barrister Nnamdi Bello (SAN)', email: 'bello@bellolaw.ng', phone: '+234 802 444 5566', role: 'LAWYER', status: 'ACTIVE', joinedAt: '2025-11-20', lastActive: '2 mins ago', location: 'Abuja, FCT' },
  { id: 'u-103', name: 'Folake Adebayo & Co.', email: 'contact@adebayolaw.ng', phone: '+234 809 777 8899', role: 'LAW_FIRM_ADMIN', status: 'ACTIVE', joinedAt: '2025-09-10', lastActive: '1 hour ago', location: 'Ikeja, Lagos' },
  { id: 'u-104', name: 'Tunde Bakare', email: 'tunde.bakare@example.com', phone: '+234 812 000 3344', role: 'CLIENT', status: 'SUSPENDED', joinedAt: '2026-02-01', lastActive: '3 days ago', location: 'Ibadan, Oyo' },
  { id: 'u-105', name: 'Super Admin', email: 'lawlinkllp01@gmail.com', phone: '+234 800 000 0000', role: 'SUPER_ADMIN', status: 'ACTIVE', joinedAt: '2025-01-01', lastActive: 'Just now', location: 'Abuja, FCT' }
];

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CLIENT' | 'LAWYER' | 'LAW_FIRM_ADMIN' | 'SUSPENDED'>('ALL');
  const { showToast } = useToast();

  const handleToggleSuspend = (user: UserRecord) => {
    const newStatus = user.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    showToast(`User ${user.name} status updated to ${newStatus}`, newStatus === 'SUSPENDED' ? 'warning' : 'success');
  };

  const filteredUsers = users.filter((u) => {
    if (activeFilter === 'SUSPENDED') return u.status === 'SUSPENDED';
    if (activeFilter === 'ALL') return true;
    return u.role === activeFilter;
  });

  const columns: Column<UserRecord>[] = [
    {
      key: 'name',
      header: 'User Identity',
      render: (row) => (
        <div>
          <p className="font-semibold text-white">{row.name}</p>
          <span className="text-xs text-gray-400">{row.email} • {row.phone}</span>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Marketplace Role',
      render: (row) => (
        <span className={`text-[11px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
          row.role === 'SUPER_ADMIN' ? 'bg-amber-950 text-amber-400 border-amber-500/40' :
          row.role === 'LAWYER' ? 'bg-blue-950 text-blue-400 border-blue-500/40' :
          row.role === 'LAW_FIRM_ADMIN' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' :
          'bg-gray-800 text-gray-300 border-gray-700'
        }`}>
          {row.role}
        </span>
      )
    },
    {
      key: 'location',
      header: 'Jurisdiction',
      render: (row) => <span className="text-xs text-gray-300">{row.location}</span>
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (row) => (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit ${
          row.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
          'bg-red-950 text-red-400 border border-red-500/30'
        }`}>
          {row.status === 'ACTIVE' ? <CheckCircle size={12} /> : <Ban size={12} />}
          {row.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Admin Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedUser(row)}
            className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs flex items-center gap-1"
            title="View Account Dossier"
          >
            <Eye size={14} />
          </button>
          {row.role !== 'SUPER_ADMIN' && (
            <button
              onClick={() => handleToggleSuspend(row)}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                row.status === 'SUSPENDED'
                  ? 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30'
                  : 'bg-red-950 text-red-300 hover:bg-red-900 border border-red-500/30'
              }`}
            >
              {row.status === 'SUSPENDED' ? 'Unsuspend' : 'Suspend'}
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">User Directory & RBAC Management</h2>
          <p className="text-xs text-gray-400">Manage client accounts, verified lawyers, law firms, and administrative access.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-800 text-xs font-medium gap-2">
        {(['ALL', 'CLIENT', 'LAWYER', 'LAW_FIRM_ADMIN', 'SUSPENDED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2.5 border-b-2 font-semibold transition-colors ${
              activeFilter === tab
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab === 'LAW_FIRM_ADMIN' ? 'Law Firms' : tab}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filteredUsers} searchPlaceholder="Search users by name, email, phone..." />

      {/* User Detail Modal */}
      {selectedUser && (
        <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} title={`User Dossier — ${selectedUser.name}`}>
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 bg-[#0b0f19] p-4 rounded-xl border border-gray-800">
              <div><span className="text-gray-500 block">Full Name:</span><strong className="text-white text-sm">{selectedUser.name}</strong></div>
              <div><span className="text-gray-500 block">Email Address:</span><strong className="text-white text-sm">{selectedUser.email}</strong></div>
              <div><span className="text-gray-500 block">Phone Number:</span><span className="text-gray-300">{selectedUser.phone}</span></div>
              <div><span className="text-gray-500 block">Jurisdiction:</span><span className="text-gray-300">{selectedUser.location}</span></div>
              <div><span className="text-gray-500 block">Account Role:</span><span className="text-blue-400 font-mono font-semibold">{selectedUser.role}</span></div>
              <div><span className="text-gray-500 block">Member Since:</span><span className="text-gray-300">{selectedUser.joinedAt}</span></div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
              <button
                onClick={() => handleToggleSuspend(selectedUser)}
                className={`px-4 py-2 rounded-lg font-semibold text-xs ${
                  selectedUser.status === 'SUSPENDED' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {selectedUser.status === 'SUSPENDED' ? 'Unsuspend Account' : 'Suspend Account'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
