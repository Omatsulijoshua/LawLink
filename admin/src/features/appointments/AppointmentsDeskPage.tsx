import React, { useState } from 'react';
import { Calendar, Video, Phone, MessageSquare, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { DataTable, Column } from '../../components/ui/DataTable';

interface AppointmentRecord {
  id: string;
  clientName: string;
  lawyerName: string;
  channel: 'Video Call' | 'Phone Call' | 'Live Chat';
  date: string;
  time: string;
  fee: number;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

const MOCK_APPOINTMENTS: AppointmentRecord[] = [
  { id: 'APT-1001', clientName: 'Chidi Nwosu', lawyerName: 'Barrister Nnamdi Bello (SAN)', channel: 'Video Call', date: '2026-08-11', time: '11:30 AM', fee: 35000, status: 'CONFIRMED' },
  { id: 'APT-1002', clientName: 'Tunde Bakare', lawyerName: 'Barrister Folake Adebayo', channel: 'Live Chat', date: '2026-08-11', time: '02:00 PM', fee: 25000, status: 'CONFIRMED' },
  { id: 'APT-1003', clientName: 'Innovate Tech', lawyerName: 'Barrister Emeka Okafor', channel: 'Video Call', date: '2026-08-10', time: '04:00 PM', fee: 45000, status: 'COMPLETED' }
];

export const AppointmentsDeskPage: React.FC = () => {
  const [apts, setApts] = useState<AppointmentRecord[]>(MOCK_APPOINTMENTS);

  const columns: Column<AppointmentRecord>[] = [
    {
      key: 'id',
      header: 'Booking Ref',
      render: (row) => <span className="font-mono text-xs font-bold text-amber-400">{row.id}</span>
    },
    {
      key: 'clientName',
      header: 'Client & Lawyer',
      render: (row) => (
        <div>
          <p className="font-semibold text-white">{row.clientName}</p>
          <span className="text-xs text-gray-400">Counsel: {row.lawyerName}</span>
        </div>
      )
    },
    {
      key: 'channel',
      header: 'Consultation Mode',
      render: (row) => (
        <span className="text-xs font-semibold text-blue-400 bg-blue-950 border border-blue-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit">
          {row.channel === 'Video Call' ? <Video size={12} /> : row.channel === 'Phone Call' ? <Phone size={12} /> : <MessageSquare size={12} />}
          {row.channel}
        </span>
      )
    },
    {
      key: 'date',
      header: 'Schedule',
      render: (row) => <span className="text-xs text-gray-300">{row.date} at {row.time}</span>
    },
    {
      key: 'fee',
      header: 'Consultation Fee',
      render: (row) => <span className="text-xs font-semibold text-emerald-400">₦{row.fee.toLocaleString()} NGN</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit ${
          row.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
          'bg-blue-950 text-blue-400 border border-blue-500/30'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <Calendar className="text-amber-500" size={24} />
          Consultation Appointments Control Desk
        </h2>
        <p className="text-xs text-gray-400">Track real-time scheduled video sessions, audio calls, and instant chat consultations.</p>
      </div>

      <DataTable columns={columns} data={apts} searchPlaceholder="Search appointments by reference, client, or lawyer..." />
    </div>
  );
};
