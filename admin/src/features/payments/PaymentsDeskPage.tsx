import React, { useState } from 'react';
import { CreditCard, ArrowDownToLine, CheckCircle2, ShieldCheck, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { DataTable, Column } from '../../components/ui/DataTable';
import { useToast } from '../../components/ui/Toast';

interface TransactionRecord {
  id: string;
  reference: string;
  clientName: string;
  lawyerName: string;
  amount: number;
  platformFee: number;
  lawyerPayout: number;
  provider: 'Paystack' | 'Flutterwave';
  status: 'ESCROW_HELD' | 'DISBURSED' | 'REFUNDED';
  date: string;
}

interface WithdrawalRecord {
  id: string;
  lawyerName: string;
  bankName: string;
  accountNumber: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
}

const MOCK_TXNS: TransactionRecord[] = [
  { id: 'TXN-99120', reference: 'PST_88192039', clientName: 'Chidi Nwosu', lawyerName: 'Barrister Nnamdi Bello (SAN)', amount: 35000, platformFee: 2625, lawyerPayout: 32375, provider: 'Paystack', status: 'ESCROW_HELD', date: '2026-08-11 10:14' },
  { id: 'TXN-99121', reference: 'FLW_77102938', clientName: 'Innovate Tech', lawyerName: 'Barrister Emeka Okafor', amount: 45000, platformFee: 3375, lawyerPayout: 41625, provider: 'Flutterwave', status: 'DISBURSED', date: '2026-08-10 16:30' }
];

const MOCK_WITHDRAWALS: WithdrawalRecord[] = [
  { id: 'WDR-401', lawyerName: 'Barrister Emeka Okafor', bankName: 'GTBank', accountNumber: '0123456789', amount: 3240000, status: 'PENDING', requestedAt: '2026-08-11 08:30' }
];

export const PaymentsDeskPage: React.FC<{ isWithdrawalsOnly?: boolean }> = ({ isWithdrawalsOnly = false }) => {
  const [txns, setTxns] = useState<TransactionRecord[]>(MOCK_TXNS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(MOCK_WITHDRAWALS);
  const { showToast } = useToast();

  const handleApproveWithdrawal = (wdr: WithdrawalRecord) => {
    setWithdrawals(withdrawals.map(w => w.id === wdr.id ? { ...w, status: 'APPROVED' } : w));
    showToast(`Approved payout of ₦${wdr.amount.toLocaleString()} to ${wdr.lawyerName} (${wdr.bankName})`, 'success');
  };

  const txnColumns: Column<TransactionRecord>[] = [
    { key: 'id', header: 'Txn ID', render: (row) => <span className="font-mono text-xs font-bold text-amber-400">{row.id}</span> },
    { key: 'clientName', header: 'Client & Lawyer', render: (row) => <div><p className="font-semibold text-white">{row.clientName}</p><span className="text-xs text-gray-400">Counsel: {row.lawyerName}</span></div> },
    { key: 'amount', header: 'Total NGN Amount', render: (row) => <span className="text-xs font-bold text-white">₦{row.amount.toLocaleString()}</span> },
    { key: 'platformFee', header: 'Platform Tech Fee (7.5%)', render: (row) => <span className="text-xs font-semibold text-blue-400">₦{row.platformFee.toLocaleString()}</span> },
    { key: 'status', header: 'Escrow Status', render: (row) => <span className="text-xs font-semibold text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1 w-fit"><ShieldCheck size={12} /> {row.status}</span> }
  ];

  const wdrColumns: Column<WithdrawalRecord>[] = [
    { key: 'id', header: 'Withdrawal Ref', render: (row) => <span className="font-mono text-xs font-bold text-amber-400">{row.id}</span> },
    { key: 'lawyerName', header: 'Lawyer Beneficiary', render: (row) => <div><p className="font-semibold text-white">{row.lawyerName}</p><span className="text-xs text-gray-400">{row.bankName} • {row.accountNumber}</span></div> },
    { key: 'amount', header: 'Payout NGN Amount', render: (row) => <span className="text-xs font-bold text-emerald-400">₦{row.amount.toLocaleString()} NGN</span> },
    {
      key: 'actions',
      header: 'Finance Approval',
      render: (row) => (
        row.status === 'PENDING' ? (
          <button onClick={() => handleApproveWithdrawal(row)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg">
            Approve Bank Payout
          </button>
        ) : <span className="text-xs text-emerald-400 font-semibold">✓ Disbursed</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <CreditCard className="text-emerald-400" size={24} />
          {isWithdrawalsOnly ? 'Lawyer Payout Withdrawal Desk' : 'Payments & Escrow Protection Control'}
        </h2>
        <p className="text-xs text-gray-400">Audit gateway transactions, platform commission fees, and lawyer bank disbursements.</p>
      </div>

      {isWithdrawalsOnly ? (
        <DataTable columns={wdrColumns} data={withdrawals} searchPlaceholder="Search withdrawals..." />
      ) : (
        <DataTable columns={txnColumns} data={txns} searchPlaceholder="Search transactions by ID, reference, client, or lawyer..." />
      )}
    </div>
  );
};
